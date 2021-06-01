'use strict';

// This function yields values, in order. There's no
// container structure, like an array. Instead, each time
// the yield statement is called, control is yielded
// back to the caller, and the position in the function
// is bookmarked.
function* gen() {
	yield 'first';
	yield 'second';
	yield 'third';
}

var generator = gen();

// Each time we call "next()", control is passed back
// to the generator function's execution context. Then,
// the generator looks up the bookmark for where it
// last yielded control.
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
