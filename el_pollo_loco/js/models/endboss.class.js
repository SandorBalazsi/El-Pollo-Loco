class Endboss extends MovableObject {

    x = 2450;
    y = -10;
    height = 500;
    width = 350;
    speed = 1;

    energy = 100;
    endBossAgro = false;

    dead = false;
   

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
        'img/img/4_enemie_boss_chicken/3_attack/G21.png',
        'img/img/4_enemie_boss_chicken/3_attack/G22.png',
        'img/img/4_enemie_boss_chicken/3_attack/G23.png'
    ];

    IMAGES_DEAD = [
        'img/img/4_enemie_boss_chicken/3_attack/G24.png',
        'img/img/4_enemie_boss_chicken/3_attack/G25.png',
        'img/img/4_enemie_boss_chicken/3_attack/G26.png'
    ];

    action_music = new Audio ('audio/action_music.mp3');

    constructor(){
        
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.alertEndboss();
        this.action_music.muted = true;
        

    }

    alertEndboss(){
        
        setInterval(() => {
                if (world.character.x >= 1650 && soundOn == true){
                    this.endBossAgro = true;
                    this.action_music.muted = false;
                    this.action_music.play();
                    this.action_music.loop = true;
                    background_music.muted = true;
            } else if(soundOn == true){
                this.endBossAgro = false;
                this.action_music.pause();
                this.action_music.muted = true
                background_music.muted = false;
            };
            }, 300);
    }

    animate(){
        setInterval(() => {
            if (world.character.x >= 1850){
                this.playAnimation(this.IMAGES_ALERT);
                setTimeout(() => {
                    this.moveChicken;

                }, 1000);
                
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }

        },300);
    }; 

    moveChicken = setInterval(() => {
        this.moveLeft();
    }, 1000/30);



    endBossDead(){
        clearInterval(this.moveChicken);
        clearInterval(this.walkChicken);
        this.playAnimation(this.IMAGES_DEAD);
        this.dead = true;
    }
}