/**
 * Represents a general-purpose status bar in the game, extending from DrawableObject.
 * Can be used to display various metrics such as health, energy, etc.
 */
class StatusBar extends DrawableObject {
   /**
    * Array of images for different status levels of the bar.
    * @type {string[]}
    */
   IMAGES = [
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png', //0
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png', //5
   ];

   /**
    * The percentage to display on the status bar.
    * @type {number}
    */
   percentage = 100;

   /**
    * Constructs a StatusBar instance.
    * Preloads images for the status bar and sets its initial position and size.
    */
   constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 20;
      this.y = 0;
      this.width = 200;
      this.height = 60;
      this.setPercentage(100);
   }

   /**
    * Sets the status bar percentage and updates the displayed image accordingly.
    * @param {number} percentage - The percentage to be displayed on the status bar.
    */
   setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.IMAGES[this.resolveImageIndex()];
      this.img = this.imageCache[path];
   }

   /**
    * Determines the appropriate image index based on the current percentage.
    * @returns {number} The index of the image in the IMAGES array.
    */
   resolveImageIndex() {
      if (this.percentage == 100) {
         return 5;
      } else if (this.percentage > 80) {
         return 4;
      } else if (this.percentage > 60) {
         return 3;
      } else if (this.percentage > 40) {
         return 2;
      } else if (this.percentage > 20) {
         return 1;
      } else {
         return 0;
      }
   }
}
