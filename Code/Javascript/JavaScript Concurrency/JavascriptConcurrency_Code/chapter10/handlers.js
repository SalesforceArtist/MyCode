'use strict';

// All the code Node modules we require.
var fs = require('fs');
var path = require('path');
var stream = require('stream');
var crypto = require('crypto');
var http = require('http');

// The modules we require that are installed via "npm".
var formidable = require('formidable');
var co = require('co');

// Our chat storage mechanism.
var chats = {};

// A basic hex ID generator for our chats.
function id() {
	return crypto.randomBytes(10).toString('hex');
}

// This function returns a promise, which is resolved
// with parsed form data as an object.
function formFields(req) {
	return new Promise((resolve, reject) => {

		// Use the "IncomingForm" class from the
		// "formidable" lib to parse the data. This
		// "parse()" method is async, so we resolve or
		// reject the promise in the callback.
		new formidable.IncomingForm()
			.parse(req, (err, fields) => {
				if (err) {
					reject(err);
				} else {
					resolve(fields);
				}
			});
	});
}

// Helper function used to serve static files.
function serveFile(req, res, file) {

	// Creates a stream to read the file.
	var stream = fs.createReadStream(file);		

	// End the response when there's no more input.
	stream.on('end', () => {
		res.end();
	});

	// Pipe the input file to the HTTP response,
	// which is a writable stream.
	stream.pipe(res);
}

// Utility function that ensures the expected HTTP
// method was used with a given request. If not,
// it ends the response with a 405 error.
function ensureMethod(req, res, method) {
    if (req.method === method) {
		return true;
	}

	res.statusCode = 405;
    res.statusMessage = http.STATUS_CODES[405];
	res.end();
}

// Utility function that ensures the given "data"
// is truthy. If not, it ends the response with
// a 404 error.
function ensureFound(req, res, data) {
	if (data) {
		return true;
	}

	res.statusCode = 404;
	res.statusMessage = http.STATUS_CODES[404];
	res.end();
}

// The "create chat" API. This endpoint
// creates a new chat object and stores it in memory.
exports.createChat = co.wrap(function* (req, res) {
	if (!ensureMethod(req, res, 'POST')) {
		return;
	}

	// Yield the promise returned by "formFields()".
	// This pauses the execution of this handler because
	// it's a co-routine, created using "co.wrap()".
	var fields = yield formFields(req);

	// The ID for the new chat.
	var chatId = id();

	// The timestamp used for both the chat, and the
	// added user.
	var timestamp = new Date().getTime();

	// Creates the new chat object and stores it. The
	// "users" array is populated with the user that
	// created the chat. The "messages" array is empty
	// by default.
	var chat = chats[chatId] = {
		timestamp: timestamp,
		topic: fields.topic,
		users: [{
			timestamp: timestamp,
			name: fields.user
		}],
		messages: []
	};

	// The response is the JSON encoded version of the
	// chat object. The chat ID is added to the response
	// since it's stored as a key, not a chat property.
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(Object.assign({
		id: chatId
	}, chat)));	
});

// This endpoint loads a chat. This function
// isn't wrapped as a co-routine because there's
// no asynchronous actions to wait for.
exports.loadChat = function(req, res, id) {

	// Lookup the chat, using the "id" from the URL
	// as the key.
	var chat = chats[id[1]];

	if (!ensureFound(req, res, chat)) {
		return;
	}

	// Respond with the JSON encoded string version
	// of the chat.
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(chat));
};

// This endpoint allows a user to join an existing
// chat that's been shared with them (a URL).
exports.joinChat = co.wrap(function* (req, res, id) {
	if (!ensureMethod(req, res, 'POST')) {
		return;
	}

	// Load the chat from the memory - the "chats"
	// object.
	var chat = chats[id[1]];

	if (!ensureFound(req, res, chat)) {
		return;
	}

	// Yield to get the parsed form fields. This
	// function is a co-routine created using "co.wrap()".
	var fields = yield formFields(req);

	chat.timestamp = new Date().getTime();

	// Adds the new user to the chat.
	chat.users.push({
		timestamp: chat.timestamp,
		name: fields.user
	});

	// Responds with the JSON encoded chat string. We
	// need to add the ID separately as it's not a
	// chat property.
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(Object.assign({
		id: id[1],
	}, chat)));
});

// This handler posts a new message to a given chat. It's
// also a co-routine function since it needs to wait for
// asynchronous actions to complete.
exports.sendMessage = co.wrap(function* (req, res, id) {
	if (!ensureMethod(req, res, 'POST')) {
		return;
	}

	// Load the chat and ensures that it's found.
	var chat = chats[id[1]];

	if (!ensureFound(req, res, chat)) {
		return;
	}

	// Get's the parsed form fields by yielding the
	// promise returned from "formFields()".
	var fields = yield formFields(req);

	chat.timestamp = new Date().getTime();

	// Pushes the new message object to the "messages" 
	// property.
	chat.messages.push({
		timestamp: chat.timestamp,
		user: fields.user,
		message: fields.message
	});

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(chat));
});

// Serves the requested path as a static file.
exports.staticFile = function(req, res) {
	serveFile(req, res,
		path.join(__dirname, req.url));
};

// By default, we want to serve the "index.html" file.
exports.index = function index(req, res) {
	res.setHeader('ContentType', 'text/html');

	serveFile(req, res, 
		path.join(__dirname, 'index.html'));
};

