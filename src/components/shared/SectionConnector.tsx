"use client";

import { motion } from "motion/react";
import { EASE_OUT } from "@/utils/motion";

/**
 * Thin animated vertical signal line with a glowing node, placed between
 * sections to provide rhythm and a sense of continuity. Pointer-through,
 * aria-hidden; purely decorative.
 */
export function SectionConnector() {
  return (
    <div
      aria-hidden
      className="pointer-events-none flex justify-center"
    >
      <motion.div
        className="relative h-20 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent"
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        viewport={{ once: true, amount: 0.6 }}
      >
        <motion.span
          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_14px_hsl(183_74%_45%_/_0.9)]"
          animate={{ scale: [1, 1.5, 1], opacity: [0.9, 0.55, 0.9] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
