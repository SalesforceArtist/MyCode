'use strict';

// We need the "child_process" to fork new
// node processes.
var child_process = require('child_process');

// Forks our worker process.
var child = child_process.fork(`${__dirname}/child`);

// This event is emitted when the child process
// responds with data.
child.on('message', (message) => {

	// Displays the result, and kills the child
	// process since we're done with it.
	console.log('work result', message);
	child.kill();
});

// Sends a message to the child process. We're
// sending a number on this end, and the
// "child_process" ensures that it arrives as a
// number on the other end.
child.send(100000);
console.log('work sent...');

// Since the expensive computation is happening in
// another process, normal requests flow through
// the event loop like normal.
process.nextTick(() => {
	console.log('look ma, no blocking!');
});
