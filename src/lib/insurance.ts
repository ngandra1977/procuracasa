export type Premium = { amount: number; period: "monthly" | "annual" };
export function insuranceBudget(premiums: Premium[], mortgagePayment: number) {
  if (!Number.isFinite(mortgagePayment) || mortgagePayment < 0)
    throw new Error("A prestação não pode ser negativa.");
  const annual = premiums.reduce((sum, p) => {
    if (!Number.isFinite(p.amount) || p.amount < 0 || !["monthly", "annual"].includes(p.period))
      throw new Error("Indique prémios positivos ou zero e uma periodicidade válida.");
    return sum + p.amount * (p.period === "monthly" ? 12 : 1);
  }, 0);
  return { annual, monthly: annual / 12, monthlyWithMortgage: mortgagePayment + annual / 12 };
}
