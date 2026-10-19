import Brand from "@/components/Brand";
import DirectContacts from "@/components/DirectContacts";
import { REVIEWED_DATE } from "@/lib/calculators";
import { toolPages } from "@/lib/tools";
import type { ReactNode } from "react";
export default function ToolShell({
  eyebrow,
  title,
  intro,
  children,
  sources = [],
  reviewedDate = REVIEWED_DATE,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
  sources?: { title: string; href: string }[];
  reviewedDate?: string;
}) {
  return (
    <>
      <header className="header tool-header">
        <Brand />
        <nav aria-label="Navegação">
          <a href="/ferramentas">Ferramentas e guias</a>
          <a href="/#imoveis">Imóveis</a>
          <a className="nav-contact" href="/#contacto">
            Vamos conversar ↗
          </a>
        </nav>
      </header>
      <main className="tools-main">
        <div className="tool-heading">
          <a className="tool-back" href="/ferramentas">
            ← Todas as ferramentas
          </a>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
        {children}
        <section className="tool-explanation">
          <h2>Continue a preparar a compra ou a venda.</h2>
          <ul>{toolPages.map((tool) => <li key={tool.slug}><a href={`/ferramentas/${tool.slug}`}>{tool.title}</a></li>)}</ul>
        </section>
        {sources.length > 0 && (
          <aside className="tool-sources">
            <p className="eyebrow">FONTES E ATUALIZAÇÃO</p>
            <p>
              Informação verificada em {reviewedDate}. Confirme alterações
              posteriores nas fontes oficiais.
            </p>
            <ul>
              {sources.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.title} ↗
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}
        <section className="tool-cta">
          <div>
            <p className="eyebrow">DA SIMULAÇÃO À SUA PRÓXIMA CASA</p>
            <h2>Vamos dar o próximo passo?</h2>
            <p>
              Partilhe o que procura ou esclareça uma dúvida sobre um imóvel.
            </p>
            <a className="underlink" href="/#contacto">
              Diga-nos o que procura ↗
            </a>
          </div>
          <DirectContacts />
        </section>
      </main>
      <footer className="footer">
        <Brand />
        <div>
          <a href="/ferramentas">Ferramentas e guias</a>
          <a href="/privacidade">Privacidade</a>
          <a href="/termos">Termos</a>
          <a href="/">Voltar ao início</a>
        </div>
      </footer>
    </>
  );
}
