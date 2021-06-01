'use strict';

// A generic function used to fetch resources
// from the server, returns a promise.
function get(path) {
	return new Promise((resolve, reject) => {
		var request = new XMLHttpRequest();

		// The promise is resolved with the parsed
		// JSON data when the data is loaded.
		request.addEventListener('load', (e) => {
			resolve(JSON.parse(e.target.responseText));
		});

		// When there's an error with the request, the
		// promise is rejected with the appropriate reason.
		request.addEventListener('error', (e) => {
			reject(e.target.statusText || 'unknown error');
		});

		// If the request is aborted, we simply resolve the
		// request.
		request.addEventListener('abort', resolve);

		request.open('get', path);
		request.send();
	});
}

// We can attach our "then()" handler directly
// to "get()" since it returns a promise. The
// value used here was a true asynchronous operation
// that had to go fetch a remote value, and parse it,
// before resolving it here.
get('api.json').then((value) => {
	console.log('hello', value.hello);
});

