class Player extends Entity {
    constructor(x, y, width, height) {
     super('images/char-boy.png', x, y, width, height);
    }
   
    handleInput(keyCode) {
     switch (keyCode) {
      case 'left':
        var x = this.x - this.height;
        if(this.canMove(x, this.y)){
            this.x = x;
        }
        break;
       
      case 'up':
      var y = this.y - this.width;
        if(this.canMove(this.x, y)){
            this.y = y;
        }
        break;

      case 'right':
      var x = this.x + this.height;
        if(this.canMove(x, this.y)){
            this.x = x
        }
        break;
      case 'down':
      var y = this.y + this.width;
      if(this.canMove(this.x, y)){
        this.y = y;
      }
       
       break;
      default:
       console.log('Invalid move');
     }
    }
   }