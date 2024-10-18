class SmallChicken extends MovableObject{
    
    y = 350;
    height = 70;
    width = 70;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      };

      dead = false;

    IMAGES_WALKING = [
        'img/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    small_chicken_dead_sound = new Audio('audio/small_chicken_dead.mp3');

    constructor(){
        super().loadImage('img/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = 200 +  (Math.random() * (2200 - 500) - 500);
        this.speed = 0.15 + Math.random() * 0.5;
        this.loadImages(this.IMAGES_WALKING);
    
        this.animate();
    }

    moveChicken = setInterval(() => {
        this.moveLeft();
    }, 1000/60);

    walkChicken = setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
     },200);
    

    animate(){
        
        this.moveChicken;
        this.walkChicken;
        
    };

   
    chickenDead(){
        clearInterval(this.moveChicken);
        clearInterval(this.walkChicken);
        this.loadImage('img/img/3_enemies_chicken/chicken_small/2_dead/dead.png');
        this.dead = true;
        if( soundOn == true){
            this.small_chicken_dead_sound.play()
        };
    }
}