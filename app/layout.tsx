import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { publicSettings, isEditor } from '../lib/editor-store';
import { settingsCSS } from '../lib/visual-settings';
import './globals.css';
import './viewport.css';
import './faq-video.css';
import './editorial.css';
export const metadata: Metadata = {
  title: 'ProBio Solutions | Sua fermentação na palma da mão',
  description:
    'Diagnósticos batelada a batelada, recomendações com evidências e estimativas de impacto para sua fermentação industrial. Conheça a ProBio Solutions pelo WhatsApp.',
  icons: { icon: '/brand/symbol.svg' },
  openGraph: {
    title: 'ProBio Solutions | Inteligência para fermentação',
    description:
      'Mais clareza na fermentação. Diagnósticos, recomendações e impacto explicado pelo WhatsApp.',
    locale: 'pt_BR',
    type: 'website',
  },
};
export const dynamic = 'force-dynamic';
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await publicSettings();
  const owner = isEditor(new Headers(await headers()));
  return (
    <html lang="pt-BR">
      <body>
        <style id="published-visual-settings">{settingsCSS(settings)}</style>
        {children}
        {owner && (
          <a className="editor-launcher" href="/editor">
            Ajustar aparência
          </a>
        )}
      </body>
    </html>
  );
}
