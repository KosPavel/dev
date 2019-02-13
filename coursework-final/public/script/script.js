let h1 = document.getElementsByTagName('h1')[0];
let btnStart = document.getElementsByClassName('btn-start')[0];
let btnReturn = document.getElementsByClassName('btn-return')[0];
let btnNick = document.getElementsByClassName('btn-nick')[0];
let menuButtons = document.getElementsByClassName('menuButtons')[0];
let nameForm = document.getElementsByTagName('form')[0];
let nicknameField = document.getElementsByClassName('nickname')[0];
let canvas = document.getElementsByTagName('canvas')[0];
let ctx = canvas.getContext('2d');

let nick = '';

btnStart.onclick = () => {
	nameForm.style.display = 'block';
	menuButtons.style.display = 'none';
}

btnReturn.onclick = () => {
	nameForm.style.display = 'none';
	menuButtons.style.display = 'block';
	nicknameField.value = '';
}

btnNick.onclick = () => {
	nameForm.style.display = 'none';
	nick = nicknameField.value;
	canvas.style.display = 'block';
	startGame();
}

function startGame() {
	canvas.height = 750;
	canvas.width = 1000;
	canvas.style.backgroundImage = "url('../img/sand.jpg')"

	//creating socket connection
	var socket = io.connect(location.href);
	socket.emit('first_connection', {nick:nick});
	console.log('client: connection established');

	socket.on('err', (data)=>{
		canvas.style.display = 'none';
		h1.innerHTML = `${data.message}`;
	});

	socket.on('new_tick', (data)=>{
		drawTick(data); //json with players and bullets coords
	});

	window.addEventListener('mousedown', (e)=>{
		let point = getMouseCoords(canvas, e);
		socket.emit('new_shot', point);
	}, true)

	window.addEventListener('contextmenu', (e)=>{
		e.preventDefault();
		let point = getMouseCoords(canvas, e);
		socket.emit('new_move', point);
	}, true)

	function getMouseCoords(canvas, event) { //get mouse coords {x,y}
    	let rect = canvas.getBoundingClientRect();
    	let point = {
     		x: event.clientX - rect.left,
      		y: event.clientY - rect.top,
      	};
      	return point;
	}
}

function drawTick(obj) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx = canvas.getContext('2d');
    drawPlayers(obj);
}

function drawPlayers(obj) {
	let players = Object.keys(obj);
	for (let i in players) {
		if (players[i] == nick) {
			ctx.fillStyle = 'green';
		} else {
			ctx.fillStyle = 'red';
		}
		ctx.beginPath();
		ctx.arc(obj[players[i]].x, obj[players[i]].y, 20, 0, Math.PI*2);
      	ctx.fill();
   		ctx.closePath();
	}
}