import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const RATES: Record<string, { symbol: string; rate: number }> = {
  INR: { symbol: "₹", rate: 1 },
  USD: { symbol: "$", rate: 1 / 83 },
  EUR: { symbol: "€", rate: 1 / 90 },
};

export interface CalcFeatures {
  currency?: boolean;
  perMinute?: boolean;
  taxiMeter?: boolean;
  projection?: boolean;
}

export function MeetingCostCalculator({
  heading = "Meeting Cost Calculator",
  resultColor = "espresso",
  features = {},
  defaultPeople = 8,
  defaultSalary = 1200000,
  defaultMinutes = 60,
}: {
  heading?: string;
  resultColor?: "espresso" | "sage";
  features?: CalcFeatures;
  defaultPeople?: number;
  defaultSalary?: number;
  defaultMinutes?: number;
}) {
  const [people, setPeople] = useState(defaultPeople);
  const [salary, setSalary] = useState(defaultSalary);
  const [minutes, setMinutes] = useState(defaultMinutes);
  const [currency, setCurrency] = useState("INR");
  const [running, setRunning] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      timerRef.current = window.setInterval(() => setElapsedSec((s) => s + 1), 1000);
    } else if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [running]);

  const effectiveMinutes = features.taxiMeter ? elapsedSec / 60 : minutes;
  const ratePerHour = (salary / 2000) * people;
  const totalINR = ratePerHour * (effectiveMinutes / 60);
  const perMinuteINR = ratePerHour / 60;

  const { symbol, rate } = RATES[currency];
  const fmt = (n: number) =>
    symbol + (n * rate).toLocaleString("en-IN", { maximumFractionDigits: n * rate < 100 ? 2 : 0 });

  const resultTone = resultColor === "sage" ? "text-sage-600" : "text-espresso-950";

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-3.5">
        <Field label="Number of people">
          <input
            type="number"
            min={1}
            max={100}
            value={people}
            onChange={(e) => setPeople(Math.min(100, Math.max(1, Number(e.target.value) || 0)))}
            className="w-full rounded-lg border border-espresso-900/15 bg-white px-3 py-2 text-sm font-medium text-espresso-950 focus:border-caramel-500"
          />
        </Field>
        <Field label="Average yearly salary (₹)">
          <input
            type="number"
            min={0}
            max={5000000}
            step={10000}
            value={salary}
            onChange={(e) => setSalary(Math.min(5000000, Math.max(0, Number(e.target.value) || 0)))}
            className="w-full rounded-lg border border-espresso-900/15 bg-white px-3 py-2 text-sm font-medium text-espresso-950 focus:border-caramel-500"
          />
        </Field>

        {features.taxiMeter ? (
          <Field label="Meeting length">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRunning((r) => !r)}
                className="flex items-center gap-1.5 rounded-lg bg-espresso-950 px-3 py-2 text-xs font-semibold text-caramel-100 transition hover:bg-espresso-800"
              >
                {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {running ? "Pause" : "Start meeting"}
              </button>
              <button
                onClick={() => {
                  setRunning(false);
                  setElapsedSec(0);
                }}
                className="rounded-lg border border-espresso-900/15 p-2 text-espresso-700 transition hover:bg-latte/50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <span className="font-mono text-sm text-espresso-700/80">
                {String(Math.floor(elapsedSec / 60)).padStart(2, "0")}:{String(elapsedSec % 60).padStart(2, "0")}
              </span>
            </div>
          </Field>
        ) : (
          <Field label="Meeting length (minutes)">
            <input
              type="number"
              min={1}
              max={240}
              value={minutes}
              onChange={(e) => setMinutes(Math.min(240, Math.max(1, Number(e.target.value) || 0)))}
              className="w-full rounded-lg border border-espresso-900/15 bg-white px-3 py-2 text-sm font-medium text-espresso-950 focus:border-caramel-500"
            />
          </Field>
        )}

        {features.currency && (
          <Field label="Currency">
            <div className="flex gap-1.5">
              {Object.keys(RATES).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    currency === c ? "bg-caramel-500 text-espresso-950" : "bg-latte/60 text-espresso-700 hover:bg-latte"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Field>
        )}
      </div>

      <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-latte/60 to-caramel-100/40 p-5 text-center">
        <p className="font-display text-sm font-medium text-espresso-700/80">{heading}</p>
        <p className={`mt-2 font-display font-bold tabular-nums break-all ${fmt(totalINR).length > 10 ? "text-2xl" : "text-4xl"} ${resultTone}`}>
          {fmt(totalINR)}
        </p>
        <p className="mt-1 text-xs text-espresso-700/60">this meeting cost</p>
        {features.perMinute && (
          <p className="mt-3 border-t border-espresso-900/10 pt-3 text-sm font-medium text-espresso-700/80">
            {fmt(perMinuteINR)} <span className="font-normal text-espresso-700/60">per minute</span>
          </p>
        )}
        {features.projection && totalINR > 0 && (
          <p className="mt-3 border-t border-espresso-900/10 pt-3 text-sm font-medium text-espresso-700/80">
            If this happens every week: <span className="font-bold text-espresso-950">{fmt(totalINR * 52)}</span>
            <span className="font-normal text-espresso-700/60"> a year</span>
          </p>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-espresso-700/70">{label}</span>
      {children}
    </label>
  );
}
