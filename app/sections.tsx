'use client';
import { useState } from 'react';
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
    title: 'Condição térmica',
    icon: Thermometer,
    tag: 'TEMPERATURA E RESFRIAMENTO',
    headline: 'A temperatura subiu. Onde começar a investigar?',
    description:
      'Cruze o comportamento do mosto, da água e da troca térmica. A leitura conjunta ajuda a direcionar a investigação antes de decidir uma intervenção.',
    metrics: [
      ['Mosto acima da referência', '68% do período'],
      ['Água de resfriamento', 'Dentro da faixa'],
      ['Prioridade', 'Verificação térmica'],
    ],
    evidence:
      'O mosto ficou acima da referência em 68% do período, enquanto a água permaneceu na faixa definida para a operação.',
    action:
      'Verifique o resfriamento do mosto e a confiabilidade dos sensores. Cruze vazão, temperatura e condição de troca antes de intervir.',
    gain: 'Ao restabelecer a condição térmica, acompanhe a estabilidade das bateladas e o rendimento. O ganho em litros depende de uma melhoria medida ou de uma hipótese explícita.',
    q: 'Por onde começo?',
    reply:
      'Comece pela temperatura do mosto e pela confiabilidade dos sensores. A água está na faixa neste exemplo; isso direciona a verificação, mas ainda não comprova a causa do desvio.',
  },
  {
    title: 'Qualidade do CIP',
    icon: Droplets,
    tag: 'LIMPEZA E CONSISTÊNCIA',
    headline: 'Executar o CIP é uma parte. Avaliar a qualidade é outra.',
    description:
      'Separe a realização da limpeza do atendimento aos critérios de tempo e temperatura. Compare dornas e turnos dentro da janela efetivamente analisada.',
    metrics: [
      ['Ciclos realizados', '12 de 12'],
      ['Ciclos conformes', '4 de 12'],
      ['Prioridade', 'Qualidade da limpeza'],
    ],
    evidence:
      'Todos os 12 ciclos ilustrativos foram realizados, mas somente 4 atenderam aos critérios de tempo e temperatura definidos para o exemplo.',
    action:
      'Revise a condição térmica e a duração dos ciclos não conformes conforme o procedimento da unidade. A prioridade é a qualidade, não aumentar a frequência indiscriminadamente.',
    gain: 'Uma limpeza consistente pode reduzir perdas associadas à instabilidade. Quantifique consumo, retrabalho e indicadores fermentativos antes e depois da ação, sem atribuir causalidade apenas ao CIP.',
    q: 'Preciso fazer mais CIP?',
    reply:
      'Neste exemplo, a execução foi de 100%. A oportunidade está na qualidade: investigar por que 8 ciclos não atenderam aos critérios de tempo e temperatura. Aumentar a frequência não resolve necessariamente esse desvio.',
  },
  {
    title: 'Bateladas e enchimento',
    icon: Layers3,
    tag: 'TEMPOS E VARIABILIDADE',
    headline: 'O que muda de uma batelada para a próxima?',
    description:
      'Encontre variações no enchimento, na espera e na centrifugação. Compare nível máximo e razão pé/mosto para entender a consistência do processo.',
    metrics: [
      ['Bateladas avaliadas', '24'],
      ['Duração média', '10 h 40 min'],
      ['Variação entre ciclos', '± 45 min'],
    ],
    evidence:
      'As 24 bateladas ilustrativas têm duração média de 10 h 40 min e desvio-padrão de 45 minutos. O enchimento concentra a maior variação neste cenário.',
    action:
      'Compare bateladas equivalentes e verifique sequência de alimentação, vazão, nível máximo e razão pé/mosto. Identifique a origem da variação antes de definir novos alvos.',
    gain: 'Menos variação pode melhorar a previsibilidade. Tempo liberado só vira produção adicional quando há capacidade e condições nos demais estágios da operação.',
    q: 'Menos tempo significa mais produção?',
    reply:
      'Depende do gargalo da planta. Primeiro confirme o tempo recuperável e se alimentação, fermentação, centrifugação e etapas seguintes comportam a produção adicional. A simulação econômica precisa refletir essa restrição.',
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
            O desvio é o começo.
            <br />
            <span>A decisão é o que importa.</span>
          </h2>
        </div>
        <p>
          Seu histórico ganha contexto. Cada batelada ajuda a entender o
          processo, encontrar prioridades e orientar a próxima ação.
        </p>
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
          <p className="tab-note">
            Também acompanhamos sensores, recirculação, níveis, razão pé/mosto e
            indícios de passagem de água, conforme os dados disponíveis.
          </p>
        </div>
        <div className="diagnostic-detail" aria-live="polite">
          <div className="eyebrow">{c.tag}</div>
          <h3>{c.headline}</h3>
          <p>{c.description}</p>
          <div className="diagnostic-metrics">
            {c.metrics.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="technical-note">
            <Activity size={16} />
            <span>
              Exemplo fictício. Referências e critérios são definidos para cada
              operação.
            </span>
          </div>
        </div>
      </div>
      <div className="process-steps">
        {[
          {
            n: '01',
            title: 'Monitorar',
            text: 'Organize o período, as dornas e os indicadores relevantes.',
          },
          {
            n: '02',
            title: 'Diagnosticar',
            text: 'Entenda a evidência, a prioridade e a persistência do desvio.',
          },
          {
            n: '03',
            title: 'Recomendar',
            text: 'Receba uma orientação de verificação e ação com contexto.',
          },
          {
            n: '04',
            title: 'Acompanhar',
            text: 'Compare a evolução e avalie o impacto após a ação.',
          },
        ].map((item) => (
          <div key={item.n}>
            <span>{item.n}</span>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        ))}
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
    'O que devo verificar?',
    'Qual é o ganho esperado?',
    c.q,
  ];
  return (
    <section className="demo-section" id="demonstracao">
      <div className="shell demo-grid">
        <div className="demo-copy">
          <div className="eyebrow">02 / UMA CONVERSA QUE MOVE A OPERAÇÃO</div>
          <h2>
            Uma pergunta.
            <br />
            Um caminho mais claro.
            <br />
            <span>No seu WhatsApp.</span>
          </h2>
          <p>
            Consulte a situação da fermentação, aprofunde uma ocorrência e
            entenda o próximo passo. A informação chega onde a sua rotina já
            acontece.
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
            <span>Diagnóstico com evidências do período analisado.</span>
          </div>
          <div className="demo-proof">
            <Check size={17} />
            <span>Ocorrências novas, persistentes e recorrentes.</span>
          </div>
          <div className="demo-proof">
            <Check size={17} />
            <span>Orientações para a sua equipe avaliar e executar.</span>
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
                Olá! Vamos olhar a fermentação?
                <br />
                Selecione uma pergunta para explorar{' '}
                <strong>{c.title.toLowerCase()}</strong>.
              </p>
              <time>08:30</time>
            </div>
            <div className="chat-message user">
              {questions[step]}
              <time>
                08:31 <CheckCheck size={14} />
              </time>
            </div>
            <div
              className="chat-message bot answer"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="chat-sender">
                {
                  [
                    'Diagnóstico',
                    'Caminho de verificação',
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
            <span>EXPERIMENTE UMA PERGUNTA</span>
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
            Explore o impacto econômico de uma hipótese de melhoria. Ajuste as
            premissas para a sua operação e veja de onde vem cada resultado.
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
        <details className="calculation-details">
          <summary>
            <span>
              <FileText size={18} /> Abrir a memória de cálculo
            </span>
            <ChevronDown size={19} />
          </summary>
          <div className="formula-grid">
            <div>
              <span>01 / VOLUME ADICIONAL</span>
              <p>Produção diária × aumento relativo ÷ 100 × dias</p>
              <b>
                {valid
                  ? `${number.format(v)} × ${g.toLocaleString('pt-BR')}% × ${d} = ${number.format(liters)} L`
                  : 'Preencha os campos.'}
              </b>
            </div>
            <div>
              <span>02 / MARGEM ADICIONAL</span>
              <p>Volume adicional × margem por litro</p>
              <b>
                {valid
                  ? `${number.format(liters)} L × R$ ${m.toLocaleString('pt-BR')} = ${money.format(contribution)}`
                  : 'Preencha os campos.'}
              </b>
            </div>
            <div>
              <span>03 / IMPACTO LÍQUIDO</span>
              <p>Margem adicional − custo total da ação</p>
              <b>
                {valid
                  ? `${money.format(contribution)} − ${money.format(c)} = ${money.format(net)}`
                  : 'Preencha os campos.'}
              </b>
            </div>
          </div>
          <p>
            O aumento informado é relativo à produção atual, não uma variação em
            pontos percentuais de rendimento fermentativo. Esta simulação não
            prevê o efeito de uma recomendação específica. O resultado depende
            da validação da hipótese, da execução da ação e da capacidade da
            planta.
          </p>
        </details>
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
    <section className="section shell evidence-section">
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
              ['Níveis de enchimento', 'Estável'],
              ['Razão pé/mosto', 'Estável'],
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
        <div className="eyebrow">04 / CONSTRUA UM HISTÓRICO DE DECISÕES</div>
        <h2>
          A ação passa.
          <br />
          <span>O aprendizado fica.</span>
        </h2>
        <p className="section-lead">
          O WhatsApp aproxima a análise da operação. Os relatórios organizam as
          evidências para aprofundar a discussão técnica e acompanhar a
          evolução.
        </p>
        <div className="evidence-item">
          <Clock3 size={21} />
          <div>
            <h4>Entenda a persistência</h4>
            <p>Veja o que surgiu, o que continua e o que voltou a acontecer.</p>
          </div>
        </div>
        <div className="evidence-item">
          <Activity size={21} />
          <div>
            <h4>Compare com contexto</h4>
            <p>
              Avalie períodos e condições equivalentes para interpretar a
              evolução.
            </p>
          </div>
        </div>
        <div className="evidence-item">
          <TrendingUp size={21} />
          <div>
            <h4>Separe expectativa de resultado</h4>
            <p>
              Registre a ação e confronte o ganho estimado com os indicadores
              observados.
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
    'O acompanhamento reúne diagnósticos de bateladas, temperaturas, resfriamento, CIP, níveis, razão pé/mosto e outros indicadores aplicáveis à operação. A cobertura depende das variáveis, dos sensores e da qualidade dos dados disponíveis.',
  ],
  [
    'Como recebo as informações pelo WhatsApp?',
    'O canal permite consultar a situação da fermentação, aprofundar ocorrências e receber orientações. O fluxo já foi validado em ambiente de homologação. Na implantação, alinhamos os destinatários, a frequência de análise e a configuração adequada à sua operação.',
  ],
  [
    'De onde vêm os dados da análise?',
    'O diagnóstico utiliza o histórico operacional disponibilizado pela unidade. Na avaliação inicial, verificamos as fontes, as variáveis, as unidades de medida e a cobertura do período para definir o escopo possível.',
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
      <section className="faq-section shell">
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
            <details key={q}>
              <summary>
                {q}
                <ChevronDown size={17} />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="final-cta" id="contato">
        <div className="shell final-inner">
          <div>
            <div className="eyebrow">A PRÓXIMA DECISÃO COMEÇA AQUI.</div>
            <h2>
              Mais contexto na operação.
              <br />
              <span>Mais potencial em cada batelada.</span>
            </h2>
            <p>Vamos olhar para a sua fermentação?</p>
          </div>
          <div className="final-action">
            <a
              className="button button-green"
              href={contact}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={19} />
              Conversar pelo WhatsApp
              <ArrowUpRight size={19} />
            </a>
            <span>+55 16 99145-7282</span>
          </div>
        </div>
      </section>
    </>
  );
}
