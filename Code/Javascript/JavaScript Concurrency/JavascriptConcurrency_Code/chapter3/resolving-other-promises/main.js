'use strict';

// Keeps a list of resolver functions.
var resolvers = [];

// Creates 5 new promises, and in each executor
// function, the resolver is pushed onto the
// "resolvers" array. We also give each promise
// a fulfillment callback.
for (let i = 0; i < 5; i++) {
	new Promise((resolve) => {
		resolvers.push(resolve);
	}).then((value) => {
		console.log(`resolved ${i + 1}`, value);
	});
}

// Sets a timeout that runs the function after 2
// seconds. When it runs, we iterate over every
// resolver function in the "resolvers" array,
// and we call it with a value.
setTimeout(() => {
	for (let resolver of resolvers) {
		resolver(true);
	}
}, 2000);
