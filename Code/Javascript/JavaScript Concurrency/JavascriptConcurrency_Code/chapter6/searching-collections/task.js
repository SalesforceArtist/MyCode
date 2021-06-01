'use strict';

// Counts the number of times "item" appears in "collection".
function count(collection, item) {
	var index = 0,
		occurrences = 0;

	while(true) {

		// Find the first index.
		index = collection.indexOf(item, index);

		// If we found something, increment the count, and
		// increment the starting index for the next
		// iteration. If nothing is found, break the loop.
		if (index > -1) {
			occurrences += 1;
			index += 1;
		} else {
			break;
		}
	}

	// Returns the number of occurrences found.
	return occurrences;
}
