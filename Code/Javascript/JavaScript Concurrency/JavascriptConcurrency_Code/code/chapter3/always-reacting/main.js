'use strict';

// Extends the promise prototype with an "always()"
// method. The given function will always be called,
// whether the promise is fulfilled or rejected.
Promise.prototype.always = function(func) {
	return this.then(func, func);
};

// Creates a promise that's randomly resolved or
// rejected.
var promise = new Promise((resolve, reject) => {
	Math.round(Math.random()) ?
		resolve('fulfilled') : reject('rejected');
});

// Give the promise fulfillment and rejection callbacks.
promise.then((value) => {
	console.log(value);
}, (reason) => {
	console.error(reason);
});

// This callback is always called after the one of
// the callbacks above.
promise.always((value) => {
	console.log('cleaning up...');
});
