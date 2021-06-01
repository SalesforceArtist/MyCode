'use strict';

// Taken from: http://syzygy.st/javascript-coroutines/
// This utility takes a generator function, and returns
// a coroutine function. Any time the coroutine is invoked,
// it's job is to call "next()" on the generator.
//
// The effect is that the generator function can run
// indefinitely, pausing when it hits "yield" statemenets.
function coroutine(func) {

	// Creates the generator, and moves the function
	// ahead to the first "yield" statement.
	var gen = func();
	gen.next();

	// The "val" is passed to the generator function
	// through the "yield" statement. It then resumes
	// from there, till it hits another yield.
	return function(val) {
		gen.next(val);
	}
}

// An array of promises.
var promises = [];

// Our resolution callback is a coroutine. This means
// that evey time it's called, a new resolved promise
// value shows up here.
var onFulfilled = coroutine(function* () {
	var data;

	// Continue to process resolved promise values
	// as they arrive.
	while (true) {
		data = yield;
		console.log('data', data);
	}
});

// Create 5 promises that resolve at random times,
// between 1 and 5 seconds.
for (let i = 0; i < 5; i++) {
	promises.push(new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(i);
		}, Math.floor(Math.random() * (5000 - 1000)) + 1000);
	}));
}

// Attach our fulfillment coroutine as a "then()" callback.
for (let promise of promises) {
	promise.then(onFulfilled);
}
