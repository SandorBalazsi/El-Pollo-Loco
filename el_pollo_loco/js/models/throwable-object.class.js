class ThrowableObject extends MovableObject{

    IMAGES_BOTTLE_SPLASH = [
        'img/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    IMAGES_BOTTLE_ROTATING = [
        'img/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    bottle_break_sound = new Audio ('audio/bottle_break.mp3');
    
    constructor(x, y){
        super().loadImage('img/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.loadImages(this.IMAGES_BOTTLE_ROTATING);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 70;
        this.throw();
        this.otherDirection = false;
        
    }

    isBottleAboveGround(){
        return this.y < 380;
    }


    throw(){
        this.y = 225;
        this.speedY = 20;
        this.acceleration = 3;
        
        console.log(`Initial speedY: ${this.speedY}, initial y: ${this.y}`);


    this.throwInterval = setInterval(() => {
        if(world.character.otherDirection === true){
            this.x -= 20;
        } else {
            this.x += 20;
        }

        if(this.isBottleAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            this.playAnimation(this.IMAGES_BOTTLE_ROTATING);
        }

        if (this.y >= 380 && this.speedY <= 0){
            this.y = 380;
            this.speedY = 0;
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            if( soundOn == true){
                this.bottle_break_sound.play();
            };
            clearInterval(this.throwInterval);
            setTimeout(() => {
                this.loadImage('img/img/6_salsa_bottle/bottle_rotation/bottle_splash/bottle_end.png')
            }, 600);
        }
    }, 1000/60);
}
}