// Definies game static values and creates playe,
// enemies, engine and runs game.
class App {
  constructor(playerSpritePath) {
    const background = {
      spriteWidth: 101,
      spriteHeight: 171,
      spriteHeightPadding: 70,
      spriteWidthPadding: 18,
      numRows: 6,
      numCols: 5
    };

    this.gameSettings = {
      backgroundContext: {
        spriteWidth: background.spriteWidth,
        spriteHeight: background.spriteHeight,
        totalHeight:
          (background.spriteHeight - background.spriteHeightPadding) *
          background.numRows,
        totalWidth:
          (background.spriteWidth - background.spriteWidthPadding) *
          background.numCols,
        spriteHeightPadding: background.spriteHeightPadding,
        spriteWidthPadding: background.spriteWidthPadding,
        rowImages: [
          "images/water-block.png", // Top row is water
          "images/stone-block.png", // Row 1 of 3 of stone
          "images/stone-block.png", // Row 2 of 3 of stone
          "images/stone-block.png", // Row 3 of 3 of stone
          "images/grass-block.png", // Row 1 of 2 of grass
          "images/grass-block.png" // Row 2 of 2 of grass
        ],
        numRows: background.numRows,
        numCols: background.numCols
      },
      player: {
        spriteWidth: background.spriteWidth,
        spriteHeight: background.spriteHeight
      }
    };

    this.playerSprite;
    this.player;
    this.allEnemies = [];

    this.addPlayer(2, 4, playerSpritePath);

    this.addEnemy(0, 1);
    this.addEnemy(0, 2);
    this.addEnemy(0, 3);

    this.Engine = new Engine(
      document,
      window,
      this.player,
      this.allEnemies,
      this.gameSettings
    );

    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
    let innerThis = this;
    document.addEventListener("keyup", function(e) {
      var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
      };

      innerThis.player.handleInput(
        allowedKeys[e.keyCode],
        innerThis.gameSettings.backgroundContext
      );
    });
  }

  // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  // Generates a random number given min and max.
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  // Adds an enemy given its initial location.
  addEnemy(col, row) {
    let x = this.gameSettings.backgroundContext.spriteWidth * col;
    let y = 0;
    let velocity = this.getRandomIntInclusive(50, 300);

    if (row == 0) {
      y = 0 - this.gameSettings.backgroundContext.spriteWidthPadding;
    } else {
      y =
        (this.gameSettings.backgroundContext.spriteHeight -
          this.gameSettings.backgroundContext.spriteHeightPadding -
          this.gameSettings.backgroundContext.spriteWidthPadding * 1) *
        row;

      y = y - this.gameSettings.backgroundContext.spriteWidthPadding;
    }

    let enemySprite = new Sprite(
      "images/enemy-bug.png",
      this.gameSettings.player.spriteWidth,
      this.gameSettings.player.spriteHeight,
      this.gameSettings.backgroundContext.spriteWidthPadding,
      this.gameSettings.backgroundContext.spriteHeightPadding
    );
    this.allEnemies.push(new Enemy(enemySprite, x, y, velocity));
  }

  // Add the player given its initial location.
  addPlayer(col, row, spritePath) {
    let x = this.gameSettings.backgroundContext.spriteWidth * col;
    let y =
      (this.gameSettings.backgroundContext.spriteHeight -
        this.gameSettings.backgroundContext.spriteHeightPadding) *
      row;

    let playerSprite = new Sprite(
      spritePath,
      this.gameSettings.player.spriteWidth,
      this.gameSettings.player.spriteHeight,
      this.gameSettings.backgroundContext.spriteWidthPadding,
      this.gameSettings.backgroundContext.spriteHeightPadding
    );
    this.player = new Player(playerSprite, x, y);
  }
}

window.isDebugMode = false;
Resources.load([
  "images/stone-block.png",
  "images/water-block.png",
  "images/grass-block.png",
  "images/enemy-bug.png",
  "images/char-boy.png",
  "images/char-cat-girl.png",
  "images/char-horn-girl.png",
  "images/char-pink-girl.png",
  "images/char-princess-girl.png"
]);

Resources.onReady(() => {
  let playerSelector = new PlayerSelector(document,
    window,
    ["images/char-boy.png",
    "images/char-cat-girl.png",
    "images/char-horn-girl.png",
    "images/char-pink-girl.png",
    "images/char-princess-girl.png",
  ], (path) => {
    let app = new App(path);
  });
});
