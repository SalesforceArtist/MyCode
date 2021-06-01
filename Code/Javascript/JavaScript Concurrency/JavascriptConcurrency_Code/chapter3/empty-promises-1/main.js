'use strict';

// This promise is able to run the executor
// function without issue. The "then()" callback
// is never executed.
new Promise(() => {
	console.log('executing promise');
}).then(() => {
	console.log('never called');
});

// At this point, we have no idea what's
// wrong with the promise.
console.log('finished executing, promise hangs');
