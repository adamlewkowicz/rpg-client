
export class Character {
  constructor(ctx, { x, y, image, width, height, isOwn = false }) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.image = image;

    this.isOwn = isOwn;
  }

  render(x, y) {
    const posX = x * this.width;
    const posY = y * this.height;

    this.ctx.drawImage(this.image,
      0, 0,
      this.width, this.height,
      posX, posY,
      this.width, this.height
    );
  }
}