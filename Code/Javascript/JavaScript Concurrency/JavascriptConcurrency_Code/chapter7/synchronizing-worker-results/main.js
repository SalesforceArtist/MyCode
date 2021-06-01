'use strict';

// This will generate unique IDs. We need them to
// map tasks executed by web workers to the larger
// operation that created them.
function* genID() {
	var id = 0;

	while (true) {
		yield id++;
	}
}

// Creates the global "id" generator.
var id = genID();

// This object holds the resolver functions from promises,
// as results com eback from workers, we lok them up here,
// based on ID.
var resolvers = {};

// Keep the original implementation of "postMessage()"
// so we can call it later on, in our custom "postMessage()"
// implementation.
var postMessage = Worker.prototype.postMessage;

// Replace "postMessage()" with our custom implementation.
Worker.prototype.postMessage = function(data) {
	return new Promise((resolve, reject) => {

		// The ID that's used to tie together a web worker
		// response, and a resolver function.
		var msgId = id.next().value;
    
		// Stores the resolver so in can be used later, in
		// the web worker message callback.
		resolvers[msgId] = resolve;

		// Run the original "Worker.postMessage()" implementation,
		// which takes care of actually posting the message
		// to the worker thread.
		postMessage.call(this, Object.assign({
            id: msgId,
		}, data));
	});
};

function onMessage(e) {

	// Finds the appropriate resolver function.
	var resolver = resolvers[e.data.id];

	// Deletes it from the "resolvers" object.
	delete resolvers[e.data.id];

	// Pass the worker data to the promise by calling
	// the resolver function.
	resolver(e.data.value);
}

// Starts our workers...
var worker1 = new Worker('worker.js'),
	worker2 = new Worker('worker.js');

// Create some data to process.
var array = new Array(50000)
	.fill(null)
	.map((v, i) => i);

// Finds the appropriate resolver function to call,
// when the worker responds with data.
worker1.addEventListener('message', onMessage);
worker2.addEventListener('message', onMessage);

// Splits our input data in 2, giving the first half
// to the first worker, and the second half to the
// second worker. At this point, we have two promises.
var promise1 = worker1.postMessage({
	value: array.slice(0, Math.floor(array.length / 2))
});

var promise2 = worker2.postMessage({
	value: array.slice(Math.floor(array.length / 2))
});

// Using "Promise.all()" to synchronize workers is
// much easier than manually trying to reconcile
// through worker callback functions.
Promise.all([ promise1, promise2 ]).then((values) => {
	console.log('reduced', [].concat(...values)
		.reduce((r, v) => r + v));
	// → reduced 41665416675000
});
