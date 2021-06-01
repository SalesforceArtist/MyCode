'use strict';

// Eat some CPU cycles...
// Taken from http://adambom.github.io/parallel.js/
function work(n) {
	var i = 0;
	while (++i < n * n) {}
	return i;
}

// There's no handlers in the queue, so this is
// executed immediately.
process.nextTick(() => {
	console.log('first handler');
});

// The previous handler was quick to exit, so this
// handler is executed without delay.
process.nextTick(() => {
	console.log('second handler');
});

// Starts immediately because the previous handler
// exited quickly. However, this handler executes
// some CPU intensive code.
process.nextTick(() => {
	console.log('hogging the CPU...');
	work(100000);
});

// This handler isn't run immediately, because the
// handler before this one takes a while to complete.
process.nextTick(() => {
	console.log('blocked handler');
});

