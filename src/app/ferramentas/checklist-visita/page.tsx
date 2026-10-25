import { localizePage, localizedMetadata } from "@/lib/i18n/server";
import type { Metadata } from "next";
import ToolShell from "@/components/tools/ToolShell";
import Checklist from "@/components/tools/Checklist";
import { visitSections } from "@/lib/checklists";
const baseMetadata: Metadata = {
    title: "Checklist para visitar um imóvel: o que verificar | Procuracasa",
    description: "Prepare a visita: luz, humidades, instalações, condomínio, documentação e envolvente. Checklist gratuita para usar no telemóvel, descarregar ou imprimir.",
    alternates: {
        canonical: "https://www.procuracasa.pt/ferramentas/checklist-visita",
    },
};
export default async function Page() {
    return localizePage((<ToolShell eyebrow="CHECKLIST · VISITAS A IMÓVEIS" title="Visitar com outro olhar." intro="Uma casa deve fazer sentido para a sua vida. Leve estas perguntas para a visita e use as respostas para comparar opções com mais clareza.">
      <Checklist sections={visitSections} storageKey="procuracasa:visita:v1" title="Checklist para visitar um imóvel"/>
      <section className="tool-explanation">
        <h2>Não precisa de decidir na primeira visita.</h2>
        <p>
          Uma segunda visita noutro horário pode esclarecer luz, ruído e
          envolvente. Sempre que existam dúvidas sobre estrutura, instalações ou
          viabilidade de obras, peça avaliação a um técnico habilitado.
        </p>
        <p className="tool-disclaimer">
          Esta lista serve para organizar perguntas. Não certifica o estado do
          imóvel nem substitui uma inspeção técnica ou análise documental.
        </p>
        <a className="underlink" href="/ferramentas/documentos">
          Ver também a checklist de documentos ↗
        </a>
      </section>
    </ToolShell>));
}

export async function generateMetadata() { return localizedMetadata(baseMetadata); }
