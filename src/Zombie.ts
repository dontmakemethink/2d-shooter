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
  health = 100;

  constructor(private game: Game) {
    this.x = window.innerWidth + 20;
    this.y = Math.random() * (window.innerHeight - this.height);
  }

  update({ ctx }: Game) {
    this.move();

    ctx.fillStyle = "brown";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = "gray";
    ctx.fillRect(this.x, this.y - 16, this.width, 4);

    ctx.fillStyle = `hsl(${120 * (this.health / 100)}, 100%, 50%)`;
    ctx.fillRect(this.x, this.y - 16, this.width * (this.health / 100), 4);
  }

  move() {
    this.x -= this.walkingSpeed;
  }

  hurt(damage: number) {
    this.health -= damage;

    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    this.game.zombies = this.game.zombies.filter(_zombie => _zombie !== this);
  }
}
