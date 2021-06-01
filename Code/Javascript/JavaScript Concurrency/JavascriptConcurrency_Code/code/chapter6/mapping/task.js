'use strict';

// A basic mapping that "plucks" the given
// "prop" from each item in the array.
function pluck(array, prop) {
	return array.map((x) => x[prop]);
}

// Returns the result of reducing the sum
// of the array items.
function sum(array) {
	return array.reduce((r, v) => r + v);
}
