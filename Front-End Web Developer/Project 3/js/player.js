class Player extends Entity {
    constructor(x, y, width, height) {
     super('images/char-boy.png', x, y, width, height);
    }

    // Determines weather or not entity can move to the desired location.
    canMove(x, y, backgroundContext){
      let shouldMove = true;
      if(x < 0 || y < 0){
        shouldMove = false;
      }

      if(y + this.sprite.height > backgroundContext.totalHeight){
        shouldMove = false;
      }

      if(x > backgroundContext.totalWidth){
        shouldMove = false;
      }

      return shouldMove;
    }
   
    handleInput(keyCode, backgroundContext) {
     switch (keyCode) {
      case 'left':
        var x = this.currentLocation.x - backgroundContext.spriteHeight;
        if(this.canMove(x, this.currentLocation.y, backgroundContext)){
            this.currentLocation.x = x;
        }
        break;
       
      case 'up':
      var y = this.currentLocation.y - backgroundContext.spriteWidth;
        if(this.canMove(this.currentLocation.x, y, backgroundContext)){
            this.currentLocation.y = y;
        }
        break;

      case 'right':
      var x = this.currentLocation.x + backgroundContext.spriteHeight;
        if(this.canMove(x, this.currentLocation.y, backgroundContext)){
            this.currentLocation.x = x
        }
        break;
      case 'down':
      var y = this.currentLocation.y + backgroundContext.spriteWidth;
      if(this.canMove(this.currentLocation.x, y, backgroundContext)){
        this.currentLocation.y = y;
      }
       
       break;
      default:
       console.log('Invalid move');
     }
    }
   }