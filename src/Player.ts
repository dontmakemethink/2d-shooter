import { Game } from "./Game.js";
import { Bullet } from "./Bullet.js";
import { Zombie } from "./Zombie.js";

export class Player {
  x = 0;
  y = 0;
  walkingSpeed = 5;
  bullets: Bullet[] = [];

  constructor() {}

  update(game: Game) {
    const { ctx, pressedKeys } = game;

    // bullets x zombies colission
    this.bulletsXZombiesCollisionDetection(game);

    this.move(pressedKeys);

    // update bullets
    for (let i = 0; i < this.bullets.length; i++) {
      const bullet = this.bullets[i];
      bullet.update(ctx);
    }

    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, 50, 140);
  }

  move(pressedKeys: string[]) {
    for (let i = 0; i < pressedKeys.length; i++) {
      const code = pressedKeys[i];

      switch (code) {
        case "KeyW":
          this.y -= this.walkingSpeed;
          break;
        case "KeyA":
          this.x -= this.walkingSpeed;
          break;
        case "KeyS":
          this.y += this.walkingSpeed;
          break;
        case "KeyD":
          this.x += this.walkingSpeed;
          break;
      }
    }
  }

  shoot(event: MouseEvent) {
    const dx = event.pageX;
    const dy = event.pageY;

    const bullet = new Bullet(
      this.x + 50,
      this.y + 20,
      dx,
      dy,
      this.removeBullet.bind(this)
    );
    this.bullets.push(bullet);
  }

  removeBullet(bullet: Bullet) {
    this.bullets = this.bullets.filter(_bullet => _bullet !== bullet);
  }

  bulletsXZombiesCollisionDetection(game: Game) {
    const zombies = game.zombies;

    for (let i = 0; i < this.bullets.length; i++) {
      const bullet = this.bullets[i];

      for (let j = 0; j < zombies.length; j++) {
        const zombie = zombies[j];

        let testX = bullet.x;
        let testY = bullet.y;

        if (bullet.x < zombie.x) {
          testX = zombie.x;
        } else if (bullet.x > zombie.x + 50) {
          testX = zombie.x + 50;
        }

        if (bullet.y < zombie.y) {
          testY = zombie.y;
        } else if (bullet.y > zombie.y + 140) {
          testY = zombie.y + 140;
        }

        const distX = bullet.x - testX;
        const distY = bullet.y - testY;
        const distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));

        if (5 >= distance) {
          game.zombies = game.zombies.filter(_zombie => _zombie !== zombie);

          console.log("die");
          this.removeBullet(bullet);
        }
      }
    }
  }
}
