/**
 * Represents the endboss in the game, extending from MovableObject.
 */
class Endboss extends MovableObject {
   /**
    * The height of the endboss.
    * @type {number}
    */
   height = 400;

   /**
    * The width of the endboss.
    * @type {number}
    */
   width = 250;

   /**
    * The y-coordinate of the endboss's position.
    * @type {number}
    */
   y = 40;

   /**
    * The speed of the endboss's movement.
    * @type {number}
    */
   speed = 60;

   /**
    * Indicates if the endboss is moving.
    * @type {boolean}
    */
   isMoving = false;

   /**
    * The energy level of the endboss.
    * @type {number}
    */
   energy = 100;

   // Image arrays for different endboss states
   IMAGES_WALKING = [
      'img/4_enemie_boss_chicken/1_walk/G1.png', //
      'img/4_enemie_boss_chicken/1_walk/G2.png',
      'img/4_enemie_boss_chicken/1_walk/G3.png',
      'img/4_enemie_boss_chicken/1_walk/G4.png',
      'img/4_enemie_boss_chicken/1_walk/G1.png',
      'img/4_enemie_boss_chicken/1_walk/G2.png',
      'img/4_enemie_boss_chicken/1_walk/G3.png',
      'img/4_enemie_boss_chicken/1_walk/G4.png',
      'img/4_enemie_boss_chicken/1_walk/G1.png',
      'img/4_enemie_boss_chicken/1_walk/G2.png',
      'img/4_enemie_boss_chicken/1_walk/G3.png',
      'img/4_enemie_boss_chicken/1_walk/G4.png',
      'img/4_enemie_boss_chicken/1_walk/G1.png',
      'img/4_enemie_boss_chicken/1_walk/G2.png',
      'img/4_enemie_boss_chicken/1_walk/G3.png',
      'img/4_enemie_boss_chicken/1_walk/G4.png',
   ];

   IMAGES_ALERT = [
      'img/4_enemie_boss_chicken/2_alert/G5.png', //
      'img/4_enemie_boss_chicken/2_alert/G6.png',
      'img/4_enemie_boss_chicken/2_alert/G7.png',
      'img/4_enemie_boss_chicken/2_alert/G8.png',
      'img/4_enemie_boss_chicken/2_alert/G9.png',
      'img/4_enemie_boss_chicken/2_alert/G10.png',
      'img/4_enemie_boss_chicken/2_alert/G11.png',
      'img/4_enemie_boss_chicken/2_alert/G12.png',
   ];

   IMAGES_ATTACKING = [
      'img/4_enemie_boss_chicken/3_attack/G13.png', //
      'img/4_enemie_boss_chicken/3_attack/G14.png',
      'img/4_enemie_boss_chicken/3_attack/G15.png',
      'img/4_enemie_boss_chicken/3_attack/G16.png',
      'img/4_enemie_boss_chicken/3_attack/G17.png',
      'img/4_enemie_boss_chicken/3_attack/G18.png',
      'img/4_enemie_boss_chicken/3_attack/G19.png',
      'img/4_enemie_boss_chicken/3_attack/G20.png',
   ];

   IMAGES_HURT = [
      'img/4_enemie_boss_chicken/4_hurt/G21.png', //
      'img/4_enemie_boss_chicken/4_hurt/G22.png',
      'img/4_enemie_boss_chicken/4_hurt/G23.png',
   ];

   IMAGES_DEAD = [
      'img/4_enemie_boss_chicken/5_dead/G24.png', //
      'img/4_enemie_boss_chicken/5_dead/G25.png',
      'img/4_enemie_boss_chicken/5_dead/G26.png',
   ];

   /**
    * The offset for collision detection.
    * @type {{top: number, left: number, right: number, bottom: number}}
    */
   offset = {
      top: 50,
      left: 40,
      right: 40,
      bottom: 60,
   };

   /**
    * Creates an Endboss instance.
    * Loads images for various states and sets initial properties.
    */
   constructor() {
      super().loadImage(this.IMAGES_WALKING[7]);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_ALERT);
      this.loadImages(this.IMAGES_ATTACKING);
      this.loadImages(this.IMAGES_DEAD);
      this.loadImages(this.IMAGES_HURT);
      this.x = 2200;
      this.animate();
      this.isHurt = false;
   }

   /**
    * Sets an interval for the endboss's animations and state management.
    */
   animate() {
      setInterval(() => {
         if (this.energy <= 0) {
            this.handleDeath();
         } else if (this.isHurt || world.character.x >= 1900) {
            playSoundEffect(endboss_attack_sound);
            this.handleHurt();
         } else if (this.isMoving) {
            this.handleMovement();
         } else {
            this.handleIdle();
         }
      }, 200);
   }

   /**
    * Handles the death animation of the endboss.
    */
   handleDeath() {
      this.playAnimation(this.IMAGES_DEAD);
      this.isMoving = false;
   }

   /**
    * Handles the hurt animation of the endboss.
    */
   handleHurt() {
      this.isMoving = true;
      this.isHurt = false;
      setTimeout(() => {
         this.playAnimation(this.IMAGES_HURT);
         setTimeout(() => {
            this.playAnimation(this.IMAGES_ATTACKING);
         }, 200);
      }, 200);
   }

   /**
    * Handles the walking animation of the endboss.
    */
   handleMovement() {
      this.playAnimation(this.IMAGES_WALKING);
      this.moveLeft();
   }

   /**
    * Handles the alert/idle animation of the endboss.
    */
   handleIdle() {
      this.playAnimation(this.IMAGES_ALERT);
   }
}
