"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Linkedin, ArrowUpRight } from "lucide-react";
import { resumeData } from "@/lib/resume-data";

const contactItems = [
  { icon: Mail, label: "Email", value: resumeData.email, href: `mailto:${resumeData.email}`, color: "#c8ff00" },
  { icon: Phone, label: "Phone", value: resumeData.phone, href: `tel:${resumeData.phone}`, color: "#00d4ff" },
  { icon: MapPin, label: "Location", value: resumeData.location, href: undefined, color: "#a78bfa" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/bruno-lionel-raj", href: resumeData.linkedin, color: "#c8ff00" },
];

function ContactCard({ item, index }: { item: typeof contactItems[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });
  const Icon = item.icon;

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const Wrapper = item.href ? "a" : "div";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 + index * 0.1 }}
    >
      <Wrapper
        {...(item.href
          ? {
              href: item.href,
              target: item.href.startsWith("http") ? "_blank" : undefined,
              rel: item.href.startsWith("http") ? "noopener noreferrer" : undefined,
            }
          : {})}
        className="glass rounded-2xl p-6 md:p-8 flex items-center gap-4 group hover:border-white/[0.08] transition-all duration-500 cursor-pointer block relative overflow-hidden"
      >
        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 30% 50%, ${item.color}06, transparent 60%)`,
          }}
        />
        {/* Bottom accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
          className="absolute bottom-0 left-4 right-4 h-px origin-left"
          style={{ background: `linear-gradient(90deg, ${item.color}20, transparent)` }}
        />
        <motion.div
          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
          transition={{ duration: 0.4 }}
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500"
          style={{ backgroundColor: `${item.color}10` }}
        >
          <Icon size={20} className="transition-colors duration-500" style={{ color: `${item.color}99` }} />
        </motion.div>
        <div className="flex-1 min-w-0 relative z-10">
          <p className="text-xs text-white/25 font-mono uppercase tracking-wider mb-1">{item.label}</p>
          <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors truncate">
            {item.value}
          </p>
        </div>
        {item.href && (
          <motion.div
            whileHover={{ x: 3, y: -3 }}
            className="shrink-0 relative z-10"
          >
            <ArrowUpRight size={16} className="text-white/15 group-hover:text-[#c8ff00]/50 transition-colors" />
          </motion.div>
        )}
      </Wrapper>
    </motion.div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#c8ff00] opacity-[0.02] blur-[120px] pointer-events-none" />

      {/* Floating shapes */}
      <motion.div
        animate={{ y: [-8, 12, -8], rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-16 w-6 h-6 border border-white/[0.03] rounded-lg hidden lg:block"
      />
      <motion.div
        animate={{ y: [10, -8, 10], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 left-20 w-3 h-3 bg-[#c8ff00]/10 rounded-full hidden lg:block"
      />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="section-line" />
            <span className="text-xs font-mono tracking-[0.2em] text-white/30 uppercase">Contact</span>
            <div className="section-line" style={{ transform: "scaleX(-1)" }} />
          </div>
          <motion.h2
            initial={{ y: 20 }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Let&apos;s <span className="text-gradient animate-gradient">Connect</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white/30 text-sm max-w-md mx-auto"
          >
            Interested in digital marketing, SEO, or marketing automation? Reach out and let&apos;s discuss how I can help.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
          {contactItems.map((item, i) => (
            <ContactCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}