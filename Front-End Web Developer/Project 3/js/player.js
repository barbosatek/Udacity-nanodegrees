class Player extends Entity {
    constructor(x, y, width, height) {
     super('images/char-boy.png', x, y, width, height);
     this.startingPosition = {
       x,y
     };
    }

    // Moves the player's position to its starting position
    moveToStartingPosition(){
      this.currentLocation.x = this.startingPosition.x;
      this.currentLocation.y = this.startingPosition.y;
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
        var x = this.currentLocation.x - backgroundContext.spriteWidth;
        if(this.canMove(x, this.currentLocation.y, backgroundContext)){
            this.currentLocation.x = x;
        }
        break;
       
      case 'up':
      var y = this.currentLocation.y - backgroundContext.spriteHeight;
        if(this.canMove(this.currentLocation.x, y, backgroundContext)){
            this.currentLocation.y = y;
        }
        break;

      case 'right':
      var x = this.currentLocation.x + backgroundContext.spriteWidth;
        if(this.canMove(x, this.currentLocation.y, backgroundContext)){
            this.currentLocation.x = x
        }
        break;
      case 'down':
      var y = this.currentLocation.y + backgroundContext.spriteHeight;
      if(this.canMove(this.currentLocation.x, y, backgroundContext)){
        this.currentLocation.y = y;
      }
       
       break;
      default:
       console.log('Invalid move');
     }
    }
   }