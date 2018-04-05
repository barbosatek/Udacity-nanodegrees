// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const gameSettings = {
  spriteWidth: 83,
  spriteHeight: 101,
  rowImages: [
    'images/water-block.png', // Top row is water
    'images/stone-block.png', // Row 1 of 3 of stone
    'images/stone-block.png', // Row 2 of 3 of stone
    'images/stone-block.png', // Row 3 of 3 of stone
    'images/grass-block.png', // Row 1 of 2 of grass
    'images/grass-block.png' // Row 2 of 2 of grass
   ],
   numRows: 6,
   numCols: 5,
   player: {
    spriteWidth: 101,
    spriteHeight: 201
   }
}

this.allEnemies = [];
this.allEnemies.push(new Enemy(0, 0, gameSettings));
this.player = new Player(gameSettings.spriteHeight * 3, gameSettings.spriteWidth * 3, gameSettings);
this.Engine = new Engine(document, window, player, allEnemies, gameSettings);

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