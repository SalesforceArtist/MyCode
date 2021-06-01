'use strict';

// Launches our worker.
var worker = new Worker('worker.js');

// Listen to messages sent back from the worker,
// and log the result.
worker.addEventListener('message', (e) => {
	console.log('result', `"${e.data}"`);
});

// Listen to errors sent back from the worker,
// and log the error message.
worker.addEventListener('error', (e) => {
	console.error(e.message);
});

worker.postMessage(null);
// → Uncaught TypeError: Cannot read property 'name' of null

worker.postMessage({ name: 'JavaScript' });
// → result "JavaScript"
