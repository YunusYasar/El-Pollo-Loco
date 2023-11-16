class ThrowableObject extends MovableObject {
   height = 90;
   offset = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
   };
   isBroken = false;
   lastCollisionWithEndboss = 0;

   IMAGES_THROWING_BOTTLE = [
      'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', //
      'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
   ];

   IMAGES_BOTTLE_SPLASH = [
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png', //
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
   ];

   constructor(x, y) {
      super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
      this.loadImages(this.IMAGES_THROWING_BOTTLE);
      this.loadImages(this.IMAGES_BOTTLE_SPLASH);
      this.x = x;
      this.y = y;
      this.animate();
      this.playBreakingAnimation();
   }

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

   playBreakingAnimation() {
      this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
   }
}
