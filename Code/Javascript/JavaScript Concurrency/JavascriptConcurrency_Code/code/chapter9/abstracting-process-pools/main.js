'use strict';

// The modules we need...
var http = require('http');
var cluster = require('cluster');
var os = require('os');

// Eat some CPU cycles...
// Taken from http://adambom.github.io/parallel.js/
function work(n) {
    var i = 0;
    while (++i < n * n) {}
    return i;
}

// Check which type of process this is. It's either
// a master or a worker.
if (cluster.isMaster) {

	// The level of parallelism that goes into
	// "workers".
	var workers = os.cpus().length;

	// Forks our worker processes.
	for (let i = 0; i < workers; i++) {
		cluster.fork();
	}

	console.log('listening at http://localhost:8081');
	console.log(`worker processes: ${workers}`);

// If this process isn't the master, then it's
// a worker. So we create the same HTTP server as
// every other worker.
} else {
	http.createServer((req, res) => {
		res.setHeader('Content-Type', 'text/plain');
		res.end(`worker ${cluster.worker.id}: ${work(100000)}`);
	}).listen(8081);
}

