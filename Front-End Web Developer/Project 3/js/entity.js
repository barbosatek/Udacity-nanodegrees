class Entity {
    constructor(sprite, x, y, gameSettings) {
     this.sprite = sprite;
     this.x = x;
     this.y = y;
     this.gameSettings = gameSettings;
     //this.width = gameSettings.spriteWidth;
     //this.height = gameSettings.spriteHeight;
    }
   
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(timeDelta, ctx) {
     // You should multiply any movement by the dt parameter
     // which will ensure the game runs at the same speed for
     // all computers.
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
    }
   
    // Draw the enemy on the screen, required method for game
    render(ctx) {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Determines weather or not entity can move to the desired location.
    canMove(x, y){
      if(x < 0 || y < 0){
        return false;
      }

      let border = this.gameSettings.spriteHeight * this.gameSettings.numRows;
      console.log('Total Height: ' + border)
      console.log('Current Position(X:' + x + ', y:' + y + ')')
      
      if(y + this.gameSettings.spriteHeight > border){
        return false;
      }

      return true;
    }
   }
