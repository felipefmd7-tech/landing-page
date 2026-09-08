import assert from 'node:assert/strict';
import { emptySettings, validateSettings, settingsCSS } from '../lib/visual-settings.ts';
const settings = emptySettings();
settings.desktop.perguntas = { titleSize: 58, bodySize: 21, paddingY: 40 };
settings.mobile.perguntas = { titleSize: 32 };
const css = settingsCSS(settings);
assert.match(css, /min-width:1000px/);
assert.match(css, /max-width:999px/);
assert.match(css, /#perguntas h2\{font-size:58px!important/);
assert.match(css, /#perguntas h2\{font-size:32px!important/);
assert.ok(!css.includes('#contato'));
assert.equal(settingsCSS(emptySettings()).includes('font-size'), false);
for (const invalid of [
  { desktop: { inicio: { titleSize: '</style><script>alert(1)</script>' } }, mobile: {} },
  { desktop: { inicio: { titleSize: 1000 } }, mobile: {} },
  { desktop: { inicio: { titleSize: NaN } }, mobile: {} },
  { desktop: { inicio: { background: 'url(evil)' } }, mobile: {} },
  { desktop: { 'body{}': {} }, mobile: {} },
  { desktop: [], mobile: {} },
]) assert.throws(() => validateSettings(invalid));
assert.deepEqual(validateSettings(settings), settings);
console.log('Visual settings: isolation, reset, responsive scopes and unsafe inputs passed.');
