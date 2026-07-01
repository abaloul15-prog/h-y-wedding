"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import LoadingScreen from "./LoadingScreen";
import PasswordGate from "./PasswordGate";
import SmoothScroll from "./SmoothScroll";
import Navigation from "./Navigation";
import CustomCursor from "./CustomCursor";
import GrainOverlay from "./GrainOverlay";
import Hero from "./Hero";
import StorySection from "./StorySection";
import FeaturedFilm from "./FeaturedFilm";
import EditorialShowcase from "./EditorialShowcase";
import Timeline from "./Timeline";
import PrivateMemories from "./PrivateMemories";
import VideoCollection from "./VideoCollection";
import PhotoCollection from "./PhotoCollection";
import ClosingScene from "./ClosingScene";
import FooterExperience from "./FooterExperience";

export default function ExperienceClient() {
  const { isAuthenticated, isLoading, authenticate } = useAuth();
  const [showLoader, setShowLoader] = useState(true);

  if (isLoading) {
    return <div className="fixed inset-0 bg-black" />;
  }

  return (
    <>
      <CustomCursor />
      <GrainOverlay />

      <AnimatePresence mode="wait">
        {!isAuthenticated && (
          <PasswordGate key="gate" onAuthenticate={authenticate} />
        )}
      </AnimatePresence>

      {isAuthenticated && showLoader && (
        <LoadingScreen onComplete={() => setShowLoader(false)} />
      )}

      <AnimatePresence>
        {isAuthenticated && !showLoader && (
          <motion.div
            key="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <SmoothScroll>
              <Navigation />
              <main>
                <Hero />
                <StorySection />
                <FeaturedFilm />
                <EditorialShowcase />
                <Timeline />
                <PrivateMemories />
                <VideoCollection />
                <PhotoCollection />
                <ClosingScene />
              </main>
              <FooterExperience />
            </SmoothScroll>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
