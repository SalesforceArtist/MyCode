'use strict';

// Generates an infinite Fibonacci sequence.
function* fib() {
	var seq = [ 0, 1 ],
		next;

	// This loop doesn't actually run infinitely,
	// only as long as items from the sequence
	// are requested using "next()".
	while (true) {

		// Yields the next item in the sequence.
		yield (next = seq[0] + seq[1]);

		// Stores state necessary to compute the
		// item in the next iteration.
		seq[0] = seq[1];
		seq[1] = next;
	}
}

// Launch the generator. This will never be "done"
// generating values. However, it's lazy - it only
// generates what we ask for.
var generator = fib();

// Gets the first 5 items of the sequence.
for (let i = 0; i < 5; i++) {
	console.log('item', generator.next().value);
}
