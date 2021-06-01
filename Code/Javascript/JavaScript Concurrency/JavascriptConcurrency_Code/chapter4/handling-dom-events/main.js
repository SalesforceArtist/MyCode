'use strict';

// Taken from: http://syzygy.st/javascript-coroutines/
// This utility takes a generator function, and returns
// a coroutine function. Any time the coroutine is invoked,
// it's job is to call "next()" on the generator.
//
// The effect is that the generator function can run
// indefinitely, pausing when it hits "yield" statemenets.
function coroutine(func) {

    // Creates the generator, and moves the function
    // ahead to the first "yield" statement.
    var gen = func();
    gen.next();

    // The "val" is passed to the generator function
    // through the "yield" statement. It then resumes
    // from there, till it hits another yield.
    return function(val) {
        gen.next(val);
    }
}

// Coroutine function that's used with mousemove
// events.
var onMouseMove = coroutine(function* () {
	var e;

	// This loop continues indefinitely. The event
	// object comes in through the yield statement.
	while (true) {
		e = yield;

		// If the element is disabled, do nothing.
		// Otherwise, log a message.
		if (e.target.disabled) {
			continue;
		}

		console.log('mousemove', e.target.textContent);
	}
});

// Coroutine function that's used with click events.
var onClick = coroutine(function* () {

	// Store references to our two buttons. Since
	// coroutines are stateful, they'll always be available.
	var first = document.querySelector('button:first-of-type'),
		second = document.querySelector('button:last-of-type'),
		e;

	while (true) {
		e = yield;

		// Disables the button that was clicked.
		e.target.disabled = true;

		// If the first button was clicked, toggle
		// the state of the second button.
		if (Object.is(e.target, first)) {
			second.disabled = !second.disabled;
			continue;
		}

		// If the second button was clicked, toggle
		// the state of the first button.
		if (Object.is(e.target, second)) {
			first.disabled = !first.disabled;
		}
	}
});

// Sets up the event handlers - our coroutine functions.
for (let button of document.querySelectorAll('button')) {
	button.addEventListener('mousemove', onMouseMove);
	button.addEventListener('click', onClick);
}
