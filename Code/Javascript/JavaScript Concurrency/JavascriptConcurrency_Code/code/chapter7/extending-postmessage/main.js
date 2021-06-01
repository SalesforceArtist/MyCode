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

// Starts our worker...
var worker = new Worker('worker.js');

worker.addEventListener('message', (e) => {

	// Finds the appropriate resolver function.
	var resolver = resolvers[e.data.id];

	// Deletes it from the "resolvers" object.
	delete resolvers[e.data.id];

	// Pass the worker data to the promise by calling
	// the resolver function.
	resolver(e.data.value);
});

worker.postMessage({
	action: 'echo',
	value: 'Hello World'
}).then((value) => {
	console.log('echo', `"${value}"`);
	// → echo "Hello World"
});

worker.postMessage({
	action: 'upper',
	value: 'Hello World'
}).then((value) => {
	console.log('upper', `"${value}"`);
	// → upper "HELLO WORLD"
});

worker.postMessage({
	action: 'lower',
	value: 'Hello World'
}).then((value) => {
	console.log('lower', `"${value}"`);
	// → lower "hello world"
});
