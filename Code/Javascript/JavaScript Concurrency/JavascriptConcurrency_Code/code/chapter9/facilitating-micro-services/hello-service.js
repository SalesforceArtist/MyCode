'use strict';

var http = require('http');

http.createServer((req, res) => {
	res.setHeader('Content-Type', 'text/plain');
	res.end('hello');
}).listen(8082);

console.log('listening at http://localhost:8082');
