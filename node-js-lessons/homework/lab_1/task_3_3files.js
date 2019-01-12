const http = require('http');
const fs = require('fs'); //работа с файлами
var filename = 'header.html';

const server = http.createServer((req, res) => {
	fs.readFile(filename, 'utf8', (err,data) => {
		if (err) {
			console.log('problems with file');
			res.statusCode = 404;
			res.end();
		} else {
			let str = data;
			filename = 'body.html';
			fs.readFile(filename, 'utf8', (err, data) => {
				str += data;
				filename = 'footer.html';
				fs.readFile(filename, 'utf8', (err, data) => {
					str += data;
					res.writeHead(200, {'Content-Type':'text/html'});
					res.end(str);
				});
			});
		};
	});
	console.log('request accepted!');
});

server.listen(8080, () => {
	console.log('http works on port 8080');
});