"use client";
import { useState } from "react";
import { money, mortgage } from "@/lib/calculators";
export default function MortgageCalculator() {
  const [principal, setPrincipal] = useState("200000"),
    [rate, setRate] = useState("3.5"),
    [years, setYears] = useState("30"),
    [extras, setExtras] = useState("0"),
    [income, setIncome] = useState(""),
    [debts, setDebts] = useState("0");
  let result: ReturnType<typeof mortgage> | null = null,
    error = "";
  try {
    if (!principal || !rate || !years || Number(principal) <= 0)
      throw new Error("Preencha um capital positivo, a TAN e o prazo.");
    result = mortgage(
      Number(principal),
      Number(rate),
      Number(years),
      Number(extras),
      Number(income),
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
          durante todo o prazo. A taxa inicial é um exemplo editável, não uma
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
          <div className="form-pair">
            <label>
              TAN anual (%)
              <input
                type="number"
                min="0"
                max="98"
                step="0.1"
                value={rate}
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
            <label>
              Rendimento líquido mensal (€) <small>Opcional, do agregado</small>
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
                      Esforço mensal simples, com encargos e outros créditos
                    </dt>
                    <dd>{result.effort.toFixed(1).replace(".", ",")}%</dd>
                  </div>
                )}
              </dl>
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
                  E SE A TAN SUBISSE 2 PONTOS PERCENTUAIS?
                </p>
                <strong>{money(result.stressedPayment)} / mês</strong>
                <p>
                  Mais {money(result.stressedPayment - result.payment)} de
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
