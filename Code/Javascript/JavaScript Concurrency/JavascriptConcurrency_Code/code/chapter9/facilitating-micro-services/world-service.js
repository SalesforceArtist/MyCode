'use strict';

var http = require('http');

http.createServer((req, res) => {
	res.setHeader('Content-Type', 'text/plain');
	res.end('world');
}).listen(8083);

console.log('listening at http://localhost:8083');
