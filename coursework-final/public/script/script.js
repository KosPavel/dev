let btnStart = document.getElementsByClassName('btn-start')[0];
let btnReturn = document.getElementsByClassName('btn-return')[0];
let btnNick = document.getElementsByClassName('btn-nick')[0];
let menuButtons = document.getElementsByClassName('menuButtons')[0];
let nameForm = document.getElementsByTagName('form')[0];
let nicknameField = document.getElementsByClassName('nickname')[0];
let canvas = document.getElementsByTagName('canvas')[0];

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
	let socket = io.connect(location.href);
	socket.emit('first_connection', {nick:nick});
	console.log('client: connection established')
}

socket.on('getStartPosition', (data)=>{
});