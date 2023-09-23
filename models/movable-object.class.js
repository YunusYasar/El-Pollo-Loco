class MovableObject extends DrawableObject {
   speed = 0.15;
   otherDirection = false;
   speedY = 0;
   acceleration = 2.5;
   energy = 100;
   lastHit = 0;

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
         this.x + this.width > mo.x && //
         this.y + this.height > mo.y &&
         this.x < mo.x &&
         this.y < mo.y + mo.height
      );
   }

   hit() {
      this.energy -= 5;
      if (this.energy < 0) {
         this.energy = 0;
      } else {
         this.lastHit = new Date().getTime();
      }
   }
   isHurt() {
      let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
      timepassed = timepassed / 1000; // Difference in s
      return timepassed < 1;
   }
   isDead() {
      return this.energy == 0;
   }
   // isColliding(mo) {
   //    return (
   //       this.x + this.width - this.offset.right > mo.x + mo.offset.left && //
   //       this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
   //       this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
   //       this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
   //    );
   // }

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
