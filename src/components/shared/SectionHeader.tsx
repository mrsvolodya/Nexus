"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/utils/cn";
import { EASE_OUT } from "@/utils/motion";

type SectionHeaderProps = {
  /** Short engineering-style index, e.g. "01" */
  index?: string;
  /** Category label shown in a chip. Accepts plain text or inline JSX. */
  eyebrow?: ReactNode;
  /** Section title — pass JSX for inline `<span className="gradient-text">`. */
  title: ReactNode;
  /** Supporting paragraph under the title. */
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

/**
 * Unified section header used across every major section for visual rhythm.
 * Reveals its parts in order: index → line → chip → title → description.
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left",
        className,
      )}
    >
      {(index || eyebrow) && (
        <motion.div
          className={cn(
            "flex items-center gap-3",
            centered && "justify-center",
          )}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {index && (
            <span className="font-mono text-[11px] tracking-[0.25em] text-primary/80">
              {index}
            </span>
          )}
          <motion.span
            aria-hidden
            className="h-px w-10 origin-left bg-gradient-to-r from-primary/60 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.05 }}
            viewport={{ once: true, amount: 0.5 }}
          />
          {eyebrow && <Chip>{eyebrow}</Chip>}
        </motion.div>
      )}

      <motion.h2
        className="mt-6 font-display text-5xl font-semibold leading-[1.03] tracking-tight text-balance sm:text-6xl lg:text-7xl"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          className={cn(
            "mt-5 text-pretty text-base text-muted-foreground sm:text-lg",
            centered && "mx-auto max-w-2xl",
          )}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
