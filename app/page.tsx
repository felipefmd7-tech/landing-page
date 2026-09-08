'use client';
import {
  Diagnostics,
  Demonstration,
  Impact,
  Evidence,
  FinalSections,
} from './sections';
import { useState } from 'react';
import HeroVideo from './hero-video';
import {
  ArrowUpRight,
  ArrowRight,
  MessageCircle,
  Activity,
  Layers3,
  Menu,
  X,
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
        <section className="hero-cinema" id="inicio">
          <HeroVideo />
          <div className="hero shell">
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
                Seu especialista digital acompanha a fermentação e entrega
                alertas, recomendações e o potencial de ganho de cada ação.
                <strong> Direto no seu WhatsApp.</strong>
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
          </div>
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
              Acompanhamento automático
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
          <div className="footer-contact">
            <a href={contact} target="_blank" rel="noopener noreferrer">
              +55 16 99145-7282 <ArrowUpRight size={16} />
            </a>
            <a
              className="linkedin-icon"
              href="https://www.linkedin.com/in/felipe-moura-bioprocessos/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Felipe Moura no LinkedIn"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96C2 21.32 2.69 22 3.55 22h16.9c.86 0 1.55-.68 1.55-1.52V3.52C22 2.68 21.31 2 20.45 2ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.53 2.8-1.53 2.99 0 3.54 1.97 3.54 4.53v5.25Z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 ProBio Solutions.</span>
          <span>Monitoramento · Diagnósticos · Recomendações</span>
        </div>
      </footer>
    </>
  );
}
