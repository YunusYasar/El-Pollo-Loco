/**
 * Represents a small chicken enemy in the game, extending from MovableObject.
 */
class SmallChicken extends MovableObject {
   /**
    * The y-coordinate for the small chicken's position.
    * @type {number}
    */
   y = 370;

   /**
    * The width of the small chicken.
    * @type {number}
    */
   width = 50;

   /**
    * The height of the small chicken.
    * @type {number}
    */
   height = 50;

   /**
    * The array of images for the walking animation.
    * @type {string[]}
    */
   IMAGES_WALKING = [
      'img/3_enemies_chicken/chicken_small/1_walk/1_w.png', //
      'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
      'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
   ];

   /**
    * The array of images for the dead state.
    * @type {string[]}
    */
   IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

   /**
    * The offset for collision detection.
    * @type {{top: number, left: number, right: number, bottom: number}}
    */
   offset = {
      top: 0,
      left: 0,
      right: 25,
      bottom: 25,
   };

   /**
    * Creates a SmallChicken instance.
    * Loads images for walking and dead states and sets initial properties.
    */
   constructor() {
      super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_DEAD);
      this.x = 400 + Math.random() * 1700;
      this.speed = 3 + Math.random() * 0.5;
      this.audioVolume;
      this.animate();
      this.checkDeadChicken();
   }

   /**
    * Sets an interval for animations.
    */
   animate() {
      this.animationInterval = setInterval(() => {
         this.animations();
      }, 100);
   }

   /**
    * Handles animations for walking and dead states.
    */
   animations() {
      if (this.speed == 0) {
         this.playAnimation(this.IMAGES_DEAD);
         if (this.audioVolume == true) {
            playSoundEffect(chicken_die_sound);
         }
         setTimeout(() => {
            this.x = 0;
            this.y = -100;
         }, 1500);
      } else {
         this.moveLeft();
         this.playAnimation(this.IMAGES_WALKING);
      }
   }

   /**
    * Checks the status of the chicken and clears the animation interval if the chicken is dead.
    */
   checkDeadChicken() {
      setInterval(() => {
         if (this.speed == 0) {
            clearInterval(this.animationInterval);
         }
      }, 100);
   }
}
