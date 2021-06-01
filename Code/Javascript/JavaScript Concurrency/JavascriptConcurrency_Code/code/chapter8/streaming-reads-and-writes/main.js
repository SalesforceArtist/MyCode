'use strict';

// All the modules we need.
var fs = require('fs');
var path = require('path');
var stream = require('stream');

// Creates a simple upper-case transformation
// stream. Each chunk that's passed in is
// "pushed" to the next stream in upper-case.
var transform = new stream.Transform({
	transform: function(chunk) {
		this.push(chunk.toString().toUpperCase());
	}
});

// The file names we're using.
var inputFile = path.join(__dirname, 'words'),
	outputFile = path.join(__dirname, 'output');

// Creates an "input" stream that reads from
// "inputFile" and an "output" stream that writes
// to "outputFile".
var input = fs.createReadStream(inputFile),
	output = fs.createWriteStream(outputFile);

// Starts the IO by building the following 
// pipeline: input -> transform -> output.
input.pipe(transform);
transform.pipe(output);

