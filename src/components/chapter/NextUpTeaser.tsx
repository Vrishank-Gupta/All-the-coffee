import { motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";

export function NextUpTeaser({
  label,
  hook,
  locked = false,
}: {
  label: string;
  hook: string;
  locked?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className={`not-prose my-8 flex items-center gap-4 rounded-2xl border p-5 ${
        locked
          ? "border-espresso-900/10 bg-cream/60"
          : "border-caramel-300/60 bg-gradient-to-r from-caramel-100/60 to-cream"
      }`}
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${locked ? "bg-espresso-900/10" : "bg-espresso-950"}`}>
        {locked ? (
          <Lock className="h-4 w-4 text-espresso-600" />
        ) : (
          <ArrowRight className="h-4.5 w-4.5 text-caramel-300" />
        )}
      </div>
      <div>
        <p className={`text-xs font-bold tracking-wide uppercase ${locked ? "text-espresso-600" : "text-caramel-700"}`}>
          {locked ? "Coming later: " : "Coming up next: "}
          {label}
        </p>
        <p className="mt-0.5 font-display text-base font-semibold text-espresso-950">{hook}</p>
      </div>
    </motion.div>
  );
}
