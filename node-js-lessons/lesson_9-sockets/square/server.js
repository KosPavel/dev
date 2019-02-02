const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(8080);

app.use(express.static('public'));

let sockets = {};
let positions = {};
io.on('connection', function (socket) {
	sockets[socket.id] = socket;
	socket.emit('allEnemy', positions);
	positions[socket.id] = {
		top:'0px',
		left:'0px'
	};	
	socket.on('disconnect', ()=>{
		delete sockets[socket.id];
		delete positions[socket.id];
		for(let id in sockets){
			sockets[id].emit('removeEnemy', socket.id);
		}
	});
	socket.on('move', (data)=>{
		positions[socket.id].top = data.top;
		positions[socket.id].left = data.left;		
		
		for(let id in sockets){
			if(id !== socket.id){
				data.id = socket.id;
				sockets[id].emit('enemy',data);
			}
		}
	});
});