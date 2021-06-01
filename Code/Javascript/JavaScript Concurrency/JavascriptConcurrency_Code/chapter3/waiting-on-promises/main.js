'use strict';

// Utility to send a "GET" HTTP request, and return
// a promise that's resolved with the parsed response.
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

// For our request promises.
var requests = [];

// Issues 5 API requests, and places the 5 corresponding
// promises in the "requests" array.
for (let i = 0; i < 5; i++) {
	requests.push(get('api.json'));
}

// Using "Promise.all()" let's us pass in an array of
// promises, returning a new promise that's resolved
// when all promises resolve. Our callback gets an array
// of resolved values that correspond to the promises.
Promise.all(requests).then((values) => {
	console.log('first', values.map(x => x[0]));
	console.log('second', values.map(x => x[1]));
});
