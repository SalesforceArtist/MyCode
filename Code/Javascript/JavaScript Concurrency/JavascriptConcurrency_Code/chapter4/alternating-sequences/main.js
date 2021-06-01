'use strict';

// A generic generator that will infinately iterate
// over the provided arguments, yielding each item.
function* alternate(...seq) {
	while (true) {
		for (let item of seq) {
			yield item;
		}
	}
}

// Create a generator that alternates between
// the provided arguments.
var alternator = alternate(true, false);

console.log('true/false', alternator.next().value);
console.log('true/false', alternator.next().value);
console.log('true/false', alternator.next().value);
console.log('true/false', alternator.next().value);
// →
// true/false true
// true/false false
// true/false true
// true/false false

// Create a new generator instance, with new values
// to alternate with each iteration.
alternator = alternate('one', 'two', 'three');

// Gets the first 10 items from the infinite sequence.
for (let i = 0; i < 10; i++) {
	console.log('one/two/three',
		`"${alternator.next().value}"`);
}
// →
// one/two/three "one"
// one/two/three "two"
// one/two/three "three"
// one/two/three "one"
// one/two/three "two"
// one/two/three "three"
// one/two/three "one"
// one/two/three "two"
// one/two/three "three"
// one/two/three "one"
