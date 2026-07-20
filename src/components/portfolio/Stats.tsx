"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { resumeData } from "@/lib/resume-data";

function AnimatedStat({ value, label, delay, index }: { value: string; label: string; delay: number; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayValue, setDisplayValue] = useState(value.startsWith("Top") ? "—" : "0");

  // 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

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

  const colors = ["#c8ff00", "#00d4ff", "#a78bfa", "#c8ff00", "#fbbf24", "#c8ff00"];
  const glowColor = colors[index % colors.length];

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className="glass rounded-2xl p-6 md:p-8 text-center group hover:border-white/[0.06] transition-all duration-500 relative overflow-hidden cursor-default"
    >
      {/* Animated glow on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColor}08, transparent 70%)`,
        }}
      />
      {/* Corner accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.3, duration: 0.6 }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: `linear-gradient(90deg, ${glowColor}30, transparent)` }}
      />
      <div className="relative z-10">
        <motion.div
          className="text-3xl md:text-4xl font-bold mb-2 tracking-tight"
          style={{ color: glowColor }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {displayValue}
        </motion.div>
        <div className="text-xs text-white/30 font-mono tracking-wider uppercase">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px section-sweep origin-left" style={{ background: "linear-gradient(90deg, transparent, rgba(200,255,0,0.15), transparent)" }} />

      {/* Ambient orbs */}
      <div className="ambient-orb w-[400px] h-[200px] bg-[#c8ff00] top-0 left-1/4 opacity-[0.015]" />

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
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}