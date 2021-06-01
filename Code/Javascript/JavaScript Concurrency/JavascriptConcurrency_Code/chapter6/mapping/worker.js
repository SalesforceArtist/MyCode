'use strict';

// Loads the generic task that's executed by
// this worker.
importScripts('task.js');

addEventListener('message', (e) => {

	// If we get a message for a "pluck" task,
	// then we call our "pluck()" task, and post
	// the result, along with the operation ID.
	if (e.data.task === 'pluck') {
		postMessage({
			id: e.data.id,
			value: pluck(e.data.chunk, ...e.data.args)
		});

	// If we get a message for a "sum task, we do
	// the same thing as above, except we're calling
	// different function to compute the result.
	} else if (e.data.task === 'sum') {
		postMessage({
			id: e.data.id,
			value: sum(e.data.chunk)
		});
	}
});
