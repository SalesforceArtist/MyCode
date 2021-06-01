'use strict';

// The modules we need...
var http = require('http'),
	httpProxy = require('http-proxy');

// The "proxy" server is how we send
// requests to other hosts.
var proxy = httpProxy.createProxyServer();

http.createServer((req, res) => {

	// If the request is for the site root, we
	// return some HTML with some links'.
	if (req.url === '/') {
		res.setHeader('Content-Type', 'text/html');
		res.end(`
			<html>
				<body>
					<p><a href="hello">Hello</a></p>
					<p><a href="world">World</a></p>
				</body>
			</html>
		`);

	// If the URL is "hello" or "world", we proxy
	// the request to the appropriate micro-service
	// using "proxy.web()".
	} else if (req.url === '/hello') {
		proxy.web(req, res, {
			target: 'http://localhost:8082',
			xfwd: true
		});
	} else if (req.url === '/world') {
		proxy.web(req, res, {
			target: 'http://localhost:8083',
			xfwd: true
		});
	} else {
		res.statusCode = 404;
		res.end();
	}
}).listen(8081);
console.log('listening at http://localhost:8081');
