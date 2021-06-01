'use strict';

// A generic event callback, logs the event timestamp.
function onClick(e) {
	console.log('click', new Date(e.timeStamp));
}

// The element we're going to use as the event
// target.
var button = document.querySelector('button');

// Setup our "onClick" function as the
// event listener for "click" events on this target.
button.addEventListener('click', onClick);

// In addition to users licking the button, the
// EventTarget interface lets us manually dispatch
// events.
button.dispatchEvent(new Event('click'));

