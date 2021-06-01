'use strict';

// Launches the worker.
var worker = new Worker('worker.js');

// Listens for messages coming from the worker.
// If we get back an error, we log the error
// message. Otherwise, we log the successful result.
worker.addEventListener('message', (e) => {
	if (e.data.error) {
		console.error(e.data.error);
	} else {
		console.log('result', e.data.result);
	}
});

worker.postMessage([ 3, 2, 1 ]);
// → result 3

worker.postMessage({});
// → expecting an array
