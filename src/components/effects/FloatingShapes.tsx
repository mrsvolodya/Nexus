"use client";

import { motion } from "motion/react";

/**
 * Abstract floating orbs — subtle, slow, GPU-friendly.
 */
export function FloatingShapes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-20 -left-24 h-[340px] w-[340px] rounded-full bg-primary/25 blur-[120px]"
        animate={{ y: [0, 18, 0], x: [0, 12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-24 h-[380px] w-[380px] rounded-full bg-accent/25 blur-[130px]"
        animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[260px] w-[260px] rounded-full bg-brand-cyan/15 blur-[110px]"
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
