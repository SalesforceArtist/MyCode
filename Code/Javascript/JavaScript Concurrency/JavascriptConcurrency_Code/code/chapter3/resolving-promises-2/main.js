'use strict';

// The executor function used by our promise.
// Sets a timeout that calls "resolve()" one second
// after the promise is created. It's resolving
// a string value - "done!".
function executor(resolve) {
	setTimeout(() => {
		resolve('done!');
	}, 1000);
}

// The fulfillment callback for our promise accepts
// a value argument. This is the value that's passed
// to the resolver.
function fulfilled(value) {
	console.log('resolved', value);
}

// Create our promise, providing the executor and
// fulfillment function callbacks.
var promise = new Promise(executor);
promise.then(fulfilled);
