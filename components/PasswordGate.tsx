"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, type FormEvent } from "react";
import { COUPLE } from "@/lib/constants";

interface PasswordGateProps {
  onAuthenticate: (input: string) => boolean;
}

export default function PasswordGate({ onAuthenticate }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError(false);

      setTimeout(() => {
        const success = onAuthenticate(password);
        if (success) {
          return;
        }
        setError(true);
        setIsSubmitting(false);
      }, 800);
    },
    [password, onAuthenticate]
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="gate"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-ivory"
      >
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-[20%] bg-gradient-radial from-candlelight/60 via-champagne/20 to-ivory"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(232,220,200,0.5) 0%, rgba(201,184,150,0.15) 45%, rgba(247,243,237,1) 80%)",
            }}
          />
          <div className="grain-overlay absolute inset-0" />
        </div>

        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          {/* Monogram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <div className="relative flex h-24 w-24 items-center justify-center md:h-28 md:w-28">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-champagne/30"
              />
              <span className="font-display text-3xl tracking-[0.2em] text-charcoal md:text-4xl">
                {COUPLE.monogram}
              </span>
            </div>
          </motion.div>

          {/* Names */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-sm tracking-[0.35em] text-silver-blue-deep uppercase md:text-base"
          >
            {COUPLE.fullName}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mt-3 font-display text-xs tracking-[0.25em] text-champagne uppercase"
          >
            {COUPLE.date}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 w-full max-w-xs"
          >
            <p className="mb-8 font-display text-lg tracking-wide text-charcoal-soft italic md:text-xl">
              You are invited to enter
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="password"
                  inputMode="numeric"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="Enter date"
                  aria-label="Private access code"
                  className={`w-full border-b bg-transparent px-2 py-3 text-center font-body text-sm tracking-[0.3em] text-charcoal placeholder:text-silver-blue/60 outline-none transition-colors duration-500 ${
                    error
                      ? "border-red-400/60"
                      : "border-champagne/40 focus:border-champagne"
                  }`}
                  autoComplete="off"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || !password}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full overflow-hidden py-4 font-display text-xs tracking-[0.35em] text-charcoal uppercase transition-opacity disabled:opacity-40"
              >
                <span className="relative z-10">
                  {isSubmitting ? "Opening..." : "Enter"}
                </span>
                <motion.span
                  className="absolute inset-x-0 bottom-0 h-px bg-champagne"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.button>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs tracking-wide text-red-400/80"
                  >
                    Incorrect code. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-20 text-[10px] tracking-[0.3em] text-silver-blue/70 uppercase"
          >
            Private & Confidential
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
