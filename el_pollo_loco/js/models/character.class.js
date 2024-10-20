class Character extends MovableObject{

    height = 300;
    width = 150;
    y = 30;
    x = 60;
    speed = 10;

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
    
    constructor(){
        super().loadImage('img/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    animate(){

        setInterval(() => {
            this.walking_audio.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x ){
                this.moveRight();
                this.otherDirection = false;
                if( soundOn == true){
                    this.walking_audio.play();
                };
            }
            if (this.world.keyboard.LEFT && this.x > 0 ){
                this.moveLeft();
                this.otherDirection = true;
                if( soundOn == true){
                    this.walking_audio.play();
                };
            }
  
            if(this.world.keyboard.UP && !this.isAboveGround()){
                this.jump();
                if( soundOn == true){
                    this.jump_audio.play();
                };
                
            }
          
            this.world.camera_x = -this.x + 100 ;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                stopGame();
            }

            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                if( soundOn == true){
                     this.hit_audio.play();
                };
            }

            else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround()){
                this.playAnimation(this.IMAGES_WALKING);
            }

            else if(this.isAboveGround()){
                this.playAnimation(this.IMAGES_JUMPING);
            }

            else{
                this.playAnimation(this.IMAGES_STANDING);
            }
            
            },200);      

    };

}