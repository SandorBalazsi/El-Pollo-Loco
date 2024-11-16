class World {
  endBoss = new Endboss();
  character = new Character();
  ctx;
  level;
  keyboard;
  camera_x = 0;
  statusBar = new Statusbar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  endBossStatusBar = new EndbossHealthBar();
  collectedBottle = 0;
  throwableObjects = [];
  canThrow = false;
  distanceToCharacter;

  collect_sound = new Audio("audio/collect_coin.mp3");
  collect_bottle_sound = new Audio("audio/collect_bottle.mp3");

  constructor(canvas, keyboard, level) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level = level;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Sets the world context for the endBoss and character.
   * This ensures that both entities can access the world they belong to.
   */
  setWorld() {
    this.endBoss.world = this;
    this.character.world = this;
  }

  /**
   * Runs the game logic at a regular interval (every 60ms).
   * It checks various conditions such as device type, collisions, and interactions between objects.
   */
  run() {
    setInterval(() => {
      this.checkMobileDevice();
      this.checkCollisions();
      this.checkCollisionWithCoin();
      this.checkCollisionWithBottle();
      this.checkThrowObjects();
      this.checkBottleCollision();
      this.checkDistanceToCharacter();
    }, 60);
  }

  /**
   * Checks if the device is a mobile device by detecting touch points and user agent.
   */
  isMobile() {
    return (
      navigator.maxTouchPoints > 0 &&
      /Android|iPhone/i.test(navigator.userAgent)
    );
  }

  /**
   * Calculates the distance between the endBoss and the character.
   * This value is used to trigger behaviors or actions based on proximity.
   */
  checkDistanceToCharacter() {
    this.distanceToCharacter = this.endBoss.x - this.character.x;
    this.endBoss.distanceToCharacter = this.distanceToCharacter;
  }

  /**
   * Adjusts the UI based on whether the user is on a mobile device.
   * On mobile, it shows certain UI elements and hides others.
   */
  checkMobileDevice() {
    if (this.isMobile()) {
      document.getElementById("icons").classList.remove("d-none");
      document.getElementById("menu_icons").classList.add("d-none");
    } else {
      document.getElementById("icons").classList.add("d-none");
    }
  }

  /**
   * Checks for collisions between the character and enemies.
   * If the character collides with an enemy and is falling, it jumps and the enemy dies.
   * If not falling, the character takes damage.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.speedY < 0 && enemy.dead == false) {
          this.character.jump();
          enemy.chickenDead();
        } else if (enemy.dead == false) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
          console.log("Collision with Character", this.character.energy);
        }
      }
    });
  }

  /**
   * Checks if thrown bottles collide with enemies or the endBoss.
   * If a bottle collides with an enemy, the enemy dies. If it hits the endBoss, it damages the endBoss.
   */
  checkBottleCollision() {
    world.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (
          bottle.isBottleAboveGround() &&
          bottle.isColliding(this.endBoss) &&
          !this.endBoss.dead
        ) {
          this.endBoss.endBossHit();
          this.endBossStatusBar.setPercentage(this.endBoss.energy);
        } else if (
          enemy !== this.endBoss &&
          bottle.isColliding(enemy) &&
          !enemy.dead &&
          bottle.isBottleAboveGround()
        ) {
          enemy.chickenDead();
        }
      });
    });
  }

  /**
   * Checks if the character collides with any coin in the level.
   * If a collision occurs and the character hasn't collected 10 coins yet, the coin is collected.
   */
  checkCollisionWithCoin() {
    this.level.coin = this.level.coin.filter((coin) => {
      if (this.character.isColliding(coin) && this.coinBar.coinNr < 10) {
        this.collectCoin(coin);
        return false; // Coin entfernen
      }
      return true; // Coin behalten
    });
  }

  /**
   * Increases the coin count and updates the UI when a coin is collected.
   */
  collectCoin() {
    this.coinBar.coinNr++;
    this.coinBar.setCoinNr(this.coinBar.coinNr);
    if (soundOn == true) {
      this.collect_sound.play();
    }
  }

  /**
   * Checks if the character collides with any bottle in the level.
   * If a collision occurs and the character hasn't collected 10 bottles yet, the bottle is collected.
   */
  checkCollisionWithBottle() {
    this.level.bottle = this.level.bottle.filter((bottle) => {
      if (this.character.isColliding(bottle) && this.bottleBar.bottleNr < 10) {
        this.canThrow = true;
        this.collectBottle(bottle);
        return false; // Bottle entfernen
      }
      return true; // Bottle behalten
    });
  }

  /**
   * Increments the bottle count and updates the UI when a bottle is collected.
   */
  collectBottle() {
    this.bottleBar.bottleNr++;
    this.bottleBar.setBottleNr(this.bottleBar.bottleNr);
    console.log("Bottle collected!");
    this.collectedBottle++;
    this.bottleBar.scale = 1;
    if (soundOn == true) {
      this.collect_bottle_sound.play();
    }
  }

  /**
   * Checks if the player presses the space key to throw a bottle.
   * If the player has collected at least one bottle, it creates a new throwable object and reduces the bottle count.
   */
  checkThrowObjects() {
    if (this.keyboard.SPACE && this.collectedBottle > 0 && this.canThrow) {
      this.collectedBottle--;
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.bottleBar.bottleNr--;
      this.bottleBar.setBottleNr(this.bottleBar.bottleNr);
      this.canThrow = false;
    }
  }

  /**
   * Clears the canvas, adds objects to the map, and redraws everything.
   * This function is continuously called to render the game frame-by-frame.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.addFixedObjects();
    this.ctx.translate(this.camera_x, 0);
    this.addMovingObjects();
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds a list of objects to the map by calling addObjectsToMap for each object.
   * This method handles dynamic objects (background, coins, enemies, etc.)
   */
  addObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coin);
    this.addObjectsToMap(this.level.bottle);
  }

  /**
   * Adds fixed objects (such as UI elements and the endBoss health bar) to the map.
   */
  addFixedObjects() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    if (this.endBoss.isAlerted === true) {
      this.addToMap(this.endBossStatusBar);
    }
  }

  /**
   * Adds moving objects (such as the character, endBoss, and throwable objects) to the map.
   */
  addMovingObjects() {
    this.addToMap(this.endBoss);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
  }

  /**
   * Adds multiple objects to the map by iterating through the array and calling addToMap on each object.
   * @param {Array} objects - The list of objects to be added to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds an individual object to the map and handles flipping if the object is flipped horizontally.
   * @param {Object} object - The object to be added to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the object horizontally across the x-axis by modifying the canvas context.
   * The object's position is also updated to reflect the flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Reverts the horizontal flip applied by `flipImage`, restoring the object to its original position.
   * Restores the canvas context to its previous state.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
