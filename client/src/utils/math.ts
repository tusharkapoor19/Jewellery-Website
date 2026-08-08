export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const distance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => Math.hypot(x2 - x1, y2 - y1);

export const angleBetween = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export const midPoint = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): { x: number; y: number } => ({ x: (x1 + x2) / 2, y: (y1 + y2) / 2 });
