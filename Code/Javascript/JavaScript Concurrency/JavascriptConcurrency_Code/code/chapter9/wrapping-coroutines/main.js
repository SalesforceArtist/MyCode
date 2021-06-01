'use strict';

var co = require('co');

// A simple user collection.
var users = [
	{ name: 'User1' },
	{ name: 'User2' },
	{ name: 'User3' },
	{ name: 'User4' }
];

// The "getUser()" function will create a new
// co-routine whenever it's called, forwarding
// any arguments as well.
var getUser = co.wrap(function* (id) {
	let user = yield new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(users[id]);
		}, 1000);
	});

	// The "co()" promise is resolved with the
	// "user" value.
	return user;
});

co(function* () {

	// The "userID" value is asynchronous, and execution
	// pause at this yield statement till the promise
	// resolves.
	var userID = yield new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(1);
		}, 1000);
	});

	// Instead of a nested co-routine, we have a function
	// that can now be used elsewhere.
	var user = yield getUser(userID);

	console.log(user);
	// → { name: 'User2' }
});
