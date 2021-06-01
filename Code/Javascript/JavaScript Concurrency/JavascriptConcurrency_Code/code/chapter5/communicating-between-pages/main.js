'use strict';

// Launch the shared worker, and store a reference
// to the main UI element we're working with.
var worker = new SharedWorker('worker.js');
var input = document.querySelector('input');

// Whenever the input value changes, post the input
// value to the worker for other pages to consume.
input.addEventListener('input', (e) => {
	worker.port.postMessage(e.target.value);
});

// When we receive input data, update the value of our
// text input. That is, unless the value is already
// updated.
worker.port.addEventListener('message', (e) => {
	if (e.data !== input.value) {
		input.value = e.data;
	}
});

// Starts worker communications.
worker.port.start();

