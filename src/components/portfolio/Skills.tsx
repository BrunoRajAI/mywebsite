"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { resumeData } from "@/lib/resume-data";

const categories = [...new Set(resumeData.skills.tools.map((t) => t.category))];

function SkillOrb({ name, delay }: { name: string; delay: number }) {
  const [ripples, setRipples] = useState<number[]>([]);

  const addRipple = () => {
    const id = Date.now();
    setRipples((prev) => [...prev, id]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r !== id)), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={addRipple}
      className="relative cursor-default"
    >
      <motion.div
        whileHover={{
          y: -6,
          scale: 1.08,
          boxShadow: "0 8px 25px rgba(200,255,0,0.08)",
        }}
        whileTap={{ scale: 0.95 }}
        className="relative px-4 py-2 rounded-full glass border border-white/[0.04] text-white/50 
          hover:text-[#c8ff00] hover:border-[#c8ff00]/20 hover:bg-[#c8ff00]/[0.04] 
          transition-all duration-300 whitespace-nowrap overflow-hidden"
      >
        {name}
        {/* Ripple effect */}
        {ripples.map((r) => (
          <motion.span
            key={r}
            initial={{ scale: 0, opacity: 0.3 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 rounded-full border border-[#c8ff00]/20"
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

function CategoryCard({ cat, ci, tools }: { cat: string; ci: number; tools: typeof resumeData.skills.tools }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 25 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const accentColors = ["#c8ff00", "#00d4ff", "#a78bfa", "#fbbf24"];
  const color = accentColors[ci % accentColors.length];

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 + ci * 0.15 }}
      className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-white/[0.06] transition-colors duration-500"
    >
      {/* Category accent glow */}
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] transition-opacity duration-700"
        style={{ background: color, opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        whileHover={{ opacity: 0.06 }}
        viewport={{ once: true }}
      />
      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 + ci * 0.15, duration: 0.6 }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }}
      />
      <h3 className="text-xs font-mono tracking-[0.15em] text-white/30 uppercase mb-5 relative z-10">
        {cat}
      </h3>
      <div className="flex flex-wrap gap-2 relative z-10">
        {tools.map((tool, i) => (
          <SkillOrb key={tool.name} name={tool.name} delay={0.3 + ci * 0.1 + i * 0.04} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px section-sweep origin-left" style={{ background: "linear-gradient(90deg, transparent, rgba(200,255,0,0.15), transparent)" }} />

      <div className="ambient-orb w-[600px] h-[400px] bg-[#c8ff00] top-0 left-1/2 -translate-x-1/2 opacity-[0.01]" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="section-line" />
            <span className="text-xs font-mono tracking-[0.2em] text-white/30 uppercase">Skills</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Tools & Technologies
          </h2>
        </motion.div>

        {/* Competencies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="glass rounded-2xl p-8 md:p-10 mb-10 relative overflow-hidden"
        >
          {/* Shimmer line */}
          <motion.div
            initial={{ x: "-100%" }}
            whileInView={{ x: "200%" }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 2, ease: "linear" }}
            className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-[#c8ff00]/30 to-transparent"
          />
          <h3 className="text-sm font-mono tracking-[0.15em] text-white/30 uppercase mb-6">
            Core Competencies
          </h3>
          <div className="flex flex-wrap gap-3">
            {resumeData.skills.competencies.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.03 }}
                whileHover={{
                  y: -4,
                  scale: 1.08,
                  boxShadow: "0 4px 20px rgba(200,255,0,0.06)",
                  borderColor: "rgba(200,255,0,0.2)",
                }}
                className="px-4 py-2 rounded-full text-sm text-white/40 border border-white/[0.04] 
                  hover:text-[#c8ff00] hover:bg-[#c8ff00]/[0.03] 
                  transition-all duration-300 cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Tools by Category */}
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, ci) => {
            const tools = resumeData.skills.tools.filter((t) => t.category === cat);
            return <CategoryCard key={cat} cat={cat} ci={ci} tools={tools} />;
          })}
        </div>

        {/* More floating accents */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-10 w-4 h-4 border border-[#c8ff00]/10 rounded-full hidden lg:block"
        />
        <motion.div
          animate={{ y: [8, -15, 8], scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-16 w-3 h-3 bg-[#00d4ff]/10 rounded-full hidden lg:block"
        />
        <motion.div
          animate={{ y: [-5, 12, -5], rotate: [0, -90, -180] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-40 right-32 w-5 h-5 border border-white/[0.03] rotate-45 hidden lg:block"
        />
      </div>
    </section>
  );
}