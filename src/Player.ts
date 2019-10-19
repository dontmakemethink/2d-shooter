import { Game } from "./Game";

export class Player {
  x = 0;
  y = 0;
  walkingSpeed = 1;

  constructor() {}

  update({ ctx, pressedKeys }: Game) {
    this.move(pressedKeys);

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
}
