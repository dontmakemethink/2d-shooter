import { Game } from "./Game.js";

export class Zombie {
  static spawnZombies(game: Game) {
    if (game.zombies.length < 100 && Math.random() > 0.98) {
      game.zombies.push(new Zombie(game));
    }
  }

  x: number;
  y: number;
  width = 50;
  height = 140;
  walkingSpeed = 2;

  constructor(private game: Game) {
    this.x = window.innerWidth + 20;
    this.y = Math.random() * (window.innerHeight - this.height);
  }

  update({ ctx }: Game) {
    this.move();

    ctx.fillStyle = "brown";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.x -= this.walkingSpeed;
  }

  die() {
    this.game.zombies = this.game.zombies.filter(_zombie => _zombie !== this);
  }
}
