"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue } from "framer-motion";
import { ArrowDown, Mail, Linkedin } from "lucide-react";
import dynamic from "next/dynamic";
import { resumeData } from "@/lib/resume-data";

const ThreeScene = dynamic(() => import("./ThreeScene"), { ssr: false });

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#090909]">
      {/* Three.js Background */}
      {mounted && <ThreeScene />}

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Aurora gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#6366F1] opacity-[0.04] blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#818CF8] opacity-[0.02] blur-[150px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Location tag */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-mono tracking-[0.2em] text-white/30 border border-white/[0.06] bg-white/[0.02]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] animate-pulse-soft" />
            {resumeData.location}
          </span>
        </motion.div>

        {/* Name — line by line reveal */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="text-[clamp(2.8rem,8vw,6.5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white"
          >
            {resumeData.name.split(" ").slice(0, 2).join(" ")}
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            className="text-[clamp(2.8rem,8vw,6.5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-accent-gradient"
          >
            {resumeData.name.split(" ").slice(2).join(" ")}
          </motion.h1>
        </div>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="text-lg md:text-xl text-white/40 font-light tracking-tight mb-5"
        >
          {resumeData.title}
        </motion.p>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-xl mx-auto text-sm text-white/20 leading-relaxed mb-12"
        >
          {resumeData.professionalSummary}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton onClick={() => scrollTo("contact")}>
            <span className="inline-flex items-center gap-2.5 px-7 py-3 bg-[#6366F1] hover:bg-[#818CF8] text-white font-medium text-sm rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]">
              <Mail size={15} />
              Get in Touch
            </span>
          </MagneticButton>
          <MagneticButton>
            <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3 border border-white/[0.08] text-white/50 hover:text-white hover:border-white/[0.15] text-sm rounded-full transition-all duration-300">
              <Linkedin size={15} />
              LinkedIn
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
          <span className="text-[9px] font-mono tracking-[0.3em] text-white/15 uppercase">Scroll</span>
          <div className="w-4 h-7 rounded-full border border-white/[0.08] flex justify-center pt-1.5">
            <motion.div animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="w-0.5 h-1.5 rounded-full bg-[#6366F1]/60" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════ Magnetic Button ═══════ */
function MagneticButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.2);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.2);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x, y }}
      onClick={onClick}
      className="cursor-pointer"
    >
      {children}
    </motion.div>
  );
}