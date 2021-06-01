'use strict';

// A basic generator function that yields
// sequential values.
function* gen() {
	yield 'first';
	yield 'second';
	yield 'third';
}

// Creates the geneator.
var generator = gen();

// Loop till the sequence is finished.
while(true) {

	// Gets the next item from the sequence.
	let item = generator.next();

	// Is there a next value, or are we done?
	if (item.done) {
		break;
	}

	console.log('while', item.value);
}

// Creates the generator.
generator = gen();

// The "for..of" loop removes the need to explicitly
// call generator constructs, like "next()", "value",
// and "done".
for (let item of generator) {
	console.log('for..of', item);
}
