class ThrowableObject extends MovableObject {
  IMAGES_BOTTLE_SPLASH = [
    "img/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  IMAGES_BOTTLE_ROTATING = [
    "img/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  bottle_break_sound = new Audio("audio/bottle_break.mp3");

  constructor(x, y) {
    super().loadImage(
      "img/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.loadImages(this.IMAGES_BOTTLE_ROTATING);
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 70;
    this.throw();
    this.otherDirection = false;
  }

  /**
   * Checks if the bottle is above the ground level.
   */
  isBottleAboveGround() {
    return this.y < 380;
  }

  /**
   * Throws the bottle by setting its initial vertical position, speed, and acceleration.
   * This method controls the bottle's throwing motion and manages its animation while it's in the air.
   * The bottle rotates and eventually splashes when it reaches the ground.
   */
  throw() {
    this.y = 225;
    this.speedY = 20;
    this.acceleration = 3;
    this.throwInterval = setInterval(() => {
      if (world.character.otherDirection === true) {
        this.x -= 20;
      } else {
        this.x += 20;
      }
      if (this.isBottleAboveGround() || this.speedY > 0) {
        this.bottleRotating();
      }
      if (this.y >= 380 && this.speedY <= 0) {
        this.bottleSplash();
      }
    }, 1000 / 60);
  }

  /**
   * Rotates the bottle while it is in the air.
   * This method is called while the bottle is falling or floating above the ground.
   * The bottle's vertical position decreases, and the animation of the rotating bottle is played.
   */
  bottleRotating() {
    this.y -= this.speedY;
    this.speedY -= this.acceleration;
    this.playAnimation(this.IMAGES_BOTTLE_ROTATING);
  }

  /**
   * Triggers the splash effect when the bottle hits the ground.
   * The bottle's position is set to the ground, the splash animation is played, and a sound is triggered.
   * After the splash animation, the bottle's image is updated, and the throwing interval is cleared.
   */
  bottleSplash() {
    this.y = 380;
    this.speedY = 0;
    this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    if (muteState === 'false') {
      this.bottle_break_sound.play();
    }
    clearInterval(this.throwInterval);
    setTimeout(() => {
      this.loadImage(
        "img/img/6_salsa_bottle/bottle_rotation/bottle_splash/bottle_end.png"
      );
    }, 400);
  }
}
