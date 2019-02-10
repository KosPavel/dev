//creating server and sockets
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(80);

//connect js files
const supp = require('./js/support.js');

app.use(express.static('public'));

let sockets = {};
let maxPlayers = 2;

io.on('connection', function (socket) {
	socket.on('first_connection', (data)=>{
		let isEnough = supp.isEnoughPlayers(sockets, maxPlayers);
		if (isEnough) {
			sockets[socket.id] = socket;
			sockets[socket.id].nick = data.nick;
			console.log(`server: new user '${data.nick}' connected`);
		} else {
			socket.disconnect();
			console.log('server: no more users is possible to join');
		}
	});

	socket.on('disconnect', ()=>{
		console.log(`server: user '${sockets[socket.id].nick}' disconnected`);
		delete sockets[socket.id];
	});
});

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// io.on('connection', function (socket) {
// 	sockets[socket.id] = socket;
// 	console.log('Новый пользователь id:' + socket.id);
// 	for(let id in sockets){
// 		if (id !== socket.id)
// 			sockets[id].emit('new_user', '(new user connected)');
// 	}

// 	socket.on('from_client', (data)=>{

// 		for (let id in sockets){
// 			if (id !== socket.id){
// 				sockets[id].emit('from_server', {
// 					name: data.name,
// 					message: data.message
// 				});
// 			}
// 		}
// 	});

// 	socket.on('disconnect', ()=>{
// 		for(let id in sockets){
// 		sockets[id].emit('user_left', '(user disconnected)');
// 	}
// 	});
// });