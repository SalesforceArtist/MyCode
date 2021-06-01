'use strict';

// Creates a promise that's resolved immediately, and
// is stored in "promise1".
var promise1 = new Promise((resolve, reject) => {
	resolve('fulfilled');
});

// Use the "then()" method of "promise1" to create a
// new promise instance, which is stored in "promise2".
var promise2 = promise1.then((value) => {
	console.log('then 1', value);
	// → then 1 fulfilled
	return value;
});

// Create a "then()" callback for "promise2". This actually
// creates a third promise instance, but we don't do anything
// with it.
promise2.then((value) => {
	console.log('then 2', value);
	// → then 2 undefined
});

// Make sure that "promise1" and "promise2" are in fact
// different objects.
console.log('equal', promise1 === promise2);
// → equal false
