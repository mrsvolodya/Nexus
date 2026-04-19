"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "@/utils/cn";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type ScrollCounterProps = {
  value: string;
  duration?: number;
  className?: string;
};

type Parsed = { prefix: string; number: number; suffix: string };

function parse(value: string): Parsed | null {
  const match = value.match(/^([^0-9.]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    number: Number(match[2]),
    suffix: match[3],
  };
}

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Counts up from 0 to the numeric portion of `value` when scrolled into view.
 * Uses rAF directly (no React state loop on every tick — one state update
 * per frame, but cheap). Falls back to the literal string on reduced-motion.
 */
export function ScrollCounter({
  value,
  duration = 1.6,
  className,
}: ScrollCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = usePrefersReducedMotion();
  const parsed = useMemo(() => parse(value), [value]);

  const [display, setDisplay] = useState<string>(() => {
    if (reduce || !parsed) return value;
    return `${parsed.prefix}0${parsed.suffix}`;
  });

  useEffect(() => {
    if (!parsed) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    const target = parsed.number;
    const isInt = Number.isInteger(target);
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const current = target * easeOutQuart(t);
      const formatted = isInt ? Math.round(current) : current.toFixed(1);
      setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed, duration, reduce, value]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {display}
    </span>
  );
}
