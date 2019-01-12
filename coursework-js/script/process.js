"use strict"

//---init nessesary vars---//
let canvas = document.getElementsByTagName("canvas")[0];
canvas.style.border = "1px solid black";
let scrollSize = 25;
let height = window.innerHeight;
let width = window.innerWidth;
canvas.height = height - scrollSize;
canvas.width = width - scrollSize;

//load map
let img = document.getElementsByTagName("img")[0];
img.style.display = "none";

let player = new Player();
let playerShape = canvas.getContext("2d");

setInterval(draw, 10);

//---functions of game manager---///
function drawPlayer() {
	playerShape.clearRect(0, 0, canvas.width, canvas.height);
	playerShape.beginPath();
	playerShape.arc(player.x, player.y, player.radius, 0, Math.PI*2);
	playerShape.stroke();
	playerShape.closePath();
}

//sycle to draw everything
function draw() {
	drawPlayer();
}

//event listeners
document.addEventListener('keydown', function(e) {
	if (e.keyCode === '87') { //w
     player.y -= player.step;
   } else if (e.keyCode === '83') { //s
     player.y += player.step;
   } else if (e.keyCode === '65') { //a
     player.x -= player.step;
   } else if (e.keyCode === '68') { //d
     player.x += player.step;
   }
}, false)