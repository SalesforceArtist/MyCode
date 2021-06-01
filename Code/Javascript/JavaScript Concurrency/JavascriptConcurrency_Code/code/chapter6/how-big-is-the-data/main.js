'use strict'

// This function determines whether or not an
// operation should be performed in parallel.
// It takes as arguments - the data to process,
// and a boolean flag, indicating that the task
// performed on each item in the data is expensive
// or not.
function isConcurrent(data, expensiveTask) {
	var size,
		isSet = data instanceof Set,
		isMap = data instanceof Map;

	// Figures out the size of the data, depending
	// on the type of "data".
	if (Array.isArray(data)) {
		size = data.length
	} else if (isSet || isMap) {
		size = data.size;
	} else {
		size = Object.keys(data).length;
	}

	// Determine whether or not the size of the
	// data surpasses a the parallel processing
	// threshold. The threshold depends on the
	// "expensiveTask" value.
	return size >= (expensiveTask ? 100 : 1000);
}

var data = new Array(138);

console.log('array with expensive task',
	isConcurrent(data, true));
// → array with expensive task true

console.log('array with inexpensive task',
	isConcurrent(data, false));
// → array with inexpensive task false

data = new Set(new Array(100000)
	.fill(null)
	.map((x, i) => i));

console.log('huge set with inexpensive task',
	isConcurrent(data, false));
// → huge set with inexpensive task true
