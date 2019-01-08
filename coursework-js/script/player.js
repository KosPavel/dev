"use strict"

class Player {
  constructor(){
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;
    let perc = 2; //radius in % from map size
    this.radius = (window.innerHeight + window.innerWidth) * perc / (2 * 100);
  }
}