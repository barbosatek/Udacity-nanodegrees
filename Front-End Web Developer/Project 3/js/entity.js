class Entity {
    constructor(sprite, x, y, width, height) {
     this.sprite = sprite;
     this.x = x;
     this.y = y;
     this.width = width;
     this.height = height;
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
      return true;
    }
   }
