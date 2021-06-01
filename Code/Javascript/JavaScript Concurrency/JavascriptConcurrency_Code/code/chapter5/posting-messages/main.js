'use strict';

// Launches the worker thread.
var worker = new Worker('worker.js');

// Posts a message to the worker, triggering
// any "message" event handlers.
worker.postMessage('hello world');
