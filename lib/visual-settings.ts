export const sections = [
  {
    id: 'inicio',
    label: 'Abertura com vídeo',
    root: '#inicio',
    content: '#inicio .hero',
    heading: '#inicio h1',
  },
  {
    id: 'diagnosticos',
    label: '01 · Diagnósticos e fluxo',
    root: '#diagnosticos',
    content: '#diagnosticos',
    heading: '#diagnosticos h2',
  },
  {
    id: 'demonstracao',
    label: '02 · Conversa no WhatsApp',
    root: '#demonstracao',
    content: '#demonstracao > .shell',
    heading: '#demonstracao h2',
  },
  {
    id: 'impacto',
    label: '03 · Ganhos e ROI',
    root: '#impacto',
    content: '#impacto > .shell',
    heading: '#impacto h2',
  },
  {
    id: 'evolucao',
    label: '04 · Evolução e relatórios',
    root: '#evolucao',
    content: '#evolucao',
    heading: '#evolucao h2',
  },
  {
    id: 'perguntas',
    label: 'Perguntas frequentes',
    root: '#perguntas',
    content: '#perguntas .faq-section',
    heading: '#perguntas h2',
  },
  {
    id: 'contato',
    label: 'Encerramento e contato',
    root: '#contato',
    content: '#contato > .shell',
    heading: '#contato h2',
  },
] as const;
export type SectionId = (typeof sections)[number]['id'];
export const fields = {
  titleSize: {
    label: 'Título principal',
    min: 24,
    max: 100,
    step: 1,
    unit: 'px',
  },
  subtitleSize: {
    label: 'Títulos internos',
    min: 16,
    max: 48,
    step: 1,
    unit: 'px',
  },
  bodySize: {
    label: 'Parágrafos e perguntas',
    min: 14,
    max: 32,
    step: 1,
    unit: 'px',
  },
  buttonSize: {
    label: 'Texto dos botões',
    min: 14,
    max: 28,
    step: 1,
    unit: 'px',
  },
  lineHeight: {
    label: 'Distância entre linhas',
    min: 1.2,
    max: 2,
    step: 0.05,
    unit: '×',
  },
  paddingY: {
    label: 'Espaço acima e abaixo',
    min: 0,
    max: 160,
    step: 4,
    unit: 'px',
  },
  widthPercent: {
    label: 'Largura do conteúdo',
    min: 60,
    max: 96,
    step: 1,
    unit: '%',
  },
  textWidth: {
    label: 'Comprimento dos parágrafos',
    min: 25,
    max: 85,
    step: 1,
    unit: 'car.',
  },
  minHeight: {
    label: 'Altura mínima da seção',
    min: 0,
    max: 100,
    step: 5,
    unit: '% da tela',
  },
} as const;
export type Field = keyof typeof fields;
export type Device = 'desktop' | 'mobile';
export type Settings = Record<
  Device,
  Partial<Record<SectionId, Partial<Record<Field, number>>>>
>;
export function emptySettings(): Settings {
  return { desktop: {}, mobile: {} };
}
const isObject = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === 'object' && !Array.isArray(v);
export function validateSettings(input: unknown): Settings {
  if (
    !isObject(input) ||
    Object.keys(input).some((k) => k !== 'desktop' && k !== 'mobile')
  )
    throw new Error('Formato de ajustes inválido.');
  const result = emptySettings();
  for (const device of ['desktop', 'mobile'] as const) {
    const data = input[device];
    if (!isObject(data)) throw new Error('Ajustes de tela inválidos.');
    for (const [id, values] of Object.entries(data)) {
      if (!sections.some((s) => s.id === id) || !isObject(values))
        throw new Error('Seção inválida.');
      const clean: Partial<Record<Field, number>> = {};
      for (const [key, value] of Object.entries(values)) {
        if (!Object.hasOwn(fields, key)) throw new Error('Controle inválido.');
        const rule = fields[key as Field];
        if (
          typeof value !== 'number' ||
          !Number.isFinite(value) ||
          value < rule.min ||
          value > rule.max
        )
          throw new Error(`Valor inválido: ${rule.label}.`);
        clean[key as Field] = Math.round(value * 100) / 100;
      }
      result[device][id as SectionId] = clean;
    }
  }
  return result;
}
export function settingsCSS(input: Settings): string {
  const settings = validateSettings(input);
  return (['desktop', 'mobile'] as const)
    .map((device) => {
      const rules: string[] = [];
      for (const section of sections) {
        const values = settings[device][section.id];
        if (!values) continue;
        const { root, content, heading } = section;
        const body = `${root} p,${root} .faq-list summary,${root} .chat-message,${root} .section-lead`;
        const size = (selector: string, value: number | undefined) => {
          if (value !== undefined)
            rules.push(`${selector}{font-size:${value}px!important;}`);
        };
        size(heading, values.titleSize);
        size(`${root} h3,${root} h4`, values.subtitleSize);
        size(body, values.bodySize);
        size(
          `${root} .button,${root} .text-link,${root} .demo-contact,${root} .diagnostic-tab,${root} .chat-questions button`,
          values.buttonSize,
        );
        if (values.lineHeight !== undefined)
          rules.push(`${body}{line-height:${values.lineHeight}!important;}`);
        const spaceTarget =
          section.id === 'inicio' || section.id === 'perguntas'
            ? content
            : root;
        if (values.paddingY !== undefined)
          rules.push(
            `${spaceTarget}{padding-block:${values.paddingY}px!important;}`,
          );
        if (values.widthPercent !== undefined)
          rules.push(
            `${content}{width:${values.widthPercent}%!important;max-width:none!important;}`,
          );
        if (values.textWidth !== undefined)
          rules.push(
            `${root} p,${root} .section-lead{max-width:${values.textWidth}ch!important;}`,
          );
        if (values.minHeight !== undefined)
          rules.push(
            `${spaceTarget}{min-height:${values.minHeight}svh!important;}`,
          );
      }
      return `@media (${device === 'desktop' ? 'min-width:1000px' : 'max-width:999px'}){${rules.join('\n')}}`;
    })
    .join('\n');
}
