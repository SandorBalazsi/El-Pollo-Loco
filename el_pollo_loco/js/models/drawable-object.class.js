class DrawableObject {
    imageCache = {};
    img;
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

      // loadImage('img/test.png');
  loadImage(path) {
    this.img = new Image(); //this.img = document.getElementById('image'); <img id = 'image' src>
    this.img.src = path;
  }

  /**
   *
   * @param {Array} arr - ['img/image1.png','img/image2.png', ...]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }


  showFrame(ctx) {

    if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  showOffsetFrame(ctx) {

    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = '3';
      ctx.strokeStyle = 'red';
      ctx.rect(this.x + this.offset.right, this.y + this.offset.top, this.width - (this.offset.right + this.offset.left), this.height - (this.offset.top + this. offset.bottom));
      ctx.stroke();
    }

    if (this instanceof Character){
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'green';
      ctx.rect(this.x + this.offset.left, this.y + this.height - this.offset.bottom, this.width - (this.offset.right + this.offset.left),1 );
      ctx.stroke();
    }
  }


} 
