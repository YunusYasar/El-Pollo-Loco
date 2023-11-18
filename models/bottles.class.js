/**
 * Represents a bottle object in the game.
 * Extends from DrawableObject to inherit drawing-related properties and methods.
 */
class Bottles extends DrawableObject {
   /**
    * The initial x-coordinate for the bottle's position.
    * @type {number}
    */
   x = 50;

   /**
    * The initial y-coordinate for the bottle's position.
    * @type {number}
    */
   y = 50;

   /**
    * The height of the bottle.
    * @type {number}
    */
   height = 70;

   /**
    * The offset for collision detection. Defines the boundaries for the top, left, right, and bottom sides.
    * @type {{top: number, left: number, right: number, bottom: number}}
    */
   offset = {
      top: 0,
      left: 40,
      right: 40,
      bottom: 0,
   };

   /**
    * Creates a Bottles instance.
    * Loads an image for the bottle and sets its initial x and y position.
    */
   constructor() {
      super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png'); // Calls the loadImage method from the parent class DrawableObject
      this.x = 300 + Math.random() * 1700; // Sets the x-coordinate randomly within a specified range
      this.y = 360; // Sets the y-coordinate
   }
}
