class Entity {
    constructor(spritePath, x, y, width, height) {
     this.spritePath = spritePath;
     this.sprite = {
         path: spritePath,
         width: width,
         height: height
     }
     this.currentLocation = {
         x: x,
         y: y
     }
    }
   
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(timeDelta, ctx) {
     // You should multiply any movement by the dt parameter
     // which will ensure the game runs at the same speed for
     // all computers.
     ctx.drawImage(Resources.get(this.sprite.path), this.currentLocation.x, this.currentLocation.y, this.sprite.width, this.sprite.height)
    }
   
    // Draw the enemy on the screen, required method for game
    render(ctx) {
     ctx.drawImage(Resources.get(this.sprite.path), this.currentLocation.x, this.currentLocation.y, this.sprite.width, this.sprite.height);
    }
   }
