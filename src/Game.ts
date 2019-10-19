import { Player } from "./Player.js";

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  player: Player;
  pressedKeys: string[];

  constructor() {
    this.canvas = document.querySelector("canvas")!;
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth * 2;
    this.canvas.height = window.innerHeight * 2;
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.ctx.scale(2, 2);

    this.pressedKeys = [];

    this.player = new Player();

    this.registerListeners();
    this.start();
  }

  registerListeners() {
    const collectPressedKeys = ({ code }: KeyboardEvent) => {
      if (["KeyW", "KeyA", "KeyS", "KeyD"].includes(code)) {
        if (!this.pressedKeys.includes(code)) {
          this.pressedKeys.push(code);
        }
      }
    };
    document.addEventListener("keydown", collectPressedKeys);

    const removeReleasedKeys = ({ code }: KeyboardEvent) => {
      if (this.pressedKeys.includes(code)) {
        this.pressedKeys = this.pressedKeys.filter(key => key !== code);
      }
    };
    document.addEventListener("keyup", removeReleasedKeys);

    document.addEventListener("click", event => this.player.shoot(event));
  }

  start() {
    let lastTimestamp = 0;

    const loop = (timestamp: number = 0) => {
      this.clear();

      const timestampDiff = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      this.drawFps(timestampDiff);

      this.update();

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

  update() {
    this.player.update(this);
  }
}
