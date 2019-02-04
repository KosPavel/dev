const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(80);

app.use(express.static('public'));

let sockets = {};

io.on('connection', function (socket) {
	sockets[socket.id] = socket;
	console.log('Новый пользователь id:' + socket.id);
	for(let id in sockets){
		if (id !== socket.id)
			sockets[id].emit('new_user', '(new user connected)');
	}

	socket.on('from_client', (data)=>{

		for (let id in sockets){
			if (id !== socket.id){
				sockets[id].emit('from_server', {
					name: data.name,
					message: data.message
				});
			}
		}
	});

	socket.on('disconnect', ()=>{
		for(let id in sockets){
		sockets[id].emit('user_left', '(user disconnected)');
	}
	});
});