import { Player } from "./Player.js";
import { Zombie } from "./Zombie.js";
import { bulletsZombies } from "./colissions/bullets-zombies.js";

export class Game {
  canvas: HTMLCanvasElement = document.querySelector("canvas")!;
  ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
  player = new Player(this);
  pressedKeys: string[] = [];
  zombies: Zombie[] = [];

  constructor() {
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
    this.canvas.width = window.innerWidth * 2;
    this.canvas.height = window.innerHeight * 2;
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.ctx.scale(2, 2);

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
    const text = `FPS ${fps}`;
    const textWidth = this.ctx.measureText(text).width;
    this.ctx.textBaseline = "top";
    this.ctx.fillStyle = "black";

    this.ctx.fillText(text, window.innerWidth - textWidth - 16, 16);
  }

  clear() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  update() {
    // colissions
    bulletsZombies(this.player.bullets, this.zombies);

    // player
    this.player.update();

    // zombies
    Zombie.spawnZombies(this);
    for (let i = 0; i < this.zombies.length; i++) {
      const zombie = this.zombies[i];
      zombie.update(this);
    }
  }
}
