'use strict';

// This promise executor will ramdomly resolve
// or reject the promise.
function executor(resolve, reject) {
	cnt++;
	Math.round(Math.random()) ?
		resolve(`fulfilled promise ${cnt}`) :
		reject(`rejected promise ${cnt}`);
}

// Make "log()" and "error()" functions for easy
// callback functions.
var log = console.log.bind(console),
	error = console.error.bind(console),
	cnt = 0;

// Creates a promise, then assigns the error
// callback via the "catch()" method.
new Promise(executor).then(log).catch(error);

// Creates a promise, then assigns the error
// callback via the "then()" method.
new Promise(executor).then(log, error);
