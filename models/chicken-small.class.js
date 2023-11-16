class SmallChicken extends MovableObject {
   y = 370;
   width = 50;
   height = 50;

   IMAGES_WALKING = [
      'img/3_enemies_chicken/chicken_small/1_walk/1_w.png', //
      'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
      'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
   ];

   IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

   offset = {
      top: 0,
      left: 0,
      right: 25,
      bottom: 25,
   };

   constructor() {
      super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_DEAD);
      this.x = 400 + Math.random() * 2000;
      this.speed = 3 + Math.random() * 0.5;
      this.audioVolume;
      this.animate();
      this.checkDeadChicken();
   }
   animate() {
      this.animationInterval = setInterval(() => {
         this.animations();
      }, 100);
   }
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

   checkDeadChicken() {
      setInterval(() => {
         if (this.speed == 0) {
            clearInterval(this.animationInterval);
         }
      }, 100);
   }
}
