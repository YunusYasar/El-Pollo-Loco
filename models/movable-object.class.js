class MovableObject extends DrawableObject {
   speed = 0.1;
   otherDirection = false;
   speedY = 0;
   acceleration = 2.5;
   energy = 100;
   lastHit = 0;

   offset = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
   };

   applyGravity() {
      setInterval(() => {
         if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
         }
      }, 1000 / 25);
   }

   isAboveGround() {
      if (this instanceof ThrowableObject) {
         return true;
      } else {
         return this.y < 180;
      }
   }

   isColliding(mo) {
      return (
         this.x + this.width - this.offset.right > mo.x + mo.offset.left && //
         this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
         this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
         this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
      );
   }

   hit() {
      this.energy -= 5;
      playSoundEffect(hurt_sound);

      if (this.energy < 0) {
         this.energy = 0;
      } else {
         this.lastHit = new Date().getTime();
      }
   }
   isHurt() {
      let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
      timepassed = timepassed / 1000; // Difference in s

      return timepassed < 0.4;
   }

   die() {
      this.speed = 0;
      this.dead = true;
      this.playAnimation(this.IMAGES_DEAD);
      playSoundEffect(chicken_die_sound);

      setTimeout(() => {
         if (this.world && this.world.level && this.world.level.enemies) {
            // Überprüfen, ob die Referenzen existieren
            const index = this.world.level.enemies.indexOf(this);
            if (index > -1) {
               this.world.level.enemies.splice(index, 1); // Entfernt den Feind aus dem Array
            }
         }
      }, 1000);
   }

   isDead() {
      return this.dead;
   }

   playAnimation(images) {
      let i = this.currentImage % images.length; // i = 0, 1, 2, 3, 4, 5, 0, 0, 1, 2, 3, 4, 5, 0,0, 1, 2, 3, 4, 5, 0,
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
   }

   moveRight() {
      this.x += this.speed;
   }

   moveLeft() {
      this.x -= this.speed;
   }

   jump() {
      this.speedY = 30;
   }
}
