var http = require("http");
url = require("url");
fs = require("fs");

http.createServer(function(request, response) {
	var _get = url.parse(request.url, true).query;
	request.on("end", function() {
		fs.readFile("test.txt", 'utf-8', function (error, data) {
         response.writeHead(200, {
            'Content-Type': 'text/plain'
         });
         data = parseInt(data) + 1;
         fs.writeFile('test.txt', data);
         response.end('This page was refreshed ' + data + ' times!');
      });
   });
}).listen(8888);