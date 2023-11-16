class DrawableObject {
   img;
   imageCache = {};
   currentImage = 0;
   x = 120;
   y = 280;
   height = 150;
   width = 100;
   percentage;

   // loadImage('img/test.png')
   loadImage(path) {
      this.img = new Image(); // this.img = document.getElementById('image') <img id ='image' src>
      this.img.src = path;
   }

   draw(ctx) {
      if (this.img) {
         // Überprüfen, ob das Bild existiert
         ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      }
   }

   drawFrame(ctx) {
      if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss || this instanceof Coins || this instanceof Bottles) {
         ctx.beginPath();
         ctx.lineWidth = '5';
         ctx.strokeStyle = 'blue';
         ctx.rect(this.x, this.y, this.width, this.height);
         ctx.stroke();
      }
   }

   loadImages(arr) {
      arr.forEach(path => {
         let img = new Image();
         img.src = path;
         this.imageCache[path] = img;
      });
   }
   setPercentageCollectables(percentage) {
      let index = Math.min(percentage, 5); // Sicher stellen, dass der Index nicht größer als 5 ist
      let path = this.IMAGES_BARS[index];
      this.img = this.imageCache[path];
   }

   resolveImageIndexCollectables() {
      if (this.percentage == 0) {
         return 0;
      } else if (this.percentage <= 1) {
         return 1;
      } else if (this.percentage <= 2) {
         return 2;
      } else if (this.percentage <= 3) {
         return 3;
      } else if (this.percentage <= 4) {
         return 4;
      } else {
         return 5;
      }
   }
}
