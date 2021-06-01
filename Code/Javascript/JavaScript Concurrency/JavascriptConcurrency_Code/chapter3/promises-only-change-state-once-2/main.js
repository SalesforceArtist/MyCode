'use strict';

new Promise((resolve, reject) => {
	resolve('done');
	console.log('executor', 'resolved');
}).then((value) => {
	console.log('then', value);
});

var promise = new Promise((resolve, reject) => {
	resolve('done');
	console.log('executor', 'resolved');
});

promise.then((value) => {
	console.log('then 1', value);
});

setTimeout(() => {
	promise.then((value) => {
		console.log('then 2', value);
	});
}, 1000);
