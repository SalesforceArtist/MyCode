'use strict';

var http = require('http');

// Our sample user data.
var users = [
	{ name: 'User 1' },
	{ name: 'User 2' },
	{ name: 'User 3' },
	{ name: 'User 4' }
];

var server = http.createServer((req, res) => {

	// We'll be returning JSON data.
	res.setHeader('Content-Type', 'application/json');

	var id = /\/(\d+)/.exec(req.url),
		user;

	// If a user is found from the ID in the URL, return
	// a JSON string of it. Otherwise, respond with a 404.
	if (id && (user = users[+id[1]])) {
		res.end(JSON.stringify(user));
	} else {
		res.statusCode = 404;
		res.statusReason = http.STATUS_CODES[404];
		res.end();
	}

});

server.listen(8082);
console.log('Users service started at http://localhost:8082');
