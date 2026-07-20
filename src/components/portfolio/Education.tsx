"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";
import { resumeData } from "@/lib/resume-data";

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="section-padding relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="section-line" />
            <span className="text-xs font-mono tracking-[0.2em] text-white/30 uppercase">Education</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Academic Background
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="glass rounded-2xl p-8 md:p-10 hover:border-white/[0.08] transition-colors duration-500"
        >
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-[#c8ff00]/10 flex items-center justify-center shrink-0">
              <GraduationCap size={22} className="text-[#c8ff00]" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-1">
                {resumeData.education[0].degree}
              </h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}