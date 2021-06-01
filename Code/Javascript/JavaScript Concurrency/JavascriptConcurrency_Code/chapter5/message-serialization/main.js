'use strict';

// Launches the worker.
var worker = new Worker('worker.js');

// Sends a plain object.
worker.postMessage({ hello: 'world' });
// → message { hello: "world" }

// Sends an array.
worker.postMessage([ 1, 2, 3 ]);
// → message [ 1, 2, 3 ]

// Tries to send a function, results in
// an error being thrown.
worker.postMessage(setTimeout);
// → Uncaught DataCloneError
