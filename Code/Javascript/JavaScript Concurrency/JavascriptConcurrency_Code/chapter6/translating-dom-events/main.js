'use strict';

// Starts the worker...
var worker = new Worker('worker.js');

// When we get a message, that means the worker wants
// to listen to a DOM event, so we have to setup
// the proxying.
worker.addEventListener('message', (msg) => {
	var data = msg.data;

	if (data.action === 'addEventListener') {

		// Find the nodes the worker is looking for.
		var nodes = document.querySelectorAll(data.selector);

		// Add a new event handler for the given "event" to
		// each node we just found. When that event is triggered,
		// we simply post a message back to the worker containing
		// relevant event data.
		for (let node of nodes) {
			node.addEventListener(data.event, (e) => {
				worker.postMessage({
					selector: data.selector,
					value: e.target.value
				});
			});
		}
	}
});
