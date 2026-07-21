"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Linkedin, ArrowUpRight } from "lucide-react";
import { resumeData } from "@/lib/resume-data";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: resumeData.email,
    href: `mailto:${resumeData.email}`,
    external: false,
    description: "For project inquiries and collaboration opportunities",
  },
  {
    icon: Phone,
    label: "Phone",
    value: resumeData.phone,
    href: `tel:${resumeData.phone}`,
    external: false,
    description: "Available during business hours (IST)",
  },
  {
    icon: MapPin,
    label: "Location",
    value: resumeData.location,
    href: undefined,
    external: false,
    description: "Open to remote and on-site opportunities",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/bruno-lionel-raj",
    href: resumeData.linkedin,
    external: true,
    description: "Connect for professional networking",
  },
];

function ContactCard({
  item,
  index,
}: {
  item: (typeof contactItems)[number];
  index: number;
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

  const Icon = item.icon;
  const Tag = item.href ? "a" : "div";

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 + index * 0.08 }}
    >
      <Tag
        {...(item.href
          ? { href: item.href, target: item.external ? "_blank" : undefined, rel: item.external ? "noopener noreferrer" : undefined }
          : {})}
        className="glass rounded-2xl p-6 md:p-8 flex items-start gap-4 group hover:border-white/[0.08] transition-all duration-500 cursor-pointer block relative overflow-hidden"
        data-cursor-hover
      >
        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(circle at 30% 50%, rgba(99,102,241,0.04), transparent 60%)" }} />

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 + index * 0.08, duration: 0.6 }}
          className="absolute bottom-0 left-4 right-4 h-px origin-left"
          style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.12), transparent)" }}
        />

        {/* Icon */}
        <motion.div
          whileHover={{ rotate: [0, -6, 6, 0], scale: 1.1 }}
          transition={{ duration: 0.4 }}
          className="w-11 h-11 rounded-xl bg-[#6366F1]/10 group-hover:bg-[#6366F1]/20 flex items-center justify-center shrink-0 transition-all duration-500"
        >
          <Icon size={20} className="text-[#818CF8]" />
        </motion.div>

        {/* Text */}
        <div className="flex-1 min-w-0 relative z-10">
          <p className="text-[10px] text-white/20 font-mono uppercase tracking-[0.12em] mb-0.5">
            {item.label}
          </p>
          <p className="text-sm text-white/55 group-hover:text-white/75 transition-colors truncate">
            {item.value}
          </p>
          <p className="text-[11px] text-white/15 mt-1.5 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Arrow */}
        {item.href && (
          <motion.div whileHover={{ x: 2, y: -2 }} className="shrink-0 relative z-10 mt-1">
            <ArrowUpRight size={15} className="text-white/10 group-hover:text-[#818CF8]/50 transition-colors duration-300" />
          </motion.div>
        )}
      </Tag>
    </motion.div>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="section-pad relative" ref={sectionRef}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#6366F1] opacity-[0.015] blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="section-line" style={{ transform: "scaleX(-1)" }} />
            <span className="section-label">Contact</span>
            <div className="section-line" />
          </div>

          <motion.h2
            initial={{ y: 15 }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4"
          >
            Let&apos;s{" "}
            <span className="text-accent-gradient">Connect</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white/20 text-sm max-w-lg mx-auto leading-relaxed"
          >
            Interested in digital marketing, SEO, or marketing automation?
            I&apos;m experienced in building AI-powered systems that drive real, measurable growth. Let&apos;s discuss how I can help.
          </motion.p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-5 max-w-3xl mx-auto">
          {contactItems.map((item, i) => (
            <ContactCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}