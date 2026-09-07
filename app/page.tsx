'use client';
import {
  Diagnostics,
  Demonstration,
  Impact,
  Evidence,
  FinalSections,
} from './sections';
import { useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  MessageCircle,
  Activity,
  Thermometer,
  Layers3,
  Menu,
  X,
  CheckCheck,
  MoveUpRight,
} from 'lucide-react';
const contact =
  'https://wa.me/5516991457282?text=' +
  encodeURIComponent(
    'Olá! Quero conhecer os diagnósticos de fermentação da ProBio Solutions para minha operação.',
  );
export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 39V9h15a12 12 0 0 1 0 24h-6"
        stroke="currentColor"
        strokeWidth="6"
      />
      <path
        d="m4 28 10-8 8 5 13-13"
        stroke="#9FE870"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label="ProBio Solutions, início">
      <Mark />
      <span>
        ProBio<span className="brand-sub">SOLUTIONS</span>
      </span>
    </a>
  );
}
function CTA({
  children = 'Conversar com um especialista',
  light = false,
}: {
  children?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <a
      className={'button ' + (light ? 'button-light' : 'button-green')}
      href={contact}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={19} />
    </a>
  );
}
// Inline SVG is an accessible data chart, not an HTML image element.
function Chart() {
  return (
    <svg
      className="process-chart"
      viewBox="0 0 460 155"
      // SVG charts require an explicit image role for assistive technology.
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
      role="img"
      aria-label="Curva ilustrativa de temperatura: a batelada oscila acima da faixa de referência antes de estabilizar."
    >
      <defs>
        <linearGradient id="chartfill" x1="0" x2="0" y1="0" y2="1">
          <stop stopColor="#77CC70" stopOpacity=".22" />
          <stop offset="1" stopColor="#77CC70" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[25, 65, 105, 145].map((y) => (
        <line key={y} x1="32" x2="455" y1={y} y2={y} stroke="#e3e9e7" />
      ))}
      <rect x="32" y="82" width="422" height="30" fill="#eaf5e8" />
      <line
        x1="32"
        y1="82"
        x2="455"
        y2="82"
        stroke="#78a483"
        strokeDasharray="5 5"
      />
      <path
        d="M32 120C62 125 76 75 100 82S140 8 168 27S192 52 218 42S252 76 275 66S305 105 333 95S384 96 407 100S440 98 455 102L455 145H32Z"
        fill="url(#chartfill)"
      />
      <path
        d="M32 120C62 125 76 75 100 82S140 8 168 27S192 52 218 42S252 76 275 66S305 105 333 95S384 96 407 100S440 98 455 102"
        stroke="#23764e"
        strokeWidth="2.5"
        fill="none"
      />
      <circle
        cx="168"
        cy="27"
        r="5"
        fill="#df9e43"
        stroke="white"
        strokeWidth="2"
      />
      <text x="0" y="29">
        38°
      </text>
      <text x="0" y="86">
        35°
      </text>
      <text x="0" y="147">
        32°
      </text>
    </svg>
  );
}
function HeroVisual() {
  return (
    <div className="hero-visual">
      <div className="analysis-window">
        <div className="window-top">
          <span>
            <span className="tiny-mark">P</span> Visão da fermentação
          </span>
          <span className="sample-tag">EXEMPLO ILUSTRATIVO</span>
        </div>
        <div className="window-content">
          <div className="flex-between">
            <div>
              <p className="micro">UNIDADE DEMONSTRATIVA</p>
              <h3>Cada batelada conta.</h3>
            </div>
            <span className="status-pill">
              <span />
              Análise concluída
            </span>
          </div>
          <div className="mini-kpis">
            <div>
              <span>Bateladas avaliadas</span>
              <strong>
                24<span> / período</span>
              </strong>
            </div>
            <div>
              <span>Prioridades identificadas</span>
              <strong>
                03<span> ocorrências</span>
              </strong>
            </div>
          </div>
          <div className="chart-heading">
            <span>
              <i />
              Temperatura da batelada
            </span>
            <span>Dorna A</span>
          </div>
          <Chart />
          <div className="chart-axis">
            <span>0 h</span>
            <span>4 h</span>
            <span>8 h</span>
            <span>12 h</span>
          </div>
          <div className="finding-row">
            <span className="finding-icon">
              <Thermometer size={17} />
            </span>
            <div>
              <strong>Desvio térmico identificado</strong>
              <span>Verificar mosto, utilitário e troca térmica.</span>
            </div>
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
      <div className="whatsapp-preview">
        <div className="wa-top">
          <div className="wa-avatar">
            <Mark />
          </div>
          <div>
            <strong>ProBio Solutions</strong>
            <span>Inteligência para fermentação</span>
          </div>
          <MessageCircle size={19} />
        </div>
        <div className="wa-body">
          <div className="wa-bubble">
            <strong>Da análise para a ação. 🌱</strong>
            <p>
              A Dorna A precisa de atenção térmica. Comece verificando a
              temperatura do mosto e a condição da água de resfriamento.
            </p>
            <div className="wa-gain">
              <span>Próximo passo</span>
              <b>Entenda o impacto da recomendação</b>
            </div>
            <small>
              Exemplo demonstrativo <CheckCheck size={14} />
            </small>
          </div>
        </div>
        <a href="#demonstracao" className="wa-footer">
          Explore uma conversa <ArrowRight size={15} />
        </a>
      </div>
      <div className="visual-footnote">
        <span className="small-cross">+</span> DADOS → DIAGNÓSTICO → DECISÃO
      </div>
    </div>
  );
}
export default function Home() {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="header">
        <div className="shell header-inner">
          <Brand />
          <nav
            className={menu ? 'navigation open' : 'navigation'}
            aria-label="Navegação principal"
          >
            <a href="#diagnosticos" onClick={() => setMenu(false)}>
              A solução
            </a>
            <a href="#demonstracao" onClick={() => setMenu(false)}>
              Na prática
            </a>
            <a href="#impacto" onClick={() => setMenu(false)}>
              Ganhos e ROI
            </a>
          </nav>
          <a
            className="header-cta"
            href={contact}
            target="_blank"
            rel="noopener noreferrer"
          >
            Vamos conversar <ArrowUpRight size={17} />
          </a>
          <button
            className="menu-toggle"
            aria-label={menu ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="conteudo">
        <section className="hero shell" id="inicio">
          <div className="hero-copy">
            <div className="eyebrow">
              <span /> INTELIGÊNCIA PARA FERMENTAÇÃO INDUSTRIAL
            </div>
            <h1>
              Sua fermentação.
              <br />
              Mais clareza.
              <br />
              <span>Melhores decisões.</span>
            </h1>
            <p className="hero-description">
              Da batelada ao resultado: diagnósticos, recomendações e o ganho
              por trás de cada ação. <strong>Direto no seu WhatsApp.</strong>
            </p>
            <div className="hero-actions">
              <CTA>Leve para sua operação</CTA>
              <a className="text-link" href="#demonstracao">
                Veja na prática <ArrowRight size={17} />
              </a>
            </div>
            <div className="hero-note">
              <MessageCircle size={16} />
              <span>A fermentação na palma da mão.</span>
            </div>
          </div>
          <HeroVisual />
        </section>
        <div className="principles">
          <div className="shell principles-inner">
            <span>
              DO PROCESSO
              <br />
              <b>À DECISÃO.</b>
            </span>
            <p>
              <Layers3 />
              Batelada a batelada
            </p>
            <p>
              <Activity />
              Diagnóstico com evidências
            </p>
            <p>
              <MoveUpRight />
              Impacto explicado
            </p>
            <p>
              <MessageCircle />
              Pelo WhatsApp
            </p>
          </div>
        </div>
        <Diagnostics />
        <Demonstration />
        <Impact />
        <Evidence />
        <FinalSections />
      </main>
      <footer className="footer">
        <div className="shell footer-top">
          <Brand />
          <p>Inteligência para fermentação.</p>
          <a href={contact} target="_blank" rel="noopener noreferrer">
            +55 16 99145-7282 <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 ProBio Solutions.</span>
          <span>Monitoramento · Diagnósticos · Recomendações</span>
        </div>
      </footer>
    </>
  );
}
