"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, type FormEvent } from "react";
import { COUPLE } from "@/lib/data/couple";

interface PasswordGateProps {
  onAuthenticate: (input: string) => Promise<boolean>;
}

export default function PasswordGate({ onAuthenticate }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError(false);

      const success = await onAuthenticate(password);

      if (!success) {
        setError(true);
        setIsSubmitting(false);
      }
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
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-[20%]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(216,195,160,0.14) 0%, rgba(180,145,92,0.06) 45%, rgba(9,9,9,1) 80%)",
            }}
          />
          <div className="grain-overlay absolute inset-0" />
        </div>

        <div className="relative z-10 flex flex-col items-center px-6 text-center">
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
                className="absolute inset-0 rounded-full border border-champagne/25"
              />
              <span className="font-display text-3xl tracking-[0.2em] text-ivory md:text-4xl">
                {COUPLE.monogram}
              </span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-display text-sm tracking-[0.35em] text-ivory/70 uppercase md:text-base"
          >
            {COUPLE.fullName}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mt-3 font-body text-xs tracking-[0.25em] text-champagne uppercase"
          >
            {COUPLE.weddingDate}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="mt-16 w-full max-w-xs"
          >
            <p className="font-accent mb-3 text-lg italic text-ivory md:text-xl">
              Welcome.
            </p>

            <p className="mb-8 font-body text-sm leading-relaxed text-ivory/60">
              You have been invited to witness the official story of
              <br />
              <span className="text-ivory">
                {COUPLE.fullName}
              </span>
              .
              <br />
              Enter your invitation code to continue.
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
                  placeholder="Invitation Code"
                  aria-label="Invitation code"
                  className={`w-full border-b bg-transparent px-2 py-3 text-center font-body text-sm tracking-[0.3em] text-ivory placeholder:text-ivory/30 outline-none transition-colors duration-500 ${
                    error
                      ? "border-red-400/60"
                      : "border-champagne/30 focus:border-champagne"
                  }`}
                  autoComplete="off"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || !password}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full overflow-hidden py-4 font-body text-xs tracking-[0.35em] text-ivory uppercase transition-opacity disabled:opacity-40"
              >
                <span className="relative z-10">
                  {isSubmitting
                    ? "Opening the Archive..."
                    : "Enter the Archive"}
                </span>

                <motion.span
                  className="absolute inset-x-0 bottom-0 h-px bg-champagne"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs leading-relaxed text-red-400/80"
                  >
                    This invitation code could not be verified.
                    <br />
                    Please check your invitation and try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-20 font-body text-[10px] tracking-[0.3em] text-ivory/30 uppercase"
          >
            Private Invitation • Reserved for Family & Friends
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}