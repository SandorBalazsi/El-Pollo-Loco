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
        'img/img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/img/4_enemie_boss_chicken/4_hurt/G23.png',
        'img/img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    world;
    distanceToCharacter;

    action_music = new Audio('audio/action_music.mp3');

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

    animate() {
        setInterval(() => {
            this.i++;
            this.firstContact();
            this.startMainLoop();
        }, 100);
    }



firstContact(){
    if (this.world.character.x > 3600 && !this.isAlerted) {
        this.i = 0;
        this.isAlerted = true;
        this.canWalk = true;
    };
};

startMainLoop(){
    if (this.isHurt && this.energy > 0) {
        this.playAnimation(this.IMAGES_HURT);
    } else if (this.isDead) {
        this.startDeathAnimation();
    } else if (this.canWalk) {
        this.startWalkingAnimation();
    };
};


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
    };
};

startDeathAnimation(){
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
        wonGame();
    }, 1000)
   
}


stopAnimationOnLastFrame(images) {
    this.loadImage(images[images.length - 1]);
}


endBossHit() {
    if (!this.endBossIsHurt()) {
        this.energy -= 20;
        if (this.energy <= 0) {
            this.isDead = true;
        } else {
            this.canWalk = false;
            this.isHurt = true;
            this.lastHit = new Date().getTime();
            setTimeout (() =>{
                this.canWalk = true;
                this.isHurt = false;
            }, 600)
            
        }
    }
}

endBossIsHurt() {
    let timePassed = (new Date().getTime() - this.lastHit) / 1000;
    return timePassed < 1;
}

}