export function linear(x) {
  return x;
}

export function cubic(x) {
  return x < 0.5 ? 4 * Math.pow(x, 3) : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
