'use strict';

var http = require('http');

var server = http.createServer((req, res) => {

	// Looks for a user ID in the URL.
	var id = /\/(\d+)/.exec(req.url);

	// If there's no ID in the URL, don't
	// even try handling the request.
	if (!id) {
		res.end();
		return;
	}

	// This promise is resolved when the call to
	// the "users" service responds with data. This
	// service is another server, running on port
	// 8082.
	var user = new Promise((resolve, reject) => {
		http.get({
			hostname: 'localhost',
			port: 8082,
			path: `/${id[1]}`
		}, (res) => {
			res.on('data', (data) => {
				resolve(JSON.parse(data.toString()));
			});
		});
	});

	// This promise is resolved when the call to
	// the "preference" service responds with data. This
	// service is just another web server, running
	// on port 8082.
	var preference = new Promise((resolve, reject) => {
		http.get({
			hostname: 'localhost',
			port: 8083,
			path: `/${id[1]}`
		}, (res) => {
			res.on('data', (data) => {
				resolve(JSON.parse(data.toString()));
			});
		});
	});

	// Once both the user and the preference services have
	// responded, we have all the data we need to render 
	// the page.
	Promise.all([ user, preference ]).then((results) => {
		let user = results[0],
			preference = results[1];

		res.end(`
			<p><strong>Name:</strong> ${user.name}</p>
			<p><strong>Spam:</strong> ${preference.spam}</p>
		`);
	});
});

server.listen(8081);
console.log('Listening at http://localhost:8081');
