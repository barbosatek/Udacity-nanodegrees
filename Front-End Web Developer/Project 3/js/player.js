class Player extends Entity {
    constructor(x, y, gameSettings, width, height) {
     super('images/char-boy.png', x, y, gameSettings, width, height);
    }

    // Determines weather or not entity can move to the desired location.
    canMove(x, y, backgroundContext){
      let shouldMove = true;
      if(x < 0 || y < 0){
        shouldMove = false;
      }

      let totalHeight = backgroundContext.height * backgroundContext.numRows;
      if(y + this.sprite.height > totalHeight){
        shouldMove = false;
      }

      let totalWidth = backgroundContext.width * backgroundContext.numCols;
      if(x > totalWidth){
        shouldMove = false;
      }

      console.log('Total Height: ' + totalHeight)
      console.log('Total Width: ' + totalWidth)
      console.log('Current Position(X:' + this.currentLocation.x + ', y:' + this.currentLocation.y + ')')
      console.log('Dest Position(X:' + x + ', y:' + y + ')')
      console.log('=======================================')

      return shouldMove;
    }
   
    handleInput(keyCode, backgroundContext) {
     switch (keyCode) {
      case 'left':
        var x = this.currentLocation.x - backgroundContext.height;
        if(this.canMove(x, this.currentLocation.y, backgroundContext)){
            this.currentLocation.x = x;
        }
        break;
       
      case 'up':
      var y = this.currentLocation.y - backgroundContext.width;
        if(this.canMove(this.currentLocation.x, y, backgroundContext)){
            this.currentLocation.y = y;
        }
        break;

      case 'right':
      var x = this.currentLocation.x + backgroundContext.height;
        if(this.canMove(x, this.currentLocation.y, backgroundContext)){
            this.currentLocation.x = x
        }
        break;
      case 'down':
      var y = this.currentLocation.y + backgroundContext.width;
      if(this.canMove(this.currentLocation.x, y, backgroundContext)){
        this.currentLocation.y = y;
      }
       
       break;
      default:
       console.log('Invalid move');
     }
    }
   }