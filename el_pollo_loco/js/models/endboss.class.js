class Endboss extends MovableObject {

    x = 2450;
    y = -10;
    height = 500;
    width = 350;
    speed = 1;

    energy = 100;
    endBossAgro = false;
    isAnimating = false;

    dead = false;


    IMAGES_WALKING = [
        'img/img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [ 
        'img/img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/img/4_enemie_boss_chicken/2_alert/G11.png'
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
        'img/img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    
    action_music = new Audio ('audio/action_music.mp3');

    constructor(){
        
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.alertEndboss();
        this.action_music.muted = true;
    }


    alertEndboss(){

        setInterval(() => {
                if ((this.x - world.character.x) <= 500){
                    if (!this.endBossAgro) {
                        this.endBossAgro = true;
                        this.startAnimation();
                    } 
            } else {
                this.endBossAgro = false;
                this.isAnimating = false;
            }       
            }, 300);
    }


    startAnimation(){
        if (this.isAnimating) return;
        this.isAnimating = true;
    
        // Start the alert animation first
        this.playAlertAnimation();
    }
    

    playWalkingAnimation() {
        let walkingInterval = setInterval(() => {
            if (!this.endBossAgro) {
                clearInterval(walkingInterval);
                this.isAnimating = false;
                return;
            }
    
            this.moveLeft();
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    
        // Stop walking animation and switch back to alert after 3 seconds
        setTimeout(() => {
            clearInterval(walkingInterval);
            if (this.endBossAgro) {
                this.playAlertAnimation();
            } else {
                this.isAnimating = false;
            }
        }, 3000);
    }
    

    playAlertAnimation() {
        let alertInterval = setInterval(() => {
            if (!this.endBossAgro) {
                clearInterval(alertInterval);
                this.isAnimating = false;
                return;
            }
    
            this.playAnimation(this.IMAGES_ALERT);
        }, 100);
    
        // Switch to walking animation after 2 seconds
        setTimeout(() => {
            clearInterval(alertInterval);
            if (this.endBossAgro) {
                this.playWalkingAnimation();
            } else {
                this.isAnimating = false;
            }
        }, 2000);
    }


    endBossHit(){
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
            this.endBossDead();
          }
          else {
            this.lastHit = new Date().getTime();
          }
    }
    
    endBossIsHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    endBossDead(){
        clearInterval(this.moveChicken);
        this.playAnimation(this.IMAGES_DEAD);
        this.dead = true;
    }
}