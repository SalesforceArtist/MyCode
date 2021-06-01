'use strict';

// This generator will keep keep iterating, as
// long as "next()" is called. It's expecting
// a value as well, so that it can call the
// "iteratee()" function on it, and yield the
// result.
function* genMapNext(iteratee) {
	var input = yield null;

	while (true) {
		input = yield iteratee(input);
	}	
}

// Our array of values we want to map.
var array = [ 'a', 'b', 'c', 'b', 'a' ];

// A "mapper" generator. We pass an iteratee
// function as an argument to "genMapNext()".
var mapper = genMapNext(x => x.toUpperCase());

// Our starting point for the reduction.
var reduced = {};

// We have to call "next()" to bootstrap the
// generator. 
mapper.next();

// Now we can start iterating over the array.
// The "mapped" value is yielded from the
// generator. The value we want mapped is fed
// into the generator by passing it to "next()".
for (let item of array) {
	let mapped = mapper.next(item).value;

	// Our reduction logic takes the mapped value,
	// and adds it to the "reduced" object, counting
	// the number of duplicate keys.
	if (reduced.hasOwnProperty(mapped)) {
		reduced[mapped]++;
	} else {
		reduced[mapped] = 1;
	}
}

console.log('reduced', reduced);
// → reduced { A: 2, B: 2, C: 1 }

// This generator is a more useful mapper than
// "genMapNext()" because it doesn't rely on values
// coming into the generator through "next()".
//
// Instead, this generator accepts an iterable, and
// an iteratee function. The iterable is then
// iterated-over, and the result of the iteratee
// is yielded.
function* genMap(iterable, iteratee) {
	for (let item of iterable) {
		yield iteratee(item);
	}
}

// Creates our "mapped" generator, using an iterable
// data source, and an iteratee function.
var mapped = genMap(array, x => x.toUpperCase());
var reduced = {}

// Now we can simply iterate over our genrator, instead
// of calling "next()". The job of each loop iteration
// is to perform the reduction logic, instead of having
// to call "next()".
for (let item of mapped) {
	if (reduced.hasOwnProperty(item)) {
		reduced[item]++;
	} else {
		reduced[item] = 1;
	}
}

console.log('reduce improved', reduced);
// → reduce improved { A: 2, B: 2, C: 1 }

// This function composes a generator
// function out of iteratees. The idea is to create
// a generator for each iteratee, so that each item
// from the original iterable, flows down, through
// each iteratee, before mapping the next item.
function composeGenMap(...iteratees) {

	// We're returning a generator function. That way,
	// the same mapping composition can be used on
	// several iterables, not just one.
	return function* (iterable) {

		// Creates the generator for each iteratee
		// passed to the function. The next generator
		// gets the previous generator as the "iterable"
		// argument.
		for (let iteratee of iteratees) {
			iterable = genMap(iterable, iteratee);
		}

		// Simply defer to the last iterable we created.
		yield* iterable;
	}
}

// Our iterable data source.
var array = [ 1, 2, 3 ];

// Creates a "composed" mapping generator, using 3
// iteratee functions.
var composed = composeGenMap(
	x => x + 1,
	x => x * x,
	x => x - 2
);

// Now we can iterate over the composed generator,
// passing it our iterable, and lazily mapping
// values.
for (let item of composed(array)) {
	console.log('composed', item)
}
// →
// composed 2
// composed 7
// composed 14


