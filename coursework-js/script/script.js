function draw() {
      var canvas = document.getElementById("tutorial");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (10, 10, 55, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 55, 50);

        var c = canvas.getContext("2d");

        c.strokeRect(75, 25, 25, 25);

        let img = document.createElement("img");
        img.src = "img.png";
        img.addEventListener("load", () => {
          ctx.drawImage(img, 250, 110, 50, 50);
        }) //анимация 294 стр
      }
    }

draw();