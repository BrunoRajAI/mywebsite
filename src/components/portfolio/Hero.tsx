"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { resumeData } from "@/lib/resume-data";
import ParticleField from "./ParticleField";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ambient orbs */}
      <div className="ambient-orb w-[500px] h-[500px] bg-[#c8ff00] top-[-200px] left-[-100px] opacity-[0.03]" />
      <div className="ambient-orb w-[400px] h-[400px] bg-[#00d4ff] bottom-[-150px] right-[-100px] opacity-[0.025]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Particle field */}
      <ParticleField />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[15%] w-20 h-20 border border-white/[0.04] rounded-xl rotate-12 animate-float-slow" />
        <div className="absolute bottom-[25%] left-[10%] w-16 h-16 border border-[#c8ff00]/[0.06] rounded-full animate-float" />
        <div className="absolute top-[60%] right-[25%] w-2 h-2 bg-[#c8ff00]/20 rounded-full animate-pulse-glow" />
        <div className="absolute top-[30%] left-[20%] w-1.5 h-1.5 bg-[#00d4ff]/20 rounded-full animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider text-white/40 glass border border-white/[0.04]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8ff00] animate-pulse" />
            {resumeData.location}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[0.95] mb-6"
        >
          <span className="text-white">{resumeData.name.split(" ").slice(0, 2).join(" ")}</span>
          <br />
          <span className="text-gradient">{resumeData.name.split(" ").slice(2).join(" ")}</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="text-lg sm:text-xl md:text-2xl text-white/50 font-light tracking-tight mb-6"
        >
          {resumeData.title}
        </motion.p>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="max-w-2xl mx-auto text-sm sm:text-base text-white/30 leading-relaxed mb-10"
        >
          {resumeData.professionalSummary}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 py-3.5 bg-[#c8ff00] text-[#050507] font-medium text-sm rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(200,255,0,0.2)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Mail size={16} />
              Get in Touch
            </span>
          </motion.button>

          <motion.a
            href={resumeData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3.5 glass rounded-full text-sm text-white/60 hover:text-white transition-colors duration-300 hover:border-white/10"
          >
            LinkedIn Profile
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
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
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}