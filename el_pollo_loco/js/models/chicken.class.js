class Chicken extends MovableObject {
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
    "img/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  chicken_dead_sound = new Audio("audio/chicken_dead.mp3");

  constructor() {
    super().loadImage(
      "img/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
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
   * Starts the chicken's movement and walking animation using intervals.
   */
  animate() {
    this.moveChicken;
    this.walkChicken;
  }

  /**
   * Stops the chicken's movement and animation, marks it as dead,
   * and updates the visual and audio feedback for its death.
   */
  chickenDead() {
    clearInterval(this.moveChicken);
    clearInterval(this.walkChicken);
    this.loadImage("img/img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
    this.dead = true;
    if (muteState === 'false') {
      this.chicken_dead_sound.play();
      this.chicken_dead_sound.volume = 0.5;
    }
  }
}
