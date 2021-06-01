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

// Creates an "update()" coroutine that continuously
// updates the UI as results are generated from the
// worker.
var update = coroutine(function* () {
	var input;

	while (true) {
		input = yield;
		console.log('result', input.data);
	}
});

// Creates the worker, and assigns the "update()"
// coroutine as the "message" callback handler.
var worker = new Worker('worker.js');
worker.addEventListener('message', update);

// An array progressively larger numbers.
var array = new Array(10)
	.fill(null)
	.map((v, i) => i * 10000);

// Iterate over the array, passing each number to the
// worker as an individual message.
for (let item of array) {
	worker.postMessage(item);
}
// →
// result 1
// result 100000000
// result 400000000
// result 900000000
// result 1600000000
// result 2500000000
// result 3600000000
// result 4900000000
// result 6400000000
// result 8100000000
