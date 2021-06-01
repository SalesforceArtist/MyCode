'use strict';

// Eat some CPU cycles...
// Taken from http://adambom.github.io/parallel.js/
function work(n) {
    var i = 0;
    while (++i < n * n) {}
    return i;
}

// Respond to the main process with the result of
// calling "work()" and the message ID.
process.on('message', (message) => {
	process.send({
		id: message.id,
		output: work(message.input)
	});
});
