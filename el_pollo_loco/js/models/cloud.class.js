class Cloud extends MovableObject{
    y = 20;
    height = 250;
    width = 500;
    speed = 0.3;

    constructor(x){
        super().loadImage('img/img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.x = x;

        this.animate();
    }

    animate(){

        setInterval(() => {
            this.moveLeft();    
        }, 1000 / 60);   
    }
}