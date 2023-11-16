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
   coinsColected = 0;
   bottlesColected = 0;
   canThrowBottle = true;

   constructor(canvas, keyboard, audioVolume) {
      this.ctx = canvas.getContext('2d');
      this.canvas = canvas;
      this.keyboard = keyboard;
      this.audioVolume = audioVolume;
      this.draw();
      this.setWorld();
      this.run();
      this.endbossHits = 0;
   }

   setWorld() {
      this.character.world = this;
   }
   run() {
      setInterval(() => {
         this.checkCollisionWithEnemies();
         this.checkCollisionWithChracterAndEndboss();
         this.checkCollisionWithCoins();
         this.checkCollisionWithBottles();
         this.checkThrowObjects();
         this.checkCollisionWithThrowableObjects();
         this.checkCollisionWithEndboss();
      }, 50);
   }

   checkCollisionWithEnemies() {
      this.level.enemies.forEach(enemy => {
         if (this.character.isColliding(enemy) && !enemy.isDead()) {
            console.log('Collision detected!');
            if (this.character.y + this.character.height < enemy.y + enemy.height) {
               enemy.die();
            } else {
               this.character.hit();
               this.statusBar.setPercentage(this.character.energy);
            }
            if (this.character.energy <= 0) {
               setInterval(() => {
                  this.character.playAnimation(this.character.IMAGES_DEAD);
               }, 100);
               setTimeout(() => {
                  youLost();
               }, 1000);
            }
         }
      });
   }
   checkCollisionWithChracterAndEndboss() {
      this.level.endboss.forEach(boss => {
         if (this.character.isColliding(boss) && !boss.isDead()) {
            console.log('Collision with Endboss detected!');
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
            if (this.character.energy <= 0) {
               setInterval(() => {
                  this.character.playAnimation(this.character.IMAGES_DEAD);
               }, 100);
               setTimeout(() => {
                  this.youLost();
               }, 1000);
            }
         }
      });
   }

   checkCollisionWithEndboss() {
      const collisionCooldown = 1500;
      this.throwableObject.forEach((object, index) => {
         this.level.endboss.forEach(boss => {
            if (object.isColliding(boss)) {
               const currentTime = new Date().getTime();
               if (currentTime - object.lastCollisionWithEndboss > collisionCooldown) {
                  console.log('Collision with Endboss detected!');
                  object.isBroken = true;
                  object.playBreakingAnimation();
                  playSoundEffect(bottle_smash_sound);
                  boss.energy -= 20; // Reduziert die Energie des Endbosses
                  let percentage = boss.energy;
                  this.statusBarEndboss.setPercentage(percentage);
                  boss.isHurt = true;
                  object.lastCollisionWithEndboss = currentTime;
                  if (boss.energy <= 0) {
                     setTimeout(() => {
                        youWin();
                     }, 2000);
                  }
               }
            }
         });
      });
   }

   checkCollisionWithThrowableObjects() {
      this.throwableObject.forEach(object => {
         this.level.enemies.forEach(enemy => {
            if (object.isColliding(enemy) && !enemy.isDead()) {
               console.log('Collision with throwable object detected!');
               enemy.die();
               object.isBroken = true;
               object.playBreakingAnimation();
               playSoundEffect(bottle_smash_sound);

               setTimeout(() => {
                  const objectIndex = this.throwableObject.indexOf(object);
                  if (objectIndex > -1) {
                     this.throwableObject.splice(objectIndex, 1);
                  }
               }, 200);
            }
         });
      });
   }
   checkThrowObjects() {
      if (this.keyboard.D && this.bottlesColected > 0 && this.canThrowBottle) {
         let xPosition = this.character.x + 100;
         let speed = 10;
         // Überprüfen, ob der Charakter in die entgegengesetzte Richtung schaut.
         if (this.character.otherDirection) {
            xPosition = this.character.x - 100; // Ändert die Startposition der Flasche.
            speed = -speed; // Ändert Geschwindigkeit der Flasche, um sie nach links zu werfen.
         }
         let bottle = new ThrowableObject(xPosition, this.character.y + 100);
         bottle.speed = speed;
         this.throwableObject.push(bottle);
         this.bottlesColected--;
         this.statusBarBottle.setPercentageCollectables(this.bottlesColected);
         this.canThrowBottle = false;
         setTimeout(() => {
            this.canThrowBottle = true;
         }, 1000); // Eine Sekunde warten, bevor der Spieler wieder werfen kann
      }
   }

   checkCollisionWithCoins() {
      this.level.coins.forEach((coin, index) => {
         if (this.character.isColliding(coin)) {
            playSoundEffect(coin_sound);
            this.colectCoins();
            this.statusBarCoin.setPercentageCollectables(this.coinsColected);
            this.level.coins.splice(index, 1);
         }
      });
   }

   checkCollisionWithBottles() {
      this.level.bottles.forEach((bottle, index) => {
         if (this.character.isColliding(bottle)) {
            playSoundEffect(bottle_sound);
            this.colectBottles();
            this.statusBarBottle.setPercentageCollectables(this.bottlesColected);
            this.level.bottles.splice(index, 1);
         }
      });
   }

   colectCoins() {
      if (this.coinsColected < 20) {
         this.coinsColected += 1;
      }
   }

   colectBottles() {
      if (this.bottlesColected < 20) {
         this.bottlesColected += 1;
      }
   }
   draw() {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);

      this.ctx.translate(-this.camera_x, 0);
      // -------- Space for fixed objects ------
      this.addToMap(this.statusBar);
      this.addToMap(this.statusBarEndboss);
      this.addToMap(this.statusBarCoin);
      this.addToMap(this.statusBarBottle);
      this.ctx.translate(this.camera_x, 0);

      this.addToMap(this.character);
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.level.bottles);
      this.addObjectsToMap(this.level.endboss);
      this.addObjectsToMap(this.level.coins);
      this.addObjectsToMap(this.throwableObject);
      this.addObjectsToMap(this.level.clouds);

      this.ctx.translate(-this.camera_x, 0);

      //Draw() wird immer wieder aufgerufen!
      let self = this;
      requestAnimationFrame(function () {
         self.draw();
      });
   }

   addObjectsToMap(objects) {
      objects.forEach(o => {
         this.addToMap(o);
      });
   }

   addToMap(mo) {
      if (mo.otherDirection) {
         this.flipImage(mo);
      }

      mo.draw(this.ctx);
      mo.drawFrame(this.ctx);

      if (mo.otherDirection) {
         this.flipImageBack(mo);
      }
   }
   flipImage(mo) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
   }
   flipImageBack(mo) {
      mo.x = mo.x * -1;
      this.ctx.restore();
   }
}
