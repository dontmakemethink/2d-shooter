import { Game } from "./Game.js";
import { Bullet } from "./Bullet.js";

export class Player {
  x = 0;
  y = 0;
  walkingSpeed = 5;
  bullets: Bullet[] = [];

  constructor() {}

  update({ ctx, pressedKeys }: Game) {
    this.move(pressedKeys);

    // update bullets
    for (let i = 0; i < this.bullets.length; i++) {
      const bullet = this.bullets[i];
      bullet.update(ctx);
    }

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
}
