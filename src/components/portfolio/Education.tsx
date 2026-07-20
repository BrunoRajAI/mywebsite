"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";
import { resumeData } from "@/lib/resume-data";

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 25 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 25 });

  return (
    <section id="education" className="section-padding relative" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px section-sweep" style={{ background: "linear-gradient(90deg, transparent, rgba(79,143,255,0.12), transparent)" }} />
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="mb-16">
          <div className="flex items-center gap-4 mb-4"><div className="section-line" /><span className="text-[11px] font-mono tracking-[0.2em] text-white/25 uppercase">Education</span></div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-white">Academic Background</h2>
        </motion.div>
        <motion.div onMouseMove={(e) => { const r = (e.currentTarget as HTMLElement).getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5); }} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} className="glass rounded-2xl p-8 md:p-10 hover:border-white/[0.06] transition-all duration-500 cursor-default group relative overflow-hidden">
          <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(circle at 30% 50%, rgba(79,143,255,0.02), transparent 60%)" }} />
          <motion.div initial={{ x: "-100%" }} whileInView={{ x: "200%" }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 1.5, ease: "linear" }} className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.015] to-transparent" />
          <div className="flex items-start gap-5 relative z-10">
            <motion.div whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }} transition={{ duration: 0.5 }} className="w-12 h-12 rounded-xl bg-[#4F8FFF]/[0.06] group-hover:bg-[#4F8FFF]/10 flex items-center justify-center shrink-0 transition-colors"><GraduationCap size={22} className="text-[#4F8FFF]/70" /></motion.div>
            <div><h3 className="text-lg md:text-xl font-semibold text-white/80 group-hover:text-white transition-colors duration-500">{resumeData.education[0].degree}</h3></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}