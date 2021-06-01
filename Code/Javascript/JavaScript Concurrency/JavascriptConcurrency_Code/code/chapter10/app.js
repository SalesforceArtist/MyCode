'use strict';

// The core Node modules we'll need.
var http = require('http');

// Commander is an "npm" package, and is very helpful
// with parsing command line arguments.
var commander = require('commander');

// Our request handler functions that respond to
// requests.
var handlers = require('./handlers');

// The routes array contains route-handler parings. That is,
// when a given route RegExp matches against the request URL,
// the associated handler function is called.
var routes = [
	[ /^\/api\/chat\/(.+)\/message/i, handlers.sendMessage ],
	[ /^\/api\/chat\/(.+)\/join$/i, handlers.joinChat ],
	[ /^\/api\/chat\/(.+)$/i, handlers.loadChat ],
	[ /^\/api\/chat$/i, handlers.createChat ],
	[ /^\/(.+)\.js$/i, handlers.staticFile ],
	[ /^\/(.*)$/i, handlers.index ]
];

// Adds command line options using the "commander" library,
// and parses them. We're only interested in the "host" and
// the "port" values right now. Both options hae default
// values.
commander
	.option('-p, --port <port>', 'The port to listen on', 8081)
	.option('-H --host <host>', 'The host to serve from', 'localhost')
	.parse(process.argv);

// Creates an HTTP server. This handler will iterate over
// out "routes" array, and test for a match. If found, the
// handler is called with the request, the response, and
// the regular expression result.
http.createServer((req, res) => {
	for (let route of routes) {
		let result = route[0].exec(req.url);

		if (result) {
			route[1](req, res, result);
			break;
		}
	}
}).listen(commander.port, commander.host);

console.log(`listening at http://${commander.host}:${commander.port}`);
