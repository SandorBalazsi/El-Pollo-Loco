let level1; 
let coins;

function initLevel(){
        level1 = new Level(
        [   new Chicken(),
            new SmallChicken(),
            new Chicken(), 
            new SmallChicken(),
            new Chicken(), 
            new SmallChicken(), 
            new Chicken(),
            new SmallChicken(),
            new Chicken(), 
            new Chicken(), 
            new SmallChicken(), 
            new Chicken(),
            new SmallChicken(),
            new Chicken() 
        ],
        [
            new Cloud(Math.random() * (500 - 0) + 0),
            new Cloud(Math.random() * (1000 - 500) + 500),
            new Cloud(Math.random() * (1500 - 1000) + 1000),
            new Cloud(Math.random() * (2000 - 1500) + 1500),
            new Cloud(Math.random() * (2500 - 2000) + 2500),
            new Cloud(Math.random() * (2500 - 2000) + 3000),
            new Cloud(Math.random() * (2500 - 2000) + 3500)
        ],
        
        [
            new BackgroundObject("img/img/5_background/layers/air.png", -719),
            new BackgroundObject("img/img/5_background/layers/3_third_layer/2.png", -719),
            new BackgroundObject("img/img/5_background/layers/2_second_layer/2.png", -719),
            new BackgroundObject("img/img/5_background/layers/1_first_layer/2.png", -719, 440 - this.height),
        
            new BackgroundObject("img/img/5_background/layers/air.png", 0),
            new BackgroundObject("img/img/5_background/layers/3_third_layer/1.png", 0),
            new BackgroundObject("img/img/5_background/layers/2_second_layer/1.png", 0),
            new BackgroundObject("img/img/5_background/layers/1_first_layer/1.png", 0),
        
        
            new BackgroundObject("img/img/5_background/layers/air.png", 719),
            new BackgroundObject("img/img/5_background/layers/3_third_layer/2.png", 719),
            new BackgroundObject("img/img/5_background/layers/2_second_layer/2.png", 719),
            new BackgroundObject("img/img/5_background/layers/1_first_layer/2.png", 719),
        
        
            new BackgroundObject("img/img/5_background/layers/air.png", 719*2),
            new BackgroundObject("img/img/5_background/layers/3_third_layer/1.png", 719*2),
            new BackgroundObject("img/img/5_background/layers/2_second_layer/1.png", 719*2),
            new BackgroundObject("img/img/5_background/layers/1_first_layer/1.png", 719*2),
        
            new BackgroundObject("img/img/5_background/layers/air.png", 719*3),
            new BackgroundObject("img/img/5_background/layers/3_third_layer/2.png", 719*3),
            new BackgroundObject("img/img/5_background/layers/2_second_layer/2.png", 719*3),
            new BackgroundObject("img/img/5_background/layers/1_first_layer/2.png", 719*3),

            new BackgroundObject("img/img/5_background/layers/air.png", 719*4),
            new BackgroundObject("img/img/5_background/layers/3_third_layer/1.png", 719*4),
            new BackgroundObject("img/img/5_background/layers/2_second_layer/1.png", 719*4),
            new BackgroundObject("img/img/5_background/layers/1_first_layer/1.png", 719*4),

            new BackgroundObject("img/img/5_background/layers/air.png", 719*5),
            new BackgroundObject("img/img/5_background/layers/3_third_layer/2.png", 719*5),
            new BackgroundObject("img/img/5_background/layers/2_second_layer/2.png", 719*5),
            new BackgroundObject("img/img/5_background/layers/1_first_layer/2.png", 719*5)

          ],
          [],
          [],
          [],
          [ 
            new Coin(300,140),
            new Coin(400,120),
            new Coin(1700,140),
            new Coin(790,120),
            new Coin(1510,140),
            new Coin(2050,120),
            new Coin(1850,140),
            new Coin(2190,120),
            new Coin(2480,140),
            new Coin(600,120)
          ],
          [
            new Bottle(250),
            new Bottle(400),
            new Bottle(810),
            new Bottle(1200),
            new Bottle(1750),
            new Bottle(1900),
            new Bottle(2200),
            new Bottle(2600),
            new Bottle(2580),
            new Bottle(2280)

        ],
         
          
          );
        }
