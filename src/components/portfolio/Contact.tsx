"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Linkedin, ArrowUpRight } from "lucide-react";
import { resumeData } from "@/lib/resume-data";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: resumeData.email,
    href: `mailto:${resumeData.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: resumeData.phone,
    href: `tel:${resumeData.phone}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: resumeData.location,
    href: undefined,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/bruno-lionel-raj",
    href: resumeData.linkedin,
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#c8ff00] opacity-[0.02] blur-[120px] pointer-events-none" />

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
          <div className="section-line" style={{ transform: 'scaleX(-1)' }} />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Let&apos;s <span className="text-gradient">Connect</span>
        </h2>
        <p className="text-white/30 text-sm max-w-md mx-auto">
          Interested in digital marketing, SEO, or marketing automation? Reach out and let&apos;s discuss how I can help.
        </p>
      </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
          {contactItems.map((item, i) => {
            const Icon = item.icon;
            const Wrapper = item.href ? "a" : "div";
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2 + i * 0.1,
                }}
              >
                <Wrapper
                  {...(item.href
                    ? {
                        href: item.href,
                        target: item.href.startsWith("http") ? "_blank" : undefined,
                        rel: item.href.startsWith("http") ? "noopener noreferrer" : undefined,
                      }
                    : {})}
                  className="glass rounded-2xl p-6 md:p-8 flex items-center gap-4 group hover:border-white/[0.08] transition-all duration-500 cursor-pointer block"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#c8ff00]/[0.06] group-hover:bg-[#c8ff00]/10 flex items-center justify-center shrink-0 transition-colors duration-500">
                    <Icon size={20} className="text-[#c8ff00]/60 group-hover:text-[#c8ff00] transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/25 font-mono uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors truncate">
                      {item.value}
                    </p>
                  </div>
                  {item.href && (
                    <ArrowUpRight size={16} className="text-white/15 group-hover:text-[#c8ff00]/50 transition-colors shrink-0" />
                  )}
                </Wrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}