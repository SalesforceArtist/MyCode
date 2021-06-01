'use strict';

// The last time we checked for updated chat data.
var timestamp = 0;

// A generic function used to send HTTP requests to the
// API. The "method" is the HTTP method, the "path" is
// the request path, and the "data" is the optional
// request payload.
function api(method, path, data) {

	// Returns a promise to the called, resolved with
	// the API response, or failure.
	return new Promise((resolve, reject) => {
		var request = new XMLHttpRequest();

		// Resolves the promise using the parsed JSON
		// object - usually a chat.
		request.addEventListener('load', (e) => {
			resolve(JSON.parse(e.target.responseText));
		});

		// Rejects the promise when there's a problem with
		// the API.
		request.addEventListener('error', (e) => {
			reject(e.target.statusText || 'unknown error');
		});

		request.addEventListener('abort', resolve);

		request.open(method, path);

		// If there's no "data", we can simply "send()"
		// the request. Otherwise, we have to create a
		// new "FormData" instance to properly encode
		// the form data for the request.
		if (Object.is(data, undefined)) {
			request.send();
		} else {
			var form = new FormData();

			Object.keys(data).forEach((key) => {
				form.append(key, data[key]);
			});

			request.send(form);
		}
	});
}

// Filters the "chat" object to include only new users
// and new messages. That is, data with a newer
// "timestamp" than when we last checked.
function filterChat(chat) {
	Object.assign(chat, {

		// Assigns the filtered arrays to the
		// corresponding "chat" properties.
		users: chat.users.filter(
			user => user.timestamp > timestamp
		),
		messages: chat.messages.filter(
			message => message.timestamp > timestamp
		)
	});

	// Reset the "timestamp" so we can look for newer
	// data next time around. We return the modified
	// chat instance.
	timestamp = chat.timestamp;
	return chat;
}

// Creates a chat using the given "topic" and "user".
// The returned promise is resolved with the created
// chat data.
function createChat(topic, user) {
	return api('post', 'api/chat', {
		topic: topic,
		user: user
	});
}

// Joins the given "user" to the given chat "id".
// The returned promise is resolved with the
// joined chat data.
function joinChat(id, user) {
	return api('post', `api/chat/${id}/join`, {
		user: user
	}).then(filterChat);
}

// Loads the given chat "id". The returned promise
// is resolved with filtered chat data.
function loadChat(id) {
	return api('get', `api/chat/${id}`)
		.then(filterChat);
};

// Posts a "message" from the given "user" to the given
// chat "id". The returned promise is resolved with
// filtered chat data.
function sendMessage(id, user, message) {
	return api('post', `api/chat/${id}/message`, {
		user: user,
		message: message
	}).then(filterChat);
}

// Listens for messages coming from the main thread.
addEventListener('message', (e) => {

	// The generic promise resolver function. It's
	// job is to post data back to the main thread
	// using "postMessage()". It also returns the
	// data so that it may be used further down in
	// the promise resolution chain.
	function resolve(data) {
		postMessage(Object.assign({
			msgId: e.data.msgId
		}, data));

		return data;
	}

	// The generic rejector function posts data back
	// to the main thread. The difference here is that
	// it marks the data as an error. This allows the
	// promise on the other end to be rejected.
	function reject(error) {
		postMessage({
			msgId: e.data.msgId,
			error: error.toString()
		});

		return error;
	}

	// This switch decides which function to call based
	// on the "action" message property. The "resolve()"
	// function is passed as the resolver to each returned 
	// promise.
	switch (e.data.action) {
		case 'createChat':
			createChat(e.data.topic, e.data.user)
				.then(resolve, reject);
			break;
		case 'joinChat':
			joinChat(e.data.chatId, e.data.user)
				.then(resolve, reject);
			break;
		case 'loadChat':
			loadChat(e.data.chatId)
				.then(resolve, reject)
			break;
		case 'sendMessage':
			sendMessage(
				e.data.chatId,
				e.data.user,
				e.data.message
			).then(resolve, reject);
			break;
	}
});
