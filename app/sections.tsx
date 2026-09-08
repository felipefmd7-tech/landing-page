'use client';
import { useState } from 'react';
import HeroVideo from './hero-video';
import { calculateScenario } from '../lib/roi';
import {
  ArrowUpRight,
  Activity,
  Thermometer,
  Droplets,
  Layers3,
  Clock3,
  MessageCircle,
  Check,
  CheckCheck,
  SlidersHorizontal,
  FileText,
  ChevronDown,
  RotateCcw,
  TrendingUp,
  Search,
  CircleCheck,
} from 'lucide-react';
const whatsapp = 'https://wa.me/5516991457282?text=';
const contact =
  whatsapp +
  encodeURIComponent(
    'Olá! Quero conhecer os diagnósticos de fermentação da ProBio Solutions para minha operação.',
  );
const cases = [
  {
    title: 'Estabilidade térmica',
    icon: Thermometer,
    tag: 'MAIS ESTABILIDADE PARA PRODUZIR',
    headline: 'Saiba onde agir para recuperar a estabilidade.',
    description:
      'O diagnóstico vem com uma recomendação específica para orientar a correção. Sua equipe ganha tempo e um caminho mais assertivo para resolver o desvio térmico.',
    metrics: [
      ['Desvio identificado', 'Instabilidade térmica'],
      ['Alerta automático', 'No WhatsApp'],
      ['Foco da ação', 'Recuperar estabilidade'],
    ],
    evidence:
      'Identificamos instabilidade térmica na unidade demonstrativa. O alerta já traz a prioridade de atenção e uma orientação para a equipe responsável.',
    action:
      'Recomendamos priorizar a correção da condição térmica na unidade indicada. Sua equipe recebe a orientação contextualizada para avaliar e executar a intervenção conforme os procedimentos da usina.',
    gain: 'O objetivo é recuperar a estabilidade e reduzir perdas de rendimento. A ProBio apresenta o impacto estimado e acompanha a evolução após a ação, distinguindo o potencial de ganho do resultado observado.',
    q: 'Vou precisar acompanhar um painel?',
    reply:
      'Os alertas chegam automaticamente pelo WhatsApp quando identificamos um desvio. Você recebe o que merece atenção e pode aprofundar a orientação na própria conversa.',
  },
  {
    title: 'Consistência da limpeza',
    icon: Droplets,
    tag: 'MAIS CONFIANÇA EM CADA CICLO',
    headline: 'Corrija o que compromete a limpeza.',
    description:
      'Receba o diagnóstico e a orientação de correção para sua equipe atuar no ponto certo, reduzir retrabalho e proteger a fermentação.',
    metrics: [
      ['Oportunidade identificada', 'Melhorar consistência'],
      ['Entrega à equipe', 'Orientação direcionada'],
      ['Foco da ação', 'Reduzir retrabalho'],
    ],
    evidence:
      'Identificamos uma oportunidade de melhoria na consistência da limpeza da unidade demonstrativa. A ocorrência foi priorizada para a equipe responsável.',
    action:
      'Recomendamos corrigir a condição de limpeza apontada no alerta. A orientação entregue à sua equipe considera o contexto da unidade e seus procedimentos operacionais.',
    gain: 'Uma limpeza mais consistente pode reduzir retrabalho e perdas associadas à instabilidade. A ProBio acompanha a evolução para avaliar o efeito da ação na operação.',
    q: 'Como sei se a ação funcionou?',
    reply:
      'A ProBio acompanha a evolução após a intervenção e entrega uma leitura do que melhorou e do que ainda precisa de atenção. Você recebe o resultado da análise pelo WhatsApp.',
  },
  {
    title: 'Desempenho das bateladas',
    icon: Layers3,
    tag: 'MAIS POTENCIAL EM CADA BATELADA',
    headline: 'Transforme oportunidades em próximos passos.',
    description:
      'Identifique o que limita o desempenho e receba uma recomendação de ação com potencial de ganho. Mais direção para aproveitar cada batelada.',
    metrics: [
      ['Oportunidade identificada', 'Melhorar desempenho'],
      ['Entrega à equipe', 'Prioridades claras'],
      ['Foco da ação', 'Aproveitar capacidade'],
    ],
    evidence:
      'Identificamos uma oportunidade de melhorar o desempenho das bateladas na unidade demonstrativa. Sua equipe recebe a prioridade e a recomendação correspondente.',
    action:
      'Recomendamos atuar na oportunidade priorizada para recuperar desempenho. A ProBio entrega a orientação à equipe e acompanha a evolução após a intervenção.',
    gain: 'O potencial de produção adicional considera as condições e a capacidade da usina. A ProBio apresenta a estimativa com suas premissas e acompanha os resultados após a ação.',
    q: 'O ganho é garantido?',
    reply:
      'O ganho estimado orienta a decisão. O resultado depende das condições da operação e da execução da ação. A ProBio acompanha a evolução para mostrar o que foi observado após a intervenção.',
  },
];
export function Diagnostics() {
  const [active, setActive] = useState(0);
  const c = cases[active];
  return (
    <section id="diagnosticos" className="section shell">
      <div className="section-intro">
        <div>
          <div className="eyebrow">01 / ENXERGUE O QUE IMPORTA</div>
          <h2>
            Diagnóstico claro.
            <br />
            <span>Ação direcionada.</span>
          </h2>
        </div>
        <p>
          Receba o diagnóstico e uma recomendação específica do que fazer. Menos
          tempo testando hipóteses. Um caminho mais assertivo para resolver.
        </p>
      </div>
      <div className="process-steps">
        {[
          {
            n: '01',
            title: 'Alertas automáticos',
            text: 'A ProBio acompanha sua fermentação e envia alertas pelo WhatsApp ao identificar desvios.',
          },
          {
            n: '02',
            title: 'Diagnóstico pronto',
            text: 'Você recebe uma leitura clara do que merece atenção e da prioridade para sua equipe.',
          },
          {
            n: '03',
            title: 'Próximo passo claro',
            text: 'A recomendação chega com contexto e potencial de ganho para apoiar sua decisão.',
          },
          {
            n: '04',
            title: 'Evolução acompanhada',
            text: 'Após a ação, a ProBio acompanha os indicadores e mostra a evolução dos resultados.',
          },
        ].map((item) => (
          <div key={item.n}>
            <span>{item.n}</span>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <div className="diagnostic-layout">
        <div
          className="diagnostic-tabs"
          aria-label="Escolher exemplo de diagnóstico"
        >
          {cases.map((item, i) => (
            <button
              key={item.title}
              className={
                active === i ? 'diagnostic-tab selected' : 'diagnostic-tab'
              }
              aria-pressed={active === i}
              onClick={() => setActive(i)}
            >
              <item.icon size={21} />
              <span>{item.title}</span>
              <ArrowUpRight size={17} />
            </button>
          ))}
        </div>
        <div className="diagnostic-detail" aria-live="polite">
          <div className="eyebrow">{c.tag}</div>
          <h3>{c.headline}</h3>
          <p>{c.description}</p>
        </div>
      </div>
    </section>
  );
}
export function Demonstration() {
  const [topic, setTopic] = useState(0);
  const [step, setStep] = useState(0);
  const c = cases[topic];
  const responses = [c.evidence, c.action, c.gain, c.reply];
  const questions = [
    'Qual é o diagnóstico?',
    'Qual é a recomendação?',
    'Qual é o ganho esperado?',
    c.q,
  ];
  return (
    <section className="demo-section" id="demonstracao">
      <div className="shell demo-grid">
        <div className="demo-copy">
          <div className="eyebrow">02 / UMA CONVERSA QUE MOVE A OPERAÇÃO</div>
          <h2>
            O alerta chega.
            <br />
            A decisão avança.
            <br />
            <span>No seu WhatsApp.</span>
          </h2>
          <p>
            Quando um desvio é identificado, a ProBio avisa você com uma
            orientação clara. Alertas e recomendações chegam pelo WhatsApp, sem
            depender de consultas a painéis. Se quiser saber mais, basta
            continuar a conversa.
          </p>
          <div className="demo-topics" aria-label="Tema da conversa">
            {cases.map((item, i) => (
              <button
                key={item.title}
                aria-pressed={topic === i}
                className={topic === i ? 'active' : ''}
                onClick={() => {
                  setTopic(i);
                  setStep(0);
                }}
              >
                {item.title}
              </button>
            ))}
          </div>
          <div className="demo-proof">
            <Check size={17} />
            <span>Alertas automáticos sobre o que merece atenção.</span>
          </div>
          <div className="demo-proof">
            <Check size={17} />
            <span>Diagnóstico pronto para apoiar sua decisão.</span>
          </div>
          <div className="demo-proof">
            <Check size={17} />
            <span>Recomendações e potencial de ganho na mesma conversa.</span>
          </div>
          <a
            className="demo-contact"
            href={contact}
            target="_blank"
            rel="noopener noreferrer"
          >
            Converse com a ProBio Solutions <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="conversation">
          <div className="conversation-header">
            <div className="conversation-avatar">
              <MessageCircle size={25} />
            </div>
            <div>
              <strong>ProBio Solutions</strong>
              <span>Demonstração da experiência</span>
            </div>
            <span className="conversation-dots">•••</span>
          </div>
          <div className="conversation-body">
            <span className="conversation-date">
              CENÁRIO FICTÍCIO · UNIDADE DEMONSTRATIVA
            </span>
            <div className="chat-message bot">
              <span className="chat-sender">ProBio Solutions</span>
              <p>
                Alerta automático: identificamos uma ocorrência.
                <br />
                Sua equipe já tem uma prioridade em{' '}
                <strong>{c.title.toLowerCase()}</strong>.
              </p>
              <time>08:30</time>
            </div>
            {step !== 0 && (
              <div className="chat-message user">
                {questions[step]}
                <time>
                  08:31 <CheckCheck size={14} />
                </time>
              </div>
            )}
            <div
              className="chat-message bot answer"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="chat-sender">
                {
                  [
                    'Diagnóstico',
                    'Recomendação',
                    'Impacto esperado',
                    'Entenda a recomendação',
                  ][step]
                }
              </span>
              <p>{responses[step]}</p>
              <time>08:31</time>
            </div>
          </div>
          <div className="chat-questions">
            <span>APROFUNDE O ALERTA, SE QUISER</span>
            <div>
              {questions.map((q, i) => (
                <button
                  key={q}
                  aria-pressed={step === i}
                  onClick={() => setStep(i)}
                  className={step === i ? 'active' : ''}
                >
                  {q}
                  <ArrowUpRight size={14} />
                </button>
              ))}
            </div>
          </div>
          <div className="conversation-caption">
            Conversa demonstrativa com respostas predefinidas.
          </div>
        </div>
      </div>
    </section>
  );
}
const number = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });
const money = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});
export function Impact() {
  const [volume, setVolume] = useState('400000');
  const [gain, setGain] = useState('0.2');
  const [margin, setMargin] = useState('0.8');
  const [days, setDays] = useState('26');
  const [cost, setCost] = useState('6000');
  const { valid, v, g, m, d, c, liters, contribution, net, roi } =
    calculateScenario([volume, gain, margin, days, cost]);
  const reset = () => {
    setVolume('400000');
    setGain('0.2');
    setMargin('0.8');
    setDays('26');
    setCost('6000');
  };
  const fields = [
    {
      label: 'Produção atual de etanol',
      unit: 'L/dia',
      value: volume,
      set: setVolume,
      min: 1,
      step: 10000,
      max: undefined,
    },
    {
      label: 'Aumento relativo de produção',
      unit: '%',
      value: gain,
      set: setGain,
      min: 0,
      step: 0.1,
      max: 10,
    },
    {
      label: 'Margem por litro adicional',
      unit: 'R$/L',
      value: margin,
      set: setMargin,
      min: 0,
      step: 0.05,
      max: undefined,
    },
    {
      label: 'Dias de operação no período',
      unit: 'dias',
      value: days,
      set: setDays,
      min: 1,
      step: 1,
      max: 366,
    },
    {
      label: 'Custo total da ação no período',
      unit: 'R$',
      value: cost,
      set: setCost,
      min: 0,
      step: 500,
      max: undefined,
    },
  ];
  const summary = valid
    ? `Olá! Simulei um cenário na ProBio Solutions: ${number.format(v)} L/dia, aumento relativo hipotético de ${g}% por ${d} dias, margem de R$ ${m}/L e custo da ação de ${money.format(c)}. O impacto líquido estimado foi de ${money.format(net)}. Quero avaliar as premissas para minha operação.`
    : '';
  return (
    <section className="section impact-section" id="impacto">
      <div className="shell">
        <div className="section-intro">
          <div>
            <div className="eyebrow">03 / A CONTA PRECISA FAZER SENTIDO</div>
            <h2>
              O potencial aparece.
              <br />
              <span>O cálculo também.</span>
            </h2>
          </div>
          <p>
            Decida com clareza sobre o retorno potencial de uma ação. A ProBio
            traduz oportunidades em impacto estimado. A simulação abaixo ilustra
            como pequenas melhorias podem fazer diferença.
          </p>
        </div>
        <div className="calculator">
          <div className="calculator-inputs">
            <div className="flex-between">
              <h3>
                <SlidersHorizontal size={19} /> Seu cenário
              </h3>
              <button
                className="reset"
                onClick={reset}
                aria-label="Restaurar valores do exemplo"
              >
                <RotateCcw size={15} />
                Restaurar
              </button>
            </div>
            <p className="calculator-hint">
              Simulação ilustrativa · valores editáveis
            </p>
            <div className="input-grid">
              {fields.map((field, i) => (
                <label
                  key={field.label}
                  className={i === 4 ? 'wide' : ''}
                  htmlFor={'roi-' + i}
                >
                  <span>{field.label}</span>
                  <div className="input-wrap">
                    <input
                      id={'roi-' + i}
                      type="number"
                      inputMode="decimal"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={field.value}
                      onChange={(e) => field.set(e.target.value)}
                    />
                    <span>{field.unit}</span>
                  </div>
                </label>
              ))}
            </div>
            <p className="input-note">
              Use a margem após custos variáveis. Inclua no custo da ação a
              implantação, o serviço e outros custos incrementais do período,
              sem contá-los duas vezes.
            </p>
          </div>
          <div
            className="calculator-result"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="result-eyebrow">
              IMPACTO LÍQUIDO ESTIMADO NO PERÍODO
            </span>
            <strong className="result-number">
              {valid ? money.format(net) : '—'}
            </strong>
            <span className="result-period">
              {valid
                ? `em ${number.format(d)} dias de operação`
                : 'Revise os campos para calcular.'}
            </span>
            <div className="result-divider" />
            <div className="result-row">
              <span>Volume adicional hipotético</span>
              <b>{valid ? number.format(liters) + ' L' : '—'}</b>
            </div>
            <div className="result-row">
              <span>Margem de contribuição adicional</span>
              <b>{valid ? money.format(contribution) : '—'}</b>
            </div>
            <div className="result-row">
              <span>Custo total da ação</span>
              <b>{valid ? money.format(c) : '—'}</b>
            </div>
            <div className="roi-result">
              <span>ROI estimado da ação</span>
              <strong>
                {valid && roi !== null
                  ? number.format(roi) + '%'
                  : valid
                    ? 'Não aplicável'
                    : '—'}
              </strong>
            </div>
            <p>
              {!valid
                ? 'Preencha valores não negativos: produção maior que zero, aumento de até 10% e período inteiro entre 1 e 366 dias.'
                : c === 0
                  ? 'Com custo zero, o ROI percentual não é definido.'
                  : 'ROI = impacto líquido ÷ custo da ação × 100.'}
            </p>
            {valid ? (
              <a
                className="button button-green"
                href={whatsapp + encodeURIComponent(summary)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Conversar sobre este cenário <ArrowUpRight size={18} />
              </a>
            ) : (
              <button className="button button-green" disabled>
                Revise o cenário para continuar
              </button>
            )}
          </div>
        </div>
        <p className="scenario-note">
          Estimativa de cenário, não resultado comprovado ou garantia de
          retorno. Os valores iniciais são fictícios e não representam preço da
          ProBio Solutions.
        </p>
      </div>
    </section>
  );
}
export function Evidence() {
  return (
    <section className="section shell evidence-section" id="evolucao">
      <div className="report-visual">
        <div className="report-toolbar">
          <FileText size={17} />
          <span>RESUMO DE DIAGNÓSTICOS</span>
          <span className="report-example">EXEMPLO</span>
        </div>
        <div className="report-content">
          <span className="micro">
            PROBIO SOLUTIONS / UNIDADE DEMONSTRATIVA
          </span>
          <h3>
            Uma visão clara.
            <br />
            Do processo ao próximo passo.
          </h3>
          <div className="report-table">
            <div className="report-table-head">
              <span>Indicador</span>
              <span>Situação ilustrativa</span>
            </div>
            {[
              ['Condição térmica', 'Verificar'],
              ['Qualidade do CIP', 'Verificar'],
              ['Desempenho das bateladas', 'Estável'],
              ['Evolução da operação', 'Estável'],
            ].map(([label, state]) => (
              <div key={label}>
                <span>{label}</span>
                <b
                  className={state === 'Estável' ? 'report-ok' : 'report-warn'}
                >
                  {state === 'Estável' ? (
                    <CircleCheck size={12} />
                  ) : (
                    <Search size={12} />
                  )}{' '}
                  {state}
                </b>
              </div>
            ))}
          </div>
          <div className="report-bottom">
            <span>Prioridade → Evidência → Orientação</span>
            <Check size={16} />
          </div>
        </div>
      </div>
      <div>
        <div className="eyebrow">04 / VISIBILIDADE DO QUE MELHORA</div>
        <h2>
          A ação passa.
          <br />
          <span>O aprendizado fica.</span>
        </h2>
        <p className="section-lead">
          A ProBio acompanha o que acontece depois de cada ação e entrega uma
          visão clara da evolução. Sua equipe recebe as informações pelo
          WhatsApp e conta com relatórios para apoiar as próximas decisões.
        </p>
        <div className="evidence-item">
          <Clock3 size={21} />
          <div>
            <h4>Prioridades sempre à vista</h4>
            <p>
              Receba atualizações sobre o que melhorou e o que ainda merece
              atenção.
            </p>
          </div>
        </div>
        <div className="evidence-item">
          <Activity size={21} />
          <div>
            <h4>Análise feita para você</h4>
            <p>
              A ProBio interpreta a evolução da operação e entrega os pontos
              relevantes para sua equipe.
            </p>
          </div>
        </div>
        <div className="evidence-item">
          <TrendingUp size={21} />
          <div>
            <h4>Visibilidade sobre o retorno</h4>
            <p>
              Acompanhe o potencial estimado e os resultados observados após
              cada ação, com uma leitura preparada pela ProBio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
const faqs = [
  [
    'O que a ProBio Solutions acompanha?',
    'A ProBio acompanha a fermentação para identificar desvios e oportunidades de melhoria. Você recebe diagnósticos, prioridades e recomendações voltadas à estabilidade, ao desempenho e ao aproveitamento da operação. O escopo é definido para a realidade da sua unidade.',
  ],
  [
    'Como recebo as informações pelo WhatsApp?',
    'Após a implantação, os alertas são enviados automaticamente aos responsáveis quando a ProBio identifica um desvio. A mensagem traz o diagnóstico e a orientação para apoiar a decisão. Sua equipe também pode aprofundar o assunto na própria conversa.',
  ],
  [
    'Preciso organizar dados ou consultar painéis todos os dias?',
    'A ProBio cuida da análise dos dados conectados durante a implantação e entrega as informações pelo WhatsApp. Na rotina, sua equipe recebe os alertas e as recomendações para decidir e agir, sem precisar preparar análises manualmente.',
  ],
  [
    'Como são calculados os ganhos e o ROI?',
    'O impacto econômico parte de premissas explícitas: volume, melhoria esperada, margem, período e custo da ação. A calculadora desta página explora um cenário hipotético. As premissas por recomendação precisam ser validadas com os dados da operação antes de apresentar uma previsão específica.',
  ],
  [
    'A ProBio Solutions executa mudanças no processo?',
    'As entregas são monitoramento, diagnósticos e recomendações. A equipe da unidade avalia as orientações e executa as ações conforme seus procedimentos e responsabilidades.',
  ],
  [
    'Como começamos?',
    'Converse com a equipe pelo WhatsApp. Vamos entender a operação, avaliar os dados disponíveis, definir o escopo de acompanhamento e combinar os critérios para medir a evolução.',
  ],
];
export function FinalSections() {
  return (
    <>
      <section
        className="faq-cinema"
        id="perguntas"
        aria-label="Perguntas frequentes"
      >
        <HeroVideo
          src="/media/industria-tarde-loop.mp4"
          poster="/media/industria-tarde-poster.jpg"
        />
        <div className="faq-section shell">
          <div>
            <div className="eyebrow">ANTES DE CONVERSARMOS</div>
            <h2>
              O que você
              <br />
              <span>precisa saber.</span>
            </h2>
            <a
              className="text-link"
              href={contact}
              target="_blank"
              rel="noopener noreferrer"
            >
              Fale com a nossa equipe <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="faq-list">
            {faqs.map(([q, a]) => (
              <details key={q} name="perguntas-frequentes">
                <summary>
                  {q}
                  <ChevronDown size={17} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="final-cta" id="contato">
        <div className="shell final-inner">
          <div>
            <div className="eyebrow">
              LEVE A FERMENTAÇÃO PARA A PALMA DA SUA MÃO
            </div>
            <h2>
              Pronto para transformar dados de fermentação
              <br />
              <span>em mais potencial de produção?</span>
            </h2>
            <p>
              Agende uma demonstração personalizada com a ProBio Solutions e
              descubra como identificar oportunidades de produzir mais etanol,
              com diagnósticos e recomendações direto no seu WhatsApp.
            </p>
          </div>
          <div className="final-action">
            <a
              className="button button-green"
              href={contact}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={19} />
              Agendar demonstração
              <ArrowUpRight size={19} />
            </a>
            <span>+55 16 99145-7282</span>
          </div>
        </div>
      </section>
    </>
  );
}
