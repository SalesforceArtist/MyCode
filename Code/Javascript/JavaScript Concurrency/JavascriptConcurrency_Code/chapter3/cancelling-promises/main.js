'use strict';

// The resolver function used to cancel data requests.
var cancelResolver;

// A simple "constant" value, used to resolved cancel
// promises.
var CANCELLED = {};

// Our UI components.
var buttonLoad = document.querySelector('button.load'),
	buttonCancel = document.querySelector('button.cancel');

// Requests data, returns a promise.
function getDataPromise() {

	// Creates the cancel promise. The executor assigns
	// the "resolve" function to "cancelResolver", so
	// it can be called later.
	var cancelPromise = new Promise((resolve) => {
		cancelResolver = resolve;
	});

	// The actual data we want. This would normally be
	// an HTTP request, but we're simulating one here
	// for brevity using setTimeout().
	var dataPromise = new Promise((resolve) => {
		setTimeout(() => {
			resolve({ hello: 'world' });
		}, 3000);
	});

	// The "Promise.race()" method returns a new promise,
	// and it's resolved with whichever input promise is
	// resolved first.
	return Promise.race([
		cancelPromise,
		dataPromise
	]);
}

// When the cancel button is clicked, we use the
// "cancelResolver()" function to resolve the
// cancel promise.
buttonCancel.addEventListener('click', () => {
	cancelResolver(CANCELLED);
});

// When the load button is clicked, we make a request
// for data using "getDataPromise()".
buttonLoad.addEventListener('click', () => {
	buttonLoad.disabled = true;

	getDataPromise().then((value) => {
		buttonLoad.disabled = false

		// The promise was resolved, but it was because the
		// user cancelled the request. So we exit here by
		// returning the CANCELLED "constant". Otherwise,
		// we have data to work with.
		if (Object.is(value, CANCELLED)) {
			return value;
		}

		console.log('loaded data', value);
	});
});

