/**
 * Represents a throwable object in the game, such as a bottle, extending from MovableObject.
 * Handles the animation and behavior of objects that can be thrown.
 */
class ThrowableObject extends MovableObject {
   /**
    * The height of the throwable object.
    * @type {number}
    */
   height = 90;

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
    * Indicates if the object is broken.
    * @type {boolean}
    */
   isBroken = false;

   /**
    * Timestamp of the last collision with the endboss.
    * @type {number}
    */
   lastCollisionWithEndboss = 0;

   /**
    * Array of images for the bottle rotation animation.
    * @type {string[]}
    */
   IMAGES_THROWING_BOTTLE = [
      'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', //
      'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
   ];

   /**
    * Array of images for the bottle splash/breaking animation.
    * @type {string[]}
    */
   IMAGES_BOTTLE_SPLASH = [
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png', //
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
   ];

   /**
    * Constructs a ThrowableObject instance.
    * Loads images for the throwing and breaking animations and sets initial position.
    * @param {number} x - The initial x-coordinate of the object.
    * @param {number} y - The initial y-coordinate of the object.
    */
   constructor(x, y) {
      super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
      this.loadImages(this.IMAGES_THROWING_BOTTLE);
      this.loadImages(this.IMAGES_BOTTLE_SPLASH);
      this.x = x;
      this.y = y;
      this.animate();
      this.playBreakingAnimation();
   }

   /**
    * Animates the throwable object, applying gravity and handling rotation.
    */
   animate() {
      this.speedY = 28;
      this.applyGravity();

      setInterval(() => {
         if (!this.isBroken) {
            this.playAnimation(this.IMAGES_THROWING_BOTTLE);
            this.x += this.speed;
         }
      }, 50);
   }

   /**
    * Plays the breaking animation of the object.
    */
   playBreakingAnimation() {
      this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
   }
}
