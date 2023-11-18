/**
 * A base class for drawable objects in the game.
 */
class DrawableObject {
   /**
    * Image element for the drawable object.
    * @type {HTMLImageElement}
    */
   img;

   /**
    * Cache for preloaded images.
    * @type {Object}
    */
   imageCache = {};

   /**
    * Index for the current image.
    * @type {number}
    */
   currentImage = 0;

   /**
    * The x-coordinate of the drawable object.
    * @type {number}
    */
   x = 120;

   /**
    * The y-coordinate of the drawable object.
    * @type {number}
    */
   y = 280;

   /**
    * The height of the drawable object.
    * @type {number}
    */
   height = 150;

   /**
    * The width of the drawable object.
    * @type {number}
    */
   width = 100;

   /**
    * The percentage of collectables obtained (used for specific types of drawable objects).
    * @type {number}
    */
   percentage;

   /**
    * Loads an image for the drawable object.
    * @param {string} path - The path to the image file.
    */
   loadImage(path) {
      this.img = new Image();
      this.img.src = path;
   }

   /**
    * Draws the object on the canvas.
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
    */
   draw(ctx) {
      if (this.img) {
         ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      }
   }

   /**
    * Preloads a set of images for animation or various states.
    * @param {string[]} arr - An array of image paths.
    */
   loadImages(arr) {
      arr.forEach(path => {
         let img = new Image();
         img.src = path;
         this.imageCache[path] = img;
      });
   }

   /**
    * Sets the image based on the percentage of collectables obtained.
    * @param {number} bottlesCollected - The number of bottles collected.
    */
   setPercentageCollectables(bottlesCollected) {
      this.percentage = bottlesCollected;
      let index = this.resolveImageIndexCollectables();
      let path = this.IMAGES_BARS[index];
      this.img = this.imageCache[path];
   }

   /**
    * Resolves the image index based on the collected percentage.
    * @returns {number} The index of the image.
    */
   resolveImageIndexCollectables() {
      if (this.percentage === 0) {
         return 0;
      } else if (this.percentage <= 2) {
         return 1;
      } else if (this.percentage <= 4) {
         return 2;
      } else if (this.percentage <= 6) {
         return 3;
      } else if (this.percentage <= 8) {
         return 4;
      } else {
         return 5;
      }
   }
}
