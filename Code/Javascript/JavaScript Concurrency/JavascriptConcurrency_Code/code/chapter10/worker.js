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

var rejectors = {};

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

		rejectors[msgId] = reject;

		// Run the original "Worker.postMessage()" implementation,
		// which takes care of actually posting the message
		// to the worker thread.
		postMessage.call(this, Object.assign({
            msgId: msgId,
		}, data));
	});
};

// Starts our worker...
var api = new Worker('ui-api.js');

// Resolves the promise that was returned by
// "postMessage()" when the worker responds.
api.addEventListener('message', (e) => {

	// If the data is in an error state, then
	// we want the rejector function, and we call
	// that with the error. Otherwise, call the
	// regular resolver function with the data returned
	// from the worker.
	var source = e.data.error ? rejectors : resolvers,
		callback = source[e.data.msgId],
		data = e.data.error ? e.data.error : e.data;

	callback(data);

	// Don't need'em, delete'em.
	delete resolvers[e.data.msgId];
	delete rejectors[e.data.msgId];
});
