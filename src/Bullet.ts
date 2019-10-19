export class Bullet {
  moveX: number;
  moveY: number;

  constructor(
    public x: number,
    public y: number,
    private dx: number,
    private dy: number,
    private removeBullet: (bullet: Bullet) => void,
    private speed = 50
  ) {
    const angle = Math.atan2(this.dy - this.y, this.dx - this.x);

    this.moveX = Math.cos(angle);
    this.moveY = Math.sin(angle);
  }

  update(ctx: CanvasRenderingContext2D) {
    this.move();

    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
  }

  move() {
    this.x += this.moveX * this.speed;
    this.y += this.moveY * this.speed;

    if (
      this.x > window.innerWidth ||
      this.y > window.innerHeight ||
      this.x < 0 ||
      this.y < 0
    ) {
      this.removeBullet(this);
    }
  }
}
