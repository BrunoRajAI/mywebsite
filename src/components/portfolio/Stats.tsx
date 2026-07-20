"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { resumeData } from "@/lib/resume-data";

/* ═══════ EASE-OUT-CUBIC ═══════ */
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/* ═══════ ANIMATED STAT ═══════ */
function AnimatedStat({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(value.startsWith("Top") ? "—" : "0");

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, [0, 1], [6, -6]);
  const rotateY = useTransform(springX, [0, 1], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const animateCounter = useCallback(() => {
    if (value.startsWith("Top")) {
      const duration = 1200;
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        if (progress < 0.4) {
          setDisplay("—");
        } else {
          setDisplay(value);
        }
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      return;
    }

    const match = value.match(/^(\d+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const numStr = match[1];
    const suffix = match[2];
    const target = parseFloat(numStr);
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(eased * target);
      setDisplay(String(current) + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(animateCounter, index * 120);
      return () => clearTimeout(timer);
    }
  }, [isInView, animateCounter, index]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass rounded-2xl p-6 text-center transition-colors duration-300 hover:border-white/[0.06]"
    >
      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.08 + 0.3, ease: "easeOut" }}
        className="w-full h-[1px] origin-left mb-5"
        style={{
          background:
            "linear-gradient(90deg, rgba(99,102,241,0.3), transparent)",
        }}
      />

      <div className="text-3xl md:text-4xl font-bold tracking-tight text-[#818CF8]">
        {display}
      </div>
      <div className="text-[10px] text-white/25 font-mono tracking-[0.15em] uppercase mt-2">
        {label}
      </div>
    </motion.div>
  );
}

/* ═══════ MAIN COMPONENT ═══════ */
export default function Stats() {
  return (
    <section className="section-pad">
      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="w-full h-px mb-16"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
          }}
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Impact</span>
          <div className="section-line mt-2" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-4">
            Measurable Results
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-12">
          {resumeData.stats.map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              label={stat.label}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}