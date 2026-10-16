import Brand from "@/components/Brand";
import Catalogue from "@/components/Catalogue";
import Contact from "@/components/Contact";
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
      <header className="header">
        <Brand />
        <nav aria-label="Navegação principal">
          <a href="#imoveis">Imóveis</a>
          <a href="#territorio">O nosso território</a>
          <a href="#carla">Carla Morais</a>
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
              encontre acompanhamento próximo com Carla Morais, no Grande Porto.
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
                Carla Morais<small>PROXIMIDADE EM CADA PASSO.</small>
              </span>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85"
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
          <span>CONHECER O LUGAR FAZ A DIFERENÇA</span>
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
                Casas com lugar
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
              <p>Pode continuar a enviar o seu pedido à Carla.</p>
              <a href="#contacto" className="button">
                Falar com a Carla ↗
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
              src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1000&q=85"
              alt="Arquitetura e paisagem urbana do Porto"
            />
            <span>PORTO, COM OUTRO OLHAR.</span>
          </div>
          <div>
            <p className="eyebrow">O NOSSO TERRITÓRIO</p>
            <h2>
              Da vida da cidade
              <br />à calma da costa.
            </h2>
            <p>
              O Grande Porto oferece diferentes formas de viver. A procura
              acompanha as suas prioridades: a proximidade da praia, os acessos,
              o bairro e o espaço de que precisa.
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
          </div>
        </section>
        <section className="about section" id="carla">
          <div>
            <p className="eyebrow">ACOMPANHAMENTO COM PROXIMIDADE</p>
            <h2>
              Uma casa é pessoal.
              <br />A procura também.
            </h2>
            <span className="carla-name">Carla Morais</span>
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
              A Carla trabalha no Grande Porto, com especial incidência em Vila
              do Conde e nas zonas costeiras de Matosinhos e Porto. A procura
              parte do que faz sentido para si.
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
              preferências com a Carla. Podemos procurar opções também através
              de imobiliárias parceiras.
            </p>
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
          <a href="/privacidade">Privacidade</a>
          <a href="/termos">Termos</a>
          <a href="/gestao">Área de gestão</a>
        </div>
        <small>© {new Date().getFullYear()} Procuracasa. Carla Morais.</small>
      </footer>
    </>
  );
}
