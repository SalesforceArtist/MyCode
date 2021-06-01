var http = require('http');
var fs = require('fs');
var url = require('url');
var request = require("request");
 
console.log("Starting");

http.createServer(function(req, res) {
  if (req.method == 'GET') 
  {
     console.log('GET');
     var urlParts = url.parse(req.url);
     if (urlParts.pathname == "/favicon.ico")
     {
       res.end("");
       return;
     }
		
    if (urlParts.pathname.lastIndexOf(".html") == urlParts.pathname.length - 5 ||
        urlParts.pathname.lastIndexOf(".htm") == urlParts.pathname.length - 4)
    {
console.log('html');
      res.writeHead(200, 
        {
          'Content-Type': 'text/html',
          'Access-Control-Allow-Origin' : '*'
	});
    } 
    else if (urlParts.pathname.lastIndexOf(".js") == urlParts.pathname.length - 3)
    {
      res.writeHead(200, {'Content-Type': 'application/json'});
    }
    else
    {
      res.writeHead(200, {'Content-Type': 'text/plain'});			
    }
    var html = fs.readFileSync('./public' + urlParts.pathname);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html); 
    return;    
 }
}).listen(1337, 'localhost');
console.log('Server running at http://localhost:1337');
