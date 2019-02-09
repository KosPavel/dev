let btnStart = document.getElementsByClassName('btn-start')[0];
let btnReturn = document.getElementsByClassName('btn-return')[0];
let menuButtons = document.getElementsByClassName('menuButtons')[0];
let nameForm = document.getElementsByTagName('form')[0];

btnStart.onclick = () => {
	nameForm.style.display = 'block';
	menuButtons.style.display = 'none';
}

btnReturn.onclick = () => {
	nameForm.style.display = 'none';
	menuButtons.style.display = 'block';
}