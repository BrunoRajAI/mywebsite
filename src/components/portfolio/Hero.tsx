"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Sparkles, ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";
import { resumeData } from "@/lib/resume-data";

const ThreeScene = dynamic(() => import("./ThreeScene"), { ssr: false });

const titleWords = resumeData.title.split(" ");

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const wordDuration = 2500;
    const typingInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % titleWords.length);
    }, wordDuration);
    return () => clearInterval(typingInterval);
  }, [mounted]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  const firstName = resumeData.name.split(" ").slice(0, 2).join(" ");
  const lastName = resumeData.name.split(" ").slice(2).join(" ");

  return (
    <section id="hero-section" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#090909]">
      {mounted && <ThreeScene />}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#6366F1] opacity-[0.04] blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#818CF8] opacity-[0.02] blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-[#A78BFA] opacity-[0.015] blur-[120px] pointer-events-none" />

      {/* Content — 2-column on desktop, stacked on mobile */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1.3fr_auto] gap-12 lg:gap-16 items-center">

          {/* LEFT: Text content */}
          <div className="text-center lg:text-left">
            {/* Location + status tag */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 flex justify-center lg:justify-start"
            >
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-mono tracking-[0.2em] text-white/30 border border-white/[0.06] bg-white/[0.02]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] animate-pulse-soft" />
                {resumeData.location}
                <span className="text-white/10 mx-1">·</span>
                <Sparkles size={10} className="text-[#6366F1]/50" />
                Open to opportunities
              </span>
            </motion.div>

            {/* Name */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="text-[clamp(2.8rem,8vw,6rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white"
              >
                {firstName}
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                className="text-[clamp(2.8rem,8vw,6rem)] font-bold tracking-[-0.04em] leading-[0.95] text-accent-gradient"
              >
                {lastName}
              </motion.h1>
            </div>

            {/* Rotating title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="h-8 mb-6 flex items-center justify-center lg:justify-start"
            >
              <span className="text-base md:text-lg text-white/40 font-light tracking-tight">
                {titleWords.slice(0, currentWordIndex).join(" ")}
                {currentWordIndex > 0 && " "}
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="text-base md:text-lg text-[#818CF8] font-medium tracking-tight"
                >
                  {titleWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="text-base md:text-lg text-white/40 font-light tracking-tight">
                {currentWordIndex < titleWords.length - 1
                  ? ` ${titleWords.slice(currentWordIndex + 1).join(" ")}`
                  : ""}
              </span>
            </motion.div>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="max-w-xl mx-auto lg:mx-0 text-sm md:text-[15px] text-white/25 leading-[1.8] mb-10"
            >
              {resumeData.professionalSummary}
              {" "}
              <span className="text-white/35">{resumeData.professionalSummaryExtended}</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <MagneticButton onClick={() => scrollTo("contact")}>
                <span className="inline-flex items-center gap-2.5 px-7 py-3 bg-[#6366F1] hover:bg-[#818CF8] text-white font-medium text-sm rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_60px_rgba(99,102,241,0.15)]">
                  <Mail size={15} />
                  Get in Touch
                </span>
              </MagneticButton>
              <MagneticButton>
                <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3 border border-white/[0.08] text-white/50 hover:text-white hover:border-white/[0.15] text-sm rounded-full transition-all duration-300 hover:bg-white/[0.02]">
                  <Linkedin size={15} />
                  LinkedIn
                </a>
              </MagneticButton>
            </motion.div>
          </div>

          {/* RIGHT: Profile photo card — desktop only, hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <ProfilePhotoCard />
          </motion.div>
        </div>

        {/* Marquee keywords — full width below */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="relative overflow-hidden h-8 flex items-center mt-8"
        >
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#090909] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#090909] to-transparent z-10" />
          <div className="flex animate-marquee whitespace-nowrap">
            {[...resumeData.marqueeKeywords, ...resumeData.marqueeKeywords].map((kw, i) => (
              <span key={i} className="mx-3 text-[11px] font-mono text-white/[0.12] tracking-wider uppercase">
                {kw}
                <span className="ml-3 text-[#6366F1]/20">·</span>
              </span>
            ))}
          </div>
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

/* ═══════ Profile Photo Card — 3D tilt with photo ═══════ */
function ProfilePhotoCard() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 200, damping: 25 });
  const springY = useSpring(y, { stiffness: 200, damping: 25 });
  const rotateX = useTransform(springY, [0, 1], [8, -8]);
  const rotateY = useTransform(springX, [0, 1], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseLeave = () => { x.set(0.5); y.set(0.5); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className="relative w-[300px] h-[380px]"
      data-cursor-hover
    >
      {/* Outer glow */}
      <div className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.3), transparent 70%)" }} />

      {/* Rotating ring border */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-2 rounded-3xl pointer-events-none"
        style={{
          background: "conic-gradient(from 0deg, transparent 0deg, rgba(99,102,241,0.4) 60deg, transparent 120deg, transparent 240deg, rgba(129,140,248,0.3) 300deg, transparent 360deg)",
          maskImage: "linear-gradient(black, black)",
          WebkitMaskImage: "linear-gradient(black, black)",
        }}
      />

      {/* Photo card */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden glass-strong border border-white/[0.08]" style={{ transform: "translateZ(40px)" }}>
        {/* Profile image */}
        <motion.img
          src="/profile.png"
          alt={resumeData.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Top gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

        {/* Bottom gradient + info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p className="text-[10px] font-mono text-[#818CF8] tracking-[0.2em] uppercase mb-1">
              {resumeData.initials}
            </p>
            <p className="text-sm text-white/80 font-medium leading-tight">
              Marketing Automation Specialist
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] animate-pulse-soft" />
              <span className="text-[10px] text-white/40 font-mono">6+ years experience</span>
            </div>
          </motion.div>
        </div>

        {/* Animated border highlight */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.15), transparent 30%, transparent 70%, rgba(129,140,248,0.15))",
          }}
        />
      </div>

      {/* Floating accent dots */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-3 -right-3 w-3 h-3 rounded-full bg-[#6366F1]/40 blur-[1px]"
      />
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full bg-[#818CF8]/30 blur-[1px]"
      />
    </motion.div>
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
      data-cursor-hover
    >
      {children}
    </motion.div>
  );
}