'use strict';

// An asynchronous "fetch" function. We use "setTimeout()"
// to pass "callback()" some data after 1 second.
function fetchAsync(callback) {
	setTimeout(() => {
		callback({ hello: 'world' });
	}, 1000);
}

// The synchronous fetch simply returns the data.
function fetchSync() {
	return { hello: 'world' };
}

// A promise for the "fetchAsync()" call. We pass the
// "resolve" function as the callback.
var asyncPromise = new Promise((resolve, reject) => {
	fetchAsync(resolve);
});

// A promise for the "fetchSync()" call. This promise
// is resolved immediately with the return value.
var syncPromise = new Promise((resolve, reject) => {
	resolve(fetchSync());
});

// Creates a promise that'll wait for two promises
// to complete before resolving. This allows us
// to seamlessly mix synchronous and asynchronous
// values.
Promise.all([ asyncPromise, syncPromise ]).then((results) => {
	var [ asyncResult, syncResult ] = results;

	console.log('async', asyncResult);
	// → async { hello: 'world' }

	console.log('sync', syncResult);
	// → sync { hello: 'world' }
});
