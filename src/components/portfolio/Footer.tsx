"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/resume-data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative">
      {/* Top divider */}
      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />

      <div className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Top: Quick stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-8"
          >
            {resumeData.stats.slice(0, 4).map((stat) => (
              <span key={stat.label} className="text-[10px] font-mono text-white/10">
                <span className="text-[#818CF8]/40">{stat.value}</span>{" "}
                {stat.label}
              </span>
            ))}
          </motion.div>

          {/* Bottom: Copyright + tagline */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-[11px] text-white/15 font-mono">
              © {currentYear} {resumeData.name}
            </span>
            <span className="text-[11px] text-white/10">
              Built with precision.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}