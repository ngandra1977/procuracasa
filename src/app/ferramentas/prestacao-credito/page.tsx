import { localizePage, localizedMetadata } from "@/lib/i18n/server";
import type { Metadata } from "next";
import ToolShell from "@/components/tools/ToolShell";
import MortgageCalculator from "@/components/tools/MortgageCalculator";
const baseMetadata: Metadata = {
    title: "Simulador de prestação do crédito à habitação | Procuracasa",
    description: "Calcule a prestação mensal, compare prazos e explore uma subida de juros. Simulação gratuita, sem registo ou envio dos seus rendimentos.",
    alternates: {
        canonical: "https://www.procuracasa.pt/ferramentas/prestacao-credito",
    },
};
export default async function Page() {
    return localizePage((<ToolShell eyebrow="SIMULADOR · CRÉDITO À HABITAÇÃO" title="Que prestação cabe nos seus planos?" intro="Explore a relação entre capital, prazo e taxa de juro. Os resultados ajudam a preparar uma conversa informada com o banco." sources={[
            {
                title: "CGD — duração do empréstimo e idade no final do contrato",
                href: "https://www.cgd.pt/Particulares/Credito/Habitacao/Pages/Credito-habitacao-Regime-Geral.aspx",
            },
            {
                title: "Banco de Portugal — simulador de crédito à habitação",
                href: "https://clientebancario.bportugal.pt/pt-pt/credito-habitacao",
            },
            {
                title: "Banco de Portugal — avaliação da solvabilidade",
                href: "https://clientebancario.bportugal.pt/pt-pt/avaliacao-da-solvabilidade",
            },
        ]}>
      <MortgageCalculator />
    </ToolShell>));
}

export async function generateMetadata() { return localizedMetadata(baseMetadata); }
