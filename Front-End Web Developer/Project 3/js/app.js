let background = {
  spriteWidth: 83,
  spriteHeight: 101,
  numRows: 6,
  numCols: 5
}

const gameSettings = {
   backgroundContext: {
    spriteWidth: background.spriteWidth,
    spriteHeight: background.spriteHeight,
    totalHeight: background.spriteHeight * background.numRows,
    totalWidth: background.spriteWidth * background.numCols,
    rowImages: [
      'images/water-block.png', // Top row is water
      'images/stone-block.png', // Row 1 of 3 of stone
      'images/stone-block.png', // Row 2 of 3 of stone
      'images/stone-block.png', // Row 3 of 3 of stone
      'images/grass-block.png', // Row 1 of 2 of grass
      'images/grass-block.png' // Row 2 of 2 of grass
     ],
     numRows: background.numRows,
     numCols: background.numCols
   },
   player: {
    spriteWidth: 101,
    spriteHeight: 171
   }
}

this.allEnemies = [];
this.allEnemies.push(new Enemy(0, 0, gameSettings.player.spriteWidth, gameSettings.player.spriteHeight, 2));
this.allEnemies.push(new Enemy(0, gameSettings.backgroundContext.spriteWidth * 2, gameSettings.player.spriteWidth, gameSettings.player.spriteHeight, 3));
this.player = new Player(gameSettings.backgroundContext.spriteHeight * 3, gameSettings.backgroundContext.spriteWidth * 3, gameSettings.player.spriteWidth, gameSettings.player.spriteHeight);
this.Engine = new Engine(document, window, player, allEnemies, gameSettings, gameSettings);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode], gameSettings.backgroundContext);
});