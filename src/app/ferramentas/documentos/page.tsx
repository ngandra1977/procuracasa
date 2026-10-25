import { localizePage, localizedMetadata } from "@/lib/i18n/server";
import type { Metadata } from "next";
import ToolShell from "@/components/tools/ToolShell";
import DocumentsChecklist from "@/components/tools/DocumentsChecklist";
const baseMetadata: Metadata = {
    title: "Documentos para comprar ou vender casa: checklist | Procuracasa",
    description: "Organize documentos pessoais, registos do imóvel, condomínio, crédito e formalização da compra ou venda. Checklist gratuita para imprimir ou guardar.",
    alternates: {
        canonical: "https://www.procuracasa.pt/ferramentas/documentos",
    },
};
export default async function Page() {
    return localizePage((<ToolShell eyebrow="GUIA PRÁTICO · COMPRA E VENDA" title="Os documentos, por ordem." intro="Escolha compra ou venda e prepare o que pode ser solicitado em cada fase. Pode marcar os pontos, descarregar a lista ou guardar uma versão em PDF através da impressão." sources={[
            {
                title: "Justiça — balcão Casa Pronta e documentação",
                href: "https://justica.gov.pt/Servicos/Balcao-Casa-Pronta",
            },
            {
                title: "IRN — perguntas frequentes sobre Casa Pronta",
                href: "https://irn.justica.gov.pt/Casa-Pronta-Perguntas-Frequentes",
            },
            {
                title: "Autoridade Tributária — compra da casa, IMT e IS",
                href: "https://info.portaldasfinancas.gov.pt/pt/apoio_ao_contribuinte/Cidadaos/Casa_e_propriedades/Compra_da_casa/Paginas/default.aspx",
            },
        ]}>
      <div className="tool-scope">
        <strong>
          Uma checklist de preparação, não uma lista universal de documentos
          obrigatórios.
        </strong>
        <p>
          Os documentos variam com o imóvel, o financiamento e a situação dos
          intervenientes. Confirme a lista final com o banco e a entidade que
          formaliza o ato. Não envie documentos de identificação ou dados
          bancários pelo formulário do site.
        </p>
      </div>
      <DocumentsChecklist />
      <section className="tool-explanation">
        <h2>Preparar primeiro. Assinar depois.</h2>
        <p>
          Um anúncio ou uma visita não substitui a análise documental.
          Divergências de áreas, obras, hipotecas, heranças ou ocupação podem
          exigir passos adicionais. Peça esclarecimentos antes de assumir
          compromissos.
        </p>
        <a href="/ferramentas/custos-compra" className="underlink">
          Organizar também os custos da compra ↗
        </a>
      </section>
    </ToolShell>));
}

export async function generateMetadata() { return localizedMetadata(baseMetadata); }
