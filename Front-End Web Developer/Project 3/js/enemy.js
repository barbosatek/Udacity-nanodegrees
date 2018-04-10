// Defines an Enemy
class Enemy extends Entity {
    constructor(sprite, x, y, velocity) {
      super(sprite, x, y);
      this.velocity = velocity;
    }
  
    // Determines weather or not the current position is within limits
    isPositionWithinLimits(backgroundContext) {
      return this.currentLocation.x - this.sprite.width >
        backgroundContext.totalWidth
        ? false
        : true;
    }
  
    // Gets the actual enemy's drawn area.
    getDrawnArea() {
      var resource = Resources.get(this.sprite.path);
      return {
        x: this.currentLocation.x,
        y: this.currentLocation.y + this.sprite.heightPadding,
        width: resource.width,
        height: resource.height - this.sprite.heightPadding - 20
      };
    }
  
    // Update the enemy's position, required method for game
    // Parameter: timeDelta, a time delta between ticks
    // Parameter: backgroundContext, the background values.
    update(timeDelta, backgroundContext) {
      if (this.isPositionWithinLimits(backgroundContext)) {
        this.currentLocation.x =
          this.currentLocation.x + timeDelta * this.velocity;
      } else {
        this.currentLocation.x = 0 - this.sprite.width;
      }
    }
  }
  