import { Bullet } from "../Bullet.js";
import { Zombie } from "../Zombie.js";
import { arcToRect } from "./utils/arc-to-rect.js";

export function bulletsZombies(bullets: Bullet[], zombies: Zombie[]) {
  for (let i = 0; i < bullets.length; i++) {
    const bullet = bullets[i];

    for (let j = 0; j < zombies.length; j++) {
      const zombie = zombies[j];

      const collision = arcToRect(
        {
          x: bullet.x,
          y: bullet.y,
          radius: bullet.radius
        },
        {
          x: zombie.x,
          y: zombie.y,
          height: zombie.height,
          width: zombie.width
        }
      );

      if (collision) {
        zombie.die();
        bullet.destroy();
      }
    }
  }
}
