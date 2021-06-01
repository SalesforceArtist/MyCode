'use strict';

var http = require('http'),
	httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();

// These are the service targets. They have a "host",
// and a "busy" property. Initially they're
// not busy because we haven't sent any work.
var targets = [
	{
		host: 'http://localhost:8082',
		busy: false
	},
	{
		host: 'http://localhost:8083',
		busy: false
	}
];

// Every request gets queued here, in case all
// our targets are busy.
var queue = [];

// Process the request queue, by proxying requests
// to targets that aren't busy.
function processQueue() {

	// Iterates over the queue of messages.
	for (let i = 0; i < queue.length; i++) {

		// Iterates over the targets.
		for (let target of targets) {

			// If the target is busy, skip it.
			if (target.busy) {
				continue;
			}

			// Marks the target as busy - from this
			// point forward, the target won't accept
			// any requests untill it's unmarked.
			target.busy = true;

			// Gets the current item out of the queue.
			let item = queue.splice(i, 1)[0];

			// Mark the response, so we know which service
			// worker the request went to when it comes
			// back.
			item.res.setHeader('X-Target', i);

			// Sends the proxy request and exits the
			// loop.
			proxy.web(item.req, item.res, {
				target: target.host
			});

			break;
		}
	}
}

// Emitted by the http-proxy module when a response
// arrives from a service worker.
proxy.on('proxyRes', function(proxyRes, req, res) {

	// This is the value we set earlier, the index
	// of the "targets" array.
	var target = res.getHeader('X-Target');

	// We use this index to unmark it. Now it'll
	// except new proxy requests.
	targets[target].busy = false;

	// The client doesn't need this internal
	// information, so remove it.
	res.removeHeader('X-Target');

	// Since a service worker just became available,
	// process the queue again, in case there's pending
	// requests.
	processQueue();
});

http.createServer((req, res) => {

	// All incoming requests are pushed onto the queue.
	queue.push({
		req: req,
		res: res
	});

	// Reprocess the queue, leaving the request there
	// if all the service workers are busy.
	processQueue();
}).listen(8081);

console.log('listening at http://localhost:8081');
