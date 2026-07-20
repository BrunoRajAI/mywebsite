"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useCallback, useMemo } from "react";
import { resumeData } from "@/lib/resume-data";

/* ═══════ 3D TILT HOOK ═══════ */
function useTilt(deg: number = 4) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, [0, 1], [deg, -deg]);
  const rotateY = useTransform(springX, [0, 1], [-deg, deg]);

  const handlers = {
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - rect.left) / rect.width);
      y.set((e.clientY - rect.top) / rect.height);
    },
    onMouseLeave: () => {
      x.set(0.5);
      y.set(0.5);
    },
  };

  return { ref, style: { rotateX, rotateY }, handlers };
}

/* ═══════ RIPPLE TOOL CHIP ═══════ */
function ToolChip({ name }: { name: string }) {
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [
      ...prev,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    setTimeout(
      () => setRipples((prev) => prev.filter((r) => r.id !== id)),
      700
    );
  }, []);

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{
        y: -4,
        scale: 1.06,
        boxShadow: "0 8px 24px rgba(99,102,241,0.12)",
      }}
      className="relative overflow-hidden cursor-pointer px-3.5 py-1.5 rounded-full text-xs text-white/40 glass transition-colors duration-300 hover:text-[#818CF8] hover:border-[#6366F1]/15"
    >
      <span className="relative z-10">{name}</span>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full border border-[#6366F1]/30 pointer-events-none"
          style={{
            left: r.x,
            top: r.y,
            width: 4,
            height: 4,
            animation: "ripple-expand 0.7s ease-out forwards",
          }}
        />
      ))}
      <style>{`
        @keyframes ripple-expand {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(40);
            opacity: 0;
          }
        }
      `}</style>
    </motion.div>
  );
}

/* ═══════ CATEGORY CARD ═══════ */
function CategoryCard({
  category,
  tools,
  index,
}: {
  category: string;
  tools: string[];
  index: number;
}) {
  const { ref, style, handlers } = useTilt(4);

  return (
    <motion.div
      ref={ref}
      style={{
        ...style,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      {...handlers}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-2xl p-6"
    >
      <span className="section-label">{category}</span>
      <div className="flex flex-wrap gap-2 mt-4">
        {tools.map((tool) => (
          <ToolChip key={tool} name={tool} />
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════ MAIN COMPONENT ═══════ */
export default function Skills() {
  const categories = useMemo(() => {
    const map = new Map<string, string[]>();
    resumeData.skills.tools.forEach((t) => {
      if (!map.has(t.category)) map.set(t.category, []);
      map.get(t.category)!.push(t.name);
    });
    return Array.from(map.entries());
  }, []);

  return (
    <section id="skills" className="section-pad relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Skills</span>
          <div className="section-line mt-2" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-4">
            Tools &amp; Technologies
          </h2>
        </motion.div>

        {/* Core Competencies */}
        <motion.div
          className="glass rounded-2xl p-6 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="section-label">Core Competencies</span>
          <div className="flex flex-wrap gap-3 mt-4">
            {resumeData.skills.competencies.map((comp, i) => (
              <motion.span
                key={comp}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                whileHover={{ y: -3, scale: 1.05 }}
                className="px-4 py-2 rounded-full text-sm text-white/35 border border-white/[0.04] cursor-default transition-colors duration-300 hover:text-[#818CF8] hover:border-[#6366F1]/20 hover:bg-[#6366F1]/[0.04]"
              >
                {comp}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Tools by Category */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {categories.map(([cat, tools], i) => (
            <CategoryCard
              key={cat}
              category={cat}
              tools={tools}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}