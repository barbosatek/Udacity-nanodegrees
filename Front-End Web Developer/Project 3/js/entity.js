class Entity {
    constructor(sprite, x, y) {
     this.sprite = sprite;
     this.isColliding = false;
     this.currentLocation = {
        x: x,
        y: y
    }

    // Random color generator from https://www.paulirish.com/2009/random-hex-color-code-snippets/
    this.fillColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    }
   
    // Update the enemy's position, required method for game
    // Parameter: timeDelta, a time delta between ticks
    update(timeDelta, ctx) {
    }

    // Draw the enemy on the screen, required method for game
    render(ctx, rotateImage) {
        var resource = Resources.get(this.sprite.path);
        if(window.isDebugMode && this.isColliding){
            var coveredArea = this.getDrawnArea();
            ctx.fillStyle = this.fillColor;
            ctx.fillRect(coveredArea.x, coveredArea.y, coveredArea.width, coveredArea.height);
        } else{
            ctx.drawImage(Resources.get(this.sprite.path),
            this.currentLocation.x,
            this.currentLocation.y,
            this.sprite.width,
            this.sprite.height);
        }
    }
   }
