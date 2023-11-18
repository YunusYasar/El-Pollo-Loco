/**
 * Represents a background object in the game.
 * Extends from MovableObject to inherit movement-related properties and methods.
 */
class BackgroundObject extends MovableObject {
   /**
    * The width of the background object.
    * @type {number}
    */
   width = 720;

   /**
    * The height of the background object.
    * @type {number}
    */
   height = 480;

   /**
    * Creates a BackgroundObject instance.
    * @param {string} imagePath - The path to the background image.
    * @param {number} x - The x-coordinate for the background object's position.
    * @param {number} y - The y-coordinate for the background object's position.
    */
   constructor(imagePath, x, y) {
      super().loadImage(imagePath); // Calls the loadImage method from the parent class MovableObject
      this.x = x; // Sets the x-coordinate
      this.y = 480 - this.height; // Sets the y-coordinate, adjusted to align the bottom of the object with the bottom of the screen
   }
}
