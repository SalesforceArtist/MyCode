'use strict';

// We need the "http" module for HTTP-related
// code.
var http = require('http');

// Creates the server instance, and sets of the
// callback function that's called on every request
// event for us.
var server = http.createServer((req, res) => {

	// The response header is always going to be plain
	// text.
	res.setHeader('Content-Type', 'text/plain');

	// If the request URL is "hello" or "world", we
	// respond with some text immediately. Otherwise,
	// if the request URL is "/", we simulate a slow
	// response by using "setTimeout()" to finish the
	// request after 5 seconds.
	if (req.url === '/hello') {
		res.end('Hello');
	} else if (req.url === '/world') {
		res.end('World');
	} else {
		setTimeout(() => {
			res.end('Hello World');
		}, 5000);
	}
});

// Starts the server.
server.listen(8081);
console.log('listening at http://localhost:8081');
