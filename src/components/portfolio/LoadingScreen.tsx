"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 2400;
    const interval = 16;
    const steps = duration / interval;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const eased = 1 - Math.pow(1 - step / steps, 4);
      setProgress(Math.min(eased * 100, 100));
      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => { setIsVisible(false); setTimeout(onComplete, 500); }, 200);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#090909]"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#4F8FFF] opacity-[0.03] blur-[140px]" />
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="relative mb-10">
            <div className="text-5xl md:text-6xl font-bold tracking-[-0.04em] text-white">BR</div>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }} className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4F8FFF] to-transparent origin-left" />
          </motion.div>
          <div className="w-40 h-px bg-white/5 rounded-full overflow-hidden">
            <motion.div className="h-full bg-[#4F8FFF] rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 text-[10px] font-mono text-white/15 tracking-[0.3em] uppercase">{Math.round(progress)}%</motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}