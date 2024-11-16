class Coin extends MovableObject {
  IMAGES_COIN = [
    "img/img/8_coin/Gold/Gold_21.png",
    "img/img/8_coin/Gold/Gold_22.png",
    "img/img/8_coin/Gold/Gold_23.png",
    "img/img/8_coin/Gold/Gold_24.png",
    "img/img/8_coin/Gold/Gold_25.png",
    "img/img/8_coin/Gold/Gold_26.png",
    "img/img/8_coin/Gold/Gold_27.png",
    "img/img/8_coin/Gold/Gold_28.png",
    "img/img/8_coin/Gold/Gold_29.png",
    "img/img/8_coin/Gold/Gold_30.png",
  ];

  constructor(x, y) {
    super().loadImage("img/img/8_coin/Gold/Gold_21.png");
    this.loadImages(this.IMAGES_COIN);
    this.height = 50;
    this.width = 50;
    this.y = y;
    this.x = x;
    this.rotateCoin;
  }

  /**
   * Starts a repeating animation for the coin rotation.
   */
  rotateCoin = setInterval(() => {
    this.playAnimation(this.IMAGES_COIN);
  }, 200);
}
