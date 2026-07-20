"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { resumeData } from "@/lib/resume-data";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
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

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isHidden ? -100 : 0, opacity: isHidden ? 0 : 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div className={`max-w-md w-full flex items-center justify-between rounded-full px-2 py-1.5 transition-all duration-500 pointer-events-auto ${
          isScrolled
            ? "bg-[rgba(9,9,9,0.75)] backdrop-blur-2xl border border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-transparent border border-transparent"
        }`}>
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="text-white font-semibold tracking-tight text-sm pl-3 pr-2"
            whileHover={{ scale: 1.03 }}
          >
            {resumeData.name.split(" ").slice(0, 2).join(" ")}
          </motion.a>
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = activeSection === link.href.replace("#", "");
              return (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-3 py-1.5 text-[13px] transition-colors duration-300 ${
                    active ? "text-[#818CF8]" : "text-white/40 hover:text-white/80"
                  }`}
                  whileHover={{ y: -1 }}
                >
                  {link.label}
                  <AnimatePresence>
                    {active && (
                      <motion.span
                        layoutId="navDot"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#818CF8]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
          <button className="md:hidden text-white/50 hover:text-white p-2" onClick={() => setIsMobileOpen(!isMobileOpen)} aria-label="Menu">
            {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

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