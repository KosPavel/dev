const http = require('http');

http.createServer((req,res)=>{
	console.log('HELLO WORLD');
}).listen(8080);