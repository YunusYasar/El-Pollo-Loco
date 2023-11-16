class Endboss extends MovableObject {
   height = 400;
   width = 250;
   y = 50;
   speed = 20;
   isMoving = false;
   energy = 100;
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

   offset = {
      top: 50,
      left: 40,
      right: 40,
      bottom: 60,
   };

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

   animate() {
      setInterval(() => {
         if (this.energy <= 0) {
            // Wenn der Endboss keine Energie mehr hat
            this.playAnimation(this.IMAGES_DEAD);
            this.isMoving = false; // Stoppt die Bewegung des Endbosses
         } else if (this.isHurt) {
            setTimeout(() => {
               this.playAnimation(this.IMAGES_HURT);
               setTimeout(() => {
                  this.playAnimation(this.IMAGES_ATTACKING);
               }, 200);
            }, 400);
            this.isMoving = true;
            this.isHurt = false;
         } else if (this.isMoving) {
            // Bewegung nach links, wenn er sich bewegen soll
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
         } else if (!this.isMoving) {
            // Wenn der Endboss noch nicht begonnen hat, sich zu bewegen

            this.playAnimation(this.IMAGES_ALERT);
         }
      }, 300); // Hauptanimationszyklus
   }
}
