let background = {
  spriteWidth: 101,
  spriteHeight: 171,
  spriteHeightPadding: 70,
  spriteWidthPadding: 18,
  numRows: 6,
  numCols: 5
}

const gameSettings = {
   backgroundContext: {
    spriteWidth: background.spriteWidth,
    spriteHeight: background.spriteHeight,
    totalHeight: (background.spriteHeight - background.spriteHeightPadding) * background.numRows,
    totalWidth: (background.spriteWidth - background.spriteWidthPadding) * background.numCols,
    spriteHeightPadding: background.spriteHeightPadding,
    spriteWidthPadding: background.spriteWidthPadding,
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

var getPosition = (col, row) => {
  let x = gameSettings.backgroundContext.spriteWidth * col;
  let y = (gameSettings.backgroundContext.spriteHeight - gameSettings.backgroundContext.spriteHeightPadding) * row;
  
  return {
    x,
    y
  }
}

let playerPosition = getPosition(1,4);

this.playerSprite = new Sprite('images/char-boy.png', gameSettings.player.spriteWidth, gameSettings.player.spriteHeight, 18, 70)
this.enemySprite = new Sprite('images/enemy-bug.png', gameSettings.player.spriteWidth, gameSettings.player.spriteHeight, 18, 70)

this.allEnemies = [];
this.allEnemies.push(new Enemy(this.enemySprite, 0, 0, 2));
this.allEnemies.push(new Enemy(this.enemySprite, 0, gameSettings.backgroundContext.spriteWidth * 2, 3));

this.player = new Player(this.playerSprite, playerPosition.x, playerPosition.y);
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