const http = require('http');
const cp = require('child_process');
const child = cp.fork('./child.js');

const server = http.createServer((request, response)=>{
	response.statusCode = 200;
	child.send({
	method:request.method,
	params:request.url,
    });
	response.end();
}).listen(8080, ()=>{
	console.log('Server run in 8080 port!');
});