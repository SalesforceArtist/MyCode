'use strict';

// We need the "http" module.
var http = require('http');

// Creates some sample data, an array of 
// numbers.
var array = new Array(1000)
	.fill(null)
	.map((v, i) => i);

// Creates the HTTP server, and the request
// callback function.
var server = http.createServer((req, res) => {
	var size = 25,
		i = 0;

	// This function is called when we need to
	// schedule a chunk of data to be written to
	// the response.
	function schedule() {

		// Here's the actual scheduling, "process.nextTick()"
		// let's other handlers, if any, run while we're
		// streaming our writes to the response.
		process.nextTick(() => {
			let chunk = array.slice(i, i + size);

			// If there's a chunk of data to write, write it,
			// then schedule the next round by calling
			// "schedule()". Otherwise, we can "end()" the
			// response.
			if (chunk.length) {
				res.write(chunk.toString() + '\n');
				i += size;
				schedule();
			} else {
				res.end();
			}
		});
	}

	// Kicks off the stream writing scheduler.
	schedule();
});

// Starts the server.
server.listen(8081);
console.log('listening at http://localhost:8081');
