import { useState } from "react";
import { Info } from "lucide-react";
import { ctcToInHand, CTC_DEFAULTS, type CtcInput, type PfMode } from "../../lib/tools/ctc";

const rupees = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

function lakhWords(n: number) {
  if (n >= 1_00_00_000) return `${+(n / 1_00_00_000).toFixed(2)} crore`;
  if (n >= 1_00_000) return `${+(n / 1_00_000).toFixed(2)} lakh`;
  return "";
}

const PRESETS = [6_00_000, 9_00_000, 12_00_000, 18_00_000, 25_00_000];

export function CtcCalculator({ initial = CTC_DEFAULTS }: { initial?: CtcInput }) {
  const [input, setInput] = useState<CtcInput>(initial);
  const r = ctcToInHand(input);
  const set = (patch: Partial<CtcInput>) => setInput((i) => ({ ...i, ...patch }));
  const field = "w-full rounded-lg border border-espresso-900/15 bg-white px-3 py-2 text-espresso-950 focus:border-caramel-500 focus:outline-none";

  return (
    <div className="not-prose grid gap-5 rounded-2xl border border-espresso-900/10 bg-cream p-5 shadow-soft md:grid-cols-[1fr_1.1fr]">
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-espresso-900">Fixed CTC per year</span>
          <input
            inputMode="numeric"
            className={`${field} mt-1 font-display text-xl`}
            value={input.ctc ? input.ctc.toLocaleString("en-IN") : ""}
            onChange={(e) => set({ ctc: Number(e.target.value.replace(/[^0-9]/g, "")) || 0 })}
            aria-describedby="ctc-words"
          />
          <span id="ctc-words" className="mt-1 block text-xs text-espresso-700/60">{lakhWords(input.ctc) || "Enter your yearly CTC in rupees"}</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p}
              onClick={() => set({ ctc: p })}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${input.ctc === p ? "border-espresso-900 bg-espresso-950 text-caramel-100" : "border-espresso-900/15 text-espresso-700 hover:bg-latte/50"}`}
            >
              {p / 1_00_000} LPA
            </button>
          ))}
        </div>
        <label className="block">
          <span className="text-sm font-semibold text-espresso-900">Basic salary: {input.basicPct}% of CTC</span>
          <input type="range" min={30} max={60} step={5} value={input.basicPct} onChange={(e) => set({ basicPct: Number(e.target.value) })} className="mt-2 w-full accent-caramel-600" />
          <span className="block text-xs text-espresso-700/60">Check your offer letter; 40% to 50% is common.</span>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-espresso-900">Provident Fund (PF)</span>
          <select className={`${field} mt-1 text-sm`} value={input.pf} onChange={(e) => set({ pf: e.target.value as PfMode })}>
            <option value="capped">12% of basic, max ₹3,000 a month</option>
            <option value="full">12% of full basic</option>
            <option value="none">No PF</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-espresso-900">
          <input type="checkbox" checked={input.gratuityInCtc} onChange={(e) => set({ gratuityInCtc: e.target.checked })} className="h-4 w-4 accent-caramel-600" />
          My CTC includes gratuity
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-espresso-900">Professional tax per year</span>
          <input inputMode="numeric" className={`${field} mt-1 text-sm`} value={input.professionalTax} onChange={(e) => set({ professionalTax: Number(e.target.value.replace(/[^0-9]/g, "")) || 0 })} />
          <span className="block text-xs text-espresso-700/60">₹2,500 in Maharashtra; ₹0 in states that don't charge it.</span>
        </label>
      </div>

      <div className="flex flex-col">
        {r.tooHigh ? (
          <div className="rounded-xl bg-brick-50 p-4 text-sm text-brick-700">
            Above ₹50 lakh of taxable income a surcharge applies, which this calculator doesn't cover. Ask your CA or payroll team.
          </div>
        ) : (
          <>
            <div className="rounded-xl bg-espresso-950 p-5 text-center text-caramel-100">
              <p className="text-xs font-semibold tracking-wide uppercase opacity-70">In hand, every month</p>
              <p className="font-display text-4xl font-bold" data-testid="in-hand-month">{rupees(r.inHandMonth)}</p>
              <p className="mt-1 text-xs opacity-70">{rupees(r.inHandYear)} a year</p>
            </div>
            <table className="mt-4 w-full text-sm">
              <tbody className="[&_td]:py-1.5 [&_td:last-child]:text-right [&_td:last-child]:tabular-nums [&_tr]:border-b [&_tr]:border-espresso-900/5">
                <tr><td>Fixed CTC</td><td>{rupees(input.ctc)}</td></tr>
                <tr><td className="text-espresso-700/70">Less employer PF</td><td>−{rupees(r.employerPf)}</td></tr>
                <tr><td className="text-espresso-700/70">Less gratuity</td><td>−{rupees(r.gratuity)}</td></tr>
                <tr className="font-semibold"><td>Gross salary</td><td>{rupees(r.gross)}</td></tr>
                <tr><td className="text-espresso-700/70">Less your PF</td><td>−{rupees(r.employeePf)}</td></tr>
                <tr><td className="text-espresso-700/70">Less professional tax</td><td>−{rupees(r.professionalTax)}</td></tr>
                <tr><td className="text-espresso-700/70">Less income tax and cess</td><td>−{rupees(r.totalTax)}</td></tr>
                <tr className="font-semibold"><td>In hand per year</td><td>{rupees(r.inHandYear)}</td></tr>
              </tbody>
            </table>
            <div className="mt-3 rounded-xl bg-latte/50 p-3 text-xs leading-relaxed text-espresso-800">
              <p className="font-semibold">How the tax was worked out</p>
              <p className="mt-1">
                Taxable income {rupees(r.taxable)} (gross minus the ₹75,000 standard deduction). Slab tax {rupees(r.slabTax)}
                {r.rebate > 0 && (r.tax === 0 ? `, fully cancelled by the rebate (taxable income is ₹12 lakh or less)` : `, reduced by ${rupees(r.rebate)} of marginal relief (tax can't exceed your income above ₹12 lakh)`)}
                . Tax {rupees(r.tax)} + 4% cess {rupees(r.cess)} = {rupees(r.totalTax)}.
              </p>
            </div>
          </>
        )}
        <p className="mt-3 flex gap-1.5 text-[11px] leading-snug text-espresso-700/60">
          <Info className="mt-0.5 h-3 w-3 shrink-0" />
          New tax regime, FY 2026-27, resident salaried employee, fixed pay only. Doesn't include variable pay, bonuses,
          employer NPS or other deductions. An estimate to plan with: your payslip and payroll team have the final word.
        </p>
      </div>
    </div>
  );
}
