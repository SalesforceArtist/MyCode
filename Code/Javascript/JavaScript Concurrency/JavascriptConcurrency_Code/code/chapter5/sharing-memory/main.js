'use strict';

// Launches the shared worker.
var worker = new SharedWorker('worker.js');

// Sets up our "message" event handler. By connecting
// to the shared worker, we're atually causing a
// a message to be posted to our messaging port.
worker.port.addEventListener('message', (e) => {
	console.log('connections made', e.data);
});

// Starts the messaging port, indicating that we're
// ready to start sending and receiving messages.
worker.port.start();
