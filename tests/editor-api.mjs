import assert from 'node:assert/strict';
const origin = process.argv[2];
if (!origin || !['localhost', '127.0.0.1'].includes(new URL(origin).hostname)) throw new Error('Use only a local development server.');
const initialAnonymous = await fetch(`${origin}/api/editor`);
assert.equal(initialAnonymous.status, 403);
const spoof = await fetch(`${origin}/api/editor`, { headers: { 'oai-authenticated-user-id': 'local_seedy', 'oai-authenticated-user-email': 'seedy@sites.test' } });
assert.equal(spoof.status, 403, 'Client-supplied identity must be stripped by dispatch.');
const signIn = await fetch(`${origin}/signin-with-chatgpt?return_to=/editor`, { redirect: 'manual' });
const cookie = signIn.headers.getSetCookie().map(value => value.split(';')[0]).join('; ');
assert.ok(cookie);
const read = async () => {
  const response = await fetch(`${origin}/api/editor`, { headers: { Cookie: cookie } });
  assert.equal(response.status, 200, await response.clone().text());
  return response.json();
};
const write = (action, settings, revision, requestOrigin = origin) => fetch(`${origin}/api/editor`, {
  method: 'PUT', headers: { Cookie: cookie, Origin: requestOrigin, 'Content-Type': 'application/json' },
  body: JSON.stringify({ action, settings, revision }),
});
const initial = await read();
let revision = initial.revision;
try {
  const draft = structuredClone(initial.draft);
  draft.desktop.inicio = { titleSize: 61 };
  let response = await write('draft', draft, revision);
  assert.equal(response.status, 200, await response.clone().text());
  let saved = await response.json(); revision = saved.revision;
  assert.deepEqual(saved.published, initial.published, 'Saving a draft must not publish.');
  assert.equal((await read()).draft.desktop.inicio.titleSize, 61, 'Draft must survive a new request.');
  assert.equal((await write('publish', draft, revision, 'https://other.example')).status, 403);
  assert.equal((await write('draft', draft, revision - 1)).status, 409);
  assert.equal((await write('draft', {desktop: {inicio: {titleSize: 999}}, mobile: {}}, revision)).status, 400);
  response = await write('publish', draft, revision);
  assert.equal(response.status, 200, await response.clone().text());
  saved = await response.json(); revision = saved.revision;
  assert.equal(saved.published.desktop.inicio.titleSize, 61);
  const page = await fetch(origin).then(r => r.text());
  assert.ok(page.includes('font-size:61px!important'), 'Published settings must be rendered for visitors.');
  console.log('Editor API: auth, draft durability, publication, CSRF and concurrent edits passed.');
} finally {
  const current = await read();
  const restorePublished = await write('publish', initial.published, current.revision);
  assert.equal(restorePublished.status, 200);
  const restored = await restorePublished.json();
  const restoreDraft = await write('draft', initial.draft, restored.revision);
  assert.equal(restoreDraft.status, 200);
}
