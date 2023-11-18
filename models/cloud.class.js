/**
 * Represents a cloud in the game's background, extending from MovableObject.
 */
class Cloud extends MovableObject {
   /**
    * The y-coordinate for the cloud's position.
    * @type {number}
    */
   y = 20;

   /**
    * The height of the cloud.
    * @type {number}
    */
   height = 250;

   /**
    * The width of the cloud.
    * @type {number}
    */
   width = 500;

   /**
    * The speed of the cloud's movement.
    * @type {number}
    */
   speed = 0.15;

   /**
    * Creates a Cloud instance.
    * Loads an image for the cloud and sets initial properties.
    */
   constructor() {
      super().loadImage('img/5_background/layers/4_clouds/1.png');
      this.x = Math.random() * 1500; // Sets a random x-coordinate
      this.animate();
   }

   /**
    * Sets an interval for the cloud's movement.
    */
   animate() {
      setInterval(() => {
         this.moveLeft(); // Moves the cloud left at its set speed
      }, 1000 / 60); // The interval is set to create a smooth animation
   }
}
