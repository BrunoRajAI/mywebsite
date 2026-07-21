"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useCallback, useMemo, useEffect } from "react";
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
    onMouseLeave: () => { x.set(0.5); y.set(0.5); },
  };

  return { ref, style: { rotateX, rotateY }, handlers };
}

/* ═══════ PROFICIENCY LEVEL ═══════ */
function ProficiencyBar({ level }: { level: "expert" | "advanced" | "proficient" }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const w = level === "expert" ? 95 : level === "advanced" ? 75 : 55;
          setWidth(w);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} className="proficiency-bar w-8 ml-auto shrink-0">
      <div className="proficiency-fill" style={{ width: `${width}%` }} />
    </div>
  );
}

/* ═══════ RIPPLE TOOL CHIP ═══════ */
function ToolChip({ name, proficiency }: { name: string; proficiency?: string }) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
  }, []);

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ y: -4, scale: 1.06, boxShadow: "0 8px 24px rgba(99,102,241,0.12)" }}
      className="relative overflow-hidden cursor-pointer px-3.5 py-1.5 rounded-full text-xs text-white/40 glass transition-colors duration-300 hover:text-[#818CF8] hover:border-[#6366F1]/15 group/chip"
      data-cursor-hover
    >
      <span className="relative z-10 flex items-center gap-2">
        {name}
        {proficiency && (
          <span className={`w-1 h-1 rounded-full ${
            proficiency === "expert" ? "bg-[#6366F1]" :
            proficiency === "advanced" ? "bg-[#818CF8]/60" :
            "bg-white/15"
          }`} title={proficiency} />
        )}
      </span>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full border border-[#6366F1]/30 pointer-events-none"
          style={{ left: r.x, top: r.y, width: 4, height: 4, animation: "ripple-expand 0.7s ease-out forwards" }}
        />
      ))}
      <style>{`
        @keyframes ripple-expand {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(40); opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}

/* ═══════ CATEGORY CARD ═══════ */
function CategoryCard({
  category,
  description,
  tools,
  index,
}: {
  category: string;
  description: string;
  tools: { name: string; proficiency?: string }[];
  index: number;
}) {
  const { ref, style, handlers } = useTilt(3);

  return (
    <motion.div
      ref={ref}
      style={{ ...style, transformStyle: "preserve-3d", perspective: 800 }}
      {...handlers}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-2xl p-6 relative overflow-hidden group hover:border-[#6366F1]/10 transition-all duration-500"
    >
      {/* Subtle hover glow */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)" }} />

      <div className="flex items-start justify-between mb-1">
        <span className="section-label">{category}</span>
        <span className="text-[10px] text-white/10 font-mono">{tools.length} tools</span>
      </div>
      <p className="text-[12px] text-white/20 leading-relaxed mt-2 mb-5">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => (
          <ToolChip key={tool.name} name={tool.name} proficiency={tool.proficiency} />
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════ MAIN COMPONENT ═══════ */
export default function Skills() {
  const categories = useMemo(() => resumeData.skills.toolCategories, []);

  const expertCount = resumeData.skills.competencies.filter(c => c.level === "expert").length;
  const advancedCount = resumeData.skills.competencies.filter(c => c.level === "advanced").length;

  return (
    <section id="skills" className="section-pad relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)", filter: "blur(80px)" }} />

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
          <p className="text-sm text-white/20 mt-2 max-w-lg">
            {resumeData.skills.tools.length} tools across {categories.length} categories — from AI automation platforms to enterprise SEO suites.
          </p>
        </motion.div>

        {/* Core Competencies — with proficiency levels */}
        <motion.div
          className="glass rounded-2xl p-6 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-5">
            <span className="section-label">Core Competencies</span>
            <div className="flex items-center gap-4 text-[10px] font-mono text-white/15">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                Expert ({expertCount})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#818CF8]/60" />
                Advanced ({advancedCount})
              </span>
            </div>
          </div>
          <div className="space-y-1">
            {resumeData.skills.competencies.map((comp, i) => (
              <motion.div
                key={comp.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.025 }}
                className="flex items-center gap-3 py-1.5 px-3 rounded-lg hover:bg-white/[0.015] transition-colors duration-200 group/comp"
              >
                <span className={`w-1 h-1 rounded-full shrink-0 ${
                  comp.level === "expert" ? "bg-[#6366F1]" : "bg-[#818CF8]/40"
                }`} />
                <span className="text-[13px] text-white/35 group-hover/comp:text-white/55 transition-colors flex-1">
                  {comp.name}
                </span>
                <ProficiencyBar level={comp.level} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tools by Category */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.name}
              category={cat.name}
              description={cat.description}
              tools={cat.tools}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}