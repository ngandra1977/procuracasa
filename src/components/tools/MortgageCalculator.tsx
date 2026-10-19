"use client";
import { useState } from "react";
import { money, mortgage, monthlyIncome, effortLevel } from "@/lib/calculators";
export default function MortgageCalculator() {
  const [principal, setPrincipal] = useState("200000"),
    [rate, setRate] = useState("3.5"),
    [rateType, setRateType] = useState("fixed"),
    [euribor, setEuribor] = useState(""),
    [spread, setSpread] = useState(""),
    [period, setPeriod] = useState<"monthly" | "annual">("monthly"),
    [payments, setPayments] = useState("12"),
    [years, setYears] = useState("30"),
    [extras, setExtras] = useState("0"),
    [income, setIncome] = useState(""),
    [debts, setDebts] = useState("0");
  const tan = rateType === "fixed" ? Number(rate) : Number(euribor) + Number(spread);
  let normalizedIncome = 0;
  let result: ReturnType<typeof mortgage> | null = null,
    error = "";
  try {
    if (!principal || !years || Number(principal) <= 0 || (rateType === "fixed" ? rate === "" : euribor === "" || spread === ""))
      throw new Error("Preencha um capital positivo, a TAN e o prazo.");
    normalizedIncome = monthlyIncome(Number(income), period, Number(payments));
    if (rateType !== "fixed" && (!Number.isFinite(Number(euribor)) || Number(euribor) < -10 || Number(spread) < 0)) throw new Error("Verifique a Euribor e o spread.");
    result = mortgage(
      Number(principal),
      tan,
      Number(years),
      Number(extras),
      normalizedIncome,
      Number(debts),
    );
  } catch (e) {
    error = e instanceof Error ? e.message : "Verifique os valores.";
  }
  return (
    <>
      <div className="tool-scope">
        <strong>Uma hipótese de financiamento, sem compromisso.</strong>
        <p>
          Prestações mensais constantes de capital e juros, com TAN constante
          durante todo o prazo. Na taxa variável, mantém-se a TAN indicada apenas para esta simulação, sem prever futuras revisões. A taxa fixa inicial é um exemplo editável, não uma
          oferta ou taxa de mercado. Não simula taxa mista, carência ou
          diferimento.
        </p>
      </div>
      <div className="calculator-layout">
        <div className="calculator-inputs">
          <label>
            Montante do empréstimo (€)
            <input
              type="number"
              min="1"
              step="1000"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
            />
          </label>
          <label>Tipo de taxa
            <select value={rateType} onChange={(e) => setRateType(e.target.value)}>
              <option value="fixed">Taxa fixa — TAN da proposta</option>
              <option value="3">Taxa variável — Euribor a 3 meses</option>
              <option value="6">Taxa variável — Euribor a 6 meses</option>
              <option value="12">Taxa variável — Euribor a 12 meses</option>
            </select>
          </label>
          {rateType !== "fixed" && <>
            <div className="form-pair">
              <label>Euribor a {rateType} meses (%)<input type="number" min="-10" max="98" step="0.001" value={euribor} onChange={(e) => setEuribor(e.target.value)} /></label>
              <label>Spread (%)<input type="number" min="0" max="50" step="0.01" value={spread} onChange={(e) => setSpread(e.target.value)} /></label>
            </div>
            <p className="local-note">Introduza a média mensal aplicável ao contrato, normalmente do mês anterior. Atualização manual: não são cotações em tempo real. Consulte a proposta e o <a href="https://clientebancario.bportugal.pt/pt-pt/taxas-de-juro-no-credito-habitacao" target="_blank" rel="noreferrer">Banco de Portugal</a>. TAN calculada: {Number.isFinite(tan) ? tan.toFixed(3).replace(".", ",") : "—"}%.</p>
          </>}
          <div className="form-pair">
            <label>
              {rateType === "fixed" ? "TAN fixa anual (%)" : "TAN calculada anual (%)"}
              <input
                type="number"
                min="0"
                max="98"
                step="0.1"
                value={rateType === "fixed" ? rate : String(tan)}
                disabled={rateType !== "fixed"}
                onChange={(e) => setRate(e.target.value)}
              />
              <small>
                Use a TAN da proposta. Numa taxa variável, inclui indexante e
                spread.
              </small>
            </label>
            <label>
              Prazo (anos)
              <input
                type="number"
                min="1"
                max="40"
                step="1"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </label>
          </div>
          <label>
            Seguros e outros encargos mensais (€)
            <input
              type="number"
              min="0"
              step="1"
              value={extras}
              onChange={(e) => setExtras(e.target.value)}
            />
            <small>
              Acrescente os custos que conhece. Se ficar em zero, não entram na
              estimativa.
            </small>
          </label>
          <div className="form-pair">
            <label>Como pretende indicar o rendimento?
              <select value={period} onChange={(e) => setPeriod(e.target.value as "monthly" | "annual")}><option value="monthly">Mensal líquido</option><option value="annual">Anual líquido</option></select>
            </label>
            {period === "monthly" && <label>Pagamentos por ano
              <select value={payments} onChange={(e) => setPayments(e.target.value)}><option value="12">12 — inclui duodécimos ou média mensal</option><option value="14">14 — subsídios recebidos à parte</option></select>
              <small>Com 14 pagamentos, indique o valor mensal sem subsídios. Se os valores variarem, prefira o total anual.</small>
            </label>}
          </div>
          <div className="form-pair">
            <label>
              Rendimento líquido {period === "annual" ? "anual" : "mensal"} (€) <small>Opcional, total do agregado após impostos e Segurança Social. No anual, inclua subsídios.</small>
              <input
                type="number"
                min="0"
                step="1"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="Para estimar o esforço"
              />
            </label>
            <label>
              Outras prestações mensais (€)
              <input
                type="number"
                min="0"
                step="1"
                value={debts}
                onChange={(e) => setDebts(e.target.value)}
              />
            </label>
          </div>
          <p className="local-note">
            Os valores são calculados no seu navegador e não são enviados pelo
            simulador.
          </p>
        </div>
        <section
          className="calculator-result"
          aria-label="Resultado da prestação"
          aria-live="polite"
          aria-atomic="true"
        >
          {result ? (
            <>
              <p className="eyebrow">PRESTAÇÃO MENSAL · CAPITAL + JUROS</p>
              <p className="result-total">{money(result.payment)}</p>
              <dl>
                <div>
                  <dt>Com os encargos mensais indicados</dt>
                  <dd>{money(result.monthlyTotal)}</dd>
                </div>
                <div>
                  <dt>Juros estimados no prazo completo</dt>
                  <dd>{money(result.interest)}</dd>
                </div>
                <div>
                  <dt>Total de capital + juros</dt>
                  <dd>{money(result.totalPayments)}</dd>
                </div>
                {result.effort !== null && (
                  <div>
                    <dt>
                      Peso mensal no orçamento, incluindo seguros e outros créditos
                    </dt>
                    <dd>{result.effort.toFixed(1).replace(".", ",")}%</dd>
                  </div>
                )}
              </dl>
              {result.effort !== null && <div className="stress-result">
                <p className="eyebrow">ORIENTAÇÃO PARA O SEU ORÇAMENTO</p>
                <strong>{effortLevel(result.effort)}</strong>
                <p>Rendimento mensal médio: {money(normalizedIncome)}. {period === "annual" ? "Total anual dividido por 12." : `${payments} pagamentos distribuídos por 12 meses.`}</p>
                <p>Até 30%: menor peso · acima de 30% até 35%: atenção à margem · acima de 35%: peso elevado.</p>
                <p>{result.effort <= 35 ? "Dentro da referência de orientação de 35%." : "Acima da referência de orientação de 35%."} Estes níveis são orientativos, não são limites oficiais nem uma aprovação de crédito.</p>
                <p>Prestações de créditos / rendimento, sem seguros: {((result.payment + Number(debts)) / normalizedIncome * 100).toFixed(1).replace(".", ",")}%. O DSTI bancário considera também ajustamentos aos juros e rendimentos. Confirme os limites aplicáveis e eventuais exceções com o banco.</p>
              </div>}
              <div
                className="loan-bar"
                role="img"
                aria-label={`Capital: ${money(Number(principal))}; juros: ${money(result.interest)}`}
              >
                <span
                  style={{
                    width: `${(Number(principal) / result.totalPayments) * 100}%`,
                  }}
                />
              </div>
              <p className="bar-key">
                <span>Capital</span>
                <span>Juros</span>
              </p>
              <div className="stress-result">
                <p className="eyebrow">
                  CENÁRIO ALTERNATIVO: TAN + 2 PONTOS
                </p>
                <strong>{money(result.stressedPayment)} / mês</strong>
                <p>
                  Não prevê uma alteração da taxa fixa contratada. Mais {money(result.stressedPayment - result.payment)} de
                  capital e juros, aplicando essa taxa ao mesmo capital e prazo
                  desde o início.
                </p>
              </div>
              <p className="result-note">
                Cenário ilustrativo de sensibilidade, não é o teste de esforço
                regulamentar do banco. O total apresentado não é o MTIC e não
                permite calcular a TAEG.
              </p>
            </>
          ) : (
            <p role="alert">{error}</p>
          )}
        </section>
      </div>
      <section className="tool-explanation">
        <h2>Uma prestação é só parte do orçamento.</h2>
        <p>
          Compare propostas pela FINE, pela TAEG, pelo MTIC e pelas condições
          dos produtos associados. Seguros, comissões e impostos podem alterar o
          custo. Num empréstimo de taxa variável, a prestação efetiva pode mudar
          nas revisões.
        </p>
        <p>
          A taxa de esforço aqui apresentada é apenas a relação simples entre os
          encargos indicados e o rendimento mensal. Não equivale ao DSTI usado
          pelo banco. O prazo e o montante financiável dependem da idade,
          avaliação do imóvel, rendimentos e análise de solvabilidade. Não é uma
          decisão de concessão de crédito.
        </p>
        <a href="/ferramentas/custos-compra" className="underlink">
          Estimar a entrada e os custos iniciais ↗
        </a>
      </section>
    </>
  );
}
