/** Scenario arithmetic only: this is not a prediction of a specific action. */
export function calculateScenario(raw: string[]) {
  const [v, g, m, d, c] = raw.map(Number);
  const liters = v * (g / 100) * d;
  const contribution = liters * m;
  const net = contribution - c;
  const roi = c > 0 ? (net / c) * 100 : null;
  const valid =
    raw.length === 5 &&
    raw.every((x) => x.trim() !== '') &&
    [v, g, m, d, c].every((x) => Number.isFinite(x) && x >= 0) &&
    v > 0 &&
    g <= 10 &&
    d >= 1 &&
    d <= 366 &&
    Number.isInteger(d) &&
    [liters, contribution, net].every(Number.isFinite) &&
    (roi === null || Number.isFinite(roi));
  return { valid, v, g, m, d, c, liters, contribution, net, roi };
}
