import { localizePage, localizedMetadata } from "@/lib/i18n/server";
import Brand from "@/components/Brand";
export default async function Terms() {
    return localizePage((<>
      <header className="header">
        <Brand />
        <a href="/">Voltar ao início</a>
      </header>
      <main className="section legal">
        <p className="eyebrow">PROCURACASA</p>
        <h1>Utilização do site</h1>
        <h2>Apresentação</h2>
        <p>
          Procuracasa apresenta imóveis e permite entrar em contacto sobre a
          procura de casa no Grande Porto. A mediação dos imóveis é realizada
          pelas entidades licenciadas identificadas nas respetivas fichas, com o
          seu número AMI. A marca Procuracasa não é apresentada como titular de
          licença própria.
        </p>
        <h2>Informação dos imóveis</h2>
        <p>
          Os preços, características e disponibilidade devem ser confirmados com
          a entidade responsável. Um pedido de informação ou visita não
          constitui reserva, proposta aceite ou contrato. Os anúncios
          reservados, vendidos ou arrendados são identificados com esse estado.
        </p>
        <h2>Imagens de ambiente</h2>
        <p>
          As imagens de ambiente são identificadas como tal e não representam
          imóveis disponíveis. As fotografias inseridas nas fichas individuais
          devem corresponder ao imóvel apresentado.
        </p>
        <h2>Pedidos de procura</h2>
        <p>
          O envio de preferências permite iniciar uma conversa sobre opções
          adequadas, incluindo através de parceiros. Não garante que exista um
          imóvel com essas características ou que seja encontrada uma solução
          num prazo determinado. Eventuais serviços e condições comerciais devem
          ser acordados previamente.
        </p>
        <h2>Ferramentas e guias</h2>
        <p>
          As calculadoras são estimativas com os pressupostos e âmbito indicados
          em cada página. Não constituem propostas de crédito, avaliações
          bancárias, liquidações fiscais ou garantia de financiamento. As
          checklists são orientadoras e devem ser adaptadas ao caso concreto. As
          fontes e a data de verificação constam das páginas relevantes.
        </p>
        <h2>Informação a confirmar</h2>
        <p>
          A identificação comercial completa e os contactos das entidades
          intervenientes devem ser confirmados antes da publicação desta versão.
        </p>
      </main>
    </>));
}

export async function generateMetadata() { return localizedMetadata({ title: "Termos de utilização | Procuracasa" }, "https://www.procuracasa.pt/termos"); }
