class Character extends MovableObject {

    height = 300;
    width = 150;
    y = 30;
    x = 60;
    speed = 10;
    seconds = 15;

    offset = {
        top: 120,
        bottom: 15,
        left: 25,
        right: 25
    };

    IMAGES_STANDING = ['img/img/2_character_pepe/1_idle/idle/I-1.png',
        'img/img/2_character_pepe/1_idle/idle/I-2.png',
        'img/img/2_character_pepe/1_idle/idle/I-3.png',
        'img/img/2_character_pepe/1_idle/idle/I-4.png',
        'img/img/2_character_pepe/1_idle/idle/I-5.png',
        'img/img/2_character_pepe/1_idle/idle/I-6.png',
        'img/img/2_character_pepe/1_idle/idle/I-7.png',
        'img/img/2_character_pepe/1_idle/idle/I-8.png',
        'img/img/2_character_pepe/1_idle/idle/I-9.png',
        'img/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_SLEEPING = [
        'img/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = ['img/img/2_character_pepe/2_walk/W-21.png',
        'img/img/2_character_pepe/2_walk/W-22.png',
        'img/img/2_character_pepe/2_walk/W-23.png',
        'img/img/2_character_pepe/2_walk/W-24.png',
        'img/img/2_character_pepe/2_walk/W-25.png',
        'img/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/img/2_character_pepe/3_jump/J-31.png',
        'img/img/2_character_pepe/3_jump/J-32.png',
        'img/img/2_character_pepe/3_jump/J-33.png',
        'img/img/2_character_pepe/3_jump/J-34.png',
        'img/img/2_character_pepe/3_jump/J-35.png',
        'img/img/2_character_pepe/3_jump/J-36.png',
        'img/img/2_character_pepe/3_jump/J-37.png',
        'img/img/2_character_pepe/3_jump/J-38.png',
        'img/img/2_character_pepe/3_jump/J-39.png'];

    IMAGES_DEAD = [
        'img/img/2_character_pepe/5_dead/D-51.png',
        'img/img/2_character_pepe/5_dead/D-52.png',
        'img/img/2_character_pepe/5_dead/D-53.png',
        'img/img/2_character_pepe/5_dead/D-54.png',
        'img/img/2_character_pepe/5_dead/D-55.png',
        'img/img/2_character_pepe/5_dead/D-56.png',
        'img/img/2_character_pepe/5_dead/D-57.png'
    ]

    IMAGES_HURT = [
        'img/img/2_character_pepe/4_hurt/H-41.png',
        'img/img/2_character_pepe/4_hurt/H-42.png',
        'img/img/2_character_pepe/4_hurt/H-43.png'
    ]

    world;

    walking_audio = new Audio('audio/walking.mp3');
    hit_audio = new Audio('audio/hit_pepe.mp3');
    jump_audio = new Audio('audio/jump.mp3');
    sleeping_audio = new Audio('audio/sleeping.mp3');

    constructor() {
        super().loadImage('img/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SLEEPING);
        this.applyGravity();
        this.animate();
        this.seconds = 15;
    }

    startCountdown() {
        setInterval(() => {
            if (this.seconds > 0) {
                this.seconds--;
            }
        }, 1000); // Decrease every second
    }

    animate() {
        this.startCountdown();
        setInterval(() => {
           this.checkingCharacterMoves();
        }, 1000 / 60);
        setInterval(() => {
           this.checkingCharacterAnimations();
        }, 200);
    };

    checkingCharacterAnimations(){
        if (this.isDead()) {
            this.characterDies();
          }
          else if (this.isHurt()) {
             this.characterHurt();
          }
          else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround()) {
             this.characterMovesAnimation();
          }
          else if (this.isAboveGround()) {
             this.characterJumpsAnimation();
          }
          else {
              this.characterSleepOrIdle();
          }
    }

    characterSleepOrIdle(){
        if (this.seconds <= 0) {
            this.playAnimation(this.IMAGES_SLEEPING);
            if (soundOn == true) {
                this.sleeping_audio.play();
            };
        } else {
            this.playAnimation(this.IMAGES_STANDING);
        }
    }

    characterDies(){
        this.playAnimation(this.IMAGES_DEAD);
        stopGame();
    }

    characterHurt(){
        this.playAnimation(this.IMAGES_HURT);
        if (soundOn == true) {
            this.hit_audio.play();
        };
        this.seconds = 15;
    }

    characterMovesAnimation(){
        this.playAnimation(this.IMAGES_WALKING);
        this.seconds = 15;
    }

    characterJumpsAnimation(){
        this.playAnimation(this.IMAGES_JUMPING);
        this.seconds = 15;
    }

    checkingCharacterMoves(){
        this.walking_audio.pause();
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.characterMovesRight();
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
           this.characterMovesLeft();
        }
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.characterJumps();
        }
        this.world.camera_x = -this.x + 100;
    }

    characterMovesLeft(){
        this.moveLeft();
        this.otherDirection = true;
        if (soundOn == true) {
            this.walking_audio.play();
        };
        this.seconds = 15;
    }

    characterMovesRight(){
        this.moveRight();
        this.otherDirection = false;
        if (soundOn == true) {
            this.walking_audio.play();
        };
        this.seconds = 15;
    }

    characterJumps(){
        this.jump();
        if (soundOn == true) {
            this.jump_audio.play();
        };
        this.seconds = 15;
    }
}