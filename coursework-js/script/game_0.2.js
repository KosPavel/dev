"use strict"

//do: img в html?


class Game{
  constructor(){
    this.createField();
  }
  createField(){
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
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
  }
  createPlayer(){
    this.player = new Player();
    this.playerShape = this.canvas.getContext("2d");
    this.playerShape.beginPath();
    this.playerShape.arc(this.player.x, this.player.y, this.player.radius, 0, Math.PI*2, 1);
    this.playerShape.stroke();
  }
}

let game = new Game();