// CTC to in-hand salary under India's new tax regime, FY 2026-27, for a salaried resident
// individual. Used by the free tool at /tools/ctc-calculator and by the Chapter 3 example.
//
// Rules (checked October 2026):
// - Slabs: 0-4L nil, 4-8L 5%, 8-12L 10%, 12-16L 15%, 16-20L 20%, 20-24L 25%, above 24L 30%.
// - Standard deduction Rs 75,000. Professional tax is not deductible in the new regime.
// - Rebate up to Rs 60,000 when taxable income is at most Rs 12 lakh, with marginal relief
//   above that: tax before cess never exceeds the income above Rs 12 lakh.
// - Health and education cess 4%. Surcharge starts above Rs 50 lakh; this tool stops there.
// - EPF: 12% of basic from employee and employer. The wage ceiling is Rs 25,000 a month from
//   17 September 2026 (it was Rs 15,000), so a capped contribution is at most Rs 3,000 a month.
// - Gratuity, when the employer counts it in CTC, is 4.81% of basic (15/26 of a month's basic a year).

export type PfMode = "capped" | "full" | "none";

export interface CtcInput {
  ctc: number; // fixed annual CTC in rupees
  basicPct: number; // basic salary as % of CTC
  pf: PfMode;
  gratuityInCtc: boolean;
  professionalTax: number; // per year
}

export interface CtcResult {
  basic: number;
  employerPf: number;
  gratuity: number;
  gross: number;
  employeePf: number;
  professionalTax: number;
  taxable: number;
  slabTax: number;
  rebate: number;
  tax: number; // after rebate and marginal relief, before cess
  cess: number;
  totalTax: number;
  inHandYear: number;
  inHandMonth: number;
  tooHigh: boolean; // taxable income above Rs 50 lakh: surcharge applies, not covered
}

export const STANDARD_DEDUCTION = 75_000;
export const PF_WAGE_CEILING = 25_000; // per month
export const SLABS: [number, number][] = [
  [4_00_000, 0], [8_00_000, 0.05], [12_00_000, 0.1], [16_00_000, 0.15], [20_00_000, 0.2], [24_00_000, 0.25], [Infinity, 0.3],
];

export function slabTax(income: number) {
  let tax = 0, lower = 0;
  for (const [upper, rate] of SLABS) {
    if (income > lower) tax += (Math.min(income, upper) - lower) * rate;
    lower = upper;
  }
  return tax;
}

export function incomeTax(taxable: number) {
  const slab = Math.round(slabTax(taxable));
  let tax = slab;
  if (taxable <= 12_00_000) tax = 0;
  else tax = Math.min(slab, Math.round(taxable - 12_00_000)); // marginal relief
  const cess = Math.round(tax * 0.04);
  return { slab, rebate: slab - tax, tax, cess, total: tax + cess };
}

export function ctcToInHand(input: CtcInput): CtcResult {
  const ctc = Math.max(0, input.ctc);
  const basic = Math.round((ctc * Math.min(100, Math.max(0, input.basicPct))) / 100);
  const pfWage = input.pf === "capped" ? Math.min(basic, PF_WAGE_CEILING * 12) : basic;
  const employerPf = input.pf === "none" ? 0 : Math.round(pfWage * 0.12);
  const gratuity = input.gratuityInCtc ? Math.round(basic * 0.0481) : 0;
  const gross = Math.max(0, ctc - employerPf - gratuity);
  const employeePf = employerPf;
  const taxable = Math.max(0, gross - STANDARD_DEDUCTION);
  const t = incomeTax(taxable);
  const professionalTax = Math.max(0, input.professionalTax);
  const inHandYear = gross - employeePf - professionalTax - t.total;
  return {
    basic, employerPf, gratuity, gross, employeePf, professionalTax, taxable,
    slabTax: t.slab, rebate: t.rebate, tax: t.tax, cess: t.cess, totalTax: t.total,
    inHandYear, inHandMonth: Math.round(inHandYear / 12), tooHigh: taxable > 50_00_000,
  };
}

export const CTC_DEFAULTS: CtcInput = { ctc: 12_00_000, basicPct: 50, pf: "capped", gratuityInCtc: true, professionalTax: 2_500 };
