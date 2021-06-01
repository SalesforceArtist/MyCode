'use strict';

// Creates a timer that calls our function in no less
// than 300MS. We can use the "console.time()" and the
// "console.timeEnd()" functions to see how long it actually
// takes.
//
// This is typically around 301MS, which isn't at all noticeable
// by the user, but is unreliable for accurately scheduling function
// calls.
var timer = setTimeout(() => {
	console.timeEnd('setTimeout');
}, 300);

console.time('setTimeout');
