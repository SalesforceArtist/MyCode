'use strict';

// Loads the generic task that's executed by
// this worker.
importScripts('task.js');

addEventListener('message', (e) => {

	// If we get a message for a "count" task,
	// then we call our "count()" task, and post
	// the result, along with the operation ID.
	if (e.data.task === 'count') {
		postMessage({
			id: e.data.id,
			value: count(e.data.chunk, ...e.data.args)
		});
	}
});
