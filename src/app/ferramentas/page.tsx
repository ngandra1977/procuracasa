import type { Metadata } from "next";
import Brand from "@/components/Brand";
import { toolPages } from "@/lib/tools";
export const metadata: Metadata = {
  title: "Calculadoras e guias para comprar casa | Procuracasa",
  description:
    "Simule os custos da compra e a prestação do crédito. Prepare os documentos e as visitas com checklists gratuitas, sem registo.",
  alternates: { canonical: "https://www.procuracasa.pt/ferramentas" },
};
export default function Tools() {
  return (
    <>
      <header className="header tool-header">
        <Brand />
        <nav aria-label="Navegação">
          <a href="/#imoveis">Imóveis</a>
          <a className="nav-contact" href="/#contacto">
            Vamos conversar ↗
          </a>
        </nav>
      </header>
      <main className="tools-main">
        <section className="tool-heading">
          <p className="eyebrow">FERRAMENTAS E GUIAS · SEM REGISTO</p>
          <h1>
            Mais clareza.
            <br />
            Melhores decisões.
          </h1>
          <p>
            Antes de escolher uma casa, há contas para fazer e perguntas para
            organizar. Comece aqui, ao seu ritmo.
          </p>
        </section>
        <div className="tools-grid">
          {toolPages.map((t) => (
            <a
              key={t.slug}
              className="tool-card"
              href={`/ferramentas/${t.slug}`}
            >
              <span className="tool-number">{t.number}</span>
              <p className="eyebrow">{t.kind}</p>
              <h2>{t.title}</h2>
              <p>{t.description}</p>
              <span className="underlink">{t.action} ↗</span>
            </a>
          ))}
        </div>
        <section className="tool-cta">
          <div>
            <p className="eyebrow">PROCURA A SUA PRÓXIMA CASA?</p>
            <h2>Os seus planos têm lugar aqui.</h2>
            <p>
              Depois das contas, conheça os imóveis ou conte-nos o que procura.
            </p>
          </div>
          <div className="hero-actions">
            <a href="/#imoveis" className="button">
              Explorar imóveis ↗
            </a>
            <a href="/#contacto" className="underlink">
              Falar connosco ↗
            </a>
          </div>
        </section>
      </main>
      <footer className="footer">
        <Brand />
        <div>
          <a href="/">Página inicial</a>
          <a href="/privacidade">Privacidade</a>
          <a href="/termos">Termos</a>
        </div>
      </footer>
    </>
  );
}
