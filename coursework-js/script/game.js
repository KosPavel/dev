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
var step = 5; //move per tick

//bullet settings
const BULLET_SPEED = 5;
const MAX_BULLETS = 3; //no new bullets max on canvas
const BULLET_SIZE = (window.innerHeight + window.innerWidth) * 0.5 / (2 * 100);

//targets settings
const MAX_TARGETS = 3;
const MIN_TARGET_SPEED = 1;
const MAX_TARGET_SPEED = 5;
const MIN_TARGET_SIZE = 2;
const MAX_TARGET_SIZE = 5;

let player = {
  x: window.innerWidth/2,
  y: window.innerHeight/2,
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

let bullets = {
  x: [],
  y: [],
  directions: [],
  size: BULLET_SIZE,
  updateBullets: function() {
    if (bullets.x.length !== 0) {
      for (let i in bullets.x) {
        bullets.x[i] += BULLET_SPEED * Math.cos(bullets.directions[i]*Math.PI/180);
        bullets.y[i] += BULLET_SPEED * Math.sin(bullets.directions[i]*Math.PI/180);
        //if bullet left canvas - remove
        if (bullets.x[i] >= canvas.width || bullets.x[i] <= 0 || bullets.y[i] >= canvas.height || bullets.y[i] <= 0) {
          bullets.x.splice(i, 1);
          bullets.y.splice(i, 1);
          bullets.directions.splice(i, 1);
        };
      };
    };
  },
  shotListener: function(aim) {
    if (bullets.x.length !== MAX_BULLETS) {
      bullets.x.push(player.x);
      bullets.y.push(player.y);
      if (player.y <= aim.y) {
        bullets.directions.push(Math.acos((aim.x-player.x)/Math.sqrt((aim.x-player.x)**2+(aim.y-player.y)**2))*180/Math.PI);
      } else {
        bullets.directions.push(360-Math.acos((aim.x-player.x)/Math.sqrt((aim.x-player.x)**2+(aim.y-player.y)**2))*180/Math.PI);
      }
    }
  },
};

let game = {
  ctx: canvas.getContext('2d'),
  score: 0,
  random: function(min, max) { //include min, exclude max
    return Math.random() * (max - min) + min;
  },
  init: function() {
    player.moveListener();
    game.mouseListener();
  },
  _getMouseCoords: function(canvas, event) { //get mouse coords {x,y}
    let rect = canvas.getBoundingClientRect();
    let aim = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      };
    return bullets.shotListener(aim);
  },
  mouseListener: function() {
    window.addEventListener('mousedown', function(event) {
      game._getMouseCoords(canvas, event);
  }, true);
  },
  drawPlayer: function() {
    game.ctx.beginPath();
    game.ctx.arc(player.x, player.y, player.radius, 0, Math.PI*2);
    game.ctx.stroke();
    game.ctx.closePath();
  },
  drawBullets: function() {
    bullets.updateBullets();
    for (let i in bullets.x) {
      game.ctx.fillStyle = 'red';
      game.ctx.beginPath();
      game.ctx.arc(bullets.x[i], bullets.y[i], bullets.size, 0, Math.PI*2);
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
  checkHit: function() {
    for (let i in targets.coords) {
      for (let j in bullets.x) {
        if ((bullets.x[j] <= targets.coords[i][0]+targets.sizes[i]+bullets.size)&&(bullets.x[j] >= targets.coords[i][0]-targets.sizes[i]+bullets.size)&&(bullets.y[j] <= targets.coords[i][1]+targets.sizes[i]+bullets.size)&&(bullets.y[j] >= targets.coords[i][1]-targets.sizes[i]+bullets.size)) {
          bullets.x.splice(j,1);
          bullets.y.splice(j,1);
          bullets.directions.splice(j,1);
          targets.coords.splice(i,1);
          targets.sizes.splice(i,1);
          targets.destinations.splice(i,1);
          targets.speeds.splice(i,1);
          game.score += 1;
        }
      }
    }
  },
  showScore: function() {
    game.ctx.font = "48px serif";
    game.ctx.textBaseline = "hanging";
    game.ctx.strokeText("your score: " + game.score, 0, 0);
  },
  drawFrame: function() {
    game.ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.ctx = canvas.getContext('2d');
    game.drawPlayer();
    game.drawBullets();
    game.drawTarget();
    game.checkHit();
    game.showScore();
  },
}

// game process
game.init();
setInterval(game.drawFrame, 10);