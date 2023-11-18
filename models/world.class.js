/**
 * Represents the game world, managing characters, objects, and game dynamics.
 */
class World {
   character = new Character();
   bottle = new ThrowableObject();
   level = level1;
   canvas;
   ctx;
   keyboard;
   camera_x = 0;
   statusBar = new StatusBar();
   statusBarEndboss = new StatusBarEndboss();
   statusBarBottle = new StatusBarBottle();
   statusBarCoin = new StatusBarCoin();
   throwableObject = [];
   audioVolume = false;
   coinsCollected = 0;
   bottlesCollected = 0;
   canThrowBottle = true;

   /**
    * Constructs a World instance.
    * Initializes the game canvas, sets up the game world, and starts the game loop.
    * @param {HTMLCanvasElement} canvas - The canvas element used for drawing the game.
    * @param {Keyboard} keyboard - The keyboard input handler.
    * @param {boolean} audioVolume - The initial state of audio volume in the game.
    */
   constructor(canvas, keyboard, audioVolume) {
      this.ctx = canvas.getContext('2d');
      this.canvas = canvas;
      this.keyboard = keyboard;
      this.audioVolume = audioVolume;
      this.draw();
      this.setWorld();
      this.run();
   }

   /**
    * Sets the world reference in the character.
    */
   setWorld() {
      this.character.world = this;
   }

   /**
    * Starts the game loop, checking for collisions and handling game dynamics.
    */
   run() {
      setInterval(() => {
         this.checkCollisionWithEnemies();
         this.checkCollisionWithCharacterAndEndboss();
         this.checkCollisionWithCoins();
         this.checkCollisionWithBottles();
         this.checkThrowObjects();
         this.checkCollisionWithThrowableObjects();
         this.checkCollisionWithBottleAndEndboss();
      }, 50);
   }

   /**
    * Checks for collisions between the character and enemies and handles them.
    */
   checkCollisionWithEnemies() {
      this.level.enemies.forEach(enemy => {
         if (this.character.isColliding(enemy) && !enemy.isDead()) {
            if (this.character.isAboveGround() && !this.character.isHurt()) {
               enemy.die();
            } else {
               this.character.hit();
               this.statusBar.setPercentage(this.character.energy);
            }
            this.characterIsDead();
         }
      });
   }

