'use strict';

// Launch the worker.
var worker = new SharedWorker('worker.js');

// Listen to the "message" event, and log
// any data that's sent back from the worker.
worker.port.addEventListener('message', (e) => {
	console.log('from worker', e.data);
});

// Inform the shared worker that we're ready
// to start receiving messages.
worker.port.start();
