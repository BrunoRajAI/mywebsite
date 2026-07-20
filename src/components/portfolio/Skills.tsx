"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { resumeData } from "@/lib/resume-data";

const categories = [
  ...new Set(resumeData.skills.tools.map((t) => t.category)),
];

function SkillOrb({ name, delay, size = "md" }: { name: string; delay: number; size?: "sm" | "md" }) {
  const [isHovered, setIsHovered] = useState(false);
  const sizeClasses = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-default"
    >
      <motion.div
        whileHover={{ y: -4, scale: 1.05 }}
        className={`${sizeClasses} rounded-full glass border border-white/[0.04] text-white/50 
          hover:text-[#c8ff00] hover:border-[#c8ff00]/20 hover:bg-[#c8ff00]/[0.04] 
          transition-all duration-300 whitespace-nowrap`}
      >
        {name}
      </motion.div>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-white/20 font-mono whitespace-nowrap"
        >
          {name}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#c8ff00] opacity-[0.01] blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="section-line" />
            <span className="text-xs font-mono tracking-[0.2em] text-white/30 uppercase">Skills</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Tools & Technologies
          </h2>
        </motion.div>

        {/* Competencies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="glass rounded-2xl p-8 md:p-10 mb-10"
        >
          <h3 className="text-sm font-mono tracking-[0.15em] text-white/30 uppercase mb-6">
            Core Competencies
          </h3>
          <div className="flex flex-wrap gap-3">
            {resumeData.skills.competencies.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.03 }}
                whileHover={{ y: -2, scale: 1.05 }}
                className="px-4 py-2 rounded-full text-sm text-white/40 border border-white/[0.04] 
                  hover:text-[#c8ff00] hover:border-[#c8ff00]/15 hover:bg-[#c8ff00]/[0.03] 
                  transition-all duration-300 cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Tools by Category */}
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, ci) => {
            const tools = resumeData.skills.tools.filter((t) => t.category === cat);
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2 + ci * 0.15,
                }}
                className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-white/[0.06] transition-colors duration-500"
              >
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#c8ff00] opacity-0 group-hover:opacity-[0.02] blur-[60px] transition-opacity duration-700 rounded-full" />
                <h3 className="text-xs font-mono tracking-[0.15em] text-white/30 uppercase mb-5 relative z-10">
                  {cat}
                </h3>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {tools.map((tool, i) => (
                    <SkillOrb key={tool.name} name={tool.name} delay={0.3 + ci * 0.1 + i * 0.04} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Floating accent shapes */}
        <div className="absolute bottom-20 left-10 w-3 h-3 border border-[#c8ff00]/10 rounded-full animate-float hidden lg:block" />
        <div className="absolute top-40 right-16 w-2 h-2 bg-[#00d4ff]/10 rounded-full animate-float-slow hidden lg:block" />
      </div>
    </section>
  );
}