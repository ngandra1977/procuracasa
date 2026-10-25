import { localizePage, localizedMetadata } from "@/lib/i18n/server";
import type { Metadata } from "next";
import ToolShell from "@/components/tools/ToolShell";
import PurchaseCalculator from "@/components/tools/PurchaseCalculator";
const baseMetadata: Metadata = {
    title: "Quanto custa comprar casa? Calculadora IMT 2026 | Procuracasa",
    description: "Estime entrada, IMT, Imposto do Selo e despesas de compra em Portugal continental. Cálculo gratuito com pressupostos e fontes oficiais.",
    alternates: {
        canonical: "https://www.procuracasa.pt/ferramentas/custos-compra",
    },
};
export default async function Page() {
    return localizePage((<ToolShell eyebrow="CALCULADORA · COMPRA DE IMÓVEL" title="Quanto precisa para comprar casa?" intro="Faça as contas à entrada e às despesas iniciais. Altere os valores para explorar diferentes cenários." sources={[
            {
                title: "Autoridade Tributária — tabelas práticas IMT 2026, Ofício 40129/2026",
                href: "https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/legislacao/instrucoes_administrativas/Documents/Oficio_circulado_40129_2026.pdf",
            },
            {
                title: "Autoridade Tributária — CIMT, artigo 17.º",
                href: "https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/cimt/Pages/cimt17.aspx",
            },
            {
                title: "Autoridade Tributária — Tabela Geral do Imposto do Selo, verbas 1.1 e 17.1",
                href: "https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/selo/Pages/ccod-selo-tabgiselo.aspx",
            },
            {
                title: "Justiça — serviço e preços do Casa Pronta",
                href: "https://justica.gov.pt/Servicos/Balcao-Casa-Pronta",
            },
        ]}>
      <PurchaseCalculator />
    </ToolShell>));
}

export async function generateMetadata() { return localizedMetadata(baseMetadata); }
