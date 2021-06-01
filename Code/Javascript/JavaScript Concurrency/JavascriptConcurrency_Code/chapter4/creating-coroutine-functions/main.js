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

// Creates a coroutine function that when called,
// advances to the next yield statement.
var coFirst = coroutine(function* () {
	var input;

	// Input comes from the yield statement, and is
	// the argument value passed to "coFirst()".
	input = yield;
	console.log('step1', input);
	input = yield;
	console.log('step3', input);
});

// Works the same as the coroutine created above...
var coSecond = coroutine(function* () {
	var input;
	input = yield;
	console.log('step2', input);
	input = yield;
	console.log('step4', input);
});

// The two coroutines cooperating with one another,
// to produce the expected output. We can see that
// the second call to each coroutine picks up where
// the last yield statement left off.
coFirst('the money');
coSecond('the show');
coFirst('get ready');
coSecond('go');
// →
// step1 the money
// step2 the show
// step3 get ready
// step4 go
