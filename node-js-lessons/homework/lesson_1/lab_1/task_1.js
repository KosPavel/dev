const http = require('http');

const server = http.createServer((req, res) => {
	console.log('HTTP works!');
});

server.listen(8080);