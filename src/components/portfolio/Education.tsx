"use client";

import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";
import { resumeData } from "@/lib/resume-data";

/* ═══════ MAIN COMPONENT ═══════ */
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
  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

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
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            perspective: 800,
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-2xl p-8 mt-12 relative overflow-hidden"
        >
          {/* Shimmer effect */}
          <div ref={shimmerRef} className="absolute inset-0 pointer-events-none">
            {isInView && (
              <div
                className="absolute top-0 left-0 w-1/3 h-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.015), transparent)",
                  animation: "shimmer 1.5s linear forwards",
                }}
              />
            )}
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-start gap-5">
            <div className="w-11 h-11 rounded-xl bg-[#6366F1]/10 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-[#818CF8]" />
            </div>
            <div>
              <h3
                className="text-lg font-semibold text-white transition-colors duration-300 hover:text-[#818CF8]/80"
              >
                {resumeData.education[0].degree}
              </h3>
              <p className="text-xs text-white/30 font-mono tracking-[0.15em] uppercase mt-2">
                {resumeData.name}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}