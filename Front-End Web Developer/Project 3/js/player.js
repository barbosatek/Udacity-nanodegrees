class Player extends Entity {
    constructor(sprite, x, y) {
     super(sprite, x, y);
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
      if(x < 0 || y < -backgroundContext.spriteHeightPadding){
        shouldMove = false;
      }

      if(y + this.sprite.height > backgroundContext.totalHeight){
        shouldMove = false;
      }

      if(x > backgroundContext.totalWidth){
        shouldMove = false;
      }

      if(window.isDebugMode){
        console.log('Total Height: ' + backgroundContext.totalHeight)
        console.log('Total Width: ' + backgroundContext.totalWidth)
        console.log('Current Position(X:' + this.currentLocation.x + ', y:' + this.currentLocation.y + ')')
        console.log('Dest Position(X:' + x + ', y:' + y + ')')
        console.log('=======================================')
      }
      
      return shouldMove;
    }
   
    getDrawnArea(){
      var resource = Resources.get(this.sprite.path);
      return {
          x:this.currentLocation.x,
          y:this.currentLocation.y + this.sprite.heightPadding - 8,
          width: resource.width,
          height: resource.height - this.sprite.heightPadding - 20
      }
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
      var y = this.currentLocation.y - (backgroundContext.spriteHeight - backgroundContext.spriteHeightPadding) + backgroundContext.spriteWidthPadding;
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
      var y = this.currentLocation.y + (backgroundContext.spriteHeight - backgroundContext.spriteHeightPadding) - backgroundContext.spriteWidthPadding;
      if(this.canMove(this.currentLocation.x, y, backgroundContext)){
        this.currentLocation.y = y;
      }
       
       break;
      default:
       console.log('Invalid move');
     }
    }
   }