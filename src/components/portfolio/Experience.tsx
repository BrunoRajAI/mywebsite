"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, Building2, Calendar, MapPin } from "lucide-react";
import { resumeData } from "@/lib/resume-data";

function ExperienceCard({
  exp,
  index,
  isInView,
}: {
  exp: (typeof resumeData.experience)[0];
  index: number;
  isInView: boolean;
}) {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2 + index * 0.15,
      }}
      className="glass rounded-2xl overflow-hidden hover:border-white/[0.08] transition-colors duration-500"
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 md:p-8 flex items-start md:items-center justify-between gap-4 text-left group"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
            <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-[#c8ff00] transition-colors">
              {exp.company}
            </h3>
            <div className="flex items-center gap-3 text-xs text-white/30">
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {exp.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {exp.duration}
              </span>
            </div>
          </div>
          <p className="text-sm text-white/40 font-light">{exp.designation}</p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white/20 mt-1 md:mt-0 shrink-0"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      {/* Expandable Content */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="px-6 md:px-8 pb-6 md:pb-8 space-y-6">
          {exp.responsibilities.map((group, gi) => (
            <div key={gi}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c8ff00]/60" />
                <span className="text-xs font-mono tracking-[0.1em] text-[#c8ff00]/60 uppercase">
                  {group.category}
                </span>
              </div>
              <ul className="space-y-3 pl-4">
                {group.items.map((item, ii) => (
                  <motion.li
                    key={ii}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isOpen ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: gi * 0.1 + ii * 0.04, duration: 0.4 }}
                    className="flex items-start gap-3 text-sm text-white/45 leading-relaxed"
                  >
                    <span className="mt-2 w-[3px] h-[3px] rounded-full bg-white/15 shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section-padding relative" ref={ref}>
      {/* Ambient accent */}
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-[#c8ff00] opacity-[0.015] blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="section-line" />
            <span className="text-xs font-mono tracking-[0.2em] text-white/30 uppercase">Experience</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Professional Journey
          </h2>
        </motion.div>

        {/* Timeline line */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#c8ff00]/20 via-white/5 to-transparent hidden md:block" />

          <div className="space-y-6">
            {resumeData.experience.map((exp, i) => (
              <div key={i} className="relative md:pl-0">
                <ExperienceCard exp={exp} index={i} isInView={isInView} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}