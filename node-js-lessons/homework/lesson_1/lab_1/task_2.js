const http = require('http');

const server = http.createServer((req, res) => {
	console.log('HTTP works!');
	res.writeHead(404, {'Content-Type':'text/plain'});
	// res.writeHead(200, {'Content-Type':'text/plain'});
	res.write('<h1>Hello</h1>');
	res.end();
});

server.listen(8080);