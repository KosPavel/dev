const http = require('http');
const cp = require('child_process');

const child = cp.fork('./child.js');

http.createServer((req,res)=>{
	child.send({
		method: req.method,
		params: req.url
	});

	res.statusCode=200;
	res.end();
}).listen(8080,()=>{
	console.log('Server is ready on 8080 port!');
});