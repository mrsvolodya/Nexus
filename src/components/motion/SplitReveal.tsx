"use client";

import { createElement, useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/utils/cn";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type AllowedTag = "span" | "div" | "h1" | "h2" | "h3" | "p";

type SplitRevealProps = {
  children: string;
  as?: AllowedTag;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  by?: "word" | "char";
  /** Fire on scroll-into-view instead of on mount. */
  scroll?: boolean;
};

/**
 * Cinematic text reveal. Splits the string into word/char spans and runs a
 * masked y+opacity stagger via GSAP. No CSS hacks — each token is its own span.
 */
export function SplitReveal({
  children,
  as = "span",
  className,
  delay = 0,
  stagger = 0.045,
  duration = 0.9,
  by = "word",
  scroll = false,
}: SplitRevealProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduce = usePrefersReducedMotion();
  const tokens = splitTokens(children, by);

  useEffect(() => {
    if (reduce) return;
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll<HTMLElement>("[data-split-item]");

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        items,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          ease: "power4.out",
          stagger,
          delay,
          scrollTrigger: scroll
            ? {
                trigger: root,
                start: "top 85%",
                once: true,
              }
            : undefined,
        },
      );
      return () => tween.kill();
    }, root);

    return () => ctx.revert();
  }, [reduce, scroll, delay, stagger, duration]);

  return createElement(
    as,
    {
      ref: rootRef,
      className: cn("inline-block", className),
      "aria-label": children,
    },
    tokens.map((t, i) => (
      <span
        key={i}
        className="inline-block overflow-hidden align-baseline"
        aria-hidden="true"
      >
        <span data-split-item className="inline-block will-change-transform">
          {t === " " ? "\u00A0" : t}
        </span>
        {by === "word" && i < tokens.length - 1 ? "\u00A0" : null}
      </span>
    )),
  );
}

function splitTokens(text: string, by: "word" | "char"): string[] {
  if (by === "word") return text.split(/\s+/).filter(Boolean);
  return [...text];
}

export function RevealText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={className}>{children}</span>;
}
