'use strict';

// Launches the new worker.
var worker = new Worker('worker.js');

// Adds an event listener for the "message"
// event. Notice that the "data" property
// contains the actual mesage payload, the
// same way messages sent to workers do.
worker.addEventListener('message', (e) => {
	console.log('from worker', `"${e.data}"`);
});
