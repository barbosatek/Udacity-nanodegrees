class Entity {
    constructor(sprite, x, y, gameSettings) {
     this.sprite = sprite;
     this.x = x;
     this.y = y;
     this.gameSettings = gameSettings;
    }
   
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(timeDelta, ctx) {
     // You should multiply any movement by the dt parameter
     // which will ensure the game runs at the same speed for
     // all computers.
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.gameSettings.player.spriteWidth, this.gameSettings.player.spriteHeight)
    }
   
    // Draw the enemy on the screen, required method for game
    render(ctx) {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.gameSettings.player.spriteWidth, this.gameSettings.player.spriteHeight);
    }
   }
