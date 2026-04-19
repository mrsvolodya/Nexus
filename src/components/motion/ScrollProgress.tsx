"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Very thin gradient bar pinned to the top of the viewport that reflects
 * document scroll progress. Cheap, unobtrusive, premium.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-primary via-accent to-warm"
      style={{ scaleX }}
    />
  );
}
