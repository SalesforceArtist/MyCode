'use strict';

// This generator will keep generating even numbers.
function* genEvens() {

	// The initial value is 2. But this can change based
	// on the input passed to "next()".
	var value = 2,
		input;

	while (true) {

		// We yield the value, and get the input. If input
		// is provided, this will serve as the next value.
		input = yield value;

		if (input) {
			value = input;
		} else {
			// Make sure that the next value is even.
			// Handles the case when an odd value is
			// passed to "next()".
			value += value % 2 ? 1 : 2;
		}
	}

}

// Creates the "evens" generator.
var evens = genEvens(),
	even;

// Iterate over evens up to 10.
while ((even = evens.next().value) <= 10) {
	console.log('even', even);
}
// →
// even 2
// even 4
// even 6
// even 8
// even 10

// Resets the generator. We don't need to
// create a new one.
evens.next(999);

// Iterate over evens between 1000 - 1024.
while ((even = evens.next().value) <= 1024) {
	console.log('evens from 1000', even);
}
// →
// evens from 1000 1000
// evens from 1000 1002
// evens from 1000 1004
// evens from 1000 1006
// evens from 1000 1008
// evens from 1000 1010
// evens from 1000 1012
// evens from 1000 1014
// ...
