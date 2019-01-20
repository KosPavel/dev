let http = require('http');
let fs = require('fs');
let path = require('path');

let mimeTypes = {
	'.html':'text/html',
	'.mp4':'video/mp4',
};

http.createServer((req,res)=>{
	let pathname, extname, mimeType;

	console.log("request: " + req.url);
	console.log("request: " + req.headers.range);

	if (req.url==='/')
		pathname='site/index.html';
	else
		pathname='site' + req.url;
	extname = path.extname(pathname);
	mimeType = mimeTypes[extname];

	if (extname==='.mp4') {
		fs.readFile(pathname,(err,data)=>{
			if(err){
				console.log('could not open file for reading\n');
				res.statusCode = 404;
				res.end();
			} else {
				console.log(`the file ${pathname} is read and sent to the client\n`);
				res.writeHead(200, {
					'Content-Type':mimeType
				});
				res.end(data);
			}
		});
	} else {
		fs.readFile(pathname, 'utf8',(err,data)=>{
			if (err) {
				console.log('could not open file\n');
				res.statusCode = 404;
				res.end();
			} else {
				console.log(`the file ${pathname} read and sent to the client`);
				res.writeHead(200, {
					'Content-Type':mimeType
				});
				res.end(data);
			}
		});
	}
}).listen(8080,()=>{
	console.log('server is running in 8080 port!\n');
});