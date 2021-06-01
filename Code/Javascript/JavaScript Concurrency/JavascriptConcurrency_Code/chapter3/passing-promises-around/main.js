'use strict';

// Simple utity to compose a larger function, out
// of smaller functions.
function compose(...funcs) {
	return function(value) {
		var result = value;

		for (let func of funcs) {
			result = func(value);
		}

		return result;
	};
}

// Accepts a promise or a resolved value. If it's a promise,
// it adds a "then()" callback and returns a new promise.
// Otherwise, it performs the "update" and returns the value.
function updateFirstName(value) {
	if (value instanceof Promise) {
		return value.then(updateFirstName);
	}

	console.log('first name', value.first);
	return value;
}

// Works the same way as the above function, except it
// performs a different UI "update".
function updateLastName(value) {
	if (value instanceof Promise) {
		return value.then(updateLastName);
	}

	console.log('last name', value.last);
	return value;
}

// Works the same way as the above function, except it
// performs a different UI "update".
function updateAge(value) {
	if (value instanceof Promise) {
		return value.then(updateAge);
	}

	console.log('age', value.age);
	return value;
}

// A promise object that's resolved with a data object
// after one second.
var promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve({
			first: 'John',
			last: 'Smith',
			age: 37
		});
	}, 1000);
});

// We compose an "update()" function that updates the
// various UI components.
var update = compose(
	updateFirstName,
	updateLastName,
	updateAge
);

// Call our update function with a promise.
update(promise);
