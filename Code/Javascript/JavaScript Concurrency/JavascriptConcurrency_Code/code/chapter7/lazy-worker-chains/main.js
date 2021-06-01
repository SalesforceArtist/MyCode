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

// Starts our workers...
var worker1 = new Worker('worker.js');
var worker2 = new Worker('worker.js');

// Creates the message channels necessary to communicate
// between the 2 workers.
var channel1 = new MessageChannel();
var channel2 = new MessageChannel();
var channel3 = new MessageChannel();

// Our "update()" coroutine logs worker responses as they're
// delivered.
var update = coroutine(function* () {
	var input;

	while (true) {
		input = yield;
		console.log('result', input.data);
	}
});

// Connects "channel1" and "channel2" using "worker1".
worker1.postMessage(null, [
	channel1.port2,
	channel2.port1
]);

// Connects "channel2" and "channel3" using "worker2".
worker2.postMessage(null, [
	channel2.port2,
	channel3.port1
]);

// Connects our coroutine "update()" to any messages
// received on "channel3".
channel3.port2.addEventListener('message', update);
channel3.port2.start();

// Our input data - an array of numbers.
var array = new Array(25)
	.fill(null)
	.map((v, i) => i * 10);

// Posts each array item to "channel1".
for (let item of array) {
	channel1.port1.postMessage(item);
}
