"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { resumeData } from "@/lib/resume-data";

const categories = [...new Set(resumeData.skills.tools.map((t) => t.category))];
const accentColors = ["#4F8FFF", "#7C5CFC", "#00D4AA", "#FBBF24"];

function SkillOrb({ name, delay }: { name: string; delay: number }) {
  const [ripples, setRipples] = useState<number[]>([]);
  const addRipple = () => { const id = Date.now(); setRipples((p) => [...p, id]); setTimeout(() => setRipples((p) => p.filter((r) => r !== id)), 600); };
  return (
    <motion.div initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }} onClick={addRipple} className="relative cursor-default">
      <motion.div whileHover={{ y: -5, scale: 1.06, boxShadow: "0 6px 25px rgba(79,143,255,0.06)" }} whileTap={{ scale: 0.95 }} className="relative px-3.5 py-1.5 rounded-full glass border border-white/[0.04] text-white/40 hover:text-[#4F8FFF] hover:border-[#4F8FFF]/15 hover:bg-[#4F8FFF]/[0.03] transition-all duration-300 whitespace-nowrap overflow-hidden text-[13px]">
        {name}
        {ripples.map((r) => <motion.span key={r} initial={{ scale: 0, opacity: 0.3 }} animate={{ scale: 2.5, opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0 rounded-full border border-[#4F8FFF]/15" />)}
      </motion.div>
    </motion.div>
  );
}

function CategoryCard({ cat, ci, tools }: { cat: string; ci: number; tools: typeof resumeData.skills.tools }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 25 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 25 });
  const color = accentColors[ci % accentColors.length];
  return (
    <motion.div ref={ref} onMouseMove={(e) => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5); }} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 + ci * 0.12 }} className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-white/[0.05] transition-colors duration-500">
      <motion.div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] transition-opacity duration-700" style={{ background: color, opacity: 0 }} whileInView={{ opacity: 0.02 }} whileHover={{ opacity: 0.04 }} viewport={{ once: true }} />
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + ci * 0.12, duration: 0.6 }} className="absolute top-0 left-0 right-0 h-px origin-left" style={{ background: `linear-gradient(90deg, ${color}30, transparent)` }} />
      <h3 className="text-[10px] font-mono tracking-[0.15em] text-white/25 uppercase mb-5 relative z-10">{cat}</h3>
      <div className="flex flex-wrap gap-2 relative z-10">{tools.map((t, i) => <SkillOrb key={t.name} name={t.name} delay={0.25 + ci * 0.08 + i * 0.03} />)}</div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px section-sweep" style={{ background: "linear-gradient(90deg, transparent, rgba(79,143,255,0.12), transparent)" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#4F8FFF] opacity-[0.008] blur-[150px] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="mb-16">
          <div className="flex items-center gap-4 mb-4"><div className="section-line" /><span className="text-[11px] font-mono tracking-[0.2em] text-white/25 uppercase">Skills</span></div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-white">Tools & Technologies</h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }} className="glass rounded-2xl p-8 md:p-10 mb-8 relative overflow-hidden">
          <motion.div initial={{ x: "-100%" }} whileInView={{ x: "200%" }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 2, ease: "linear" }} className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-[#4F8FFF]/20 to-transparent" />
          <h3 className="text-[10px] font-mono tracking-[0.15em] text-white/25 uppercase mb-6">Core Competencies</h3>
          <div className="flex flex-wrap gap-2.5">
            {resumeData.skills.competencies.map((s, i) => (
              <motion.span key={s} initial={{ opacity: 0, scale: 0.85 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.2 + i * 0.025 }} whileHover={{ y: -3, scale: 1.05, boxShadow: "0 4px 20px rgba(79,143,255,0.05)" }} className="px-3.5 py-1.5 rounded-full text-[13px] text-white/35 border border-white/[0.04] hover:text-[#4F8FFF] hover:bg-[#4F8FFF]/[0.03] transition-all duration-300 cursor-default">{s}</motion.span>
            ))}
          </div>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {categories.map((cat, ci) => <CategoryCard key={cat} cat={cat} ci={ci} tools={resumeData.skills.tools.filter((t) => t.category === cat)} />)}
        </div>
      </div>
    </section>
  );
}