'use strict';

var http = require('http');

// Our sample preference data.
var preferences = [
	{ spam: false },
	{ spam: true },
	{ spam: false },
	{ spam: true }
];

var server = http.createServer((req, res) => {

	// We'll be returning JSON data.
	res.setHeader('Content-Type', 'application/json');

	var id = /\/(\d+)/.exec(req.url),
		preference;

	// If the ID in the URL finds a sample preference,
	// return the JSON string for it. Otherwise,
	// respond with a 404.
	if (id && (preference = preferences[+id[1]])) {
		res.end(JSON.stringify(preference));
	} else {
		res.statusCode = 404;
		res.statusMessage = http.STATUS_CODES[404];
		res.end();
	}
});

server.listen(8083);
console.log('Pereference service started at http://localhost:8083');
