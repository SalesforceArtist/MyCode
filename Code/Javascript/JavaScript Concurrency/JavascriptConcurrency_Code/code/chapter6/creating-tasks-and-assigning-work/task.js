'use strict';

// Simple function that returns the sum
// of the provided arguments.
function sum(...numbers) {
	return numbers
		.reduce((result, item) => result + item);
}
