'use strict';

// Keeps track of the number of "mousemove" events.
var events = 0;

// The "debounce()" takes the provided "func" an limits
// the frequency at which it is called using "limit"
// milliseconds.
function debounce(func, limit) {
	var timer;

	return function debounced(...args) {
		// Remove any existing timers.
		clearTimeout(timer);

		// Call the function after "limit" milliseconds.
		timer = setTimeout(() => {
			timer = null;
			func.apply(this, args);
		}, limit);
	};
}

// Logs some information about the mouse event. Also log
// the total number of events.
function onMouseMove(e) {
	console.log(`X ${e.clientX} Y ${e.clientY}`);
	console.log('events', ++events);
}

// Log what's being typed into the text input.
function onInput(e) {
	console.log('input', e.target.value);
}

// Listen to the "mousemove" event using the debounced version
// of the "onMouseMove()" function. If we didn't wrap this callback
// with "debounce()"
window.addEventListener('mousemove', debounce(onMouseMove, 300));

// Listen to the "input" event using the debounced version
// of the "onInput()" function to prevent triggering events
// on every keystroke.
document.querySelector('input')
	.addEventListener('input', debounce(onInput, 250));

