import {
  isEditor,
  readSettings,
  saveSettings,
} from '../../../lib/editor-store';
import { validateSettings } from '../../../lib/visual-settings';
export const dynamic = 'force-dynamic';
const json = (data: unknown, status = 200) =>
  Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
export async function GET(request: Request) {
  if (!isEditor(request.headers))
    return json({ error: 'Acesso restrito ao proprietário da LP.' }, 403);
  try {
    return json(await readSettings());
  } catch {
    return json(
      { error: 'Não foi possível carregar os ajustes. Tente novamente.' },
      503,
    );
  }
}
export async function PUT(request: Request) {
  if (!isEditor(request.headers))
    return json({ error: 'Acesso restrito ao proprietário da LP.' }, 403);
  if (request.headers.get('origin') !== new URL(request.url).origin)
    return json({ error: 'Origem não autorizada.' }, 403);
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return json({ error: 'Formato inválido.' }, 415);
  const body = await request.text();
  if (body.length > 20000)
    return json({ error: 'Ajustes muito extensos.' }, 413);
  let data;
  try {
    data = JSON.parse(body);
    if (
      !data ||
      !['draft', 'publish'].includes(data.action) ||
      !Number.isSafeInteger(data.revision) ||
      data.revision < 0
    )
      throw new Error();
    data.settings = validateSettings(data.settings);
  } catch {
    return json({ error: 'Há valores inválidos nos ajustes.' }, 400);
  }
  try {
    const result = await saveSettings(
      data.settings,
      data.revision,
      data.action === 'publish',
    );
    return result
      ? json(result)
      : json(
          {
            error:
              'Os ajustes mudaram em outra aba. Recarregue o painel antes de salvar.',
          },
          409,
        );
  } catch {
    return json(
      {
        error:
          'Não foi possível salvar. Seus ajustes continuam nesta tela; tente novamente.',
      },
      503,
    );
  }
}
