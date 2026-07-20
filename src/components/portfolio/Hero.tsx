"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { resumeData } from "@/lib/resume-data";
import ParticleField from "./ParticleField";

function MagneticButton({ children, className, onClick, href }: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      ref={ref as React.RefObject<HTMLButtonElement & HTMLAnchorElement>}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onClick={onClick}
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </Tag>
  );
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -6;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 6;
    setTilt({ rotateX: rx, rotateY: ry });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
      animate={tilt}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      style={{ transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const orbX1 = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);
  const orbY1 = useTransform(mouseY, [-0.5, 0.5], [-30, 30]);
  const orbX2 = useTransform(mouseX, [-0.5, 0.5], [20, -20]);
  const orbY2 = useTransform(mouseY, [-0.5, 0.5], [20, -20]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ambient orbs — mouse parallax */}
      <motion.div
        style={{ x: orbX1, y: orbY1 }}
        className="ambient-orb w-[600px] h-[600px] bg-[#c8ff00] top-[-250px] left-[-150px] opacity-[0.035]"
      />
      <motion.div
        style={{ x: orbX2, y: orbY2 }}
        className="ambient-orb w-[500px] h-[500px] bg-[#00d4ff] bottom-[-200px] right-[-150px] opacity-[0.03]"
      />
      <motion.div
        style={{ x: orbX1, y: orbY2 }}
        className="ambient-orb w-[300px] h-[300px] bg-[#a78bfa] top-[40%] right-[10%] opacity-[0.015]"
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Particle field */}
      <ParticleField />

      {/* Floating geometric shapes — more elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large rotating ring */}
        <div className="absolute top-[15%] right-[10%] w-32 h-32 md:w-44 md:h-44 border border-white/[0.03] rounded-full animate-spin-slow" />
        <div className="absolute top-[15%] right-[10%] w-20 h-20 md:w-28 md:h-28 border border-[#c8ff00]/[0.04] rounded-full animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }} />

        {/* Floating cards */}
        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] right-[18%] w-16 h-20 md:w-20 md:h-24 glass rounded-lg rotate-12 hidden sm:block"
        />
        <motion.div
          animate={{ y: [10, -20, 10], rotate: [0, -2, 2, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[30%] left-[8%] w-14 h-18 md:w-18 md:h-22 glass rounded-lg -rotate-6 hidden sm:block"
        />

        {/* Geometric shapes */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[25%] left-[15%] w-6 h-6 border border-[#c8ff00]/[0.08] rotate-45"
        />
        <motion.div
          animate={{ y: [8, -12, 8], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] right-[20%] w-4 h-4 border border-[#00d4ff]/[0.08] rounded-sm"
        />

        {/* Glowing dots */}
        <div className="absolute top-[60%] right-[25%] w-2 h-2 bg-[#c8ff00]/20 rounded-full animate-pulse-glow" />
        <div className="absolute top-[30%] left-[20%] w-1.5 h-1.5 bg-[#00d4ff]/20 rounded-full animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[75%] left-[30%] w-1 h-1 bg-[#a78bfa]/30 rounded-full animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[45%] right-[8%] w-2.5 h-2.5 bg-[#c8ff00]/10 rounded-full animate-pulse-glow" style={{ animationDelay: "3s" }} />

        {/* Animated dashed line */}
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute top-[50%] left-0 right-0 h-px opacity-[0.03]"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.3) 4px, rgba(255,255,255,0.3) 8px)",
          }}
        />

        {/* Diamond shapes */}
        <motion.div
          animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[12%] left-[40%] w-3 h-3 border border-white/[0.04] rotate-45"
        />
        <motion.div
          animate={{ rotate: [360, 0], scale: [1, 0.8, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[15%] left-[45%] w-2 h-2 border border-[#c8ff00]/[0.06] rotate-45"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider text-white/40 glass border border-white/[0.04]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8ff00] animate-pulse" />
            {resumeData.location}
          </span>
        </motion.div>

        {/* Name — staggered word reveal */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[0.95]"
          >
            <span className="text-white inline-block">{resumeData.name.split(" ").slice(0, 2).join(" ")}</span>
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[0.95]"
          >
            <span className="text-gradient inline-block animate-gradient">{resumeData.name.split(" ").slice(2).join(" ")}</span>
          </motion.h1>
        </div>

        {/* Title — typewriter line reveal */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="overflow-hidden mx-auto max-w-xl mb-6"
        >
          <p className="text-lg sm:text-xl md:text-2xl text-white/50 font-light tracking-tight whitespace-nowrap">
            {resumeData.title}
          </p>
        </motion.div>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          className="max-w-2xl mx-auto text-sm sm:text-base text-white/30 leading-relaxed mb-10"
        >
          {resumeData.professionalSummary}
        </motion.p>

        {/* CTA Buttons — with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <TiltCard>
            <MagneticButton
              onClick={scrollToContact}
              className="group relative px-8 py-3.5 bg-[#c8ff00] text-[#050507] font-medium text-sm rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(200,255,0,0.25)] cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Mail size={16} />
                Get in Touch
              </span>
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 rounded-full overflow-hidden"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </motion.div>
            </MagneticButton>
          </TiltCard>

          <MagneticButton
            href={resumeData.linkedin}
            className="px-8 py-3.5 glass rounded-full text-sm text-white/60 hover:text-white transition-colors duration-300 hover:border-white/10 block text-center"
          >
            LinkedIn Profile
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator — more dynamic */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/20"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/10 flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-[#c8ff00]/60"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}