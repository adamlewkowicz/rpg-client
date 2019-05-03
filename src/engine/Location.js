

export class Location {

  constructor(ctx, { x, y, image, charWidth, charHeight }) {
    this.x = x;
    this.y = y;
    this.charWidth = charWidth;
    this.charHeight = charHeight;

    this.ctx = ctx;
    this.image = image;

    this.width = this.image.naturalWidth;
    this.height = this.image.naturalHeight;

    this.gameWidth = this.ctx.canvas.width;
    this.gameHeight = this.ctx.canvas.height;

    this.posX = this.x * this.charWidth;
    this.posY = this.y * this.charHeight;
  }

  move(x, y) {

  }

  render(x, y) {
    this.posX = x * this.charWidth;
    this.posY = y * this.charHeight;

    this.ctx.drawImage(this.image,
      this.posX, this.posY, /* Transformation */
      this.gameWidth, this.gameHeight,
      0, 0,
      this.gameWidth, this.gameHeight
    );
  }
}