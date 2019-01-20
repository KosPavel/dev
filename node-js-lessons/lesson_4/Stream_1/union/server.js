var http = require("http");
var fs = require('fs');
var url = require("url");
var path = require('path');

var mimeTypes = {
	'.js' : 'text/javascript',
	'.html' : 'text/html',
	'.css' : 'text/css' ,
	'.jpg' : 'image/jpeg',
	'.gif' : 'image/gif'
};

http.createServer(function onRequest(request, response) {
	if(request.method === 'GET') {	
		var pathname = url.parse(request.url).path;
		if(pathname == '/')
			pathname = '/index.html';
		var extname = path.extname(pathname);
		var mimeType = mimeTypes[extname];
		pathname = pathname.substring(1, pathname.length);
		response.writeHead(200, {'Content-Type': mimeType});
		var newFileStream = fs.createReadStream(pathname);
		newFileStream.pipe(response);
		newFileStream.on('error', function(err){
			console.log('Could not find or open file '+ 
				pathname + ' for reading\n');
		});
	} else if (request.method === 'POST') {
		var pathname = url.parse(request.url).path;
		//чтобы убрать начальный слэш
		pathname = pathname.substring(1, pathname.length);
		var newFileStream = fs.createWriteStream(pathname);
		newFileStream.on('close', function(){
			response.writeHead(200);
			response.end();
		});
		request.pipe(newFileStream);
	}
}).listen(8080);