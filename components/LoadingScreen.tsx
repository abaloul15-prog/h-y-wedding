"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { COUPLE } from "@/lib/data/couple";

interface LoadingScreenProps {
  onComplete: () => void;
  minimumMs?: number;
}

export default function LoadingScreen({
  onComplete,
  minimumMs = 2200,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const next = Math.min(100, (elapsed / minimumMs) * 100);
      setProgress(next);

      if (next < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setIsDone(true), 300);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [minimumMs]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isDone && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="flex flex-col items-center gap-10 px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-2xl tracking-[0.3em] text-champagne md:text-3xl"
            >
              {COUPLE.monogram}
            </motion.div>

            <div className="flex flex-col items-center gap-4">
              <div className="h-px w-40 overflow-hidden bg-ivory/10 md:w-56">
                <motion.div
                  className="h-full bg-gradient-to-r from-champagne to-gold"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <span className="font-body text-[10px] tracking-[0.4em] text-ivory/40 uppercase">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
