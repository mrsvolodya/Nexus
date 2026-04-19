"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type Orb = {
  className: string;
  style: React.CSSProperties;
  depth: number;
};

const DEFAULT_ORBS: Orb[] = [
  {
    className:
      "absolute h-48 w-48 rounded-full blur-2xl opacity-80",
    style: {
      top: "8%",
      left: "6%",
      background:
        "radial-gradient(closest-side, rgba(251, 191, 36, 0.70), rgba(251, 191, 36, 0) 70%)",
    },
    depth: 0.9,
  },
  {
    className: "absolute h-40 w-40 rounded-full blur-2xl opacity-80",
    style: {
      top: "48%",
      left: "14%",
      background:
        "radial-gradient(closest-side, rgba(245, 158, 11, 0.55), rgba(245, 158, 11, 0) 70%)",
    },
    depth: 0.6,
  },
  {
    className: "absolute h-56 w-56 rounded-full blur-3xl opacity-80",
    style: {
      top: "20%",
      right: "8%",
      background:
        "radial-gradient(closest-side, rgba(94, 234, 212, 0.55), rgba(94, 234, 212, 0) 70%)",
    },
    depth: 1.1,
  },
  {
    className: "absolute h-44 w-44 rounded-full blur-2xl opacity-80",
    style: {
      bottom: "8%",
      right: "18%",
      background:
        "radial-gradient(closest-side, rgba(56, 189, 248, 0.55), rgba(56, 189, 248, 0) 70%)",
    },
    depth: 0.75,
  },
  {
    className: "absolute h-36 w-36 rounded-full blur-2xl opacity-70",
    style: {
      bottom: "6%",
      left: "36%",
      background:
        "radial-gradient(closest-side, rgba(250, 204, 21, 0.55), rgba(250, 204, 21, 0) 70%)",
    },
    depth: 0.5,
  },
];

/**
 * Floating amber + aqua orbs. GSAP handles the drift animation so we can
 * share a single ticker + use RAF-throttled updates.
 */
export function FloatingOrbs() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const orbs = gsap.utils.toArray<HTMLElement>("[data-orb]", root);
      orbs.forEach((el, i) => {
        const depth = Number(el.dataset.depth) || 1;
        gsap.to(el, {
          x: `+=${12 * depth}`,
          y: `-=${14 * depth}`,
          duration: 8 + i * 1.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {DEFAULT_ORBS.map((orb, i) => (
        <span
          key={i}
          data-orb
          data-depth={orb.depth}
          className={orb.className}
          style={orb.style}
        />
      ))}
    </div>
  );
}
