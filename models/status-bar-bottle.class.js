/**
 * Represents a status bar for bottles in the game, extending from DrawableObject.
 * Displays the status of collectable items like bottles.
 */
class StatusBarBottle extends DrawableObject {
   /**
    * Array of images for different status levels of the bar.
    * @type {string[]}
    */
   IMAGES_BARS = [
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png', //
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
   ];

   /**
    * The percentage to display on the status bar.
    * @type {number}
    */
   percentage = 0;

   /**
    * Constructs a StatusBarBottle instance.
    * Preloads images for the status bar and sets its initial position and size.
    */
   constructor() {
      super();
      this.loadImages(this.IMAGES_BARS);
      this.x = 20;
      this.y = 100;
      this.width = 200;
      this.height = 60;
      this.setPercentageCollectables(0);
   }

   /**
    * Sets the status bar percentage and updates the displayed image accordingly.
    * @param {number} percentage - The percentage of collectables obtained.
    */
   setPercentageCollectables(percentage) {
      this.percentage = percentage;
      let index = this.resolveImageIndexCollectables();
      let path = this.IMAGES_BARS[index];
      this.img = this.imageCache[path];
   }
}
