var http = require('http');
var fs = require('fs');
var url = require('url');
var request = require("request");
 
console.log("Starting");

http.createServer(function(req, res) {
	if (req.method == 'POST') {
     	console.log('POST');
     	var body = '';
     	req.on('data', function(data) {
       		body += data;
	     });
    	 req.on('end', function() {		 
			 var json = JSON.parse(body);

		 	var apiKey = "2972.NmKxRpKmgHtwGR";
		 	var serviceUrl = "http://api.aprs.fi/api/get?name=" + json.call + "&what=loc&apikey=" + apiKey + "&format=json";
		 
		 	request(serviceUrl, function(error, response, body) {
             	var bodyObject = JSON.parse(body);
			 	if (bodyObject.entries.length>0)
			 	{
			 		json.call = bodyObject.entries[0].name;
			 		json.lat = bodyObject.entries[0].lat;
			 		json.lng = bodyObject.entries[0].lng;
			 		json.result = "OK";
			 	}
			 	else
			 	{
			 		json.result = "ERROR";
			 	}
       		 	res.writeHead(200, {'Content-Type': 'application/json'});
       		 	res.end(JSON.stringify(json));
		 	});
	 	});
   	} 
   	else if (req.method == 'GET') 
   	{
   		console.log('GET');
     	var urlParts = url.parse(req.url);
     	if (urlParts.pathname == "/favicon.ico")
     	{
       		res.end("");
       		return;
     	}


     	res.writeHead(200, {'Content-Type': 'text/plain'});
     
     	var html = fs.readFileSync('./public' + urlParts.pathname);
     	res.writeHead(200, {'Content-Type': 'text/html'});
     	res.end(html); 
     	return;    
   	}
}).listen(1337, 'localhost');
console.log('Server running at http://localhost:1337');
