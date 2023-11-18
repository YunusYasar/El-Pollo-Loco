/**
 * Represents a movable object in the game, extending from DrawableObject.
 * Includes properties and methods for movement, collision, and game physics.
 */
class MovableObject extends DrawableObject {
   /**
    * The speed of the object.
    * @type {number}
    */
   speed = 0.1;

   /**
    * Indicates if the object is facing or moving in the opposite direction.
    * @type {boolean}
    */
   otherDirection = false;

   /**
    * Vertical speed of the object, used for gravity and jumping.
    * @type {number}
    */
   speedY = 0;

   /**
    * Acceleration due to gravity.
    * @type {number}
    */
   acceleration = 2.5;

   /**
    * The energy or health of the object.
    * @type {number}
    */
   energy = 100;

   /**
    * Timestamp of the last time the object was hit.
    * @type {number}
    */
   lastHit = 0;

   /**
    * The offset for collision detection.
    * @type {{top: number, left: number, right: number, bottom: number}}
    */
   offset = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
   };

   /**
    * Applies gravity to the object, making it fall if it is above the ground.
    */
   applyGravity() {
      setInterval(() => {
         if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
         }
      }, 1000 / 25);
   }

   /**
    * Checks if the object is above the ground.
    * @returns {boolean} True if the object is above the ground.
    */
   isAboveGround() {
      if (this instanceof ThrowableObject) {
         return true;
      } else {
         return this.y < 180;
      }
   }

   /**
    * Checks if this object is colliding with another movable object.
    * @param {MovableObject} mo - The other movable object.
    * @returns {boolean} True if colliding.
    */
   isColliding(mo) {
      return (
         this.x + this.width - this.offset.right > mo.x + mo.offset.left && //
         this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
         this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
         this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
      );
   }

   /**
    * Handles the object being hit, reducing its energy.
    */
   hit() {
      this.energy -= 5;
      if (this.energy < 0) {
         this.energy = 0;
      } else {
         this.lastHit = new Date().getTime();
         playSoundEffect(hurt_sound);
      }
   }

   /**
    * Checks if the object is currently hurt.
    * @returns {boolean} True if the object is hurt.
    */
   isHurt() {
      let timePassed = new Date().getTime() - this.lastHit;
      timePassed = timePassed / 1000;
      return timePassed < 0.4;
   }

   /**
    * Handles the object's death, stopping its movement and triggering death animation.
    */
   die() {
      this.speed = 0;
      this.dead = true;
      this.playAnimation(this.IMAGES_DEAD);
      playSoundEffect(chicken_die_sound);
      setTimeout(() => {
         if (this.world && this.world.level && this.world.level.enemies) {
            const index = this.world.level.enemies.indexOf(this);
            if (index > -1) {
               this.world.level.enemies.splice(index, 1);
            }
         }
      }, 1000);
   }

   /**
    * Checks if the object is dead.
    * @returns {boolean} True if the object is dead.
    */
   isDead() {
      return this.dead;
   }

   /**
    * Plays a sequence of images as an animation.
    * @param {string[]} images - An array of image paths for the animation.
    */
   playAnimation(images) {
      let i = this.currentImage % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
   }

   /**
    * Moves the object to the right.
    */
   moveRight() {
      this.x += this.speed;
   }

   /**
    * Moves the object to the left.
    */
   moveLeft() {
      this.x -= this.speed;
   }

   /**
    * Makes the object jump.
    */
   jump() {
      this.speedY = 30;
   }
}
