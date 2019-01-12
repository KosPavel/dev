"use strict"

class Player {
  constructor(){
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;
    let perc = 2; //radius in % from map size
    this.radius = (window.innerHeight + window.innerWidth) * perc / (2 * 100);
    this.step = 2; //step for move()
  }

  // move(){
  // 	document.addEventListener('keydown', function(e) {
  // 		if (e.keyCode === '87') { //w
  //       this.y -= this.step;
  //     } else if (e.keyCode === '83') { //s
  //       this.y += this.step;
  //     } else if (e.keyCode === '65') { //a
  //       this.x -= this.step;
  //     } else if (e.keyCode === '68') { //d
  //       this.x += this.step;
  //     };
  // 	}, false)
  // }
}