'use strict';

// Our required modules...
var child_process = require('child_process');
var os = require('os');

// Spawns our child process - the "ls" system
// command. The command line flags are passed
// as an array.
var child = child_process.spawn('ls', [
	'-lha',
	__dirname
]);

// Our output accumulator is an empty string
// initially.
var output = '';

// Adds output as it arrives from process.
child.stdout.on('data', (data) => {
	output += data;
});

// We're done getting output from the child
// process - so log the output and kill it.
child.stdout.on('end', () => {
	output = output.split(os.EOL);
	console.log(output.slice(1, output.length - 2));
	child.kill();
});
