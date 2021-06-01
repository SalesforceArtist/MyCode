'use strict';

// Updates the given "chat" in the DOM.
function drawChat(chat) {

	// Our main DOM components. "$users" is the
	// list of users in the chat. "$messages" is the
	// list of messages in the chat. "$view" is the
	// container element for both lists.
	var $users = document.getElementById('users'),
		$messages = document.getElementById('messages'),
		$view = document.getElementById('view');

	// Update the document title to reflect the chat
	// "topic", display the chat container by removing
	// the "hide" class, and update the title of the
	// chat in bold heading.
	document.querySelector('title').textContent = chat.topic;
	$view.classList.remove('hide');
	$view.querySelector('h1')
		.textContent = chat.topic;

	// Iterates over the messages, making no assumptions
	// about filtering or anything like that.
	for (var message of chat.messages) {

		// Constructs the DOM elements we'll need for
		// the user portion of the message.
		var $user = document.createElement('li'),
			$strong = document.createElement('strong'),
			$em = document.createElement('em');

		// Assemble the DOM structure...
		$user.appendChild($strong);
		$user.appendChild($em);
		$user.classList.add('user');

		// Add content - the user name, and time the message
		// was posted.
		$strong.textContent = message.user + ' ';
		$em.textContent = new Date(message.timestamp)
			.toLocaleString();

		// The message itself...
		var $message = document.createElement('li');
		$message.textContent = message.message;

		// Attach the user portion and the message portion,
		// to the DOM.
		$messages.appendChild($user);
		$messages.appendChild($message);
	}

	// Iterates over the users in the chat, making no
	// assumptions about the data, only displaying it.
	for (var user of chat.users) {
		var $user = document.createElement('li');
		$user.textContent = user.name;

		$users.appendChild($user);
	}

	// Make sure that the user can see the newly-rendered
	// content.
	$messages.scrollTop = $messages.scrollHeight;

	// Return the chat so that this function can be used
	// as a resolver in a promise resolution chain.
	return chat;
}

// Starts polling the API for the given chat "id".
function poll(chatId) {
	setInterval(() => {
		api.postMessage({
			action: 'loadChat',
			chatId: chatId
		}).then(drawChat);
	}, 3000);
}

// When the page loads...
window.addEventListener('load', (e) => {

	// The "chatId" comes from the page URL. The "user"
	// might already exist in localStorage.
	var chatId = location.pathname.slice(1),
		user = localStorage.getItem('user'),
		$create = document.getElementById('create'),
		$join = document.getElementById('join');

	// If there's no chat ID in the URL, then we display
	// the create chat screen, populating the user
	// input if it was found in localStorage.
	if (!chatId) {
		$create.classList.remove('hide');

		if (user) {
			document.getElementById('create-user')
				.value = user;
		}

		return;
	}

	// If there's no user name found in localStorage,
	// we display the join screen which allows them
	// to enter their name before joining the chat.
	if (!user) {
		$join.classList.remove('hide');
		return;
	}

	// We load the chat, draw it using drawChat(), and
	// start the chat polling process.
	api.postMessage({
		action: 'loadChat',
		chatId: chatId
	}).then(drawChat).then((chat) => {

		// If the user isn't part of the chat already,
		// we join it. This happens when the user name
		// is cached in localStorage. If the user creates
		// a chat, then loads it, they'll already belong
		// to the chat.
		if (chat.users.map(u => u.name).indexOf(user) < 0) {
			api.postMessage({
				action: 'joinChat',
				chatId: chatId,
				user: user
			}).then(drawChat).then(() => {
				poll(chatId);
			});
		} else {
			poll(chatId);
		}
	});
});

// When the create chat button is clicked...
document.querySelector('#create button')
	.addEventListener('click', (e) => {

		// Use the name found in localStorage, or the
		// input field value.
		var user = localStorage.getItem('user') ||
			document.getElementById('create-user').value;

		// Update the localeStorage value.
		localStorage.setItem('user', user);

		// Make the API call to create the chat, then
		// change the browser URL to point to the new
		// chat ID.
		api.postMessage({
			action: 'createChat',
			topic: document.getElementById('topic').value,
			user: user
		}).then((chat) => {
			location.href = '/' + chat.id
		});
	});

// When the join chat button is clicked...
document.querySelector('#join button')
	.addEventListener('click', (e) => {

		// Get the user name, and set it in localStorage.
		var user = document.getElementById('join-user').value;
		localStorage.setItem('user', user);

		// Post the join chat API message, then draw the chat.
		// We then want to hide the join chat screen, and begin
		// the polling process.
		api.postMessage({
			action: 'joinChat',
			chatId: location.pathname.slice(1),
			user: user
		}).then(drawChat).then((chat) => {
			document.getElementById('join').classList.add('hide');

			poll(chat.id);
		});
	});

// When the user types in the message field...
document.querySelector('#view input')
	.addEventListener('keyup', (e) => {

		// Was it the "enter" key, and is there message
		// content to send? If so, post the message to the
		// send message API and draw the chat when done. Also
		// empty out the message input field.
		if (e.keyCode === 13 && e.target.value) {
			api.postMessage({
				action: 'sendMessage',
				chatId: location.pathname.slice(1),
				user: localStorage.getItem('user'),
				message: e.target.value
			}).then(drawChat);

			e.target.value = '';
		}
	});

