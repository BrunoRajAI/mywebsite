"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Briefcase, Zap } from "lucide-react";
import { resumeData } from "@/lib/resume-data";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="md:col-span-2 glass rounded-2xl p-8 md:p-10 relative overflow-hidden group hover:border-white/[0.08] transition-colors duration-500"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#c8ff00] opacity-[0.02] blur-[100px] group-hover:opacity-[0.04] transition-opacity duration-700" />
            <p className="text-white/60 leading-[1.8] text-[15px] relative z-10">
              {resumeData.professionalSummary}
            </p>
          </motion.div>

          {/* Info Cards */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="glass rounded-2xl p-6 flex items-start gap-4 hover:border-white/[0.08] transition-colors duration-500"
            >
              <div className="w-10 h-10 rounded-xl bg-[#c8ff00]/10 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-[#c8ff00]" />
              </div>
              <div>
                <p className="text-xs text-white/30 mb-1 font-mono uppercase tracking-wider">Location</p>
                <p className="text-white/80 text-sm">{resumeData.location}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="glass rounded-2xl p-6 flex items-start gap-4 hover:border-white/[0.08] transition-colors duration-500"
            >
              <div className="w-10 h-10 rounded-xl bg-[#c8ff00]/10 flex items-center justify-center shrink-0">
                <Briefcase size={18} className="text-[#c8ff00]" />
              </div>
              <div>
                <p className="text-xs text-white/30 mb-1 font-mono uppercase tracking-wider">Experience</p>
                <p className="text-white/80 text-sm">6+ Years in Digital Marketing</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="glass rounded-2xl p-6 flex items-start gap-4 hover:border-white/[0.08] transition-colors duration-500"
            >
              <div className="w-10 h-10 rounded-xl bg-[#c8ff00]/10 flex items-center justify-center shrink-0">
                <Zap size={18} className="text-[#c8ff00]" />
              </div>
              <div>
                <p className="text-xs text-white/30 mb-1 font-mono uppercase tracking-wider">Specialization</p>
                <p className="text-white/80 text-sm">AI-Powered Marketing Automation</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Key Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="mt-10 glass rounded-2xl p-8 md:p-10"
        >
          <h3 className="text-sm font-mono tracking-[0.15em] text-white/30 uppercase mb-6">Key Achievements</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {resumeData.achievements.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#c8ff00]/50 shrink-0" />
                <p className="text-sm text-white/50 leading-relaxed">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}