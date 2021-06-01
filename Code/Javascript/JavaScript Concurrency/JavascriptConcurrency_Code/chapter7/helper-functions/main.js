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

// Starts our worker...
var worker = new Worker('worker.js');

worker.addEventListener('message', (e) => {

	// Finds the appropriate resolver function.
	var resolver = resolvers[e.data.id];

	// Deletes it from the "resolvers" object.
	delete resolvers[e.data.id];

	// Pass the worker data to the promise by calling
	// the resolver function.
	resolver(e.data.result);
});

// This is our helper function. It handles the posting of
// messages to the worker, and tying the promise to the
// worker responses.
function square(number) {
	return new Promise((resolve, reject) => {

		// The ID that's used to tie together a web worker
		// response, and a resolver function.
		var msgId = id.next().value;

		// Stores the resolver so in can be used later, in
		// the web worker message callback.
		resolvers[msgId] = resolve;

		// Posts the message - the ID and the number argument.
		worker.postMessage({
			id: msgId,
			number: number
		});
	});
}

square(10).then((result) => {
	console.log('square(10)', result);
	// → square(10) 100
});

square(100).then((result) => {
	console.log('square(100)', result);
	// → square(100) 10000
});

square(1000).then((result) => {
	console.log('square(1000)', result);
	// → square(1000) 1000000
});
