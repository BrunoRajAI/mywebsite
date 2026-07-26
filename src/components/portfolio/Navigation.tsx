"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { resumeData } from "@/lib/resume-data";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Impact", href: "#stats" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const updateScrollState = useCallback(() => {
    const y = window.scrollY;
    setIsScrolled(y > 50);
    setIsHidden(y > lastScrollY.current && y > 100);
    lastScrollY.current = y;
    for (let i = navLinks.length - 1; i >= 0; i--) {
      const el = document.getElementById(navLinks[i].href.replace("#", ""));
      if (el && el.getBoundingClientRect().top <= 200) {
        setActiveSection(navLinks[i].href.replace("#", ""));
        break;
      }
    }
    ticking.current = false;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScrollState);
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateScrollState]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const scrollTo = (href: string) => {
    setIsMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  // Short brand name — first name only, never wraps
  const brandName = resumeData.name.split(" ")[0];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isHidden ? -100 : 0, opacity: isHidden ? 0 : 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        {/* ─── Pill container: w-fit + max-w-[95vw] keeps it centered & never overflowing ─── */}
        <div
          className={`w-fit max-w-[95vw] flex items-center justify-between gap-3 sm:gap-4 md:gap-5 lg:gap-6 rounded-full pl-2 pr-3 py-2 transition-all duration-500 pointer-events-auto ${
            isScrolled
              ? "bg-[rgba(9,9,9,0.75)] backdrop-blur-2xl border border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* ─── BRAND: avatar + name — own flex container, never wraps, never shrinks ─── */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2.5 flex-shrink-0 pl-1.5 pr-1 group whitespace-nowrap"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative shrink-0">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-[#6366F1]/60 to-[#818CF8]/30 blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src="/profile.png"
                alt={resumeData.name}
                className="relative w-8 h-8 rounded-full object-cover border border-white/10"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#6366F1] border-2 border-[#090909]" />
            </div>
            <span className="text-white font-semibold tracking-tight text-sm whitespace-nowrap hidden sm:inline">
              {brandName}
            </span>
          </motion.a>

          {/* ─── Subtle vertical divider — premium separation between brand & nav ─── */}
          <div className="hidden md:block w-px h-6 bg-white/[0.08] flex-shrink-0" />

          {/* ─── DESKTOP NAV: gap-4 tablet, gap-8 desktop ─── */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link) => {
              const active = activeSection === link.href.replace("#", "");
              return (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-1 py-1.5 text-[13px] font-medium tracking-tight whitespace-nowrap transition-colors duration-300 ${
                    active ? "text-[#818CF8]" : "text-white/50 hover:text-white/90"
                  }`}
                  whileHover={{ y: -1 }}
                >
                  {link.label}
                  <AnimatePresence>
                    {active && (
                      <motion.span
                        layoutId="navDot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#818CF8]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          {/* ─── MOBILE hamburger ─── */}
          <button
            className="md:hidden text-white/60 hover:text-white p-2 flex-shrink-0"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Menu"
          >
            {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* ─── MOBILE fullscreen menu ─── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[rgba(9,9,9,0.95)] backdrop-blur-2xl md:hidden flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-2xl font-light text-white/60 hover:text-[#818CF8] transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
            <button onClick={() => setIsMobileOpen(false)} className="absolute top-6 right-6 text-white/40 hover:text-white p-2" aria-label="Close">
              <X size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
