let fs = require('fs');
let path = require('path');
let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

let folder = process.argv[2];
if(!folder) return console.log('Not set path');

app.use(express.static('public'));

server.listen(8080, ()=>{
	console.log('Server run in 8080 port');
});

let arrLog = [];
let sockets = {};

io.on('connection', (socket)=>{
	sockets[socket.id] = socket;
	console.log(Object.keys(sockets).length + " users");
	socket.emit('allLog', arrLog);

	socket.on('getFileContent', (filename)=>{
		fs.readFile(folder + '/' + filename, 'utf-8', (err, data)=>{
			let dataToClient = {filename};			
			if(err) {
				console.log(err);
				dataToClient.fileContent = 'Error';
				return socket.emit('fileContent', dataToClient);
			}
			dataToClient.extname = path.extname(filename);
			dataToClient.fileContent = data;
			socket.emit('fileContent', dataToClient);
		});
	});
	socket.on('disconnect', (reason) => {
		delete sockets[socket.id];
		console.log(Object.keys(sockets).length + " users");		
	});
});

function setWatchers(pathToFolder){
	fs.watch(pathToFolder, {recursive:true},(eventType, filename) => {
		console.log(`Event type is: ${eventType} filename: ${filename}`);		
		
		if(!filename || filename.indexOf('node_modules') !== -1)
			return;
		
		if(filename.indexOf('package-lock.json') !== -1) return;
		
		if(filename.indexOf('package.json') !== -1 && filename.length > 12)
			return;
		
		let extname = path.extname(filename);
		if(extname!==".js" && extname!==".json" 
			&& extname!==".css" && extname!==".html") return;
		
		fs.stat(folder + '/' + filename, (err, stats)=>{
			if(err)
				return console.log(err);
			
			if(stats.isDirectory())
				return;
			
			for(let i = 0; i < arrLog.length; i++){
				if(arrLog[i].filename === filename) {
					arrLog.splice(i, 1);
					i--;
				}
			}
			
			let data = {
				eventType,
				filename
			};
			arrLog.push(data);

			for(var id in sockets){
				sockets[id].emit('newLog', data);
			}
		});
	});	
}

setWatchers(folder);