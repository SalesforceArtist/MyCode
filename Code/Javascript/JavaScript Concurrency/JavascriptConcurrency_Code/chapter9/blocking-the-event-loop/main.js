'use strict';

// Eat some CPU cycles...
// Taken from http://adambom.github.io/parallel.js/
function work(n) {
	var i = 0;
	while (++i < n * n) {}
	return i;
}

// Adds some functions to the event loop queue.
process.nextTick(() => {
	var promises = [];

	// Creates 500 promises in the "promises"
	// array. They're each resolved after 1 second.
	for (let i = 0; i < 500; i++) {
		promises.push(new Promise((resolve) => {
			setTimeout(resolve, 1000);
		}));
	}

	// When they're all resolved, log that
	// we're don handling them.
	Promise.all(promises).then(() => {
		console.log('handled requests');
	});
});

// This takes a lot longer than the 1 second
// it takes to resolve all the promises that
// get added to the queue. So this handler blocks
// 500 user requests till it finishes..
process.nextTick(() => {
	console.log('hogging the CPU...');
	work(100000);
});

