class SmallChicken extends MovableObject {
  y = 350;
  height = 70;
  width = 70;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  dead = false;

  IMAGES_WALKING = [
    "img/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  small_chicken_dead_sound = new Audio("audio/small_chicken_dead.mp3");

  constructor() {
    super().loadImage("img/img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = 900 + Math.random() * (3600 - 900);
    this.speed = 0.15 + Math.random() * 0.5;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  moveChicken = setInterval(() => {
    this.moveLeft();
  }, 1000 / 60);

  walkChicken = setInterval(() => {
    this.playAnimation(this.IMAGES_WALKING);
  }, 200);

  /**
   * Animates the chicken's behavior by calling the movement and walking functions.
   * This method is typically called every frame to update the chicken's state.
   */
  animate() {
    this.moveChicken;
    this.walkChicken;
  }

  /**
   * Handles the death of the chicken. Stops the chicken's movement and walking intervals,
   * changes the chicken's image to a dead state, and plays a death sound if sound is enabled.
   */
  chickenDead() {
    clearInterval(this.moveChicken);
    clearInterval(this.walkChicken);
    this.loadImage("img/img/3_enemies_chicken/chicken_small/2_dead/dead.png");
    this.dead = true;
    if (soundOn == true) {
      this.small_chicken_dead_sound.play();
    }
  }
}
