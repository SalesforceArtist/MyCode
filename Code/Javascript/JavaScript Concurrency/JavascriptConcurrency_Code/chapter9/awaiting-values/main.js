'use strict';

// We need the "co()" function.
var co = require('co');

// This is the ES7 syntax, where the function is
// marked as "async". Then, the "await" calls
// pause execution till their operands resolve.
(async function() {
	var result;
	result = await Promise.resolve('hello');
	console.log('async result', `"${result}"`);
	// → async result "hello"

	result = await Promise.resolve('world');
	console.log('async result', `"${result}"`);	
	// → async result "world"
}());

// The differences between the ES7 and "co()" are
// subtle, the overall structure is the same. The
// function is a generator, and we pause execution
// by yielding generators.
co(function*() {
	var result;
	result = yield Promise.resolve('hello');
	console.log('co result', `"${result}"`);
	// → co result "hello"

	result = yield Promise.resolve('world');
	console.log('co result', `"${result}"`);
	// → co result "world"
});
