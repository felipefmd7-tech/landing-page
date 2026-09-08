import { headers } from 'next/headers';
import { isEditor } from '../../lib/editor-store';
import Editor from './visual-editor';
import './editor.css';
export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Editor visual | ProBio Solutions',
  robots: { index: false, follow: false },
};
export default async function EditorPage() {
  const requestHeaders = await headers();
  if (!isEditor(new Headers(requestHeaders)))
    return (
      <main className="editor-access">
        <h1>Editor da ProBio Solutions</h1>
        <p>Este painel é exclusivo da conta proprietária da LP.</p>
        <a href="/signin-with-chatgpt?return_to=%2Feditor" target="_top">
          Entrar com a conta autorizada
        </a>
        <a href="/">Voltar para a LP</a>
      </main>
    );
  return <Editor />;
}
