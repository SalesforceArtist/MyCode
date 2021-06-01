'use strict';

// An input array of numbers.
var array = new Array(2500)
	.fill(null)
	.map((v, i) => i);

// Creates a new parallel job. No workers have been
// created at this point - we only pass the constructor
// the data we're working with.
var job = new Parallel(array);

// Start a timer for our "spawn()" job.
console.time(`${array.length} items`);

// Creates a new web worker, passing it our data and
// this function. We're slowly mapping each number in
// the array to it's square.
job.spawn((coll) => {
	return coll.map((n) => {
		var i = 0;
		while (++i < n * n) {}
		return i;
	});

// The return value of "spawn()" is a thenable. Meaning
// we can assign a "then()" callback function, just as
// though a promise were returned.
}).then((results) => {
	console.timeEnd(`${array.length} items`);
	// → 2500 items: 3408.078ms
});
