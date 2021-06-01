'use strict';

// We need the "fs" and the "path" modules for
// working with files.
var fs = require('fs');
var path = require('path');

// The two files we'll be working with.
var filePath1 = path.join(__dirname, 'output1'),
	filePath2 = path.join(__dirname, 'output2');

// The sample array we'll be writing to files.
var array = new Array(1000)
	.fill(null)
	.map((v, i) => i);

// Starts a timer for writing the entire array to
// the file in one shot.
console.time('output1');

// Performs the file write and stops the timer when
// it's complete.
fs.writeFile(filePath1, array.toString(), (err) => {
	console.timeEnd('output1');
});

// Creates a promise that's resolved when all chunks
// have been written to file.
var written = new Promise((resolve, reject) => {

	// Opens the file for writing, and the callback
	// starts writing chunks.
	fs.open(filePath2, 'w', (err, fd) => {
		var chunk = 50,
			i = 0;

		// The recursive scheduler places the call
		// to perform the write into the IO event loop
		// queue.
		function schedule() {
			process.nextTick(() => {

				// The chunk of data from "array" to 
				// write.
				let slice = array.slice(i, i + chunk);

				// If there's a chunk to write, write it.
				// If not, close the file and resolve the
				// promise.
				if (slice.length) {
					fs.write(fd, slice.toString(), i);
					i += chunk;
					schedule();
				} else {
					fs.close(fd);
					resolve();
				}
			});
		}

		// Kicks of the chunk/write scheduler.
		schedule();
	});
});

// When the promise is resolved, it means the file has been
// written.
written.then(() => {
	console.log('finished writing');
});
