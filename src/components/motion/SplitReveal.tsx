"use client";

import { useMemo } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/utils/cn";
import { EASE_OUT } from "@/utils/motion";

type AllowedTag = "span" | "div" | "h1" | "h2" | "h3" | "p";

type SplitRevealProps = {
  children: string;
  as?: AllowedTag;
  className?: string;
  /**
   * Classes applied to each rendered word/char motion.span.
   * Use this for text-color utilities (e.g. `gradient-text`, `text-primary`)
   * — `background-clip: text` on a parent breaks when children introduce
   * nested overflow-hidden contexts, so the clip must live on the token.
   */
  textClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  by?: "word" | "char";
  /** Fire on scroll-into-view instead of on mount. */
  scroll?: boolean;
};

/**
 * Masked word/char reveal, Motion-variants driven.
 *  - Parent drives `staggerChildren` + `delayChildren`.
 *  - Each token is an overflow-masked wrapper + a motion.span.
 *  - Deterministic under strict-mode double-mount and SSR hydration.
 */
export function SplitReveal({
  children,
  as = "span",
  className,
  textClassName,
  delay = 0,
  stagger = 0.04,
  duration = 0.85,
  by = "word",
  scroll = false,
}: SplitRevealProps) {
  const tokens = useMemo(() => splitTokens(children, by), [children, by]);

  const parentVariants = useMemo<Variants>(
    () => ({
      hidden: {},
      visible: {
        transition: { staggerChildren: stagger, delayChildren: delay },
      },
    }),
    [stagger, delay],
  );

  const childVariants = useMemo<Variants>(
    () => ({
      hidden: { y: "110%", opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration, ease: EASE_OUT },
      },
    }),
    [duration],
  );

  const revealProps = scroll
    ? {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.3 },
      }
    : { initial: "hidden", animate: "visible" };

  const Tag = motion[as];

  return (
    <Tag
      {...revealProps}
      variants={parentVariants}
      className={cn("inline-block", className)}
      aria-label={children}
    >
      {tokens.map((t, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-baseline"
          aria-hidden="true"
        >
          <motion.span
            variants={childVariants}
            className={cn(
              "inline-block will-change-transform",
              textClassName,
            )}
          >
            {t === " " ? "\u00A0" : t}
          </motion.span>
          {by === "word" && i < tokens.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </Tag>
  );
}

function splitTokens(text: string, by: "word" | "char"): string[] {
  if (by === "word") return text.split(/\s+/).filter(Boolean);
  return [...text];
}
