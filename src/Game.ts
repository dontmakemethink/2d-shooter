export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.querySelector("canvas")!;
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth * 2;
    this.canvas.height = window.innerHeight * 2;
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.ctx.scale(2, 2);

    this.start();
  }

  start() {
    let lastTimestamp = 0;

    const loop = (timestamp: number = 0) => {
      this.clear();

      const timestampDiff = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      this.drawFps(timestampDiff);

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  drawFps(timestampDiff: number) {
    const fps = Math.floor(1000 / timestampDiff).toString();
    this.ctx.textBaseline = "top";
    const text = `FPS ${fps}`;
    const textWidth = this.ctx.measureText(text).width;

    this.ctx.fillText(text, window.innerWidth - textWidth - 16, 16);
  }

  clear() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}
