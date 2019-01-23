let textMiddlewareManager = require('./_exp1.js');

process.stdin.setEncoding('utf8');
process.stdin.resume();

let manager = new textMiddlewareManager(
	process.stdin,
	process.stdout
);

manager.use(function(req, res, next){
	if(req.data === '\r\n'){
		res.send({data:"Пусто\n"});
	} else {
		req.data = req.data.toUpperCase();
		next();	
	}
});

manager.use(function(req, res, next){
	let tempArr = req.data.split('');
	let tempStr = '';
	for(var i = 0; i < tempArr.length; i++){
		tempStr+=tempArr[i]+tempArr[i];
	}
	req.data = tempStr;
	next();
});