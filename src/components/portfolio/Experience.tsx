"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, Calendar, MapPin } from "lucide-react";
import { resumeData } from "@/lib/resume-data";

function TiltCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [5, -5]),
    { stiffness: 200, damping: 25 }
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-5, 5]),
    { stiffness: 200, damping: 25 }
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof resumeData.experience)[0];
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <TiltCard
      delay={0.2 + index * 0.12}
      className="glass rounded-2xl overflow-hidden hover:border-white/[0.08] transition-colors duration-500"
    >
      {/* Card Header - Clickable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 md:p-8 flex items-start md:items-center justify-between gap-4 text-left group cursor-pointer"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
            <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-[#818CF8] transition-colors duration-300">
              {exp.company}
            </h3>
            <div className="flex items-center gap-3 text-xs text-white/25">
              <span className="flex items-center gap-1.5">
                <MapPin size={11} />
                {exp.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={11} />
                {exp.duration}
              </span>
            </div>
          </div>
          <p className="text-sm text-white/35 font-light">{exp.designation}</p>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/15 mt-1 md:mt-0 shrink-0"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      {/* Expandable Content */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="px-6 md:px-8 pb-6 md:pb-8 space-y-6">
          {exp.responsibilities.map((group, gi) => (
            <div key={gi}>
              {/* Category Label */}
              <div className="flex items-center gap-2 mb-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isOpen ? { scale: 1 } : {}}
                  transition={{
                    delay: gi * 0.12 + 0.08,
                    type: "spring",
                    stiffness: 300,
                  }}
                  className="w-1.5 h-1.5 rounded-full bg-[#6366F1]/50"
                />
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={isOpen ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: gi * 0.12 + 0.12 }}
                  className="text-xs font-mono text-[#6366F1]/50 uppercase tracking-wider"
                >
                  {group.category}
                </motion.span>
              </div>

              {/* Responsibility Items */}
              <ul className="space-y-2.5 pl-4">
                {group.items.map((item, ii) => (
                  <motion.li
                    key={ii}
                    initial={{ opacity: 0, x: -12 }}
                    animate={isOpen ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: gi * 0.08 + ii * 0.04 + 0.08,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-start gap-3 text-sm text-white/35 leading-relaxed hover:text-white/50 transition-colors"
                  >
                    <span className="mt-[7px] w-[3px] h-[3px] rounded-full bg-white/10 shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </TiltCard>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section-pad relative" ref={sectionRef}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#6366F1] opacity-[0.012] blur-[140px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="section-line" />
            <span className="section-label">Experience</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Professional Journey
          </h2>
        </motion.div>

        {/* Timeline + Cards */}
        <div className="relative">
          {/* Timeline gradient border - hidden on mobile */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#6366F1]/20 via-white/[0.03] to-transparent hidden md:block" />

          <div className="space-y-5">
            {resumeData.experience.map((exp, i) => (
              <div key={i} className="relative">
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.3 + i * 0.12,
                    type: "spring",
                    stiffness: 300,
                  }}
                  className="absolute left-[21px] top-8 w-[5px] h-[5px] rounded-full bg-[#6366F1]/30 border-2 border-[#090909] hidden md:block z-10"
                />
                <ExperienceCard exp={exp} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}