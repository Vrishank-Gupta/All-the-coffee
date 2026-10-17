import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = ["#e9a24f", "#4f8a5b", "#3f7d74", "#d9872f", "#cf6a3e", "#f2bd7c"];

export function Celebration({ trigger }: { trigger: number }) {
  const [bursts, setBursts] = useState<number[]>([]);

  useEffect(() => {
    if (trigger > 0) setBursts((b) => [...b, trigger]);
  }, [trigger]);

  if (bursts.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-visible">
      <AnimatePresence>
        {bursts.map((id) => (
          <Burst key={id} onDone={() => setBursts((b) => b.filter((x) => x !== id))} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function Burst({ onDone }: { onDone: () => void }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => {
        const angle = (i / 18) * Math.PI * 2 + Math.random() * 0.4;
        const distance = 36 + Math.random() * 60;
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          color: COLORS[i % COLORS.length],
          size: 5 + Math.random() * 6,
        };
      }),
    []
  );

  useEffect(() => {
    const t = window.setTimeout(onDone, 950);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 1, left: "50%", top: "50%", scale: 0 }}
          animate={{ opacity: 0, left: `calc(50% + ${p.x}px)`, top: `calc(50% + ${p.y}px)`, scale: 1 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, background: p.color }}
        />
      ))}
    </>
  );
}
