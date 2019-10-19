import { Game } from "./Game.js";

export class Zombie {
  static spawnZombies(zombies: Zombie[]) {
    if (zombies.length < 100 && Math.random() > 0.98) {
      zombies.push(new Zombie());
    }
  }

  x: number;
  y: number;
  walkingSpeed = 2;

  constructor() {
    this.x = window.innerWidth + 20;
    this.y = Math.random() * (window.innerHeight - 140);
  }

  update({ ctx }: Game) {
    this.move();

    ctx.fillStyle = "brown";
    ctx.fillRect(this.x, this.y, 50, 140);
  }

  move() {
    this.x -= this.walkingSpeed;
  }
}
