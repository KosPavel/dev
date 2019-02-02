var express = require('express');
var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

server.listen(8080);

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

let sockets = {};

io.on('connection', function (socket) {
	console.log(socket.id);
	sockets[socket.id] = socket;
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});
	socket.on('disconnect', function(){
		delete sockets[sockets];
		console.log('Клиент ушёл');
	});
});