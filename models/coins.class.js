/**
 * Represents a coin in the game, extending from MovableObject.
 */
class Coins extends MovableObject {
   /**
    * The x-coordinate for the coin's position.
    * @type {number}
    */
   x = 50;

   /**
    * The y-coordinate for the coin's position.
    * @type {number}
    */
   y = 50;

   /**
    * The height of the coin.
    * @type {number}
    */
   height = 100;

   /**
    * The width of the coin.
    * @type {number}
    */
   width = 100;

   /**
    * The array of images for the coin animation.
    * @type {string[]}
    */

   IMAGES_COIN = [
      'img/8_coin/coin_1.png', //
      'img/8_coin/coin_2.png',
   ];

   /**
    * The offset for collision detection.
    * @type {{top: number, left: number, right: number, bottom: number}}
    */
   offset = {
      top: 30,
      left: 30,
      right: 30,
      bottom: 30,
   };

   /**
    * Creates a Coins instance.
    * Loads images for the coin animation and sets initial properties.
    */
   constructor() {
      super().loadImage('img/8_coin/coin_1.png');
      this.loadImages(this.IMAGES_COIN);
      this.x = 300 + Math.random() * 1700; // Sets a random x-coordinate within a specified range
      this.y = 150 + Math.random() * 160; // Sets a random y-coordinate within a specified range
      this.animate();
   }

   /**
    * Sets an interval for the coin's animation.
    */
   animate() {
      setInterval(() => {
         this.playAnimation(this.IMAGES_COIN);
      }, 200); // Changes the coin image every 200 milliseconds to create an animation
   }
}
