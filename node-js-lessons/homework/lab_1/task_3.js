const http = require('http');
const fs = require('fs'); //работа с файлами
const filename = 'index.html';

const server = http.createServer((req, res) => {
	fs.readFile(filename, 'utf8', (err,data) => {
		if (err) {
			console.log('problems with file');
			res.statusCode = 404;
			res.end();
		} else {
			console.log(`The file ${filename} is read and sent to the client\n`);
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
		}
	});
	console.log('request accepted!');
});

server.listen(8080, () => {
	console.log('http works on port 8080');
});