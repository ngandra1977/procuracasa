"use client";
import { useLocalize } from "@/lib/i18n/client";
import { useState } from "react";
import { money, purchaseCosts, PurchasePurpose, TAX_YEAR, } from "@/lib/calculators";
export default function PurchaseCalculator() {
    const localize = useLocalize();
    const [price, setPrice] = useState("250000"), [vpt, setVpt] = useState("0"), [financed, setFinanced] = useState(true), [entry, setEntry] = useState("25000"), [years, setYears] = useState("30"), [purpose, setPurpose] = useState<PurchasePurpose>("permanent"), [registration, setRegistration] = useState(""), [other, setOther] = useState("0");
    const loan = financed ? Number(price) - Number(entry) : 0;
    const registrationValue = registration === "" ? (Number(loan) > 0 ? 700 : 375) : Number(registration);
    let result: ReturnType<typeof purchaseCosts> | null = null, error = "";
    try {
        if (!price || (financed && (!years || entry === "")))
            throw new Error("Preencha o preço, a entrada e o prazo.");
        result = purchaseCosts({
            price: Number(price),
            vpt: Number(vpt),
            loan: Number(loan),
            years: financed ? Number(years) : 30,
            purpose,
            registration: registrationValue,
            otherCosts: Number(other),
        });
    }
    catch (e) {
        error = e instanceof Error ? e.message : "Verifique os valores.";
    }
    return localize((<>
      <div className="tool-scope">
        <strong>Portugal continental · taxas de {TAX_YEAR}</strong>
        <p>
          Estimativa para pessoas singulares residentes fiscais em Portugal, na
          compra integral do imóvel. Não aplica IMT Jovem, outras isenções,
          permutas, aquisições parciais ou regimes de não residentes. Açores e
          Madeira têm tabelas próprias.
        </p>
      </div>
      <div className="calculator-layout">
        <div className="calculator-inputs">
          <label>Preço de compra (€)
            <input type="number" min="1" step="1000" value={price} onChange={(e) => setPrice(e.target.value)}/>
          </label>
          <label>
            Finalidade / natureza do imóvel
            <select value={purpose} onChange={(e) => setPurpose(e.target.value as PurchasePurpose)}>
              <option value="permanent">Habitação própria e permanente</option>
              <option value="secondary">
                Segunda habitação / habitação para arrendar
              </option>
              <option value="urban">
                Terreno urbano, loja ou outro prédio urbano
              </option>
              <option value="rural">Prédio rústico</option>
            </select>
          </label>
          <label>Vai recorrer a crédito?
            <select value={financed ? "yes" : "no"} onChange={(e) => setFinanced(e.target.value === "yes")}>
              <option value="yes">Sim</option><option value="no">Não, compra sem financiamento</option>
            </select>
          </label>
          {financed && <div className="form-pair">
            <label>Entrada para a casa (€)
              <input type="number" min="0" max={price} step="1000" value={entry} onChange={(e) => setEntry(e.target.value)}/>
              <small>Parte do preço paga com dinheiro seu, sem impostos ou despesas. Crédito calculado: {money(Math.max(0, loan))}. Não representa aprovação bancária.</small>
            </label>
            <label>Prazo do crédito (anos)
              <input type="number" min="1" max="40" step="1" value={years} onChange={(e) => setYears(e.target.value)}/>
            </label>
          </div>}
          <details><summary>Mais opções: VPT e despesas adicionais</summary>
          <label>Valor Patrimonial Tributário — VPT (€)
            <input type="number" min="0" step="1000" value={vpt} onChange={(e) => setVpt(e.target.value)}/>
            <small>Da caderneta predial. Os impostos usam o maior entre preço e VPT. Deixe zero se não for superior ao preço.</small>
          </label>
          <div className="form-pair">
            <label>
              Formalização e registos (€)
              <input type="number" min="0" step="1" placeholder={String(Number(loan) > 0 ? 700 : 375)} value={registration} onChange={(e) => setRegistration(e.target.value)}/>
              <small>
                Referência Casa Pronta para um prédio: 375 € com um ato, 700 €
                com vários atos. Pode alterar.
              </small>
            </label>
            <label>
              Outros custos iniciais (€)
              <input type="number" min="0" step="1" value={other} onChange={(e) => setOther(e.target.value)}/>
              <small>
                Inclua avaliação, comissões, honorários ou seguros iniciais que
                já conheça.
              </small>
            </label>
          </div>
          </details>
        </div>
        <section className="calculator-result" aria-label="Resultado da estimativa" aria-live="polite" aria-atomic="true">
          {result ? (<>
              <p className="eyebrow">DINHEIRO NECESSÁRIO PARA COMPRAR</p>
              <p className="result-total">{money(result.cashNeeded)}</p>
              <p>Entrada + impostos + despesas indicadas.</p>
              <dl>
                <div>
                  <dt>Parte do preço paga por si</dt>
                  <dd>{money(result.downPayment)}</dd>
                </div>
                <div>
                  <dt>IMT estimado</dt>
                  <dd>{money(result.imt)}</dd>
                </div>
                <div>
                  <dt>Selo sobre a aquisição · 0,8%</dt>
                  <dd>{money(result.purchaseStamp)}</dd>
                </div>
                {loan > 0 && <div>
                  <dt>
                    Selo sobre o crédito ·{" "}
                    {Number(years) >= 5 ? "0,6%" : "0,5%"}
                  </dt>
                  <dd>{money(result.creditStamp)}</dd>
                </div>}
                <div>
                  <dt>Formalização e registos</dt>
                  <dd>{money(registrationValue)}</dd>
                </div>
                <div>
                  <dt>Outros custos indicados</dt>
                  <dd>{money(Number(other))}</dd>
                </div>
                <div className="result-subtotal">
                  <dt>Total de impostos e despesas</dt>
                  <dd>{money(result.expenses)}</dd>
                </div>
                <div>
                  <dt>Preço + despesas, sem juros futuros</dt>
                  <dd>{money(result.transactionTotal)}</dd>
                </div>
              </dl>
              <p className="result-note">
                Base tributável: {money(result.taxable)}. O crédito indicado é
                uma hipótese sua, não uma aprovação bancária. O sinal pago no
                CPCV integra o preço: não é somado outra vez.
              </p>
            </>) : (<p role="alert">{error}</p>)}
        </section>
      </div>
      <section className="tool-explanation">
        <h2>O preço da casa não é a conta toda.</h2>
        <p>
          A entrada é a parte do preço não coberta pelo crédito. A esse valor
          somam-se os impostos e os custos de formalização. As despesas que não
          preencher não estão incluídas no total: confirme-as com o banco e com
          quem formaliza a compra.
        </p>
        <p>
          O IMT é calculado por escalões ou por taxa única, conforme o valor e a
          finalidade. O Imposto do Selo sobre a aquisição é distinto do selo
          sobre o crédito. A simulação não inclui IMI anual, obras, mudança,
          juros futuros ou custos mensais de seguros e condomínio.
        </p>
        <details>
          <summary>
            Tenho até 35 anos. Esta estimativa inclui IMT Jovem?
          </summary>
          <p>
            Não. O regime depende da situação de cada comprador e das condições
            da aquisição. Esta ferramenta apresenta o regime geral, que pode
            sobrestimar os impostos se tiver direito a um benefício. Consulte a{" "}
            <a href="https://info.portaldasfinancas.gov.pt/pt/apoio_contribuinte/IMT_Jovem/Pages/default.aspx/" target="_blank" rel="noreferrer">
              informação oficial sobre IMT Jovem
            </a>{" "}
            antes de tomar uma decisão.
          </p>
        </details>
        <p className="tool-disclaimer">
          Simulação indicativa, não é uma liquidação fiscal. Confirme a situação
          concreta com a Autoridade Tributária e os profissionais que acompanham
          o negócio.
        </p>
        <a className="underlink" href="/ferramentas/prestacao-credito">
          Agora, simule a prestação mensal ↗
        </a>
      </section>
    </>));
}
