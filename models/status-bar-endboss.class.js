/**
 * Represents a status bar for the endboss's health in the game, extending from DrawableObject.
 * Displays the health of the endboss as a percentage.
 */
class StatusBarEndboss extends DrawableObject {
   /**
    * Array of images for different health levels of the endboss.
    * @type {string[]}
    */
   IMAGES_BARS = [
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png', //0
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png', //5
   ];

   /**
    * The percentage of health remaining for the endboss.
    * @type {number}
    */
   percentage = 100;

   /**
    * Constructs a StatusBarEndboss instance.
    * Preloads images for the health bar and sets its initial position and size.
    */
   constructor() {
      super();
      this.loadImages(this.IMAGES_BARS);
      this.x = 500;
      this.y = 0;
      this.width = 200;
      this.height = 60;
      this.setPercentage(100);
      this.visible = false;
   }

   /**
    * Sets the health bar percentage and updates the displayed image accordingly.
    * @param {number} percentage - The percentage of health remaining for the endboss.
    */
   setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.IMAGES_BARS[this.resolveImageIndex()];
      this.img = this.imageCache[path];
      this.visible = this.percentage < 100;
   }

   /**
    * Determines the appropriate image index based on the current health percentage.
    * @returns {number} The index of the image in the IMAGES_BARS array.
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
