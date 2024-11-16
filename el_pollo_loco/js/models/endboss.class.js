class Endboss extends MovableObject {
  x = 4000;
  y = -10;
  height = 500;
  width = 350;
  speed = 5;
  energy = 100;

  isAlerted = false;
  isHurt = false;
  isDead = false;
  canWalk = false;

  agroTriggered = false;
  lastHit = 0;

  IMAGES_WALKING = [
    "img/img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/img/4_enemie_boss_chicken/4_hurt/G23.png",
    "img/img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  world;
  distanceToCharacter;

  action_music = new Audio("audio/action_music.mp3");
  hit_audio = new Audio("audio/boss_hit_sound.mp3");

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.action_music.muted = true;
    this.animate();
  }

  /**
   * Starts the animation loop, updating behavior at regular intervals.
   * Calls `firstContact` to trigger alerts and `startMainLoop` to handle actions based on states.
   */
  animate() {
    setInterval(() => {
      this.i++;
      this.firstContact();
      this.startMainLoop();
    }, 100);
  }

  /**
   * Checks if the player character has crossed a certain threshold to alert the Endboss.
   * When the player crosses the alert threshold, the Endboss is alerted, can start walking, and plays sound if enabled.
   */
  firstContact() {
    if (this.world.character.x > 3600 && !this.isAlerted) {
      this.i = 0;
      this.isAlerted = true;
      this.canWalk = true;
      if (soundOn === true) {
        this.action_music.play();
      }
    }
  }

  /**
   * Starts the main animation loop based on the current state of the Endboss (hurt, dead, walking).
   */
  startMainLoop() {
    if (this.isHurt && this.energy > 0) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isDead) {
      this.startDeathAnimation();
    } else if (this.canWalk) {
      this.startWalkingAnimation();
    }
  }

  /**
   * Starts the walking animation of the Endboss.
   * Plays an alert animation initially, then switches to walking or attacking based on proximity to the character.
   */
  startWalkingAnimation() {
    if (this.i < 10) {
      this.playAnimation(this.IMAGES_ALERT);
    } else {
      if (this.distanceToCharacter <= 100) {
        this.playAnimation(this.IMAGES_ATTACK);
        this.world.character.hit();
        this.world.statusBar.setPercentage(this.world.character.energy);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
      this.moveLeft();
    }
  }

  /**
   * Starts the death animation of the Endboss and triggers the game win state after a short delay.
   */
  startDeathAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      wonGame();
    }, 1000);
  }

  /**
   * Stops the animation and holds the last frame from the provided image array.
   */
  stopAnimationOnLastFrame(images) {
    this.loadImage(images[images.length - 1]);
  }

  /**
   * Handles the Endboss taking damage when hit by the player.
   * Reduces energy, triggers hurt state, and disables movement temporarily.
   */
  endBossHit() {
    if (!this.endBossIsHurt()) {
      this.energy -= 20;
      if (this.energy <= 0) {
        this.isDead = true;
      } else {
        this.canWalk = false;
        this.isHurt = true;
        this.lastHit = new Date().getTime();
        if (soundOn == true) {
          this.hit_audio.play();
        }
        setTimeout(() => {
          this.canWalk = true;
          this.isHurt = false;
        }, 600);
      }
    }
  }

  /**
   * Checks if the Endboss is in a hurt state based on the time since the last hit.
   * Prevents multiple hits in a short period (less than 1 second).
   */
  endBossIsHurt() {
    let timePassed = (new Date().getTime() - this.lastHit) / 1000;
    return timePassed < 1;
  }
}
