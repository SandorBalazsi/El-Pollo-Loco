class CoinBar extends DrawableObject {


    IMAGES_COIN = [
        'img/img/8_coin/Gold/coin_0.png',
        'img/img/8_coin/Gold/coin_1.png',
        'img/img/8_coin/Gold/coin_2.png',
        'img/img/8_coin/Gold/coin_3.png',
        'img/img/8_coin/Gold/coin_4.png',
        'img/img/8_coin/Gold/coin_5.png',
        'img/img/8_coin/Gold/coin_6.png',
        'img/img/8_coin/Gold/coin_7.png',
        'img/img/8_coin/Gold/coin_8.png',
        'img/img/8_coin/Gold/coin_9.png',
        'img/img/8_coin/Gold/coin_10.png'
    ];

    coinNr = 0;
    
    constructor(){
        super();
        this.loadImages(this.IMAGES_COIN);
        this.x = 220;
        this.y = 10;
        this.width = 110
        this.height = 100;
        this.setCoinNr(0);
    }

    setCoinNr(coinNr){
        this.coinNr = coinNr;
        let path = this.IMAGES_COIN[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.coinNr == 10) {
            return 10;
        } else if (this.coinNr == 9) {
            return 9;
        } else if (this.coinNr == 8) {
            return 8; 
        } else if (this.coinNr == 7) {
            return 7;
        } else if (this.coinNr == 6) {
            return 6;
        } else if (this.coinNr == 5) {
            return 5;
        } else if (this.coinNr == 4) {
            return 4;
        } else if (this.coinNr == 3) {
            return 3;
        } else if (this.coinNr == 2) {
            return 2;
        } else if (this.coinNr == 1) {
            return 1;
        } else {
            return 0;
        }
    }
}