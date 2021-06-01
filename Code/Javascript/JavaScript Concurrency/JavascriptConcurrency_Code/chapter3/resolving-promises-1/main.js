'use strict';

// The executor function used by our promise.
// The first argument is the resolver function,
// which is called in 1 second to resolve the promise.
function executor(resolve) {
	setTimeout(resolve, 1000);
}

// The fulfillment callback for our promise. This
// simply stos the fullfillment timer that was
// started after our executor function was run.
function fulfilled() {
	console.timeEnd('fulfillment');
}

// Creates the promise, which will run the executor
// function immediately. Then we start a timer to see
// how long it takes for our fulfillment function to
// be called.
var promise = new Promise(executor);
promise.then(fulfilled);
console.time('fulfillment');
