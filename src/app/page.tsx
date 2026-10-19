import Brand from "@/components/Brand";
import Catalogue from "@/components/Catalogue";
import Contact from "@/components/Contact";
import DirectContacts from "@/components/DirectContacts";
import { toolPages } from "@/lib/tools";
import { getProperties } from "@/lib/server";
import { locations, Property } from "@/lib/properties";
export const dynamic = "force-dynamic";
export default async function Home() {
  let properties: Property[] = [];
  let unavailable = false;
  try {
    properties = await getProperties();
  } catch {
    unavailable = true;
  }
  return (
    <>
      <header className="header home-header">
        <Brand />
        <nav aria-label="Navegação principal">
          <a href="#imoveis">Imóveis</a>
          <a className="nav-tools" href="/ferramentas">
            Ferramentas e guias
          </a>
          <a href="#sobre">Sobre a Procuracasa</a>
          <a className="nav-contact" href="#contacto">
            Vamos conversar ↗
          </a>
        </nav>
      </header>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">IMÓVEIS · GRANDE PORTO · LITORAL</p>
            <h1>
              O seu lugar.
              <br />
              Entre a cidade
              <br />e o <em>mar.</em>
            </h1>
            <p>
              Uma nova casa começa com uma boa conversa. Descubra imóveis e
              encontre acompanhamento próximo, com especial atenção ao Grande
              Porto e abertura a outras zonas.
            </p>
            <div className="hero-actions">
              <a href="#imoveis" className="button">
                Explorar imóveis <span>↗</span>
              </a>
              <a href="#contacto" className="underlink">
                Diga-nos o que procura
              </a>
            </div>
            <div className="signature">
              <span className="signature-line" />
              <span>
                Procuracasa<small>PROXIMIDADE EM CADA PASSO.</small>
              </span>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="/images/interior-ambiente.jpg"
              alt="Interior luminoso com materiais naturais — imagem de ambiente, não corresponde a um imóvel anunciado"
            />
            <div className="image-caption">
              <span>ESPAÇO PARA UM NOVO CAPÍTULO.</span>
              <small>Imagem de ambiente</small>
            </div>
            <div className="image-number">01 / UM NOVO COMEÇO</div>
          </div>
        </section>
        <div className="location-strip">
          <span>AS NOSSAS ZONAS DE REFERÊNCIA</span>
          <p>
            Vila do Conde <i>·</i> Matosinhos <i>·</i> Leça da Palmeira <i>·</i>{" "}
            Porto
          </p>
          <a href="#territorio" aria-label="Conhecer as zonas">
            ↓
          </a>
        </div>
        <section className="section" id="imoveis">
          <div className="section-heading">
            <div>
              <p className="eyebrow">ENCONTRE O SEU PRÓXIMO CAPÍTULO</p>
              <h2>
                Casas com lugar{" "}
                <br />
                na sua vida.
              </h2>
            </div>
            <p>
              Para viver perto do mar, mudar de bairro ou começar de novo.
              Explore as opções e fale connosco sobre o que procura.
            </p>
          </div>
          {unavailable ? (
            <div className="empty">
              <h3>O catálogo está temporariamente indisponível.</h3>
              <p>Pode continuar a enviar-nos o seu pedido.</p>
              <a href="#contacto" className="button">
                Falar connosco ↗
              </a>
            </div>
          ) : (
            <Catalogue properties={properties} />
          )}
        </section>
        <section className="territory section" id="territorio">
          <div className="territory-image">
            <img
              loading="lazy"
              src="/images/porto-ambiente.jpg"
              alt="Arquitetura e paisagem urbana do Porto"
            />
            <span>PORTO, COM OUTRO OLHAR.</span>
          </div>
          <div>
            <p className="eyebrow">ZONAS DE REFERÊNCIA</p>
            <h2>
              Da vida da cidade
              <br />à calma da costa.
            </h2>
            <p>
              O Grande Porto oferece diferentes formas de viver. A procura
              acompanha as suas prioridades: a proximidade da praia, os acessos,
              o bairro e o espaço de que precisa. Estas são as nossas zonas
              preferenciais de atuação; acompanhamos também pedidos noutras
              localidades.
            </p>
            <div className="zone-list">
              {locations.map((l, i) => (
                <a key={l} href="#contacto">
                  <small>0{i + 1}</small>
                  {l}
                  <span>↗</span>
                </a>
              ))}
            </div>
            <a className="underlink other-zone" href="#contacto">
              Procura noutra zona? Conte-nos onde ↗
            </a>
          </div>
        </section>
        <section className="about section" id="sobre">
          <div>
            <p className="eyebrow">ACOMPANHAMENTO COM PROXIMIDADE</p>
            <h2>
              Uma casa é pessoal.
              <br />A procura também.
            </h2>
            <span className="about-brand">Procuracasa</span>
            <span className="eyebrow">PROCURACASA · GRANDE PORTO</span>
          </div>
          <div>
            <p className="large-copy">
              Ouvir primeiro.
              <br />
              Procurar com critério.
              <br />
              Acompanhar a decisão.
            </p>
            <p>
              Acompanhamos a procura no Grande Porto, com especial incidência em
              Vila do Conde e nas zonas costeiras de Matosinhos e Porto. A
              procura parte do que faz sentido para si, incluindo noutras zonas.
            </p>
            <p>
              O acompanhamento é desenvolvido em parceria com entidades de
              mediação imobiliária licenciadas. A entidade responsável e o
              respetivo número AMI são identificados em cada imóvel publicado.
            </p>
            <a className="underlink" href="#contacto">
              Conte-nos os seus planos ↗
            </a>
          </div>
        </section>
        <section className="tools-teaser section" id="ferramentas">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FERRAMENTAS E GUIAS · SEM REGISTO</p>
              <h2>
                Prepare a sua
                <br />
                próxima decisão.
              </h2>
            </div>
            <p>
              Faça as contas, organize os documentos e leve as perguntas certas
              para a visita.
            </p>
          </div>
          <div className="tools-grid">
            {toolPages.map((t) => (
              <a
                key={t.slug}
                className="tool-card"
                href={`/ferramentas/${t.slug}`}
              >
                <p className="eyebrow">{t.kind}</p>
                <h3>{t.title}</h3>
                <p>{t.description}</p>
                <span className="underlink">{t.action} ↗</span>
              </a>
            ))}
          </div>
        </section>
        <section className="contact-section section" id="contacto">
          <div>
            <p className="eyebrow">VAMOS ENCONTRAR O SEU LUGAR</p>
            <h2>
              A próxima casa
              <br />
              começa <em>aqui.</em>
            </h2>
            <p>
              Já sabe o que procura ou ainda está a descobrir? Partilhe as suas
              preferências connosco. Podemos procurar opções também através de
              imobiliárias parceiras.
            </p>
            <DirectContacts />
            <div className="contact-socials">
              <a
                href="https://www.instagram.com/procuracasa.pt/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram ↗
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61594045382307"
                target="_blank"
                rel="noreferrer"
              >
                Facebook ↗
              </a>
            </div>
          </div>
          <Contact />
        </section>
      </main>
      <footer className="footer">
        <Brand />
        <p>O seu lugar. Entre a cidade e o mar.</p>
        <div>
          <a href="tel:+351917361697">917 361 697</a>
          <a href="mailto:procuracasa@procuracasa.pt">
            procuracasa@procuracasa.pt
          </a>
          <a href="/ferramentas">Ferramentas e guias</a>
          <a href="/privacidade">Privacidade</a>
          <a href="/termos">Termos</a>
          <a href="/gestao">Área de gestão</a>
        </div>
        <small>© {new Date().getFullYear()} Procuracasa.</small>
      </footer>
    </>
  );
}
