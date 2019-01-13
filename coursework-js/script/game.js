'use strict'

var canvas = document.getElementsByTagName("canvas")[0];
canvas.style.border = "1px solid black";
canvas.height = window.innerHeight - 25;
canvas.width = window.innerWidth - 25;

//player settings
const UP = 87; //w
const LEFT = 65; //a
const DOWN = 83; //s
const RIGHT = 68; //d
const PLAYER_SIZE = 2; //in % from average size of field
const BULLET_SPEED = 10;
const MAX_BULLETS = 10;
var  bulletSize = (window.innerHeight + window.innerWidth) * 0.5 / (2 * 100) //0.5%
var step = 20;

//targets settings
const MAX_TARGETS = 0;
const MIN_TARGET_SPEED = 1;
const MAX_TARGET_SPEED = 5;
const MIN_TARGET_SIZE = 2;
const MAX_TARGET_SIZE = 5;

let player = {
  x: window.innerWidth/2,
  y: window.innerHeight/2,
  bullets: [], //[[x0, y0, direction in degrees]]
  radius: (window.innerHeight + window.innerWidth) * PLAYER_SIZE / (2 * 100), //radius is 2 % from average size
  moveListener: function() {
    window.addEventListener('keydown', function(event) {
      if (event.keyCode === UP) {
        if (player.y - player.radius <= 0) {
          player.y = player.radius;
        } else {
          player.y -= step;
        };
      } else if (event.keyCode === LEFT) {
        if (player.x - player.radius <= 0) {
          player.x = player.radius;
        } else {
          player.x -= step;
        };
      } else if (event.keyCode === DOWN) {
        if (player.y + player.radius >= window.innerHeight - 25) {
          player.y = window.innerHeight - 25 - player.radius;
        } else {
          player.y += step;
        };
      } else if (event.keyCode === RIGHT) {
        if (player.x + player.radius >= window.innerWidth - 25) {
          player.x = window.innerWidth - 25 - player.radius;
        } else {
          player.x += step;
        };
      };
  }, true);
  },
  
  //to do: MISTAKE HERE
  shoot: function(startX, startY, endX, endY) {
    
    console.log(startX);
    console.log(startY);
    console.log(endX);
    console.log(endY);
    
    if (MAX_BULLETS !== player.bullets.length) {
      let bullet = [];
      bullet.push(startX);
      bullet.push(startY);
      bullet.push(Math.acos(((endX-startX)**2 - (Math.sqrt((endX-startX)**2+(endY-startY)**2))**2 + (endY-startY)**2)/2*(endX-startX)*(endY-startY)));
      player.bullets.push(bullet);
      console.log(player.bullets);
    };  
  },
  
  updateBullets: function() {
    for (let i in player.bullets) { //updating bullet
      player.bullets[i][0] += BULLET_SPEED * Math.cos(player.bullets[i][3]);
      player.bullets[i][1] += BULLET_SPEED * Math.sin(player.bullets[i][3]);
      if (player.bullets[i][0] >= canvas.width || player.bullets[i][0] <= 0 && player.bullets[i][1] >= canvas.height || player.bullets[i][1] <= 0) {
        player.bullets.splice(i, 1);
      };
    };
  },
};

let targets = {
  coords: [], //[[x1,y1],[x2,y2]] - 2 targets with (x,y) coords
  sizes: [], //[r1,r2] - radiuses
  destinations: [], //[[x1,y1],[x2,y2]] - destinations
  speeds: [], //move per tick
  
  updateTargets: function() { //create new targets
    while (targets.coords.length < MAX_TARGETS) {
      targets.sizes.push(game.random((window.innerHeight + window.innerWidth) * MIN_TARGET_SIZE / (2 * 100), (window.innerHeight + window.innerWidth) * MAX_TARGET_SIZE / (2 * 100))); //random size between MIN_TARGET_SIZE and MAX_TARGET_SIZE sizes
      targets.speeds.push(game.random(MIN_TARGET_SPEED, MAX_TARGET_SPEED));
      targets.coords.push([game.random(targets.sizes[targets.sizes.length - 1], canvas.width - targets.sizes[targets.sizes.length - 1]), game.random(targets.sizes[targets.sizes.length - 1], canvas.height - targets.sizes[targets.sizes.length - 1])]);
      targets.destinations.push([game.random(targets.sizes[targets.sizes.length - 1], canvas.width - targets.sizes[targets.sizes.length - 1]), game.random(targets.sizes[targets.sizes.length - 1], canvas.height - targets.sizes[targets.sizes.length - 1])]);
    };
    targets._move();
  },
  
  _move: function() {
    for (let i in targets.coords) { //move targets closer to destination
      if (targets.coords[i][0] < targets.destinations[i][0]) {
        targets.coords[i][0] += targets.speeds[i];
      } else {
        targets.coords[i][0] -= targets.speeds[i];
      };
      if (targets.coords[i][1] < targets.destinations[i][1]) {
        targets.coords[i][1] += targets.speeds[i];
      } else {
        targets.coords[i][1] -= targets.speeds[i];
      };
      //below if target reaching destination, new destination is counted
      if (Math.abs(targets.coords[i][0] - targets.destinations[i][0]) && Math.abs(targets.coords[i][1] - targets.destinations[i][1]) < targets.speeds[i]) {
        targets.destinations[i][0] = game.random(targets.sizes[i], canvas.width - targets.sizes[i]);
        targets.destinations[i][1] = game.random(targets.sizes[i], canvas.height - targets.sizes[i]);
      };
    };
  },
};

let game = {
  ctx: canvas.getContext('2d'),
  random: function(min, max) { //include min, exclude max
    return Math.random() * (max - min) + min;
  },
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
      let mousePos = game._getMouseCoords(canvas, event);
      player.shoot(player.x, player.y, mousePos.x, mousePos.y);
  }, true);
  },
  drawPlayer: function() {
    game.ctx.beginPath();
    game.ctx.arc(player.x, player.y, player.radius, 0, Math.PI*2);
    game.ctx.stroke();
    game.ctx.closePath();
  },
  drawBullets: function() {
    player.updateBullets();
    for (let i in player.bullets) {
      game.ctx.fillStyle = 'red';
      game.ctx.beginPath();
      game.ctx.arc(player.bullets[i][0], player.bullets[i][1], bulletSize[i], 0, Math.PI*2);
      game.ctx.fill();
      game.ctx.closePath();
    };
  },
  drawTarget: function() {
    targets.updateTargets();
    for (let i in targets.coords) {
      game.ctx.fillStyle = 'lightblue';
      game.ctx.beginPath();
      game.ctx.arc(targets.coords[i][0], targets.coords[i][1], targets.sizes[i], 0, Math.PI*2);
      game.ctx.fill();
      game.ctx.closePath();
    };
  },
  drawFrame: function() {
    game.ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.ctx = canvas.getContext('2d');
    game.drawPlayer();
    game.drawBullets();
    game.drawTarget();
  },
}

// game process
game.init();
setInterval(game.drawFrame, 10);