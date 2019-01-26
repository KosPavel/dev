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

	if (!fs.existsSync(pathname)) {
		console.log('couldnt open file for reading\n');
		res.statusCode = 404;
		res.end();
		return null;
	}

	let responseHeaders = {};
	let stat = fs.statSync(pathname);
	let rangeRequest = readRangeHeader(req.headers['range'], stat.size);
	if (rangeRequest == null) {
		responseHeaders['Content-Type'] = mimeType;
		responseHeaders['Content-Length'] = stat.size;
		responseHeaders['Accept-Ranges'] = 'bytes';

		let video = fs.readFileSync(pathname);
		console.log(`the file ${pathname} is read and sent to the client`);
		res.writeHead(200, responseHeaders);
		res.end(video);
		return null;
	}

	let start = rangeRequest.start;
	let end = rangeRequest.end;

	if (start >= stat.size || end >= stat.size) {
		responseHeaders['Content-Range'] = 'bytes */' + stat.size;
		console.log('return 416 "Req range not satisfible"');
		res.writeHead(416, responseHeaders);
		res.end();
		return null;
	}

	let maxsize = 10240;

	if (end - start >= maxsize) {
		end = start + maxsize - 1;
	}

	responseHeaders['Content-Range'] = 'bytes ' + start +'-' + end + '/' + stat.size;
	responseHeaders['Content-Length'] = start == end?0:(end-start+1);
	responseHeaders['Content-Type'] = mimeType;
	responseHeaders['Accept-Ranges'] = 'bytes';
	responseHeaders['Cache-Control'] = 'no-cache';

	const fd = fs.openSync(pathname, 'r');
	let buf = Buffer.alloc(responseHeaders['Content-Length']);

	fs.read(fd, buf, 0, buf.length, start, (err, bytes) => {
		if(err){
			console.log(err);
			res.statusCode = 500;
			res.end();
		} else {
			res.writeHead(206, responseHeaders);
			res.end(buf);
		}
	});
}).listen(8080,()=>{
	console.log('server is running in 8080 port!\n');
});

function readRangeHeader(range, totalLength) {
	if (range == null || range.length == 0)
		return null;
	let array = range.split(/bytes=([0-9]*)-([0-9]*)/);
	let startRange = parseInt(array[1]);
	let endRange = parseInt(array[2]);
	let result = {
		start: isNaN(startRange)?0:startRange,
		end: isNaN(endRange)?(totalLength-1):endRange,
	};
	if (isNaN(startRange)&&!isNaN(endRange)) {
		result.start = totalLength - endRange;
		result.end = totalLength - 1;
	};
	return result;
}
