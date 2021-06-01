'use strict';

// An input array of numbers.
var array = new Array(2500)
	.fill(null)
	.map((v, i) => i);

// Creates a new parallel job. No workers have been
// created at this point - we only pass the constructor
// the data we're working with.
var job1 = new Parallel(array);

// Start a timer for our "spawn()" job.
console.time('job1');

// The problem here is that Parallel.js will
// create a new worker for every array element, resulting
// in parallel slowdown.
job1.map((n) => {
	var i = 0;
	while (++i < n * n) {}
	return i;
}).reduce((pair) => {

	// Reduces the array items to a sum.
	return pair[0] + pair[1];
}).then((data) => {
	console.log('job1 reduced', data);
	// → job1 reduced 5205208751

	console.timeEnd('job1');
	// → job1: 59443.863ms
});

// A faster implementation.
var job2 = new Parallel(array);

console.time('job2');

// Before mapping the array, split the array into chunks
// of smaller arrays. This way, each Parallel.js worker is
// processing an array instead of an array item. This avoids
// sending thousands of web worker messages.
job2.spawn((data) => {
	var index = 0,
		size = 1000,
		results = [];

	while (true) {
		let chunk = data.slice(index, index + size);

		if (chunk.length) {
			results.push(chunk);
			index += size;
		} else {
			return results;
		}
	}
}).map((array) => {

	// Returns a mapping of the array chunk.
	return array.map((n) => {
		var i = 0;
		while (++i < n * n) {}
		return i;
	});
}).reduce((pair) => {

	// Reduces array chunks, or numbers, to a sum.
	return (Array.isArray(pair[0]) ?
			pair[0].reduce((r, v) => r + v) : pair[0]) +
		(Array.isArray(pair[1]) ?
			pair[1].reduce((r, v) => r + v) : pair[1]);
}).then((data) => {
	console.log('job2 reduced', data);
	// → job2 reduced 5205208751

	console.timeEnd('job2');
	// → job2: 2723.661ms
});
