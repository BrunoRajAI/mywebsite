"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Briefcase, Zap } from "lucide-react";
import { resumeData } from "@/lib/resume-data";

function TiltCard({ children, className, delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {/* Hover spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(200,255,0,0.04), transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      {/* Section sweep line */}
      <div className="absolute top-0 left-0 right-0 h-px section-sweep origin-left" style={{ background: "linear-gradient(90deg, transparent, rgba(200,255,0,0.15), transparent)" }} />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="section-line" />
            <span className="text-xs font-mono tracking-[0.2em] text-white/30 uppercase">About</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Who I Am
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main About Card */}
          <TiltCard
            delay={0.1}
            className="md:col-span-2 glass rounded-2xl p-8 md:p-10 relative overflow-hidden group hover:border-white/[0.08] transition-colors duration-500 cursor-default"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#c8ff00] opacity-[0.02] blur-[100px] group-hover:opacity-[0.05] transition-opacity duration-700" />
            {/* Animated corner accent */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-2xl"
            >
              <div className="absolute top-0 right-0 w-px h-10 bg-gradient-to-b from-[#c8ff00]/20 to-transparent" />
              <div className="absolute top-0 right-0 h-px w-10 bg-gradient-to-l from-[#c8ff00]/20 to-transparent" />
            </motion.div>
            <p className="text-white/60 leading-[1.8] text-[15px] relative z-10">
              {resumeData.professionalSummary}
            </p>
          </TiltCard>

          {/* Info Cards with tilt */}
          <div className="flex flex-col gap-6">
            {[
              { icon: MapPin, label: "Location", value: resumeData.location },
              { icon: Briefcase, label: "Experience", value: "6+ Years in Digital Marketing" },
              { icon: Zap, label: "Specialization", value: "AI-Powered Marketing Automation" },
            ].map((item, i) => (
              <TiltCard
                key={item.label}
                delay={0.2 + i * 0.1}
                className="glass rounded-2xl p-6 flex items-start gap-4 hover:border-white/[0.08] transition-colors duration-500 cursor-default group"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 rounded-xl bg-[#c8ff00]/10 group-hover:bg-[#c8ff00]/15 flex items-center justify-center shrink-0 transition-colors"
                >
                  <item.icon size={18} className="text-[#c8ff00]" />
                </motion.div>
                <div>
                  <p className="text-xs text-white/30 mb-1 font-mono uppercase tracking-wider">{item.label}</p>
                  <p className="text-white/80 text-sm">{item.value}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Key Achievements */}
        <TiltCard
          delay={0.5}
          className="mt-10 glass rounded-2xl p-8 md:p-10 cursor-default"
        >
          <h3 className="text-sm font-mono tracking-[0.15em] text-white/30 uppercase mb-6">Key Achievements</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {resumeData.achievements.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3 group/achievement"
              >
                <motion.span
                  whileHover={{ scale: 2, background: "rgba(200,255,0,0.4)" }}
                  className="mt-1.5 w-1 h-1 rounded-full bg-[#c8ff00]/50 shrink-0 transition-all duration-300"
                />
                <p className="text-sm text-white/50 leading-relaxed group-hover/achievement:text-white/60 transition-colors duration-300">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </TiltCard>
      </div>
    </section>
  );
}