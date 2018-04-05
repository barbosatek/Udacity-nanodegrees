class Player extends Entity {
    constructor(x, y, gameSettings) {
     super('images/char-boy.png', x, y, gameSettings);
    }

    // Determines weather or not entity can move to the desired location.
    canMove(x, y){
      let shouldMove = true;
      if(x < 0 || y < 0){
        shouldMove = false;
      }

      let totalHeight = this.gameSettings.backgroundSpriteHeight * this.gameSettings.numRows;
      if(y + this.gameSettings.player.spriteHeight > totalHeight){
        shouldMove = false;
      }

      let totalWidth = this.gameSettings.backgroundSpriteWidth * this.gameSettings.numCols;
      if(x > totalWidth){
        shouldMove = false;
      }

      console.log('Total Height: ' + totalHeight)
      console.log('Total Width: ' + totalWidth)
      console.log('Current Position(X:' + this.x + ', y:' + this.y + ')')
      console.log('Dest Position(X:' + x + ', y:' + y + ')')
      console.log('=======================================')

      return shouldMove;
    }
   
    handleInput(keyCode) {
     switch (keyCode) {
      case 'left':
        var x = this.currentLocation.x - this.gameSettings.backgroundSpriteHeight;
        if(this.canMove(x, this.currentLocation.y)){
            this.currentLocation.x = x;
        }
        break;
       
      case 'up':
      var y = this.currentLocation.y - this.gameSettings.backgroundSpriteWidth;
        if(this.canMove(this.currentLocation.x, y)){
            this.currentLocation.y = y;
        }
        break;

      case 'right':
      var x = this.currentLocation.x + this.gameSettings.backgroundSpriteHeight;
        if(this.canMove(x, this.currentLocation.y)){
            this.currentLocation.x = x
        }
        break;
      case 'down':
      var y = this.currentLocation.y + this.gameSettings.backgroundSpriteWidth;
      if(this.canMove(this.currentLocation.x, y)){
        this.currentLocation.y = y;
      }
       
       break;
      default:
       console.log('Invalid move');
     }
    }
   }