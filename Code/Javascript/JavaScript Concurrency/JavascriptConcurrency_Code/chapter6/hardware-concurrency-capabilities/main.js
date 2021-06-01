'use strict';

// Returns the the ideal number of web workers
// to create.
function getConcurrency(defaultLevel = 4) {

	// If the "navigator.hardwareConcurrency" property
	// exists, we use that. Otherwise, we return the
	// "defaultLevel" value, which is a sane guess
	// at the actual hardware concurrency level.
	return Number.isInteger(navigator.hardwareConcurrency) ?
		navigator.hardwareConcurrency : defaultLevel;
}

console.log('concurrency level', getConcurrency());
// → concurrency level 8
