/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make 
 * writing app.js a little simpler to work with.
 */

class Engine {
    constructor(doc, win, mainPlayer, enemies, gameSettings) {
     /* Predefine the variables we'll be using within this scope,
      * create the canvas element, grab the 2D context for that canvas
      * set the canvas elements height/width and add it to the DOM.
      */
   
     this.canvas = doc.createElement('canvas'),
      this.ctx = this.canvas.getContext('2d'),
      this.player = mainPlayer,
      this.win = win,
      this.allEnemies = enemies,
      this.gameSettings = gameSettings,
      this.isGameOver = false,
      this.lastTime;
   
     this.canvas.width = 505;
     this.canvas.height = 606;
     doc.body.appendChild(this.canvas);
   
     Resources.load([
      'images/stone-block.png',
      'images/water-block.png',
      'images/grass-block.png',
      'images/enemy-bug.png',
      'images/char-boy.png'
     ]);
   
     Resources.onReady(() => {
      this.init()
     });
    }
   
    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    main() {
     /* Get our time delta information which is required if your game
      * requires smooth animation. Because everyone's computer processes
      * instructions at different speeds we need a constant value that
      * would be the same for everyone (regardless of how fast their
      * computer is) - hurray time!
      */
     var now = Date.now(),
      dt = (now - this.lastTime) / 1000.0;
   
     /* Call our update/render functions, pass along the time delta to
      * our update function since it may be used for smooth animation.
      */
     this.update(dt);
     this.render();
   
     /* Set our lastTime variable which is used to determine the time delta
      * for the next time this function is called.
      */
     this.lastTime = now;
   
     /* Use the browser's requestAnimationFrame function to call this
      * function again as soon as the browser is able to draw another frame.
      */
     this.win.requestAnimationFrame(() => {
      this.main();
     });
    }
   
    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    init() {
     this.reset();
     this.lastTime = Date.now();
     this.main();
    }
   
    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    update(dt) {
      if(this.isGameOver){
        return;
      }

     this.updateEntities(dt);
     
     let innerThis = this
     let didPlayerCollide = false;
     
     this.allEnemies.forEach(function(enemy) {
      if(!didPlayerCollide){
        if(innerThis.isCollide(innerThis.player, enemy)){
          didPlayerCollide = true;
          innerThis.player.moveToStartingPosition();
          innerThis.renderMessage('You Lost!');
        }
      }
     });

     this.isGameOver = didPlayerCollide;
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    updateEntities(dt) {
     let innerThis = this;
   
     this.allEnemies.forEach(function(enemy) {
      enemy.update(dt, innerThis.ctx, innerThis.gameSettings.backgroundContext);
     });
     this.player.update(dt, innerThis.ctx);
    }
   
    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    render() {
      if(this.isGameOver){
        return;
      }

     var row, col;
   
     // Before drawing, clear existing canvas
     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
   
     /* Loop through the number of rows and columns we've defined above
      * and, using the rowImages array, draw the correct image for that
      * portion of the "grid"
      */
     for (row = 0; row < this.gameSettings.backgroundContext.numRows; row++) {
      for (col = 0; col < this.gameSettings.backgroundContext.numCols; col++) {
       /* The drawImage function of the canvas' context element
        * requires 3 parameters: the image to draw, the x coordinate
        * to start drawing and the y coordinate to start drawing.
        * We're using our Resources helpers to refer to our images
        * so that we get the benefits of caching these images, since
        * we're using them over and over.
        */
       this.ctx.drawImage(Resources.get(this.gameSettings.backgroundContext.rowImages[row]),
        col * (this.gameSettings.backgroundContext.spriteHeight - this.gameSettings.backgroundContext.spriteHeightPadding),
        row * (this.gameSettings.backgroundContext.spriteWidth - this.gameSettings.backgroundContext.spriteWidthPadding));
      }
     }
   
     this.renderEntities();
    }

    // Renders a message wihtin the canvas
    renderMessage(message){
      let yPadding = 220;
      let xPadding = 100;
      let modalWidth = this.canvas.width - (xPadding * 2);
      let modalHeight = this.canvas.height - (yPadding * 2);
      this.ctx.fillStyle = '#ffffff';
      this.ctx.lineWidth="2";
      this.ctx.strokeStyle="black";
      this.ctx.rect(xPadding, yPadding, modalWidth, modalHeight); 
      this.ctx.fillRect(xPadding, yPadding, modalWidth, modalHeight);
      this.ctx.stroke();

      this.ctx.fillStyle = '#000000';
      let fontSize = 20;
      this.ctx.font=`${fontSize}px Georgia`;
      this.ctx.fillText(message, xPadding + 25, yPadding + fontSize + (modalHeight / 3), modalWidth);
    }

    // Function originally from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    // Rewritten to match the position structure of entities and made it more readable
    isCollide(player, enemy) {
      let enemyArea = enemy.getDrawnArea();
      let playerArea = player.getDrawnArea();

      let enemyWidthCollision = playerArea.x < enemyArea.x + enemyArea.width;
      let playerWithCollision = playerArea.x + playerArea.width > enemyArea.x;
      let enemyHeightCollision = playerArea.y < enemyArea.y + enemyArea.height;      
      let playerHeightCollision = playerArea.height + playerArea.y > enemyArea.y;

      let didCollide = enemyWidthCollision && playerWithCollision && enemyHeightCollision && playerHeightCollision;
      
      if(window.isDebugMode){
        if(didCollide){
          console.log(`enemyWidthCollision(${enemyWidthCollision})`);
          console.log(`playerWithCollision(${playerWithCollision})`);
          console.log(`enemyHeightCollision(${enemyHeightCollision})`);
          console.log(`playerHeightCollision(${playerHeightCollision})`);
          console.log("===================================")

          player.isColliding = true;
          enemy.isColliding = true;
        } else{
          player.isColliding = false;
          enemy.isColliding = false;
        }
      }
      
      return didCollide;
  }
   
    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    renderEntities() {
     /* Loop through all of the objects within the allEnemies array and call
      * the render function you have defined.
      */
     let innerThis = this;
     this.allEnemies.forEach(function(enemy) {
      enemy.render(innerThis.ctx);
     });
   
     this.player.render(innerThis.ctx);
    }
   
    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    reset() {
     // noop
    }
   
    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
   }