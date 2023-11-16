class Bottles extends DrawableObject {
   x = 50;
   y = 50;
   height = 70;

   offset = {
      top: 0,
      left: 40,
      right: 40,
      bottom: 0,
   };

   constructor() {
      super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
      this.x = 300 + Math.random() * 1800;
      this.y = 360;
   }
}
