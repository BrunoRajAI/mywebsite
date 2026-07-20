"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import { resumeData } from "@/lib/resume-data";

const WebGLScene = dynamic(() => import("./WebGLScene"), { ssr: false });

function MagneticButton({ children, className, onClick, href }: { children: React.ReactNode; className?: string; onClick?: () => void; href?: string }) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.2);
    y.set((e.clientY - r.top - r.height / 2) * 0.2);
  };
  const Tag = href ? motion.a : motion.button;
  return <Tag ref={ref as React.RefObject<never>} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0); }} onClick={onClick} href={href} target={href ? "_blank" : undefined} rel={href ? "noopener noreferrer" : undefined} style={{ x: sx, y: sy }} whileTap={{ scale: 0.97 }} className={className}>{children}</Tag>;
}

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  useEffect(() => {
    const h = (e: MouseEvent) => { mouseX.set(e.clientX / window.innerWidth - 0.5); mouseY.set(e.clientY / window.innerHeight - 0.5); };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [mouseX, mouseY]);

  const ox1 = useTransform(mouseX, [-0.5, 0.5], [-25, 25]);
  const oy1 = useTransform(mouseY, [-0.5, 0.5], [-25, 25]);
  const ox2 = useTransform(mouseX, [-0.5, 0.5], [15, -15]);
  const oy2 = useTransform(mouseY, [-0.5, 0.5], [15, -15]);

  const scrollToContact = () => { const el = document.getElementById("contact"); if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" }); };
  const firstName = resumeData.name.split(" ").slice(0, 2).join(" ");
  const lastName = resumeData.name.split(" ").slice(2).join(" ");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <WebGLScene />
      <motion.div style={{ x: ox1, y: oy1 }} className="absolute w-[600px] h-[600px] rounded-full bg-[#4F8FFF] top-[-300px] left-[-200px] opacity-[0.025] blur-[150px] pointer-events-none" />
      <motion.div style={{ x: ox2, y: oy2 }} className="absolute w-[400px] h-[400px] rounded-full bg-[#7C5CFC] bottom-[-200px] right-[-150px] opacity-[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[12%] w-36 h-36 border border-white/[0.025] rounded-full animate-spin-slow" />
        <div className="absolute bottom-[25%] left-[8%] w-20 h-20 border border-[#4F8FFF]/[0.04] rounded-xl rotate-12 animate-float-slow" />
        <motion.div animate={{ y: [-8, 8, -8], rotate: [0, 90, 180, 270, 360] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute top-[35%] left-[18%] w-4 h-4 border border-white/[0.03] rotate-45" />
        <div className="absolute top-[65%] right-[20%] w-1.5 h-1.5 bg-[#4F8FFF]/15 rounded-full animate-pulse-glow" />
        <div className="absolute top-[40%] right-[8%] w-1 h-1 bg-[#7C5CFC]/20 rounded-full animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono tracking-[0.15em] text-white/30 glass">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F8FFF] animate-pulse" />{resumeData.location}
          </span>
        </motion.div>
        <div className="overflow-hidden mb-4"><motion.h1 initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }} className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold tracking-[-0.05em] leading-[0.9] text-white">{firstName}</motion.h1></div>
        <div className="overflow-hidden mb-8"><motion.h1 initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold tracking-[-0.05em] leading-[0.9] text-gradient animate-gradient inline-block">{lastName}</motion.h1></div>
        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.35 }} className="overflow-hidden mx-auto max-w-lg mb-8">
          <p className="text-base sm:text-lg md:text-xl text-white/40 font-light tracking-tight whitespace-nowrap">{resumeData.title}</p>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 20, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }} className="max-w-2xl mx-auto text-sm text-white/25 leading-relaxed mb-12">{resumeData.professionalSummary}</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.65 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <MagneticButton onClick={scrollToContact} className="group relative px-8 py-3.5 bg-white text-[#090909] font-medium text-sm rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(79,143,255,0.15)] cursor-pointer">
            <span className="relative z-10 flex items-center gap-2"><Mail size={16} />Get in Touch</span>
            <motion.div className="absolute inset-0 rounded-full overflow-hidden" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.6 }}><div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4F8FFF]/20 to-transparent" /></motion.div>
          </MagneticButton>
          <MagneticButton href={resumeData.linkedin} className="px-8 py-3.5 glass rounded-full text-sm text-white/50 hover:text-white transition-colors duration-300 hover:border-white/10 block text-center">LinkedIn</MagneticButton>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2 text-white/15">
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-4 h-7 rounded-full border border-white/8 flex justify-center pt-1.5"><motion.div animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-0.5 h-1 rounded-full bg-[#4F8FFF]/50" /></div>
        </motion.div>
      </motion.div>
    </section>
  );
}