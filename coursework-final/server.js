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
const PLAYER_SPEED = 4;
const BULLET_SPEED = 7;
const MAX_BULLETS = 3;
const FPS = 60;

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
            players[data.nick].bullets = [];
            players[data.nick].bulletsDir = [];
        } else {
            players[data.nick].x = 970;
            players[data.nick].y = 710;
            players[data.nick].bullets = [];
            players[data.nick].bulletsDir = [];
        }
        // console.log(players);
        setInterval(newTick, 1000/FPS);

        function newTick(){
            updateBullets();
            updatePlayers();
            io.sockets.emit('new_tick', players);
        }

        function updatePlayers(){//новые координаты игроков
            for (let i in Object.keys(players)) {
                if (Math.abs(players[Object.keys(players)[i]].xFin - players[Object.keys(players)[i]].x) > PLAYER_SPEED - 2 || Math.abs(players[Object.keys(players)[i]].yFin - players[Object.keys(players)[i]].y) > PLAYER_SPEED - 2) {
                    players[Object.keys(players)[i]].x += PLAYER_SPEED * Math.cos(players[Object.keys(players)[i]].moveDirection);
                    players[Object.keys(players)[i]].y += PLAYER_SPEED * Math.sin(players[Object.keys(players)[i]].moveDirection);
                }
                if (players[Object.keys(players)[i]].x < 0) {
                    players[Object.keys(players)[i]].x = 0;
                    players[Object.keys(players)[i]].xFin = 0;
                }
                if (players[Object.keys(players)[i]].x > 1000) {
                    players[Object.keys(players)[i]].x = 1000;
                    players[Object.keys(players)[i]].xFin = 1000;
                }
                if (players[Object.keys(players)[i]].y < 0) {
                    players[Object.keys(players)[i]].y = 0;
                    players[Object.keys(players)[i]].yFin = 0;
                }
                if (players[Object.keys(players)[i]].y > 750) {
                    players[Object.keys(players)[i]].y = 750;
                    players[Object.keys(players)[i]].yFin = 750;
                }
            }
        }

        function updateBullets(){
            for (let i in Object.keys(players)) {
                for (let j in players[Object.keys(players)[i]].bullets) {
                    players[Object.keys(players)[i]].bullets[j][0] += BULLET_SPEED * Math.cos(players[Object.keys(players)[i]].bulletsDir[j]);
                    players[Object.keys(players)[i]].bullets[j][1] += BULLET_SPEED * Math.sin(players[Object.keys(players)[i]].bulletsDir[j]);
                }
                for (let j in players[Object.keys(players)[i]].bullets) {
                    if (players[Object.keys(players)[i]].bullets[j][0] > 1000 || players[Object.keys(players)[i]].bullets[j][0] < 0 || players[Object.keys(players)[i]].bullets[j][1] > 750 || players[Object.keys(players)[i]].bullets[j][1] < 0) {
                        players[Object.keys(players)[i]].bullets.splice(j,1);
                        players[Object.keys(players)[i]].bulletsDir.splice(j,1);
                    }
                }
            }
        }
    });

    socket.on('move', (data)=>{
        //!!!!!!!!! to do: movement speed. not teleportation
        players[sockets[socket.id].nick].xFin = data.x;
        players[sockets[socket.id].nick].yFin = data.y;
        players[sockets[socket.id].nick].moveDirection = supp.countAngle({x:players[sockets[socket.id].nick].x, y:players[sockets[socket.id].nick].y},data);
    });
    socket.on('shot', (data)=>{
        if (players[sockets[socket.id].nick].bullets.length < MAX_BULLETS) {
            players[sockets[socket.id].nick].bullets.push([players[sockets[socket.id].nick].x, players[sockets[socket.id].nick].y]);
            players[sockets[socket.id].nick].bulletsDir.push(supp.countAngle({x:players[sockets[socket.id].nick].x, y:players[sockets[socket.id].nick].y},data));
        }
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