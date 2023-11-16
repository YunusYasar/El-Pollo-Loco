class StatusBarCoin extends DrawableObject {
   IMAGES_BARS = [
      'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png', //
      'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
   ];
   percentage = 0;

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
