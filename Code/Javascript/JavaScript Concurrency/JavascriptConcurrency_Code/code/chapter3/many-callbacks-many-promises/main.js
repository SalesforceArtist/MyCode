'use strict';

// Creates a new promise that's ramdomly resolved or
// rejected.
new Promise((resolve, reject) => {
	Math.round(Math.random()) ?
		resolve('fulfilled') : reject('rejected');
}).then((value) => {
	// Called when the original promise is resolved,
	// returns the value in case there's another
	// promise chained to this one.
	console.log('then 1', value);
	return value;
}).catch((reason) => {
	// Chained to the second promise, called
	// when it's rejected.
	console.error('catch 1', reason);
}).then((value) => {
	// Chained to the third promise, gets the
	// value as expected, and returns it for any
	// downstream promise callbacks to consume.
	console.log('then 2', value);
	return value;
}).catch((reason) => {
	// This is never called - rejections do not
	// proliferate through promise chains.
	console.error('catch 2', reason)
});

