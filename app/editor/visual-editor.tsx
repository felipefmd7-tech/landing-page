'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Monitor,
  Smartphone,
  RotateCcw,
  Save,
  Upload,
  ExternalLink,
} from 'lucide-react';
import {
  sections,
  fields,
  emptySettings,
  settingsCSS,
  validateSettings,
  type Settings,
  type SectionId,
  type Device,
  type Field,
} from '../../lib/visual-settings';

type Snapshot = {
  draft: Settings;
  published: Settings;
  revision: number;
  updatedAt: string | null;
};
type Viewport = 'fit' | 'notebook' | 'desktop' | 'mobile';
const sizes = {
  notebook: [1366, 768],
  desktop: [1920, 1080],
  mobile: [390, 844],
} as const;
const equal = (a: unknown, b: unknown) =>
  JSON.stringify(a) === JSON.stringify(b);
async function readResponse(response: Response): Promise<Snapshot> {
  const raw: unknown = await response.json();
  if (!raw || typeof raw !== 'object') throw new Error('Resposta inválida. Tente novamente.');
  const data = raw as Record<string, unknown>;
  if (!response.ok) throw new Error(typeof data.error === 'string' ? data.error : 'Não foi possível concluir a operação.');
  if (typeof data.revision !== 'number' || !Number.isSafeInteger(data.revision)) throw new Error('Versão de ajustes inválida.');
  return { draft: validateSettings(data.draft), published: validateSettings(data.published), revision: data.revision, updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : null };
}

