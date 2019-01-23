const http = require('http');
const cp = require('child_process');
const url = require('url');

let childReady = false; //child не готов к работе

const child = cp.fork('./child.js');
child.on('message', childSaidReady);

http.createServer((req,res)=>{
	let _get = url.parse(req.url, true).query;
	console.log('Parametres of req: ' + JSON.stringify(_get));

	if (!(_get.num1&&_get.num2)) {
		console.log('Bad request');
		res.statusCode = 503
		res.end();
		return;
	}

	if (!childReady) {
		console.log('Service unavailable');
		res.statusCode = 503;
		res.end();
		return;
	}

	let expression = `${_get.num1}+${_get.num2}=`;

	child.on('message', responseFromChild);
	child.send({expression});

	function responseFromChild(data){
		if(data.expression === expression){
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(`<h1>${data.result}</h1>`);
			res.end();
			child.off('message', responseFromChild);
		}
	}
}).listen(8080,()=>{
	console.log('server is running on 8080 port');
});

function childSaidReady(status) {
	if (status==='ready') {
		childReady = true;
		child.off('message', childSaidReady); //удаляем слушателя
		console.log('server ready');
	}
}