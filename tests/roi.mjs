import assert from 'node:assert/strict';
import { calculateScenario } from '../lib/roi.ts';
const initial = ['400000', '0.2', '0.8', '26', '6000'];
const sample = calculateScenario(initial);
assert.equal(sample.valid, true);
assert.equal(sample.liters, 20800);
assert.equal(sample.contribution, 16640);
assert.equal(sample.net, 10640);
assert.ok(Math.abs(sample.roi - 177.33333333333334) < 1e-9);
assert.equal(
  calculateScenario(['400000', '0', '0.8', '26', '6000']).net,
  -6000,
);
assert.equal(calculateScenario(['400000', '0.2', '0.8', '26', '0']).roi, null);
for (const values of [
  ['', '0.2', '0.8', '26', '6000'],
  ['-1', '0.2', '0.8', '26', '6000'],
  ['400000', '11', '0.8', '26', '6000'],
  ['400000', '0.2', '0.8', '2.5', '6000'],
  ['1e308', '10', '100', '366', '1'],
  ['400000', '0.2', '0.8', '367', '6000'],
])
  assert.equal(calculateScenario(values).valid, false);
console.log(
  'ROI: initial values, zero gain, zero cost and six invalid scenarios passed.',
);
