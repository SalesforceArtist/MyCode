'use strict';

// Launches the worker...
var worker = new Worker('worker.js');

// Generates some input data, an array
// of numbers for 0 - 1041.
var input = new Array(1041)
	.fill(true).map((v, i) => i);

// When the worker responds, display the
// results of our search. 
worker.addEventListener('message', (e) => {
	console.log(`${e.data.search} exists?`, e.data.result);
});

// Search for an item that exists.
worker.postMessage({
	array: input,
	search: 449
});
// → 449 exists? true

// Search for an item that doesn't exist.
worker.postMessage({
	array: input,
	search: 1045
});
// → 1045 exists? false
