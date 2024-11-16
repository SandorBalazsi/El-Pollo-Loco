class EndbossHealthBar extends DrawableObject {
  IMAGES = [
    "img/img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "img/img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "img/img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "img/img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "img/img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "img/img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 500;
    this.y = 30;
    this.width = 200;
    this.height = 50;
    this.setPercentage(100);
  }

  /**
   * Updates the percentage of the endboss`s healthbar and updates the image based on the current energy.
   */
  setPercentage(percentage) {
    this.percentage = percentage; // => 0 ... 5
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image to display based on the current energy.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage == 80) {
      return 4;
    } else if (this.percentage == 60) {
      return 3;
    } else if (this.percentage == 40) {
      return 2;
    } else if (this.percentage == 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
