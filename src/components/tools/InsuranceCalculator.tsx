"use client";
import { useState } from "react";
import { money } from "@/lib/calculators";
import { insuranceBudget, Premium } from "@/lib/insurance";
const labels = ["Seguro de vida — total dos titulares", "Habitação — incêndio ou multirriscos", "Outros seguros / recheio separado"];
export default function InsuranceCalculator() {
  const [amounts, setAmounts] = useState(["", "", ""]);
  const [periods, setPeriods] = useState<Premium["period"][]>(["monthly", "annual", "annual"]);
  const [payment, setPayment] = useState("");
  let result: ReturnType<typeof insuranceBudget> | null = null;
  let error = "";
  try {
    result = insuranceBudget(amounts.map((amount, i) => ({ amount: Number(amount), period: periods[i] })), Number(payment));
  } catch (e) { error = e instanceof Error ? e.message : "Verifique os valores."; }
  const entered = amounts.some((v) => v !== "");
  return <section aria-labelledby="insurance-budget">
    <h2 id="insurance-budget">Quanto pesam os seguros no orçamento?</h2>
    <p>Use os valores de propostas ou apólices que já tem. Não calculamos prémios de mercado nem emitimos cotações. Campos vazios ficam excluídos; zero significa sem custo indicado.</p>
    <div className="calculator-layout">
      <div className="calculator-inputs">
        {labels.map((label, i) => <div className="form-pair" key={label}>
          <label>{label} (€)
            <input type="number" min="0" step="0.01" value={amounts[i]} placeholder="Valor da sua proposta" onChange={(e) => setAmounts((old) => old.map((v, j) => j === i ? e.target.value : v))} />
          </label>
          <label>Periodicidade — {i === 0 ? "vida" : i === 1 ? "habitação" : "outros"}
            <select value={periods[i]} onChange={(e) => setPeriods((old) => old.map((v, j) => j === i ? e.target.value as Premium["period"] : v))}>
              <option value="monthly">Mensal</option><option value="annual">Anual</option>
            </select>
          </label>
        </div>)}
        <p className="local-note">Indique o prémio total a pagar, incluindo taxas e encargos. Se o multirriscos já inclui incêndio ou recheio, não os some novamente. No seguro de vida, some todos os titulares e apólices sem duplicar valores.</p>
        <label>Prestação mensal do crédito, sem seguros (€) — opcional
          <input type="number" min="0" step="0.01" value={payment} placeholder="Só capital e juros" onChange={(e) => setPayment(e.target.value)} />
        </label>
        <p className="local-note">Os valores são calculados no seu navegador e não são enviados. Não introduza dados de saúde ou outros dados pessoais.</p>
      </div>
      <section className="calculator-result" aria-label="Orçamento de seguros" aria-live="polite" aria-atomic="true">
        {error ? <p role="alert">{error}</p> : result && entered ? <>
          <p className="eyebrow">SEGUROS · MÉDIA MENSAL</p>
          <p className="result-total">{money(result.monthly)}</p>
          <dl><div><dt>Total anual dos valores indicados</dt><dd>{money(result.annual)}</dd></div>
            {payment !== "" && <div><dt>Prestação + seguros, em média mensal</dt><dd>{money(result.monthlyWithMortgage)}</dd></div>}
          </dl>
          <p className="result-note">A média mensal distribui o custo anual por 12; não altera as datas de pagamento. Os totais só incluem os valores preenchidos e não incluem comissões bancárias não indicadas. Os prémios podem mudar nas renovações e com a idade ou o capital seguro.</p>
          <a className="underlink" href="/ferramentas/prestacao-credito">Simular a prestação do crédito ↗</a>
        </> : <p>Preencha pelo menos um prémio para obter o total. Se ainda não tem propostas, use o guia abaixo para saber o que pedir e comparar.</p>}
      </section>
    </div>
  </section>;
}
