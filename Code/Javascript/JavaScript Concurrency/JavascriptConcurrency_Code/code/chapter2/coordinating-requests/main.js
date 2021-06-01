'use strict';

// The function that's called when a response arraives,
// it's also responsible for coordinating responses.
function onLoad() {

	// When the response is ready, we push the parsed
	// response onto the "responses" array, so that we
	// can use responses later on when the rest of them
	// arrive.
	responses.push(JSON.parse(this.responseText));

	// Have all the respected responses showed up yet?
	if (responses.length === 3) {
		// How we can do whatever we need to, in order
		// to render the UI component because we have
		// all the data.
		for (let response of responses) {
			console.log('hello', response.hello);
		}
	}
}

// Creates our API request instances, and a "responses"
// array used to hold out-of-sync responses.
var req1 = new XMLHttpRequest(),
	req2 = new XMLHttpRequest(),
	req3 = new XMLHttpRequest(),
	responses = [];

// Issue network requests for all our network requests.
for (let req of [ req1, req2, req3 ]) {
	req.addEventListener('load', onLoad);

	req.open('get', 'api.json');
	req.send();
}

