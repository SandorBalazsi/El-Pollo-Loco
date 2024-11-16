class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;

  lastHit = 0;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Applies gravity to the object, updating its vertical position (`y`) and speed (`speedY`).
   * The gravity effect is applied at a fixed interval (30fps).
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        if (world.character.y >= 125) {
          this.y = 125;
          this.speedY = 0;
        }
      }
    }, 1000 / 30);
  }

  /**
   * Checks if the object is above the ground.
   * If the object is an instance of ThrowableObject, it checks if it's above a certain threshold (y > 380).
   * Otherwise, it checks if it's below the ground level (y < 125).
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return this.y > 380;
    } else {
      return this.y < 125;
    }
  }

  /**
   * Checks if the object is exactly on the ground by verifying if its vertical speed is 0.
   */
  isOnTheGround() {
    return (speedY = 0);
  }

  /**
   * Checks if the current object is colliding with another object.
   * Uses bounding box collision detection based on their positions and dimensions.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduces the object's energy when it is hit. Energy is reduced by 5 points per hit.
   * If energy goes below 0, it is capped at 0.
   * Also records the time of the last hit.
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is dead (energy is 0).
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Checks if the object is hurt. An object is considered hurt if it was recently hit (less than 1 second ago).
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Moves the object to the right by its current speed value.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by its current speed value.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Plays the animation by cycling through an array of image paths.
   * The current image is selected based on the current image index, which is incremented each time the function is called.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Makes the object jump by setting its vertical speed (`speedY`) to a positive value.
   */
  jump() {
    this.speedY = 25;
  }
}
