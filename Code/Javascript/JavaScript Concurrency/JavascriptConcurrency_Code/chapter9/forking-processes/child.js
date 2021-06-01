'use strict';

// Eat some CPU cycles...
// Taken from http://adambom.github.io/parallel.js/
function work(n) {
    var i = 0;
    while (++i < n * n) {}
    return i;
}

// The "message" event is emitted when the parent
// process sends a message. We then respond with
// the result of performing expensive CPU operations.
process.on('message', (message) => {
	process.send(work(message));
});
