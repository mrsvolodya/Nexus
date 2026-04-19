"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { EASE_OUT, staggerParent, viewportOnce } from "@/utils/motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "span";
  once?: boolean;
  amount?: number;
};

const buildVariants = (y: number): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
});

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
  once = true,
  amount = 0.2,
}: RevealProps) {
  const reduce = usePrefersReducedMotion();
  const MotionTag = motion[as];

  if (reduce) return <MotionTag className={className}>{children}</MotionTag>;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={buildVariants(y)}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealStagger({
  children,
  className,
  stagger = 0.08,
  amount = viewportOnce.amount,
  once = viewportOnce.once,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={staggerParent(stagger)}
    >
      {children}
    </motion.div>
  );
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};
