class Entity {
    constructor(sprite, x, y) {
     this.sprite = sprite;
     this.x = x;
     this.y = y;
     this.tileSize = 100;
    }
   
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(timeDelta, ctx) {
     // You should multiply any movement by the dt parameter
     // which will ensure the game runs at the same speed for
     // all computers.
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
    }
   
    // Draw the enemy on the screen, required method for game
    render(ctx) {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
   }
   
   class Enemy extends Entity {
    constructor(x, y) {
     super('images/enemy-bug.png', x, y);
    }
   }
   
   class Player extends Entity {
    constructor(x, y) {
     super('images/char-boy.png', x, y);
    }
   
    handleInput(keyCode) {
     switch (keyCode) {
      case 'left':
       this.x = this.x - this.tileSize;
       break;
      case 'up':
       this.y = this.y - this.tileSize;
       break;
      case 'right':
       this.x = this.x + this.tileSize;
       break;
      case 'down':
       this.y = this.y + this.tileSize;
       break;
      default:
       console.log('Invalid move');
     }
    }
   }
   
   
   // Now instantiate your objects.
   // Place all enemy objects in an array called allEnemies
   // Place the player object in a variable called player
   this.allEnemies = [];
   this.allEnemies.push(new Enemy(0, 0));
   this.player = new Player(300, 400);
   this.Engine = new Engine(document, window, player, allEnemies);
   
   // This listens for key presses and sends the keys to your
   // Player.handleInput() method. You don't need to modify this.
   document.addEventListener('keyup', function(e) {
    var allowedKeys = {
     37: 'left',
     38: 'up',
     39: 'right',
     40: 'down'
    };
   
    player.handleInput(allowedKeys[e.keyCode]);
   });