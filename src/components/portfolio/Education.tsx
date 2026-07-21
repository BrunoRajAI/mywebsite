"use client";

import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen } from "lucide-react";
import { resumeData } from "@/lib/resume-data";

export default function Education() {
  const cardRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(shimmerRef, { once: true, margin: "-100px" });

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, [0, 1], [4, -4]);
  const rotateY = useTransform(springX, [0, 1], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseLeave = () => { x.set(0.5); y.set(0.5); };

  return (
    <section id="education" className="section-pad">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Education</span>
          <div className="section-line mt-2" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-4">
            Academic Background
          </h2>
        </motion.div>

        {/* Education card */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-2xl p-8 mt-12 relative overflow-hidden group hover:border-[#6366F1]/10 transition-colors duration-500"
        >
          {/* Shimmer effect */}
          <div ref={shimmerRef} className="absolute inset-0 pointer-events-none">
            {isInView && (
              <div className="absolute top-0 left-0 w-1/3 h-full" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.015), transparent)", animation: "shimmer 1.5s linear forwards" }} />
            )}
          </div>

          {/* Hover glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />

          <div className="relative z-10 flex items-start gap-5">
            <div className="w-11 h-11 rounded-xl bg-[#6366F1]/10 group-hover:bg-[#6366F1]/20 flex items-center justify-center shrink-0 transition-colors duration-500">
              <GraduationCap className="w-5 h-5 text-[#818CF8]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white transition-colors duration-300 hover:text-[#818CF8]/80">
                {resumeData.education[0].degree}
              </h3>
              <p className="text-xs text-white/30 font-mono tracking-[0.15em] uppercase mt-2">
                {resumeData.name}
              </p>
              {/* Foundation note */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.03]">
                <BookOpen size={12} className="text-white/15" />
                <p className="text-[12px] text-white/20 leading-relaxed">
                  Foundation in Information Technology, combining business acumen with technical skills — applied directly to marketing automation, data analysis, and API-driven workflows throughout career.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}