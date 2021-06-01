'use strict';

// Loads the generic task that's executed by
// this worker.
importScripts('task.js');

addEventListener('message', (e) => {

	// If we get a message for a "sum" task,
	// then we call our "sum()" task, and post
	// the result, along with the operation ID.
	if (e.data.task === 'sum') {
		postMessage({
			id: e.data.id,
			value: sum(...e.data.chunk)
		});
	}
});
