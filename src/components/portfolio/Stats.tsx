"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { resumeData } from "@/lib/resume-data";

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(value.startsWith("Top") ? "—" : "0");

  useEffect(() => {
    if (!isInView) return;
    if (value.startsWith("Top")) {
      setTimeout(() => setDisplayValue(value), delay * 1000 + 400);
      return;
    }
    const num = parseFloat(value);
    if (isNaN(num)) return;
    const suffix = value.replace(/[\d.]/g, "");
    const duration = 1200;
    const startTime = performance.now() + delay * 1000;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num * eased;
      setDisplayValue(
        Number.isInteger(num) ? `${Math.round(current)}${suffix}` : `${current.toFixed(0)}${suffix}`
      );
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className="glass rounded-2xl p-6 md:p-8 text-center group hover:border-white/[0.06] transition-colors duration-500"
    >
      <div className="text-3xl md:text-4xl font-bold text-[#c8ff00] mb-2 tracking-tight">
        {displayValue}
      </div>
      <div className="text-xs text-white/30 font-mono tracking-wider uppercase">
        {label}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="section-line" />
            <span className="text-xs font-mono tracking-[0.2em] text-white/30 uppercase">Impact</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Measurable Results
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {resumeData.stats.map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              label={stat.label}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}