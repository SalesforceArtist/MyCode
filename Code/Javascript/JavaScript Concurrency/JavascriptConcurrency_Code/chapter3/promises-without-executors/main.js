'use strict';

// Example function that returns "value" from
// a cache, or "fetchs" it asynchronously.
function getData(value) {
	var cache = getData.cache;

	// If there's no cache for this function, let's
	// reject the promise. Gotta have cache.
	if (!Array.isArray(cache)) {
		return Promise.reject('missing cache');
	}

	// If it exists in the cache, we return
	// a promise that's resolved using the
	// cached value.
	var index = getData.cache.indexOf(value);

	if (index > -1) {
		return Promise.resolve(getData.cache[index]);
	}

	// Otherwise, we have to go "fetch" it. This
	// "resolve()" call would typically be found in
	// a network request callback function.
	return new Promise((resolve) => {
		getData.cache.push(value);
		resolve(value);
	});
}

// Creates the cache.
getData.cache = [];

// Each call to "getData()" is consistent. Even
// when synchronous values are used, they still
// get resolved as promises.
getData('foo').then((value) => {
	console.log('getting foo', `"${value}"`);
}, (reason) => {
	console.error(reason);
});

getData('bar').then((value) => {
	console.log('getting bar', `"${value}"`);
}, (reason) => {
	console.error(reason);
});

getData('foo').then((value) => {
	console.log('getting foo', `"${value}"`);
}, (reason) => {
	console.error(reason);
});
