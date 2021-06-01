'use strict';

// This executor function rejects the promise after
// a timeout of one second. If uses the rejector function
// to change the state, and to provide the rejected
// callbacks with a value.
function executor(resolve, reject) {
	setTimeout(() => {
		reject('Failed');
	}, 1000);
}

// The function used as a rejected callback function. It
// expects a reason for the rejection to be provided.
function rejected(reason) {
	console.error(reason);
}

// Creates the promise, and runs the executor. Uses the
// "catch()" method to assing the rejector callback function.
var promise = new Promise(executor);
promise.catch(rejected);
