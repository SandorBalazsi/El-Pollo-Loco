class Bottle extends MovableObject {
  IMAGES_BOTTLE = [
    "img/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  randomImage =
    this.IMAGES_BOTTLE[Math.floor(Math.random() * this.IMAGES_BOTTLE.length)];

  constructor(x) {
    super().loadImage(this.randomImage);
    this.loadImages(this.IMAGES_BOTTLE);
    this.height = 100;
    this.width = 100;
    this.y = 340;
    this.x = x;
  }
}
