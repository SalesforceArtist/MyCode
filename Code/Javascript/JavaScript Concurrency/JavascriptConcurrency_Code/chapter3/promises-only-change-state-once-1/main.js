'use strict';

// This executor function attempts to resolve the
// promise twice, but the fulfilled callback is
// only called once.
new Promise((resolve, reject) => {
	resolve('fulfilled');
	resolve('fulfilled');
}).then((value) => {
	console.log('then', value);
});

// This executor function attempts to reject the
// promise twice, but the rejected callback is
// only called once.
new Promise((resolve, reject) => {
	reject('rejected');
	reject('rejected');
}).catch((reason) => {
	console.error('reason');
});
