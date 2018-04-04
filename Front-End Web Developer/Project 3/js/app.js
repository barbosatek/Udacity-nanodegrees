// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const gameSettings = {
  spriteWidth: 83,
  spriteHeight: 101
}
this.allEnemies = [];
this.allEnemies.push(new Enemy(0, 0, gameSettings.spriteWidth, gameSettings.spriteHeight));
this.player = new Player(gameSettings.spriteHeight * 3, gameSettings.spriteWidth * 3, gameSettings.spriteWidth, gameSettings.spriteHeight);
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