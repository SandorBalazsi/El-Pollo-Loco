let tutorial; 
let coins;

function initLevel(){
        tutorial = new Level(
        [   new Chicken(),
            new SmallChicken()
            //new Chicken(), 
            //new Chicken(),
            //new Chicken(), 
            //new Chicken(), 
            //new Chicken(), 
            //new Endboss()
        ],
        [
            new Cloud(Math.random() * (500 - 0) + 0),
            new Cloud(Math.random() * (1000 - 500) + 500),
            new Cloud(Math.random() * (1500 - 1000) + 1000),
            new Cloud(Math.random() * (2000 - 1500) + 1500),
            new Cloud(Math.random() * (2500 - 2000) + 2000)
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
            new BackgroundObject("img/img/5_background/layers/1_first_layer/2.png", 719*3)
          ],
          [],
          [],
          [],
          [ 
            new Coin(100),
            new Coin(200),
            new Coin(300)
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
