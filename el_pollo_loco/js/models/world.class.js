class World {
  character = new Character();
  ctx;
  level;
  keyboard;
  camera_x = 0;
  statusBar = new Statusbar;
  coinBar = new CoinBar;
  bottleBar = new BottleBar;
  endBossStatusBar = new EndbossHealthBar;
  collectedBottle = 0;
  throwableObjects = [];
  canThrow = false;
  
  

  collect_sound = new Audio('audio/collect_coin.mp3');
  collect_bottle_sound = new Audio('audio/collect_bottle.mp3');

  constructor(canvas, keyboard, level) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level = level;
    this.draw();
    this.setWorld();
    this.run();
   
  }

  setWorld() {
    this.character.world = this;
  }

  run(){
    setInterval(() => {
    this.checkCollisions();
    this.checkCollisionWithCoin();
    this.checkCollisionWithBottle();
    this.checkThrowObjects();
    this.checkBottleCollision();

   
    }, 60);
  }


  checkCollisions(){
    this.level.enemies.forEach( (enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.speedY < 0 && enemy.dead == false){
          this.character.jump();
          enemy.chickenDead();
        } else if(enemy.dead == false){
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        console.log('Collision with Character', this.character.energy);
      }};
     });
  }


  checkBottleCollision(){
    world.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach( (enemy) => {
        if(bottle.isColliding(level1.enemies[level1.enemies.length -1]) && level1.enemies[level1.enemies.length -1].dead == false){
          level1.enemies[level1.enemies.length -1].endBossHit();
          this.endBossStatusBar.setPercentage(level1.enemies[level1.enemies.length -1].energy);
        }
        else if (bottle.isColliding(enemy) && enemy.dead == false){
          enemy.chickenDead();
        };
    });
    });
  }

  checkCollisionWithCoin(){
    this.level.coin = this.level.coin.filter( (coin) => {
      if (this.character.isColliding(coin) && this.coinBar.coinNr < 10) {
        this.collectCoin(coin);
        return false;  // Coin entfernen
      }
      return true;  // Coin behalten
    });
  }


  collectCoin(){
    this.coinBar.coinNr ++;
    this.coinBar.setCoinNr(this.coinBar.coinNr);
    console.log('Coin collected!');
    if (soundOn == true){
      this.collect_sound.play();
    };
    
  }

  checkCollisionWithBottle(){
    this.level.bottle = this.level.bottle.filter( (bottle) => {
      if (this.character.isColliding(bottle) && this.bottleBar.bottleNr < 10) {
        this.canThrow = true;
        this.collectBottle(bottle);
        return false;  // Bottle entfernen
      }
      return true;  // Bottle behalten
    });
  }

  collectBottle(){
    this.bottleBar.bottleNr ++;
    this.bottleBar.setBottleNr(this.bottleBar.bottleNr);
    console.log('Bottle collected!');
    this.collectedBottle ++;
    this.bottleBar.scale = 1;
    if (soundOn == true){
      this.collect_bottle_sound.play();
    };
  }


  checkThrowObjects(){
    if (this.keyboard.D && this.collectedBottle > 0 && this.canThrow) {
      this.collectedBottle --;
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.bottleBar.bottleNr --;
      this.bottleBar.setBottleNr(this.bottleBar.bottleNr);

      this.canThrow = false;
    }
  
  }


  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coin);
    this.addObjectsToMap(this.level.bottle);
    
    this.ctx.translate(-this.camera_x, 0);
    
    //------ Space for fixed objects --------
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    //if (level1.enemies[level1.enemies.length - 1].endBossAgro === true){
    //  this.addToMap(this.endBossStatusBar);
    //}
    
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    
    
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    
    this.ctx.translate(-this.camera_x, 0);

    //Draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
        this.flipImage(mo);
    }
    
    mo.draw(this.ctx);
    mo.showFrame(this.ctx);
    mo.showOffsetFrame(this.ctx);


    if (mo.otherDirection) {
        this.flipImageBack(mo);
    }
  }

  flipImage(mo){
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo){
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
