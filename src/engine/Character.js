
export class Character {
  constructor(ctx, { x, y, image, isOwn = false }) {
    this.ctx = ctx;
    this.image = image;
    this.isOwn = isOwn;

    this.width = 32;
    this.height = 48;

    this.isXLocked = false;
    this.isYLocked = false;
  }

  render(x, y) {
    let posX = x * this.width;
    let posY = y * this.height;

    this.ctx.drawImage(this.image,
      0, 0,
      this.width, this.height,
      posX, posY,
      this.width, this.height
    );
  }
}