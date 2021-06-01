'use strict';

// Returns the "name" of the given user object,
// but only if it's "enabled". This means that
// the function is referentially-transparent if
// the user passed to it never update the
// "enabled" property.
function getName(user) {
	if (user.enabled) {
		return user.name;
	}
}

// Toggles the value of the passed-in "user.enabled"
// property. Functions like these that change the
// state of objects make referential transparency
// difficult to acheive.
function updateUser(user) {
	user.enabled = !user.enabled;
}

// The referentially-transparent version of "updateUser()",
// which doesn't actually update anything. It creates a
// new object with all the same property values as the
// object that was passed in, except for the "enabled"
// property value we're changing.
function updateUserRT(user) {
	return Object.assign({}, user, {
		enabled: !user.enabled
	});
}

// Our user object.
var user = {
	name: 'ES6',
	enabled: false
};

console.log('name when disabled', `"${getName(user)}"`);
// → name when disabled "undefined"

// Mutates the user state. Now passing this object
// to functions means that they're no longer
// referentially-transparent, because they could
// produce different output based on this update.
updateUser(user);

console.log('name when enabled', `"${getName(user)}"`);
// → name when enabled "ES6"

// This appraoch doesn't change anything about "user",
// meaning that any functions that use "user" as input,
// remain referentially-transparent.
var updatedUser = updateUserRT(user);

// We can call referentially-transparent functions at
// any time, and expect to get the same result. When
// there's no side-effects on our data, concurrency gets
// much easier.
setTimeout(() => {
	console.log('still enabled', `"${getName(user)}"`);
	// → still enabled "ES6"
}, 1000);

console.log('updated user', `"${getName(updatedUser)}"`);
// → updated user "undefined"
