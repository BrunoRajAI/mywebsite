"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Workflow,
  BrainCircuit,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Target,
  Wrench,
  BarChart3,
} from "lucide-react";
import { resumeData, type CaseStudy } from "@/lib/resume-data";

/* ═══════ Tilt Card (matches existing design system) ═══════ */
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
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 25 });

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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════ Icon Mapping ═══════ */
const iconMap = {
  automation: Workflow,
  "ai-search": BrainCircuit,
  authority: TrendingUp,
};

/* ═══════ Case Study Card ═══════ */
function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = iconMap[study.icon];

  return (
    <TiltCard
      delay={0.1 + index * 0.15}
      className="glass rounded-2xl overflow-hidden relative group hover:border-[#6366F1]/15 transition-all duration-500 cursor-default"
    >
      {/* Hover glow */}
      <div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)" }}
      />

      {/* Header — index + icon + company + category */}
      <div className="p-7 md:p-8 relative z-10">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            {/* Index number */}
            <div className="relative shrink-0">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#6366F1]/30 to-[#818CF8]/15 blur-md" />
              <div className="relative w-12 h-12 rounded-xl bg-[#6366F1]/10 group-hover:bg-[#6366F1]/20 flex items-center justify-center transition-colors duration-500">
                <Icon size={18} className="text-[#818CF8]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-white/20 tracking-[0.2em] uppercase">
                  Case Study {String(study.index).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white/90 leading-tight">
                {study.title}
              </h3>
            </div>
          </div>
          {/* Company badge */}
          <span className="shrink-0 px-2.5 py-1 text-[10px] font-mono text-[#818CF8] tracking-wider uppercase rounded-md bg-[#6366F1]/8 border border-[#6366F1]/15">
            {study.company}
          </span>
        </div>

        {/* Category + tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6">
          <span className="text-[10px] text-white/30 font-mono uppercase tracking-wider mr-1">
            {study.category}
          </span>
          <span className="text-white/10">·</span>
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] text-white/25 rounded-md bg-white/[0.02] border border-white/[0.03] font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Problem */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <Target size={12} className="text-[#6366F1]/60" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
              Problem
            </span>
          </div>
          <p className="text-[13.5px] text-white/45 leading-[1.75]">
            {study.problem}
          </p>
        </div>

        {/* Action */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Wrench size={12} className="text-[#6366F1]/60" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
              Action
            </span>
          </div>
          <motion.p
            className="text-[13.5px] text-white/45 leading-[1.75] overflow-hidden"
            initial={{ maxHeight: isExpanded ? "none" : 72 }}
            animate={{ maxHeight: isExpanded ? 1000 : 72 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative" }}
          >
            {study.action}
            {!isExpanded && (
              <span
                className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(15,15,15,0.95))" }}
              />
            )}
          </motion.p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#818CF8]/70 hover:text-[#818CF8] transition-colors group/btn"
          >
            {isExpanded ? "Show Less" : "Read Full Action"}
            <ArrowRight
              size={11}
              className={`transition-transform duration-300 ${isExpanded ? "rotate-90" : "group-hover/btn:translate-x-0.5"}`}
            />
          </button>
        </div>
      </div>

      {/* Results — bottom strip */}
      <div className="border-t border-white/[0.04] p-7 md:p-8 pt-6 relative z-10 bg-gradient-to-b from-transparent to-white/[0.01]">
        <div className="flex items-center gap-2 mb-5">
          <BarChart3 size={12} className="text-[#6366F1]/60" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
            Results
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {study.results.map((result, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group/result"
            >
              <div className="text-xl md:text-2xl font-bold text-[#818CF8] mb-1 leading-none tracking-tight">
                {result.metric}
              </div>
              <div className="text-[10px] text-white/40 font-medium mb-1.5 leading-tight">
                {result.label}
              </div>
              <p className="text-[10px] text-white/20 leading-[1.5] hidden md:block">
                {result.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </TiltCard>
  );
}

/* ═══════ Main Section ═══════ */
export default function CaseStudies() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Aggregate result metrics across all case studies (for the highlight strip)
  const allMetrics = resumeData.caseStudies.flatMap((cs) => cs.results.map((r) => r.metric));
  const totalResults = allMetrics.length;

  return (
    <section id="case-studies" className="section-pad relative" ref={sectionRef}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#6366F1] opacity-[0.015] blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="section-line" />
            <span className="section-label">Case Studies</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-white font-bold tracking-tight text-3xl md:text-4xl">
              Real Work, Real Outcomes
            </h2>
            <p className="text-white/30 text-[13px] max-w-md leading-relaxed">
              Three production case studies where automation, AI search optimization, and SEO strategy turned into measurable business impact.
            </p>
          </div>
        </motion.div>

        {/* Case Study Cards */}
        <div className="grid gap-6 md:gap-8">
          {resumeData.caseStudies.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>

        {/* Bottom callout — summary metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group hover:border-white/[0.08] transition-colors duration-500"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 flex items-center justify-center shrink-0">
              <Sparkles size={16} className="text-[#818CF8]" />
            </div>
            <div>
              <p className="text-sm text-white/70 font-medium mb-0.5">
                {resumeData.caseStudies.length} case studies · {totalResults} documented outcomes
              </p>
              <p className="text-[12px] text-white/30 leading-relaxed">
                Each case study is sourced directly from real work — every metric is verifiable and tied to actual business results.
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6366F1]/10 hover:bg-[#6366F1]/20 border border-[#6366F1]/20 text-[#818CF8] text-[12px] font-medium tracking-tight transition-all duration-300 group/btn relative z-10"
          >
            Start a project
            <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
