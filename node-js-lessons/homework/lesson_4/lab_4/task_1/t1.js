const http = require('http');
//task 1 from learnyounode
http.createServer((req,res)=>{
	console.log('HELLO WORLD');
}).listen(8080);