   /**
    * Checks for collisions between the character and the endboss.
    */
   checkCollisionWithCharacterAndEndboss() {
      this.level.endboss.forEach(boss => {
         if (this.character.isColliding(boss) && !boss.isDead()) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
            this.characterIsDead();
         }
      });
   }

   /**
    * Handles the character's death.
    */
   characterIsDead() {
      if (this.character.energy <= 0) {
         setInterval(() => {
            this.character.playAnimation(this.character.IMAGES_DEAD);
         }, 100);
         setTimeout(() => {
            youLost(); // Function defined elsewhere to handle game over scenario
         }, 1000);
      }
   }

   /**
    * Checks for collisions between throwable objects and the endboss.
    */
   checkCollisionWithBottleAndEndboss() {
      const collisionCooldown = 1500;
      this.throwableObject.forEach(object => {
         this.level.endboss.forEach(boss => {
            if (object.isColliding(boss)) {
               this.handleCollision(object, boss, collisionCooldown);
            }
         });
      });
   }

   /**
    * Handles collision effects between a throwable object and the endboss.
    * @param {ThrowableObject} object - The throwable object.
    * @param {Endboss} boss - The endboss.
    * @param {number} collisionCooldown - Cooldown time to avoid repeated collisions.
    */
   handleCollision(object, boss, collisionCooldown) {
      const currentTime = new Date().getTime();
      if (currentTime - object.lastCollisionWithEndboss > collisionCooldown) {
         this.performCollisionEffects(object, boss);
         this.endbossIsDead(boss);
         object.lastCollisionWithEndboss = currentTime;
      }
   }

   /**
    * Performs effects upon collision between the throwable object and the endboss.
    * @param {ThrowableObject} object - The throwable object.
    * @param {Endboss} boss - The endboss.
    */
   performCollisionEffects(object, boss) {
      object.isBroken = true;
      object.playBreakingAnimation();
      playSoundEffect(bottle_smash_sound); // Function defined elsewhere to play sound effects
      boss.energy -= 20;
      let percentage = boss.energy;
      this.statusBarEndboss.setPercentage(percentage);
      boss.isHurt = true;
   }

   /**
    * Handles the endboss's death.
    * @param {Endboss} boss - The endboss.
    */
   endbossIsDead(boss) {
      if (boss.energy <= 0) {
         setTimeout(() => {
            youWin(); // Function defined elsewhere to handle win scenario
         }, 2000);
      }
   }

   /**
    * Checks for collisions between throwable objects and enemies.
    */
   checkCollisionWithThrowableObjects() {
      this.throwableObject.forEach(object => {
         this.level.enemies.forEach(enemy => {
            if (object.isColliding(enemy) && !enemy.isDead()) {
               enemy.die();
               object.isBroken = true;
               object.playBreakingAnimation();
               playSoundEffect(bottle_smash_sound);
               this.removeThrowableObject(object);
            }
         });
      });
   }

   /**
    * Removes a throwable object from the world after it has been used.
    */
   removeThrowableObject(object) {
      setTimeout(() => {
         const objectIndex = this.throwableObject.indexOf(object);
         if (objectIndex > -1) {
            this.throwableObject.splice(objectIndex, 1);
         }
      }, 200);
   }

   /**
    * Checks if the conditions to throw an object are met and then initiates the throw.
    */
   checkThrowObjects() {
      if (this.keyboard.D && this.bottlesCollected > 0 && this.canThrowBottle) {
         const {xPosition, speed} = this.initializeBottleThrow();
         this.createAndThrowBottle(xPosition, speed);
         this.updateGameStateAfterThrow();
      }
   }

   /**
    * Initializes the position and speed for a bottle throw.
    * @returns {Object} The x position and speed of the bottle.
    */
   initializeBottleThrow() {
      let xPosition = this.character.x + 50;
      let speed = 10;
      if (this.character.otherDirection) {
         xPosition = this.character.x - 50;
         speed = -speed;
      }
      return {xPosition, speed};
   }

   /**
    * Creates and throws a bottle.
    * @param {number} xPosition - The x position to place the bottle.
    * @param {number} speed - The speed at which the bottle is thrown.
    */
   createAndThrowBottle(xPosition, speed) {
      let bottle = new ThrowableObject(xPosition, this.character.y + 100);
      bottle.speed = speed;
      this.throwableObject.push(bottle);
   }

   /**
    * Updates the game state after a bottle is thrown.
    */
   updateGameStateAfterThrow() {
      this.bottlesCollected--;
      this.statusBarBottle.setPercentageCollectables(this.bottlesCollected);
      this.canThrowBottle = false;
      setTimeout(() => {
         this.canThrowBottle = true;
      }, 1000);
   }

   /**
    * Checks for collisions between the character and coins.
    */
   checkCollisionWithCoins() {
      this.level.coins.forEach((coin, index) => {
         if (this.character.isColliding(coin)) {
            playSoundEffect(coin_sound);
            this.collectCoins();
            this.statusBarCoin.setPercentageCollectables(this.coinsCollected);
            this.level.coins.splice(index, 1);
         }
      });
   }

   /**
    * Checks for collisions between the character and bottles.
    */
   checkCollisionWithBottles() {
      this.level.bottles.forEach((bottle, index) => {
         if (this.character.isColliding(bottle)) {
            playSoundEffect(bottle_sound);
            this.collectBottles();
            this.statusBarBottle.setPercentageCollectables(this.bottlesCollected);
            this.level.bottles.splice(index, 1);
         }
      });
   }

   /**
    * Increments the count of collected coins.
    */
   collectCoins() {
      if (this.coinsCollected < 20) {
         this.coinsCollected += 1;
      }
   }

   /**
    * Increments the count of collected bottles.
    */
   collectBottles() {
      if (this.bottlesCollected < 20) {
         this.bottlesCollected += 1;
      }
   }

   /**
    * Draws the entire game world, including the background, fixed objects, and moving objects.
    */
   draw() {
      this.clearCanvas();
      this.drawBackground();
      this.drawFixedObjects();
      this.drawMovingObjects();
      this.requestNextAnimationFrame();
   }

   /**
    * Clears the canvas for redrawing.
    */
   clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
   }

   /**
    * Draws the background of the game world.
    */
   drawBackground() {
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);
      this.ctx.translate(-this.camera_x, 0);
   }

   /**
    * Draws fixed objects in the game world, such as status bars.
    */

   // drawFixedObjects() {
   //    this.addToMap(this.statusBar);
   //    this.addToMap(this.statusBarEndboss);
   //    this.addToMap(this.statusBarCoin);
   //    this.addToMap(this.statusBarBottle);
   // }

   drawFixedObjects() {
      this.addToMap(this.statusBar);

      // Check visibility of StatusBarEndboss
      if (this.statusBarEndboss.visible) {
         this.addToMap(this.statusBarEndboss);
      }

      this.addToMap(this.statusBarCoin);
      this.addToMap(this.statusBarBottle);
   }

   /**
    * Draws moving objects in the game world, such as characters and enemies.
    */
   drawMovingObjects() {
      this.ctx.translate(this.camera_x, 0);
      this.addToMap(this.character);
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.level.bottles);
      this.addObjectsToMap(this.level.endboss);
      this.addObjectsToMap(this.level.coins);
      this.addObjectsToMap(this.throwableObject);
      this.addObjectsToMap(this.level.clouds);
      this.ctx.translate(-this.camera_x, 0);
   }

   /**
    * Requests the next animation frame for the game loop.
    */
   requestNextAnimationFrame() {
      requestAnimationFrame(() => {
         this.draw();
      });
   }

   /**
    * Adds an array of objects to the game map.
    * @param {DrawableObject[]} objects - An array of drawable objects.
    */
   addObjectsToMap(objects) {
      objects.forEach(o => {
         this.addToMap(o);
      });
   }

   /**
    * Adds a single object to the game map and manages image flipping for direction.
    * @param {DrawableObject} mo - The drawable object to add.
    */
   addToMap(mo) {
      if (mo.otherDirection) {
         this.flipImage(mo);
      }

      mo.draw(this.ctx);

      if (mo.otherDirection) {
         this.flipImageBack(mo);
      }
   }

   /**
    * Flips the image of the object for leftward movement.
    * @param {DrawableObject} mo - The drawable object to flip.
    */
   flipImage(mo) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
   }

   /**
    * Restores the image of the object after flipping.
    * @param {DrawableObject} mo - The drawable object to unflip.
    */
   flipImageBack(mo) {
      mo.x = mo.x * -1;
      this.ctx.restore();
   }
}
