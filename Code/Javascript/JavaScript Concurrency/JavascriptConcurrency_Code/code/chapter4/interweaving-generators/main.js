'use strict';

// Utility function that converts the input array to a
// generator by yielding each of it's values. If its
// not an array, it assumes it's already a generator
// and defers to it.
function* toGen(array) {
	if (Array.isArray(array)) {
		for (let item of array) {
			yield item;
		}
	} else {
		yield* array;
	}
}

// Interweaves the given data sources (arrays or
// generators) into a single generator source.
function* weave(...sources) {

	// This controls the "while" loop. As long as
	// there's a source that's yielding data, the
	// while loop is still valid.
	var yielding = true;

	// We have to make sure that each of our
	// sources is a generator.
	var generators = sources.map((source) => {
		return toGen(source);
	});

	// Starts the main weaving loop. It makes it's
	// way through each source, yielding one item
	// from each, then starting over, till every
	// source is empty.
	while (yielding) {
		yielding = false;

		for (let source of generators) {
			let next = source.next();

			// As long as we're yielding data, the
			// "yielding" value is true, and the
			// "while" loop continues. As soon as
			// "done" is true for every source, the
			// "yielding" variable stays false, and
			// the "while loop exits.
			if (!next.done) {
				yielding = true;
				yield next.value;
			}
		}
	}
}

// A basic filter that generates values by
// iterating over the given source, and yielding items
// that are not disabled.
function* enabled(source) {
	for (let item of source) {
		if (!item.disabled) {
			yield item;
		}
	}
}

// These are the two data sources we want to weave
// together into one generator, which can then be
// filtered by another generator.
var enrolled = [
	{ name: 'First' },
	{ name: 'Sencond' },
	{ name: 'Third', disabled: true }
];

var pending = [
	{ name: 'Fourth' },
	{ name: 'Fifth' },
	{ name: 'Sixth', disabled: true }
];

// Creates the generator, which yields user objects
// from two data sources.
var users = enabled(weave(enrolled, pending));

// Actually performs the weaving and filtering.
for (let user of users) {
	console.log('name', `"${user.name}"`);	
}
