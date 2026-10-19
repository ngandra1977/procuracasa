/** Taxas de 2026, Portugal continental. Fontes e âmbito nas páginas das ferramentas. */
export const TAX_YEAR = 2026;
export const REVIEWED_DATE = "16 de outubro de 2026";
export type PurchasePurpose = "permanent" | "secondary" | "urban" | "rural";
const bands = [106346, 145470, 198347, 330539];
const marginal = [0, 0.02, 0.05, 0.07, 0.08];
export function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
export function money(value: number) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(value);
}
function finiteNonnegative(value: number) {
  return Number.isFinite(value) && value >= 0;
}
export function imt(value: number, purpose: PurchasePurpose): number {
  if (!finiteNonnegative(value))
    throw new Error("O valor tributável deve ser positivo.");
  if (purpose === "urban") return roundMoney(value * 0.065);
  if (purpose === "rural") return roundMoney(value * 0.05);
  if (purpose !== "permanent" && purpose !== "secondary")
    throw new Error("Finalidade inválida.");
  if (value > 1150853) return roundMoney(value * 0.075);
  if (value > (purpose === "permanent" ? 660982 : 633931))
    return roundMoney(value * 0.06);
  let previous = 0,
    tax = 0;
  for (let i = 0; i < marginal.length; i++) {
    const ceiling = bands[i] ?? Infinity;
    const rate = i === 0 && purpose === "secondary" ? 0.01 : marginal[i];
    tax += Math.max(0, Math.min(value, ceiling) - previous) * rate;
    previous = ceiling;
    if (value <= ceiling) break;
  }
  return roundMoney(tax);
}
export type PurchaseInput = {
  price: number;
  vpt: number;
  loan: number;
  years: number;
  purpose: PurchasePurpose;
  registration: number;
  otherCosts: number;
};
export function purchaseCosts(input: PurchaseInput) {
  const { price, vpt, loan, years, purpose, registration, otherCosts } = input;
  if (
    ![price, vpt, loan, registration, otherCosts].every(finiteNonnegative) ||
    price <= 0 ||
    loan > price ||
    !Number.isInteger(years) ||
    years < 1 ||
    years > 40
  )
    throw new Error(
      "Verifique os valores. O crédito não pode exceder o preço e o prazo deve ser de 1 a 40 anos.",
    );
  const taxable = Math.max(price, vpt);
  const imtTax = imt(taxable, purpose);
  const purchaseStamp = roundMoney(taxable * 0.008);
  const creditStamp = roundMoney(loan * (years >= 5 ? 0.006 : 0.005));
  const downPayment = roundMoney(price - loan);
  const expenses = roundMoney(
    imtTax + purchaseStamp + creditStamp + registration + otherCosts,
  );
  return {
    taxable,
    imt: imtTax,
    purchaseStamp,
    creditStamp,
    downPayment,
    expenses,
    cashNeeded: roundMoney(downPayment + expenses),
    transactionTotal: roundMoney(price + expenses),
  };
}
export function monthlyPayment(
  principal: number,
  annualRate: number,
  years: number,
) {
  if (
    !finiteNonnegative(principal) ||
    !finiteNonnegative(annualRate) ||
    annualRate > 100 ||
    !Number.isInteger(years) ||
    years < 1 ||
    years > 40
  )
    throw new Error(
      "Verifique o capital, a TAN (0 a 100%) e o prazo (1 a 40 anos).",
    );
  const months = years * 12,
    monthly = annualRate / 1200;
  return monthly === 0
    ? principal / months
    : (principal * monthly) / -Math.expm1(-months * Math.log1p(monthly));
}
export function mortgage(
  principal: number,
  annualRate: number,
  years: number,
  monthlyExtras: number,
  income: number,
  otherLoans: number,
) {
  if (![monthlyExtras, income, otherLoans].every(finiteNonnegative))
    throw new Error("Os encargos e o rendimento não podem ser negativos.");
  const payment = monthlyPayment(principal, annualRate, years);
  const stressedPayment = monthlyPayment(principal, annualRate + 2, years);
  const totalPayments = payment * years * 12;
  return {
    payment,
    monthlyTotal: payment + monthlyExtras,
    interest: totalPayments - principal,
    totalPayments,
    stressedPayment,
    stressedTotal: stressedPayment + monthlyExtras,
    effort:
      income > 0
        ? ((payment + monthlyExtras + otherLoans) / income) * 100
        : null,
  };
}

export function monthlyIncome(value: number, period: "monthly" | "annual", payments = 12) {
  if (!finiteNonnegative(value) || ![12, 14].includes(payments) || !["monthly", "annual"].includes(period))
    throw new Error("Verifique o rendimento líquido e a periodicidade.");
  return period === "annual" ? value / 12 : value * payments / 12;
}
export function effortLevel(effort: number) {
  if (!finiteNonnegative(effort)) throw new Error("Esforço inválido.");
  return effort <= 30 ? "Menor peso no orçamento" : effort <= 35 ? "Atenção à margem disponível" : "Peso elevado no orçamento";
}

/** Comparação indicativa com o limite de idade escolhido, não decisão bancária. */
export function ageAtLoanEnd(age: number, years: number, finalAgeLimit: number) {
  if (!Number.isInteger(age) || age < 18 || age > 100 ||
      !Number.isInteger(finalAgeLimit) || finalAgeLimit < 18 || finalAgeLimit > 100 ||
      !Number.isInteger(years) || years < 1 || years > 40)
    throw new Error("Indique idades inteiras entre 18 e 100 anos e um prazo de 1 a 40 anos.");
  return {
    finalAge: age + years,
    exceeds: age + years > finalAgeLimit,
    yearsWithinAgeLimit: Math.max(0, Math.min(40, finalAgeLimit - age)),
  };
}
