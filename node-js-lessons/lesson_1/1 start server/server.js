const http = require('http'); //подключение модуля http

const hostname = '127.0.0.1';
const port = 8080;

http.createServer((req, res) => { //стрел ф-я
	res.writeHead(200, {'Content-Type': 'text/plain',
                        'X-Powered_By': 'Node.js',
                        'Accept_Charset': 'UTF-8',
                    });
	res.end('Hello, server!\n'); //метод окончания передачи данных
	                             //можно без аргументов
}).listen(port, hostname);