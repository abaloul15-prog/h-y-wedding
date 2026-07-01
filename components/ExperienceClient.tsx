"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import PasswordGate from "./PasswordGate";
import SmoothScroll from "./SmoothScroll";
import HeroFilm from "./HeroFilm";
import FullscreenVideo from "./FullscreenVideo";
import MemoryCollage from "./MemoryCollage";
import EditorialGallery from "./EditorialGallery";
import QuoteSection from "./QuoteSection";
import FooterExperience from "./FooterExperience";
import { videos } from "@/lib/videos";

export default function ExperienceClient() {
  const { isAuthenticated, isLoading, authenticate } = useAuth();

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-ivory">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-display text-sm tracking-[0.3em] text-champagne uppercase"
        >
          Loading
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {!isAuthenticated && (
          <PasswordGate key="gate" onAuthenticate={authenticate} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAuthenticated && (
          <motion.div
            key="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <SmoothScroll>
              <main>
                <HeroFilm />
                <FullscreenVideo config={videos.VIDEO_01} variant="primary" />
                <MemoryCollage />
                <FullscreenVideo config={videos.VIDEO_02} variant="finale" />
                <EditorialGallery />
                <QuoteSection
                  lines={[
                    "Some memories fade.",
                    "Others become part of who we are.",
                  ]}
                />
                <FooterExperience />
              </main>
            </SmoothScroll>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