export default function Editor() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [settings, setSettings] = useState<Settings>(emptySettings);
  const [selected, setSelected] = useState<SectionId>('inicio');
  const [viewport, setViewport] = useState<Viewport>('fit');
  const [frameArea, setFrameArea] = useState({ width: 1200, height: 800 });
  const [baseline, setBaseline] = useState<Partial<Record<Field, number>>>({});
  const [message, setMessage] = useState('Carregando seus ajustes…');
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showPublished, setShowPublished] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const latest = useRef(settings);
  latest.current = settings;
  const dimensions =
    viewport === 'fit'
      ? [Math.max(1000, frameArea.width), Math.max(600, frameArea.height)]
      : sizes[viewport];
  const scale = Math.min(
    1,
    frameArea.width / dimensions[0],
    frameArea.height / dimensions[1],
  );
  const device: Device = viewport === 'mobile' ? 'mobile' : 'desktop';
  const section = sections.find((s) => s.id === selected)!;
  const dirty = snapshot ? !equal(settings, snapshot.draft) : false;
  const unpublished = snapshot ? !equal(settings, snapshot.published) : false;

  const load = useCallback(async () => {
    setBusy(true);
    setError(false);
    try {
      const response = await fetch('/api/editor', { cache: 'no-store' });
      const data = await readResponse(response);
      setSnapshot(data);
      setSettings(data.draft);
      setMessage('Escolha uma seção e ative o controle que deseja ajustar.');
    } catch (e) {
      setError(true);
      setMessage(
        e instanceof Error ? e.message : 'Não foi possível carregar o painel.',
      );
    } finally {
      setBusy(false);
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);
  useEffect(() => {
    const area = stage.current;
    if (!area) return;
    const observer = new ResizeObserver(([entry]) =>
      setFrameArea({
        width: Math.max(1, entry.contentRect.width - 24),
        height: Math.max(1, entry.contentRect.height - 24),
      }),
    );
    observer.observe(area);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const applyPreview = useCallback((value: Settings) => {
    const document = frame.current?.contentDocument;
    const style = document?.getElementById('published-visual-settings');
    if (style) style.textContent = settingsCSS(value);
  }, []);
  useEffect(() => {
    if (loaded)
      applyPreview(showPublished && snapshot ? snapshot.published : settings);
  }, [settings, loaded, snapshot, showPublished, applyPreview]);

  const measureAndFocus = useCallback(() => {
    const iframe = frame.current;
    const document = iframe?.contentDocument;
    const win = iframe?.contentWindow;
    if (!document || !win) return;
    const style = document.getElementById('published-visual-settings');
    const previous = style?.textContent;
    if (style) style.textContent = '';
    const target = document.querySelector<HTMLElement>(section.root);
    const content = document.querySelector<HTMLElement>(section.content);
    const value = (selector: string, property: 'fontSize' | 'paddingTop') => {
      const element = document.querySelector(selector);
      return element
        ? parseFloat(win.getComputedStyle(element)[property])
        : undefined;
    };
    const paragraph = target?.querySelector('p');
    const paragraphStyle = paragraph ? win.getComputedStyle(paragraph) : null;
    const space =
      selected === 'inicio' || selected === 'perguntas'
        ? section.content
        : section.root;
    setBaseline({
      titleSize: value(section.heading, 'fontSize') ?? 40,
      subtitleSize:
        value(`${section.root} h3,${section.root} h4`, 'fontSize') ?? 22,
      bodySize: value(`${section.root} p`, 'fontSize') ?? 18,
      buttonSize:
        value(
          `${section.root} .button,${section.root} .text-link,${section.root} button`,
          'fontSize',
        ) ?? 16,
      lineHeight: paragraphStyle
        ? parseFloat(paragraphStyle.lineHeight) /
          parseFloat(paragraphStyle.fontSize)
        : 1.5,
      paddingY: value(space, 'paddingTop') ?? 32,
      widthPercent: content
        ? (content.getBoundingClientRect().width /
            (selected === 'inicio' || selected === 'perguntas'
              ? target!.getBoundingClientRect().width
              : document.documentElement.clientWidth)) *
          100
        : 92,
      textWidth: 60,
      minHeight: 100,
    });
    if (style) style.textContent = previous ?? settingsCSS(latest.current);
    document
      .querySelectorAll('[data-editor-selected]')
      .forEach((el) => el.removeAttribute('data-editor-selected'));
    target?.setAttribute('data-editor-selected', 'true');
    target?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, [section, selected]);
  useEffect(() => {
    if (!loaded) return;
    const timer = window.setTimeout(measureAndFocus, 60);
    return () => window.clearTimeout(timer);
  }, [
    selected,
    viewport,
    dimensions[0],
    dimensions[1],
    loaded,
    measureAndFocus,
  ]);

  const onFrameLoad = () => {
    const document = frame.current?.contentDocument;
    if (!document) return;
    const style = document.createElement('style');
    style.textContent =
      'html{scroll-snap-type:none!important;scroll-behavior:auto!important}.editor-launcher{display:none!important}[data-editor-selected]{outline:2px dashed #89c467!important;outline-offset:-3px}';
    document.head.appendChild(style);
    // Prevent preview links from navigating away; accordions and calculator stay interactive.
    document.addEventListener('click', (event) => {
      const anchor = (event.target as Element).closest('a');
      if (anchor && !anchor.getAttribute('href')?.startsWith('#'))
        event.preventDefault();
    });
    setLoaded(true);
    applyPreview(latest.current);
    measureAndFocus();
  };
  const update = (field: Field, value: number | undefined) => {
    setShowPublished(false);
    setSettings((previous) => {
      const next = structuredClone(previous);
      const values = next[device][selected] ?? {};
      if (value === undefined) delete values[field];
      else values[field] = value;
      if (Object.keys(values).length) next[device][selected] = values;
      else delete next[device][selected];
      return next;
    });
  };
  const save = async (action: 'draft' | 'publish') => {
    if (!snapshot) return;
    setBusy(true);
    setError(false);
    try {
      const response = await fetch('/api/editor', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, settings, revision: snapshot.revision }),
      });
      const data = await readResponse(response);
      setSnapshot(data);
      setSettings(data.draft);
      setShowPublished(false);
      setMessage(
        action === 'publish'
          ? 'Publicado! Os visitantes verão os ajustes ao abrir ou atualizar a LP.'
          : 'Rascunho salvo. A LP dos visitantes continua como estava.',
      );
    } catch (e) {
      setError(true);
      setMessage(
        e instanceof Error ? e.message : 'Falha ao salvar. Tente novamente.',
      );
    } finally {
      setBusy(false);
    }
  };
  const resetSection = () => {
    if (
      !window.confirm(
        'Restaurar o visual original desta seção nesta versão de tela? A mudança só ficará pública quando você publicar.',
      )
    )
      return;
    setSettings((previous) => {
      const next = structuredClone(previous);
      delete next[device][selected];
      return next;
    });
    setShowPublished(false);
  };

  return (
    <main className="visual-editor">
      <header className="editor-header">
        <a href="/" className="editor-back">
          <ArrowLeft size={18} /> LP
        </a>
        <div>
          <h1>Editor visual</h1>
          <p>ProBio Solutions</p>
        </div>
        <span className="editor-state">
          {dirty
            ? 'Alterações não salvas'
            : unpublished
              ? 'Rascunho salvo'
              : 'Visual publicado'}
        </span>
        <div className="editor-save-actions">
          <button
            disabled={busy || !snapshot || !dirty}
            onClick={() => void save('draft')}
          >
            <Save size={16} /> Salvar rascunho
          </button>
          <button
            className="editor-publish"
            disabled={busy || !snapshot || !unpublished}
            onClick={() => void save('publish')}
          >
            <Upload size={16} /> Publicar alterações
          </button>
        </div>
      </header>
      <aside className="editor-controls">
        <label className="editor-section-label" htmlFor="editor-section">
          Qual seção deseja ajustar?
        </label>
        <select
          id="editor-section"
          value={selected}
          onChange={(e) => setSelected(e.target.value as SectionId)}
        >
          {sections.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
        <div className="editor-device-note">
          Editando:{' '}
          <strong>
            {device === 'desktop' ? 'computador' : 'celular / janela estreita'}
          </strong>
        </div>
        <p className="editor-help">
          Ative um controle para personalizar. Desative para usar o estilo
          original da LP.
        </p>
        <fieldset disabled={busy || !snapshot || showPublished}>
          <legend className="editor-sr-only">Ajustes da seção</legend>
          {(Object.entries(fields) as [Field, (typeof fields)[Field]][]).map(
            ([key, rule]) => {
              const custom = settings[device][selected]?.[key];
              const base = baseline[key];
              const value =
                custom ??
                Math.max(
                  rule.min,
                  Math.min(
                    rule.max,
                    Math.round(
                      (Number.isFinite(base) ? base! : rule.min) / rule.step,
                    ) * rule.step,
                  ),
                );
              return (
                <div className="editor-control" key={key}>
                  <div className="editor-control-top">
                    <label>
                      <input
                        type="checkbox"
                        checked={custom !== undefined}
                        onChange={(e) =>
                          update(key, e.target.checked ? value : undefined)
                        }
                      />
                      {rule.label}
                    </label>
                    <span>
                      {custom === undefined
                        ? 'Original'
                        : `${Number(value.toFixed(2))} ${rule.unit}`}
                    </span>
                  </div>
                  <div className="editor-control-inputs">
                    <input
                      type="range"
                      aria-label={rule.label}
                      min={rule.min}
                      max={rule.max}
                      step={rule.step}
                      value={value}
                      disabled={custom === undefined}
                      onChange={(e) => update(key, Number(e.target.value))}
                    />
                    <input
                      type="number"
                      aria-label={`${rule.label}: valor`}
                      min={rule.min}
                      max={rule.max}
                      step={rule.step}
                      value={Number(value.toFixed(2))}
                      disabled={custom === undefined}
                      onChange={(e) => {
                        const n = e.target.valueAsNumber;
                        if (
                          Number.isFinite(n) &&
                          n >= rule.min &&
                          n <= rule.max
                        )
                          update(key, n);
                      }}
                    />
                  </div>
                </div>
              );
            },
          )}
        </fieldset>
        <button
          className="editor-reset"
          disabled={busy || !snapshot}
          onClick={resetSection}
        >
          <RotateCcw size={15} /> Restaurar esta seção
        </button>
        <button
          className="editor-reset"
          disabled={busy || !snapshot || !unpublished}
          onClick={() => {
            if (
              snapshot &&
              window.confirm('Substituir seus ajustes pelo visual publicado?')
            ) {
              setSettings(snapshot.published);
              setShowPublished(false);
            }
          }}
        >
          Voltar ao visual publicado
        </button>
      </aside>
      <section className="editor-preview" aria-label="Prévia da landing page">
        <div className="editor-preview-bar">
          <div className="editor-viewports" aria-label="Tamanho da prévia">
            {(['fit', 'notebook', 'desktop', 'mobile'] as const).map((v) => (
              <button
                key={v}
                aria-pressed={viewport === v}
                onClick={() => setViewport(v)}
              >
                {v === 'mobile' ? (
                  <Smartphone size={15} />
                ) : (
                  <Monitor size={15} />
                )}
                {
                  {
                    fit: 'Janela atual',
                    notebook: 'Notebook',
                    desktop: 'Monitor',
                    mobile: 'Celular',
                  }[v]
                }
              </button>
            ))}
          </div>
          <label className="editor-compare">
            <input
              type="checkbox"
              checked={showPublished}
              disabled={!snapshot}
              onChange={(e) => setShowPublished(e.target.checked)}
            />{' '}
            Ver publicado
          </label>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir LP publicada em outra aba"
          >
            <ExternalLink size={17} />
          </a>
        </div>
        <div className="editor-canvas" ref={stage}>
          <div
            className="editor-frame-shell"
            style={{
              width: dimensions[0] * scale,
              height: dimensions[1] * scale,
            }}
          >
            <iframe
              ref={frame}
              title="Prévia interativa da LP"
              src="/?editorPreview=1"
              onLoad={onFrameLoad}
              style={{
                width: dimensions[0],
                height: dimensions[1],
                transform: `scale(${scale})`,
              }}
            />
          </div>
        </div>
        <div className="editor-preview-caption">
          {dimensions[0]} × {dimensions[1]} px · Prévia reduzida a{' '}
          {Math.round(scale * 100)}% para caber no painel. Na LP, o navegador
          mantém seu zoom.
        </div>
      </section>
      <footer
        className={`editor-status ${error ? 'editor-error' : ''}`}
        role="status"
        aria-live="polite"
      >
        <span>
          {!error && <Check size={15} />}
          {message}
        </span>
        {error && (
          <button
            disabled={busy}
            onClick={() => {
              if (
                !dirty ||
                window.confirm('Recarregar e descartar alterações não salvas?')
              )
                void load();
            }}
          >
            Recarregar ajustes
          </button>
        )}
      </footer>
    </main>
  );
}
