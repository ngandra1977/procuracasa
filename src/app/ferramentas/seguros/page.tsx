import type { Metadata } from "next";
import ToolShell from "@/components/tools/ToolShell";
import InsuranceCalculator from "@/components/tools/InsuranceCalculator";
export const metadata: Metadata = {
  title: "Seguros na compra de casa: obrigações e custos | Procuracasa",
  description: "Saiba distinguir seguro de incêndio, multirriscos e vida no crédito à habitação. Calcule o custo mensal e anual com os valores das suas propostas.",
  alternates: { canonical: "https://www.procuracasa.pt/ferramentas/seguros" },
  openGraph: { title: "Seguros na compra de casa | Procuracasa", description: "Obrigações, coberturas e calculadora de custos de seguros.", url: "https://www.procuracasa.pt/ferramentas/seguros", locale: "pt_PT", type: "website" },
};
export default function Page() {
  return <ToolShell eyebrow="GUIA E CALCULADORA · SEGUROS" title="Seguros da casa, com mais clareza."
    intro="Perceba o que é obrigatório por lei, o que pode ser exigido pelo banco e como organizar os custos das suas propostas."
    reviewedDate="19 de outubro de 2026"
    sources={[
      { title: "ASF — seguro de habitação", href: "https://www.consumidor.asf.com.pt/pt/seguros/seguro-de-habita%C3%A7%C3%A3o" },
      { title: "Banco de Portugal — garantias e seguro de vida", href: "https://clientebancario.bportugal.pt/pt-pt/garantias" },
      { title: "Banco de Portugal — escolha do seguro de vida", href: "https://clientebancario.bportugal.pt/pt-pt/noticias/entrada-em-vigor-do-decreto-lei-no-2222009-de-11-de-setembro" },
    ]}>
    <div className="tool-scope"><strong>Informação geral, sem cotação ou contratação de seguros.</strong><p>Este guia não compara seguradoras nem recomenda uma apólice. As condições e os preços dependem da proposta, das coberturas e da avaliação do risco. Não existe aqui um preço universal para o seu caso.</p></div>
    <section className="tool-explanation">
      <h2>Que seguros são necessários?</h2>
      <h3>Incêndio: obrigação na propriedade horizontal</h3>
      <p>O seguro de incêndio é obrigatório para edifícios em regime de propriedade horizontal, abrangendo as frações autónomas e as partes comuns. A cobertura pode existir numa apólice de incêndio ou estar incluída no multirriscos. Confirme com o condomínio o que está seguro e evite lacunas ou duplicações.</p>
      <h3>Multirriscos: coberturas para além do incêndio</h3>
      <p>Não é uma obrigação legal universal. Pode ser uma condição do financiamento e incluir, conforme o contrato, danos por água, tempestades, riscos elétricos, furto ou responsabilidade civil. Edifício e recheio são proteções diferentes: confirme se os móveis e equipamentos estão incluídos.</p>
      <h3>Vida: pode ser exigido no crédito à habitação</h3>
      <p>Não é obrigatório por lei em todas as compras de casa. O banco pode exigi-lo como garantia do empréstimo. Verifique se cobre apenas morte ou também invalidez e quais as definições, percentagens, exclusões e idades-limite. As siglas IAD e ITP não substituem a leitura das condições da apólice.</p>
      <p>Pode escolher uma seguradora diferente da proposta pelo banco, desde que cumpra os requisitos de garantia exigidos. Antes de decidir, confirme por escrito a aceitação e os efeitos no spread e no custo total do crédito.</p>
    </section>
    <InsuranceCalculator />
    <section className="tool-explanation">
      <h2>Porque varia tanto o preço?</h2>
      <p>No seguro de vida, pesam a idade, o capital em dívida, o número de pessoas, as coberturas e a avaliação de saúde e risco. No seguro da habitação, contam o capital de reconstrução, a localização, as características do edifício, as coberturas e as franquias.</p>
      <p>O capital do edifício deve refletir o custo de reconstrução, não o preço de compra com o terreno nem a valorização comercial da localização. Para o recheio, avalie o custo de substituição dos bens e os limites para objetos de valor.</p>
      <h2>O que comparar antes de escolher?</h2>
      <ul>
        <li>Prémio total anual, encargos de fracionamento e evolução previsível, não apenas o primeiro mês promocional.</li>
        <li>Capital seguro por pessoa e cobertura; no crédito, confirme a atualização com o montante em dívida.</li>
        <li>Exclusões, carências, franquias, limites de indemnização e idades de cessação.</li>
        <li>Nas propostas de vida, compare a mesma proteção de morte e invalidez e as condições concretas.</li>
        <li>No multirriscos, confirme edifício, partes comuns e recheio, sem presumir que todas as coberturas estão incluídas.</li>
        <li>Impacto de contratar fora do banco: compare seguros e crédito em conjunto, incluindo eventuais alterações de spread.</li>
      </ul>
      <details><summary>Posso usar esta calculadora sem crédito à habitação?</summary><p>Sim. Deixe a prestação vazia e preencha apenas os seguros que pretende contabilizar. A obrigação de incêndio na propriedade horizontal não depende de existir financiamento.</p></details>
      <details><summary>O valor apresentado é uma proposta de seguro?</summary><p>Não. A ferramenta apenas soma e converte os valores introduzidos. Para obter um preço, peça uma proposta a uma seguradora ou distribuidor autorizado e confirme as condições.</p></details>
      <a className="underlink" href="/ferramentas/custos-compra">Organizar também os custos iniciais da compra ↗</a>
    </section>
  </ToolShell>;
}
