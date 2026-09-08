import type { Metadata } from 'next';
import './globals.css';
import './viewport.css';
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
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
