class Entity {
    constructor(sprite, x, y) {
     this.sprite = sprite;
     this.currentLocation = {
         x: x,
         y: y
     }
    }
   
    // Update the enemy's position, required method for game
    // Parameter: timeDelta, a time delta between ticks
    update(timeDelta, ctx) {
    }

    // Draw the enemy on the screen, required method for game
    render(ctx, rotateImage) {
        ctx.drawImage(Resources.get(this.sprite.path),
            this.currentLocation.x,
            this.currentLocation.y,
            this.sprite.width,
            this.sprite.height);
    }
   }
