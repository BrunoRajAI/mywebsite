"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";
import { resumeData } from "@/lib/resume-data";

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section id="education" className="section-padding relative" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px section-sweep origin-left" style={{ background: "linear-gradient(90deg, transparent, rgba(200,255,0,0.15), transparent)" }} />

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
          onMouseMove={handleMouse}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="glass rounded-2xl p-8 md:p-10 hover:border-white/[0.08] transition-all duration-500 cursor-default group relative overflow-hidden"
        >
          {/* Hover glow */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: "radial-gradient(circle at 30% 50%, rgba(200,255,0,0.03), transparent 60%)" }}
          />
          {/* Shimmer sweep */}
          <motion.div
            initial={{ x: "-100%" }}
            whileInView={{ x: "200%" }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.02] to-transparent"
          />
          <div className="flex items-start gap-5 relative z-10">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 rounded-xl bg-[#c8ff00]/10 group-hover:bg-[#c8ff00]/15 flex items-center justify-center shrink-0 transition-colors"
            >
              <GraduationCap size={22} className="text-[#c8ff00]" />
            </motion.div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-[#c8ff00]/80 transition-colors duration-500">
                {resumeData.education[0].degree}
              </h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}