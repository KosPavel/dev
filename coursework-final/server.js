//creating server and sockets
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(80);

//connect js files
const supp = require('./js/support.js');

app.use(express.static('public'));

let sockets = {}; //ключ = сокет, значение = объект -> nick = имя
let players = {}; //ник = {}, внутри все данные для отправки
let maxPlayers = 2;

io.on('connection', function (socket) {
	if (io.engine.clientsCount > maxPlayers) {
    	socket.emit('err', { message: 'limit of players has been reached, try again later!' })
    	socket.disconnect()
    	console.log('Disconnected...')
    	return
    }

    socket.on('first_connection', (data)=>{
    	sockets[socket.id] = socket;
        sockets[socket.id].nick = data.nick;
    	players[data.nick] = {};
    	console.log(`server: user '${sockets[socket.id].nick}' connected`);
        if (Object.keys(players).length === 1) {
            players[data.nick].x = 30;
            players[data.nick].y = 30;
        } else {
            players[data.nick].x = 970;
            players[data.nick].y = 710;
        }
        console.log(players);
        setInterval(newTick, 1000);

        function newTick(){
            io.sockets.emit('new_tick', players);
        }
    });

    socket.on('new_move', (data)=>{
        //!!!!!!!!! to do: movement speed. not teleportation
        players[sockets[socket.id].nick].x = data.x;
        players[sockets[socket.id].nick].y = data.y;
    });

	socket.on('disconnect', ()=>{
		console.log(`server: user '${sockets[socket.id].nick}' disconnected`);
        delete players[sockets[socket.id].nick];
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