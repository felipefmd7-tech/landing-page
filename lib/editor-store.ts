import { env } from 'cloudflare:workers';
import {
  emptySettings,
  validateSettings,
  type Settings,
} from './visual-settings';

const bindings = () =>
  env as unknown as { DB?: D1Database; EDITOR_EMAIL?: string };
export function isEditor(headers: Headers): boolean {
  const email = headers.get('oai-authenticated-user-email');
  const userId = headers.get('oai-authenticated-user-id');
  const allowed = bindings().EDITOR_EMAIL;
  return (
    !!userId && !!allowed && email?.toLowerCase() === allowed.toLowerCase()
  );
}
function database() {
  const db = bindings().DB;
  if (!db)
    throw new Error('O armazenamento do painel ainda não está disponível.');
  return db;
}
export async function readSettings() {
  const row = await database()
    .prepare(
      'SELECT draft, published, revision, updated_at FROM visual_settings WHERE id = ?',
    )
    .bind('global')
    .first<{
      draft: string;
      published: string;
      revision: number;
      updated_at: string;
    }>();
  return row
    ? {
        draft: validateSettings(JSON.parse(row.draft)),
        published: validateSettings(JSON.parse(row.published)),
        revision: row.revision,
        updatedAt: row.updated_at,
      }
    : {
        draft: emptySettings(),
        published: emptySettings(),
        revision: 0,
        updatedAt: null,
      };
}
export async function publicSettings(): Promise<Settings> {
  try {
    return (await readSettings()).published;
  } catch (error) {
    console.error('Could not read visual settings', error);
    return emptySettings();
  }
}
export async function saveSettings(
  settings: Settings,
  revision: number,
  publish: boolean,
) {
  const draft = JSON.stringify(validateSettings(settings));
  const firstPublished = publish ? draft : JSON.stringify(emptySettings());
  const result = await database()
    .prepare(`INSERT INTO visual_settings (id, draft, published, revision, updated_at)
    SELECT 'global', ?1, ?2, 1, ?3 WHERE ?5 = 0 OR EXISTS (SELECT 1 FROM visual_settings WHERE id = 'global')
    ON CONFLICT(id) DO UPDATE SET draft = ?1,
      published = CASE WHEN ?4 = 1 THEN ?1 ELSE visual_settings.published END,
      revision = visual_settings.revision + 1, updated_at = ?3
    WHERE visual_settings.revision = ?5
    RETURNING revision`)
    .bind(
      draft,
      firstPublished,
      new Date().toISOString(),
      publish ? 1 : 0,
      revision,
    )
    .first<{ revision: number }>();
  if (!result) return null;
  return readSettings();
}
