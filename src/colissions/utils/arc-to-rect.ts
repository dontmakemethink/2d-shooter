type Arc = {
  x: number;
  y: number;
  radius: number;
};

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function arcToRect(arc: Arc, rect: Rect): boolean {
  let testX = arc.x;
  let testY = arc.y;

  if (arc.x < rect.x) {
    testX = rect.x;
  } else if (arc.x > rect.x + rect.width) {
    testX = rect.x + rect.width;
  }

  if (arc.y < rect.y) {
    testY = rect.y;
  } else if (arc.y > rect.y + rect.height) {
    testY = rect.y + rect.height;
  }

  const distX = arc.x - testX;
  const distY = arc.y - testY;
  const distance = Math.sqrt(distX * distX + distY * distY);

  return arc.radius >= distance;
}
