class BottleBar extends DrawableObject {

    IMAGES_BOTTLE = [
        'img/img/6_salsa_bottle/bottle_counter/bottle_0.png',
        'img/img/6_salsa_bottle/bottle_counter/bottle_1.png',
        'img/img/6_salsa_bottle/bottle_counter/bottle_2.png',
        'img/img/6_salsa_bottle/bottle_counter/bottle_3.png',
        'img/img/6_salsa_bottle/bottle_counter/bottle_4.png',
        'img/img/6_salsa_bottle/bottle_counter/bottle_5.png',
        'img/img/6_salsa_bottle/bottle_counter/bottle_6.png',
        'img/img/6_salsa_bottle/bottle_counter/bottle_7.png',
        'img/img/6_salsa_bottle/bottle_counter/bottle_8.png',
        'img/img/6_salsa_bottle/bottle_counter/bottle_9.png',
        'img/img/6_salsa_bottle/bottle_counter/bottle_10.png'
    ];

    bottleNr = 0;
    
    constructor(){
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 320;
        this.y = 10;
        this.width = 110
        this.height = 100;
        this.setBottleNr(0);
    }

    setBottleNr(bottleNr){
        this.bottleNr = bottleNr;

        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.bottleNr == 10) {
            return 10;
        } else if (this.bottlenNr == 9) {
            return 9;
        } else if (this.bottleNr == 8) {
            return 8; 
        } else if (this.bottleNr == 7) {
            return 7;
        } else if (this.bottleNr == 6) {
            return 6;
        } else if (this.bottleNr == 5) {
            return 5;
        } else if (this.bottleNr == 4) {
            return 4;
        } else if (this.bottleNr == 3) {
            return 3;
        } else if (this.bottleNr == 2) {
            return 2;
        } else if (this.bottleNr == 1) {
            return 1;
        } else {
            return 0;
        }
    }
}
