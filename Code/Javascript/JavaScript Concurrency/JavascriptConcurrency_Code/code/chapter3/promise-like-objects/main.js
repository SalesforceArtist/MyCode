'use strict';

// The "Prmise.resolve()" method can resolve thenable
// objects. This is an object with a "then()" method
// which serves as the executor. This executor will
// randomly resolve or reject the promise.
Promise.resolve({ then: (resolve, reject) => {
	Math.round(Math.random()) ?
		resolve('fulfilled') : reject('rejected');

// This method returns a promise, so we're able
// to setup our fulfilled and rejected callbacks as
// usual.
}}).then((value) => {
	console.log('resolved', value);
}, (reason) => {
	console.error('reason', reason);
});

