'use strict';

// Creates 5 promises that log when they're
// executing, and when they're reacting to a
// resolved value.
for (let i = 0; i < 5; i++) {
	new Promise((resolve) => {
		console.log('executing promise');
		resolve(i);
	}).then((value) => {
		console.log('resolved', i);
	});
}

// This is called before any of the fuifilled
// callbacks, because this call stack job needs
// to complete before the interpreter reaches into
// the promise resolution callback queue, where
// the 5 "then()" callbacks are currently sitting.
console.log('done executing');

// →
// executing promise
// executing promise
// ...
// done executing
// resolved 1
// resolved 2
// ...
