"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Briefcase, Zap } from "lucide-react";
import { resumeData } from "@/lib/resume-data";

function TiltCard({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 25 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 25 });
  return (
    <motion.div ref={ref} onMouseMove={(e) => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5); }} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }} className={className}>{children}</motion.div>
  );
}

const infoCards = [
  { icon: MapPin, label: "Location", value: resumeData.location },
  { icon: Briefcase, label: "Experience", value: "6+ Years in Digital Marketing" },
  { icon: Zap, label: "Specialization", value: "AI-Powered Marketing Automation" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px section-sweep" style={{ background: "linear-gradient(90deg, transparent, rgba(79,143,255,0.12), transparent)" }} />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="mb-16">
          <div className="flex items-center gap-4 mb-4"><div className="section-line" /><span className="text-[11px] font-mono tracking-[0.2em] text-white/25 uppercase">About</span></div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-white">Who I Am</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          <TiltCard delay={0.1} className="md:col-span-2 glass rounded-2xl p-8 md:p-10 relative overflow-hidden group hover:border-white/[0.06] transition-colors duration-500 cursor-default">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F8FFF] opacity-[0.015] blur-[100px] group-hover:opacity-[0.03] transition-opacity duration-700" />
            <p className="text-white/50 leading-[1.9] text-[15px] relative z-10">{resumeData.professionalSummary}</p>
          </TiltCard>
          <div className="flex flex-col gap-5">
            {infoCards.map((item, i) => (
              <TiltCard key={item.label} delay={0.2 + i * 0.1} className="glass rounded-2xl p-5 flex items-start gap-4 hover:border-white/[0.06] transition-colors duration-500 cursor-default group">
                <motion.div whileHover={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 0.5 }} className="w-10 h-10 rounded-xl bg-[#4F8FFF]/[0.06] group-hover:bg-[#4F8FFF]/10 flex items-center justify-center shrink-0 transition-colors"><item.icon size={18} className="text-[#4F8FFF]/70" /></motion.div>
                <div><p className="text-[10px] text-white/20 mb-0.5 font-mono uppercase tracking-[0.15em]">{item.label}</p><p className="text-white/70 text-sm">{item.value}</p></div>
              </TiltCard>
            ))}
          </div>
        </div>
        <TiltCard delay={0.4} className="mt-8 glass rounded-2xl p-8 md:p-10 cursor-default">
          <h3 className="text-[11px] font-mono tracking-[0.15em] text-white/25 uppercase mb-6">Key Achievements</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {resumeData.achievements.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }} className="flex items-start gap-3 group/ach">
                <motion.span whileHover={{ scale: 2.5, backgroundColor: "rgba(79,143,255,0.5)" }} className="mt-1.5 w-[3px] h-[3px] rounded-full bg-[#4F8FFF]/40 shrink-0 transition-all duration-300" />
                <p className="text-[13px] text-white/40 leading-relaxed group-hover/ach:text-white/55 transition-colors duration-300">{a}</p>
              </motion.div>
            ))}
          </div>
        </TiltCard>
      </div>
    </section>
  );
}