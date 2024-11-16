let level1; 
let coins;

function initLevel(){
        level1 = new Level(
        [   new Chicken(),
            new SmallChicken()
            //new Chicken(), 
            //new Chicken(),
            //new Chicken(), 
            //new Chicken(), 
            //new Chicken(), 
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
            new Coin(100,120),
            new Coin(200,120),
            new Coin(300,120)
          ],
          [
            new Bottle(500),
            new Bottle(600),
            new Bottle(700),
            new Bottle(800),
            new Bottle(900)
        ],
         
          
          );
        }
