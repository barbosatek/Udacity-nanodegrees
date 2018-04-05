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

      let totalHeight = this.gameSettings.spriteHeight * this.gameSettings.numRows;
      if(y + this.gameSettings.player.spriteHeight > totalHeight){
        shouldMove = false;
      }

      let totalWidth = this.gameSettings.spriteWidth * this.gameSettings.numCols;
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
        var x = this.x - this.gameSettings.spriteHeight;
        if(this.canMove(x, this.y)){
            this.x = x;
        }
        break;
       
      case 'up':
      var y = this.y - this.gameSettings.spriteWidth;
        if(this.canMove(this.x, y)){
            this.y = y;
        }
        break;

      case 'right':
      var x = this.x + this.gameSettings.spriteHeight;
        if(this.canMove(x, this.y)){
            this.x = x
        }
        break;
      case 'down':
      var y = this.y + this.gameSettings.spriteWidth;
      if(this.canMove(this.x, y)){
        this.y = y;
      }
       
       break;
      default:
       console.log('Invalid move');
     }
    }
   }