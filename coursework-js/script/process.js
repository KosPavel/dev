"use strict"

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
// canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);

let player = new Player();
let playerShape = canvas.getContext("2d");

setInterval(draw, 10);

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