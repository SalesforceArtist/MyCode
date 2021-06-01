'use strict'

// Generator that maps a collection of objects
// to a specific property name.
function* iteratePropertyValues(collection, property) {
	for (let object of collection) {
		yield object[property];
	}
}

// Generator that yields each value of the given object.
function* iterateObjectValues(collection) {
	for (let key of Object.keys(collection)) {
		yield collection[key];
	}
}

// Generator that yields each item from the given array.
function* iterateArrayElements(collection) {
	for (let element of collection) {
		yield element;
	}
}

// This generator defers to other generators. But first,
// it executes some logic to determine the best strategy.
function* iterateNames(collection) {

	// Are we dealing with an array?
	if (Array.isArray(collection)) {

		// This is a heuristic where we check the first element
		// of the array. Based on what's there, we make
		// assumptions about the remaining elements.
		let first = collection[0];

		// Here is where we defer to other more specialized
		// generators, based on what we find out about the
		// first array element.
		if (first.hasOwnProperty('name')) {
			yield* iteratePropertyValues(collection, 'name');
		} else if (first.hasOwnProperty('customerName')) {
			yield* iteratePropertyValues(collection, 'customerName');
		} else {
			yield* iterateArrayElements(collection);
		}
	} else {
		yield* iterateObjectValues(collection);
	}
}

var collection;

// Iterates over an array of string names.
collection = [ 'First', 'Second', 'Third' ];

for (let name of iterateNames(collection)) {
	console.log('array element', `"${name}"`);
}

// Iterates over an object, where the names
// are the values - the keys aren't relevant here.
collection = {
	first: 'First',
	second: 'Second',
	third: 'Third'
};

for (let name of iterateNames(collection)) {
	console.log('object value', `"${name}"`);
}

// Iterates over the "name" property of each object
// in the collection.
collection = [
	{ name: 'First' },
	{ name: 'Second' },
	{ name: 'Third' }
];

for (let name of iterateNames(collection)) {
	console.log('property value', `"${name}"`);
}
