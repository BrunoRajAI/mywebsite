"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Briefcase, Zap, Users, TrendingUp, Bot } from "lucide-react";
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
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
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
  { icon: Users, label: "Team Led", value: `${resumeData.totalTeamManaged} Marketers` },
  { icon: Zap, label: "Specialization", value: "AI-Powered Marketing Automation" },
];

const pillarIcons = [Bot, TrendingUp, Briefcase, MapPin];

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
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />

            {/* Header row with avatar */}
            <div className="flex items-center gap-5 mb-6 pb-6 border-b border-white/[0.04]">
              <div className="relative shrink-0">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#6366F1]/40 to-[#818CF8]/20 blur-md" />
                <img
                  src="/profile.png"
                  alt={resumeData.name}
                  className="relative w-16 h-16 rounded-full object-cover border-2 border-white/10"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#6366F1] border-2 border-[#090909]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white/90">{resumeData.name}</h3>
                <p className="text-xs text-white/30 font-mono tracking-wider uppercase mt-0.5">{resumeData.titleShort}</p>
              </div>
            </div>

            <p className="text-white/50 leading-[1.85] text-[15px] relative z-10 mb-6">
              {resumeData.professionalSummary}
            </p>
            <p className="text-white/30 leading-[1.85] text-[14px] relative z-10">
              {resumeData.professionalSummaryExtended}
            </p>

            {/* Bottom stats strip */}
            <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-white/[0.04]">
              <div className="text-center">
                <div className="text-lg font-bold text-[#818CF8]">{resumeData.totalCompanies}</div>
                <div className="text-[9px] text-white/20 font-mono uppercase tracking-wider mt-0.5">Companies</div>
              </div>
              <div className="w-px bg-white/[0.04]" />
              <div className="text-center">
                <div className="text-lg font-bold text-[#818CF8]">{resumeData.totalTeamManaged}</div>
                <div className="text-[9px] text-white/20 font-mono uppercase tracking-wider mt-0.5">Team Members</div>
              </div>
              <div className="w-px bg-white/[0.04]" />
              <div className="text-center">
                <div className="text-lg font-bold text-[#818CF8]">{resumeData.skills.tools.length}</div>
                <div className="text-[9px] text-white/20 font-mono uppercase tracking-wider mt-0.5">Tools Mastered</div>
              </div>
              <div className="w-px bg-white/[0.04]" />
              <div className="text-center">
                <div className="text-lg font-bold text-[#818CF8]">{resumeData.skills.competencies.length}</div>
                <div className="text-[9px] text-white/20 font-mono uppercase tracking-wider mt-0.5">Competencies</div>
              </div>
            </div>
          </TiltCard>

          {/* Right: Info Cards */}
          <div className="flex flex-col gap-4">
            {infoCards.map((item, i) => {
              const Icon = item.icon;
              return (
                <TiltCard
                  key={item.label}
                  delay={0.2 + i * 0.08}
                  className="glass rounded-2xl p-4 flex items-start gap-3.5 hover:border-white/[0.08] transition-colors duration-500 cursor-default group flex-1"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-9 h-9 rounded-xl bg-[#6366F1]/10 group-hover:bg-[#6366F1]/20 flex items-center justify-center shrink-0 transition-colors duration-500"
                  >
                    <Icon size={16} className="text-[#818CF8]" />
                  </motion.div>
                  <div>
                    <p className="text-[10px] text-white/20 mb-0.5 font-mono uppercase tracking-[0.15em]">{item.label}</p>
                    <p className="text-white/70 text-[13px]">{item.value}</p>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>

        {/* Expertise Pillars */}
        <div className="mt-8">
          <h3 className="section-label mb-6">Core Expertise</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {resumeData.expertiseAreas.map((area, i) => {
              const Icon = pillarIcons[i] || Zap;
              return (
                <TiltCard key={area.title} delay={0.1 + i * 0.08} className="glass rounded-2xl p-6 relative overflow-hidden group hover:border-[#6366F1]/15 transition-all duration-500 cursor-default">
                  {/* Hover glow */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />

                  <div className="flex items-start gap-3.5 relative z-10">
                    <div className="w-9 h-9 rounded-xl bg-[#6366F1]/10 group-hover:bg-[#6366F1]/20 flex items-center justify-center shrink-0 transition-colors duration-500">
                      <Icon size={16} className="text-[#818CF8]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-white/80 mb-1.5">{area.title}</h4>
                      <p className="text-[12.5px] text-white/30 leading-relaxed mb-3">{area.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {area.keywords.map((kw) => (
                          <span key={kw} className="px-2 py-0.5 text-[10px] text-white/20 rounded-md bg-white/[0.02] border border-white/[0.03] font-mono">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>

        {/* Key Achievements — with metric highlighting */}
        <TiltCard delay={0.3} className="mt-8 glass rounded-2xl p-8 md:p-10 cursor-default">
          <div className="flex items-center justify-between mb-6">
            <h3 className="section-label">Key Achievements</h3>
            <span className="text-[10px] text-white/15 font-mono">{resumeData.achievements.length} milestones</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
            {resumeData.achievements.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3 group/ach"
              >
                <motion.span
                  whileHover={{ scale: 2.5, backgroundColor: "rgba(99,102,241,0.5)" }}
                  className="mt-2 w-[5px] h-[5px] rounded-full bg-[#6366F1]/50 shrink-0 transition-all duration-300"
                />
                <div>
                  {a.metric && (
                    <span className="metric-badge mb-1.5">{a.metric}</span>
                  )}
                  <p className="text-[13px] text-white/35 leading-relaxed group-hover/ach:text-white/50 transition-colors duration-300">
                    {a.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </TiltCard>
      </div>
    </section>
  );
}