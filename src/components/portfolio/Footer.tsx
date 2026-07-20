"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/resume-data";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[11px] text-white/15 font-mono">&copy; {new Date().getFullYear()} {resumeData.name}. All rights reserved.</motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[11px] text-white/10">Crafted with precision</motion.p>
      </div>
    </footer>
  );
}