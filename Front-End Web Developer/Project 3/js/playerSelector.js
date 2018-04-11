class PlayerSelector {
    constructor(doc, win, sprites, onPlayerSelected) {
      (this.canvas = document.createElement("canvas")),
        (this.win = win),
        (this.doc = doc),
        (this.ctx = this.canvas.getContext("2d"));
  
      this.canvas.width = 550;
      this.canvas.height = 400;
      this.currentSelection = 0;
      this.players = sprites;
      this.doc.body.appendChild(this.canvas);
      this.onPlayerSelected = onPlayerSelected;
  
      this.doc.addEventListener("keyup", e => this.handleUserSelection(e));
  
      this.main();
    }
  
    handleUserSelection(event) {
      var allowedKeys = {
        37: "left",
        39: "right",
        13: "enter"
      };
  
      let keyCode = allowedKeys[event.keyCode];
      switch (keyCode) {
        case "enter":
          this.doc.removeEventListener("keyup", this.handleUserSelection);
          this.doc.body.removeChild(this.canvas);
          this.onPlayerSelected(this.players[this.currentSelection]);
          break;
  
        case "left":
          if (this.currentSelection == 0) {
            this.currentSelection = this.players.length;
          }
          this.currentSelection-- % this.players.length;
          break;
  
        case "right":
          this.currentSelection =
            (this.currentSelection + 1) % this.players.length;
          break;
  
        default:
          console.log("Invalid move");
      }
    }
  
    main() {
      this.render();
  
      /* Use the browser's requestAnimationFrame function to call this
                * function again as soon as the browser is able to draw another frame.
                */
      this.win.requestAnimationFrame(() => {
        this.main();
      });
    }
  
    render() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = "#A9E9E9";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  
      // Render text
      this.ctx.fillStyle = "#000000";
      let fontSize = 30;
      this.ctx.font = `${fontSize}px Georgia`;
      this.ctx.fillText(
        "Select player, then press enter.",
        40,
        40,
        this.canvas.width
      );
  
      let x, y;
      x = 25;
      y = 100;
      for (let i = 0; i < this.players.length; i++) {
        let player = this.players[i];
  
        // Draw image
        let resource = Resources.get(player);
        this.ctx.drawImage(resource, x, y);
  
        // Draw border
        if (i == this.currentSelection) {
          this.ctx.strokeStyle = "black";
          this.ctx.lineWidth = "2";
          this.ctx.strokeRect(x, y, resource.width, resource.height);
        }
  
        x += resource.width;
      }
    }
  }
  