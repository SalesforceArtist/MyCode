'use strict';

var http = require('http');

// Get the port as a command line argument,
// so we can run multiple instances of the
// service.
var port = process.argv[2];

// Eat some CPU cycles...
// Taken from http://adambom.github.io/parallel.js/
function work() {
    var i = 0,
        min = 10000,
        max = 100000,
        n = Math.floor(Math.random() * (max - min)) + min;
    while (++i < n * n) {}
    return i;
}

// Responds with plain text, after blocking
// the CPU for a random interval.
http.createServer((req, res) => {
	res.setHeader('Content-Type', 'text/plain');
	res.end(work().toString());
}).listen(port);

console.log(`listening at http://localhost:${port}`);
