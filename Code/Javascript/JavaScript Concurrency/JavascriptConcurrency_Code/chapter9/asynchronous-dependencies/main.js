'use strict';

var co = require('co');

// A simple user collection.
var users = [
	{ name: 'User1' },
	{ name: 'User2' },
	{ name: 'User3' },
	{ name: 'User4' }
];

co(function* () {

	// The "userID" value is asynchronous, and execution
	// pause at this yield statement till the promise
	// resolves.
	var userID = yield new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(1);
		}, 1000);
	});

	// At this point, we have a "userID" value. This
	// nested co-routine will look up the user based
	// on this ID. We nest co-routines like this because
	// "co()" returns a promise.
	var user = yield co(function* (id) {
		let user = yield new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(users[id]);
			}, 1000);
		});

		// The "co()" promise is resolved with the
		// "user" value.
		return user;
	}, userID);

	console.log(user);
	// → { name: 'User2' }
});
