'use strict';

var child_process = require('child_process');

// Forks our "worker" process and creates a "resolvers"
// object to store our promise resolvers.
var worker = child_process.fork(`${__dirname}/worker`),
	resolvers = {};

// When the worker response with a message, pass
// the message output to the appropriate resolver.
worker.on('message', (message) => {
	resolvers[message.id](message.output);
	delete resolvers[message.id];	
});

// IDs are used to map responses from the worker process
// to the promise resolver functions.
function* genID() {
	var id = 0;

	while (true) {
		yield id++;
	}
}

var id = genID();

// This function sends the given "input" to the worker,
// and returns a promise. The promise is resolved with
// the return value of the worker.
function send(input) {
	return new Promise((resolve, reject) => {
		var messageID = id.next().value;

		// Store the resolver function in the "resolvers"
		// map.
		resolvers[messageID] = resolve;

		// Sends the "messageID" and the "input" to the
		// worker.
		worker.send({
			id: messageID,
			input: input
		});
	});
}

var array;

// Builds an array of numbers to send to the worker
// individually for processing.
array = new Array(100)
	.fill(null)
	.map((v, i) => (i + 1) * 100);

// Sends each number in "array" to the worker process
// as a message. When each promise is resolved, we can
// reduce the results.
var first = Promise.all(array.map(send)).then((results) => {
	console.log('first result', 
		results.reduce((r, v) => r + v));
	// → first result 3383500000
});

// Creates a smaller array, with smaller numbers - it should
// take less time to process than the previous array.
array = new Array(50)
	.fill(null)
	.map((v, i) => (i + 1) * 10);

// Process the second array, log the reduced result.
var second = Promise.all(array.map(send)).then((results) => {
	console.log('second result',
		results.reduce((r, v) => r + v));
	// → second result 4292500
});

// When both arrays have finished being processed, we need
// to kill the worker in order to exit our program.
Promise.all([ first, second ]).then(() => {
	worker.kill();
});
