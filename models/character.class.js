/**
 * Represents a character in the game, extending from MovableObject.
 */
class Character extends MovableObject {
   /**
    * The height of the character.
    * @type {number}
    */
   height = 250;

   /**
    * The y-coordinate for the character's position.
    * @type {number}
    */
   y = 180;

   /**
    * The speed of the character.
    * @type {number}
    */
   speed = 8;

   /**
    * Reference to the game world.
    * @type {World}
    */
   world;

   /**
    * Indicates if the character is walking.
    * @type {boolean}
    */
   isWalking = false;

   /**
    * The offset for collision detection.
    * @type {{top: number, left: number, right: number, bottom: number}}
    */
   offset = {
      top: 120,
      left: 20,
      right: 15,
      bottom: 15,
   };

   // Image arrays for different character states
   IMAGES_STANDING = [
      'img/2_character_pepe/1_idle/idle/I-1.png', //
      'img/2_character_pepe/1_idle/idle/I-2.png',
      'img/2_character_pepe/1_idle/idle/I-3.png',
      'img/2_character_pepe/1_idle/idle/I-4.png',
      'img/2_character_pepe/1_idle/idle/I-5.png',
      'img/2_character_pepe/1_idle/idle/I-6.png',
      'img/2_character_pepe/1_idle/idle/I-7.png',
      'img/2_character_pepe/1_idle/idle/I-8.png',
      'img/2_character_pepe/1_idle/idle/I-9.png',
      'img/2_character_pepe/1_idle/idle/I-10.png',
   ];

   IMAGES_IDLE = [
      'img/2_character_pepe/1_idle/long_idle/I-11.png', //
      'img/2_character_pepe/1_idle/long_idle/I-12.png',
      'img/2_character_pepe/1_idle/long_idle/I-13.png',
      'img/2_character_pepe/1_idle/long_idle/I-14.png',
      'img/2_character_pepe/1_idle/long_idle/I-15.png',
      'img/2_character_pepe/1_idle/long_idle/I-16.png',
      'img/2_character_pepe/1_idle/long_idle/I-17.png',
      'img/2_character_pepe/1_idle/long_idle/I-18.png',
      'img/2_character_pepe/1_idle/long_idle/I-19.png',
      'img/2_character_pepe/1_idle/long_idle/I-20.png',
   ];

   IMAGES_WALKING = [
      'img/2_character_pepe/2_walk/W-21.png', //
      'img/2_character_pepe/2_walk/W-22.png',
      'img/2_character_pepe/2_walk/W-23.png',
      'img/2_character_pepe/2_walk/W-24.png',
      'img/2_character_pepe/2_walk/W-25.png',
      'img/2_character_pepe/2_walk/W-26.png',
   ];

   IMAGES_JUMPING = [
      'img/2_character_pepe/3_jump/J-31.png', //
      'img/2_character_pepe/3_jump/J-32.png',
      'img/2_character_pepe/3_jump/J-33.png',
      'img/2_character_pepe/3_jump/J-34.png',
      'img/2_character_pepe/3_jump/J-35.png',
      'img/2_character_pepe/3_jump/J-36.png',
      'img/2_character_pepe/3_jump/J-37.png',
      'img/2_character_pepe/3_jump/J-38.png',
      'img/2_character_pepe/3_jump/J-39.png',
   ];
   IMAGES_DEAD = [
      'img/2_character_pepe/5_dead/D-51.png', //
      'img/2_character_pepe/5_dead/D-52.png',
      'img/2_character_pepe/5_dead/D-53.png',
      'img/2_character_pepe/5_dead/D-54.png',
      'img/2_character_pepe/5_dead/D-55.png',
      'img/2_character_pepe/5_dead/D-56.png',
      'img/2_character_pepe/5_dead/D-57.png',
   ];
   IMAGES_HURT = [
      'img/2_character_pepe/4_hurt/H-41.png', //
      'img/2_character_pepe/4_hurt/H-42.png',
      'img/2_character_pepe/4_hurt/H-43.png',
   ];

   /**
    * Creates a Character instance.
    * Loads various character images and applies gravity and animation.
    */
   constructor() {
      super().loadImage('img/2_character_pepe/2_walk/W-21.png');
      this.loadImages(this.IMAGES_STANDING);
      this.loadImages(this.IMAGES_IDLE);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_JUMPING);
      this.loadImages(this.IMAGES_DEAD);
      this.loadImages(this.IMAGES_HURT);
      this.applyGravity();
      this.animate();
   }

   /**
    * Handles the character's animation and movement.
    */
   animate() {
      let lastActionTime = new Date().getTime();

      setInterval(() => {
         this.handleMovement();
         this.updateCameraPosition();
      }, 1000 / 60);

      setInterval(() => {
         this.handleCharacterAnimation(lastActionTime);
      }, 100);
   }

   /**
    * Handles the character's movement based on keyboard input.
    */
   handleMovement() {
      const currentTime = new Date().getTime();

      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
         this.moveRight();
         this.otherDirection = false;
         if (!this.isAboveGround()) {
            this.playSoundAndUpdateTime(walking_sound, currentTime);
         }
      } else if (this.world.keyboard.LEFT && this.x > 0) {
         this.moveLeft();
         this.otherDirection = true;
         if (!this.isAboveGround()) {
            this.playSoundAndUpdateTime(walking_sound, currentTime);
         }
      } else if (this.world.keyboard.SPACE && !this.isAboveGround()) {
         this.jump();
         this.playSoundAndUpdateTime(jumping_sound, currentTime);
      }
   }

   /**
    * Updates the camera position relative to the character.
    */
   updateCameraPosition() {
      this.world.camera_x = -this.x + 100;
   }

   /**
    * Handles the animation of the character based on its current state.
    * @param {number} lastActionTime - The time of the last action performed.
    */
   handleCharacterAnimation(lastActionTime) {
      const currentTime = new Date().getTime();
      if (this.isDead()) {
         this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
         this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
         this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
         this.lastActionTime = currentTime;
         this.playAnimation(this.IMAGES_WALKING);
      } else if (!this.isHurt() && !this.isDead() && !this.isAboveGround()) {
         this.playAnimation(this.IMAGES_STANDING);
         if (currentTime - this.lastActionTime >= 2000) {
            this.playAnimation(this.IMAGES_IDLE);
         }
      }
   }

   /**
    * Plays a sound effect and updates the last action time.
    * @param {Audio} sound - The sound effect to play.
    * @param {number} currentTime - The current time.
    */
   playSoundAndUpdateTime(sound, currentTime) {
      playSoundEffect(sound);
      this.lastActionTime = currentTime;
   }
}
