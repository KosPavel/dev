"use strict"

//do: img в html?


class Game{
  constructor(){
    this.createField();
    //init canvas for future usage
    this.canvas = document.getElementsByTagName("canvas")[0];
    this.createPlayer();
    
    setInterval(this.drawPlayer, 10);
  }
  createField(){
    let body = document.getElementsByTagName("body")[0];
    body.innerHTML = "<canvas></canvas>";
    let canvas = document.getElementsByTagName("canvas")[0];
    canvas.style.border = "1px solid black";
    let scrollSize = 25;
    let height = window.innerHeight;
    let width = window.innerWidth;
    canvas.height = height - scrollSize;
    canvas.width = width - scrollSize;

    //load map
    let img = new Image(width, height);
    img.onload = function(){
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    }
    img.src = "field/field.png";
  }
  createPlayer(){
    this.player = new Player();
    this.playerShape = this.canvas.getContext("2d");
    this.playerShape.beginPath();
    this.playerShape.arc(this.player.x, this.player.y, this.player.radius, 0, Math.PI*2, 1);
    this.playerShape.stroke();
  }
  // drawPlayer(){
  //   this.playerShape.beginPath();
  //   this.playerShape.arc(this.player.x, this.player.y, this.player.radius, 0, Math.PI*2, 1);
  //   this.playerShape.stroke();
  // }
}

let game = new Game();