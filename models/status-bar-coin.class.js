/**
 * Represents a status bar for coins in the game, extending from DrawableObject.
 * Displays the status of collected coins as a percentage.
 */
class StatusBarCoin extends DrawableObject {
   /**
    * Array of images for different status levels of the bar.
    * @type {string[]}
    */
   IMAGES_BARS = [
      'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png', //
      'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
   ];

   /**
    * The percentage of coins collected.
    * @type {number}
    */
   percentage = 0;

   /**
    * Constructs a StatusBarCoin instance.
    * Preloads images for the status bar and sets its initial position and size.
    */
   constructor() {
      super();
      this.loadImages(this.IMAGES_BARS);
      this.x = 20;
      this.y = 50;
      this.width = 200;
      this.height = 60;
      this.setPercentageCollectables(0);
   }
}
