'use strict';

// Callback for successful network request,
// parses JSON data.
function onLoad(e) {
	console.log('load', JSON.parse(this.responseText));
}

// Callback for problematic network request,
// logs error.
function onError() {
	console.error('network', this.statusText || 'unknown error');
}

// Callback for a cancelled network request,
// logs warning.
function onAbort() {
	console.warn('request aborted...');
}

var request = new XMLHttpRequest();

// Uses the "EventTarget" interface to attach event listeners,
// for each of the potential conditions.
request.addEventListener('load', onLoad);
request.addEventListener('error', onError);
request.addEventListener('abort', onAbort);

// Sends a "GET" request for "api.json".
request.open('get', 'api.json');
request.send();
