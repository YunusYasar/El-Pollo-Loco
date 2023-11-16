class Coins extends MovableObject {
   x = 50;
   y = 50;
   height = 100;
   width = 100;

   imagesCoin = [
      'img/8_coin/coin_1.png', //
      'img/8_coin/coin_2.png',
   ];

   offset = {
      top: 30,
      left: 30,
      right: 30,
      bottom: 30,
   };

   constructor() {
      super().loadImage('img/8_coin/coin_1.png');
      this.loadImages(this.imagesCoin);
      this.x = 300 + Math.random() * 1800;
      this.y = 150 + Math.random() * 160;
      this.animate();
   }

   animate() {
      setInterval(() => {
         this.playAnimation(this.imagesCoin);
      }, 200);
   }
}
