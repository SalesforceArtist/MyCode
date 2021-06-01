'use strict';

// Generator functions use an asterisk to
// denote a that a generator instance is returned.
// We can return values from generators, but instead
// of the caller getting that value, they'll always
// get a generator instance.
function* gen() {
	return 'hello world';
}

// Creates the generator instance.
var generator = gen();

// Let's see what this looks like.
console.log('generator', generator);
// → generator Generator

// Here's how we get the return value. Looks awkward,
// because we would never use a generator function
// that simply returns a single value.
console.log('return', generator.next().value);
// → return hello world
