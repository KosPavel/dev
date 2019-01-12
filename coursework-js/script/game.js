'use strict'

//prepare canvas
var canvas = document.getElementsByTagName("canvas")[0];
canvas.style.border = "1px solid black";
canvas.height = window.innerHeight - 25;
canvas.width = window.innerWidth - 25;

var up = 87; //w
var left = 65; //a
var down = 83; //s
var right = 68; //d
var step = 20;

let player = {
  x: window.innerWidth/2,
  y: window.innerHeight/2,
  radius: (window.innerHeight + window.innerWidth) * 2 / (2 * 100), //radius is 2 % from average size
  moveListener: function() {
    window.addEventListener('keydown', function(event) {
      if (event.keyCode === up) {
        if (player.y - player.radius <= 0) {
          player.y = player.radius;
        } else {
          player.y -= step;
        };
      } else if (event.keyCode === left) {
        if (player.x - player.radius <= 0) {
          player.x = player.radius;
        } else {
          player.x -= step;
        };
      } else if (event.keyCode === down) {
        if (player.y + player.radius >= window.innerHeight - 25) {
          player.y = window.innerHeight - 25 - player.radius;
        } else {
          player.y += step;
        };
      } else if (event.keyCode === right) {
        if (player.x + player.radius >= window.innerWidth - 25) {
          player.x = window.innerWidth - 25 - player.radius;
        } else {
          player.x += step;
        };
      };
  }, true);},
};

let targets = {
  listOfTargets: [], //[[x1,y1],[x2,y2]] - 2 targets with (x,y) coords
  listOfDirections: [], //[[x1,y1],[x2,y2]] - destinations
  listOfSpeeds: [],
};

let game = {
  ctx: canvas.getContext('2d'),
  init: function() {
    player.moveListener();
    game.mouseListener();
  },
  _getMouseCoords: function(canvas, event) { //for mouse listener
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      };
  },
  mouseListener: function() {
    window.addEventListener('mousedown', function(event) {
      var mousePos = game._getMouseCoords(canvas, event);
      var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
      console.log(message);
  }, true)},
  drawPlayer: function() {
    game.ctx = canvas.getContext('2d');
    game.ctx.beginPath();
    game.ctx.arc(player.x, player.y, player.radius, 0, Math.PI*2);
    game.ctx.stroke();
    game.ctx.closePath();
  },
  drawFrame: function() {
    game.ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.drawPlayer();
  },
}

// game process
game.init();
setInterval(game.drawFrame, 10);