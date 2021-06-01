'use strict';

// We need the "fs" module to read files.
var fs = require('fs');
var path = require('path');

// The file path we're working with.
var filePath = path.join(__dirname, 'words');

// Starts the timer for reading our "words" file.
console.time('reading words');

// Reads the entire file into memory, then fires
// a callback with the data.
fs.readFile(filePath, (err, data) => {
	console.timeEnd('reading words');
	// → reading words: 5ms

	console.log('size',
		`${(data.length / 1024 / 1024).toFixed(2)}MB`);
	// → size 2.38MB
});

// Creates a promise that's resolved once all the 
// file chunks have been read into memory.
var contents = new Promise((resolve, reject) => {

	// Opens the "filePath" for reading. The file
	// descriptor, like a file identifier, is needed
	// when we call "fs.read()" later on.
	fs.open(filePath, 'r', (err, fd) => {

		// Set up some variables needed for reading
		// a file one chunk at a time. We need to know
		// how big the file is, that does in "size". The
		// "buffer" is where the chunks go as they're
		// read. And we have the "chunk" size, and the
		// number of "bytes" read so far.
		var size = fs.fstatSync(fd).size,
			buffer = new Buffer(size),
			chunk = 1024,
			read = 0;

		// We wrap this reading iteration in a named
		// function because it's recursive.
		function schedule() {

			// The reading of a chunk always happens in
			// the next tick of the IO loop. This gives
			// other queued handlers a chance to run while 
			// we're reading this file.
			process.nextTick(() => {

				// Makes sure the last chunk fits evanly
				// into the buffer.
				if ((read + chunk) > size) {
					chunk = size - read;
				}

				// Reads the chunk of data into the buffer,
				// and increments the "read" counter.
				fs.read(fd, buffer, read, chunk, read);
				read += chunk;

				// Check if there's still data to read. If
				// yes, "schedule()" the next "read()". If
				// no, resolve the promise with the "buffer".
				if (read < size) {
					schedule();
				} else {
					resolve(buffer);
				}
			});
		}

		// Kicks off the reading and scheduling process.
		schedule();
	});
});

// When the promise is resolved, show how many words
// were read into the buffer by splitting them by
// newlines.
contents.then((buffer) => {
	console.log('words read',
		buffer.toString().split('\n').length);
	// → words read 235887
});
