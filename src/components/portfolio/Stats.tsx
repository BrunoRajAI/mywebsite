"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { resumeData } from "@/lib/resume-data";

function AnimatedStat({ value, label, delay, color = "#4F8FFF" }: { value: string; label: string; delay: number; color?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(value.startsWith("Top") ? "—" : "0");
  useEffect(() => {
    if (!isInView) return;
    if (value.startsWith("Top")) { setTimeout(() => setDisplay(value), delay * 1000 + 400); return; }
    const num = parseFloat(value); if (isNaN(num)) return;
    const suffix = value.replace(/[\d.]/g, "");
    const start = performance.now() + delay * 1000;
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1100, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplay(`${Math.round(num * e)}${suffix}`);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value, delay]);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 35, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }} className="glass rounded-2xl p-5 md:p-7 text-center group hover:border-white/[0.05] transition-all duration-500 relative overflow-hidden cursor-default">
      <motion.div className="absolute top-0 left-0 right-0 h-px origin-left" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: delay + 0.3, duration: 0.6 }} style={{ background: `linear-gradient(90deg, ${color}25, transparent)` }} />
      <div className="text-3xl md:text-4xl font-bold tracking-tight mb-1.5" style={{ color }}>{display}</div>
      <div className="text-[10px] text-white/20 font-mono tracking-[0.12em] uppercase">{label}</div>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const colors = ["#4F8FFF", "#7C5CFC", "#00D4AA", "#4F8FFF", "#FF6B8A", "#4F8FFF"];
  return (
    <section className="section-padding relative" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px section-sweep" style={{ background: "linear-gradient(90deg, transparent, rgba(79,143,255,0.12), transparent)" }} />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="mb-16">
          <div className="flex items-center gap-4 mb-4"><div className="section-line" /><span className="text-[11px] font-mono tracking-[0.2em] text-white/25 uppercase">Impact</span></div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-white">Measurable Results</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {resumeData.stats.map((s, i) => <AnimatedStat key={s.label} value={s.value} label={s.label} delay={i * 0.08} color={colors[i % colors.length]} />)}
        </div>
      </div>
    </section>
  );
}