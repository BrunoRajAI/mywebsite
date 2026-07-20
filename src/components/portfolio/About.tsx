"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Briefcase, Zap } from "lucide-react";
import { resumeData } from "@/lib/resume-data";

function TiltCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [5, -5]),
    { stiffness: 200, damping: 25 }
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-5, 5]),
    { stiffness: 200, damping: 25 }
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const infoCards = [
  { icon: MapPin, label: "Location", value: resumeData.location },
  { icon: Briefcase, label: "Experience", value: "6+ Years" },
  { icon: Zap, label: "Specialization", value: "AI-Powered Marketing Automation" },
];

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-pad relative" ref={sectionRef}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#6366F1] opacity-[0.015] blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="section-line" />
            <span className="section-label">About</span>
          </div>
          <h2 className="text-white font-bold tracking-tight text-3xl md:text-4xl">
            Who I Am
          </h2>
        </motion.div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left: Summary Card */}
          <TiltCard
            delay={0.1}
            className="md:col-span-2 glass rounded-2xl p-8 md:p-10 relative overflow-hidden group hover:border-white/[0.08] transition-colors duration-500 cursor-default"
          >
            {/* Subtle glow on hover */}
            <div
              className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
              }}
            />
            <p className="text-white/50 leading-[1.8] text-[15px] relative z-10">
              {resumeData.professionalSummary}
            </p>
          </TiltCard>

          {/* Right: Info Cards */}
          <div className="flex flex-col gap-5">
            {infoCards.map((item, i) => {
              const Icon = item.icon;
              return (
                <TiltCard
                  key={item.label}
                  delay={0.2 + i * 0.1}
                  className="glass rounded-2xl p-5 flex items-start gap-4 hover:border-white/[0.08] transition-colors duration-500 cursor-default group"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 rounded-xl bg-[#6366F1]/10 group-hover:bg-[#6366F1]/20 flex items-center justify-center shrink-0 transition-colors duration-500"
                  >
                    <Icon size={18} className="text-[#818CF8]" />
                  </motion.div>
                  <div>
                    <p className="text-[10px] text-white/20 mb-0.5 font-mono uppercase tracking-[0.15em]">
                      {item.label}
                    </p>
                    <p className="text-white/70 text-sm">{item.value}</p>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>

        {/* Key Achievements */}
        <TiltCard
          delay={0.4}
          className="mt-8 glass rounded-2xl p-8 md:p-10 cursor-default"
        >
          <h3 className="section-label mb-6">Key Achievements</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {resumeData.achievements.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-start gap-3 group/ach"
              >
                <motion.span
                  whileHover={{
                    scale: 2.5,
                    backgroundColor: "rgba(99,102,241,0.5)",
                  }}
                  className="mt-1.5 w-[5px] h-[5px] rounded-full bg-[#6366F1]/50 shrink-0 transition-all duration-300"
                />
                <p className="text-sm text-white/40 leading-relaxed group-hover/ach:text-white/55 transition-colors duration-300">
                  {a}
                </p>
              </motion.div>
            ))}
          </div>
        </TiltCard>
      </div>
    </section>
  );
}