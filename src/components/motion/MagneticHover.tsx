"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type MagneticHoverProps = {
  children: ReactNode;
  /** Multiplier on cursor-to-center offset. Keep small — 0.1–0.2 feels premium. */
  strength?: number;
  /** Hard clamp on translate (px) so the element can never collide with neighbours. */
  maxOffset?: number;
  className?: string;
};

/**
 * Subtle cursor-magnet wrapper.
 *
 * Constraints:
 *  - Activates only while the pointer is over the host (no ambient drift).
 *  - Output is clamped to `maxOffset` so the element can never overlap a
 *    neighbouring CTA or escape its box.
 *  - Uses GSAP quickTo — no React re-renders, no layout jank.
 */
export function MagneticHover({
  children,
  strength = 0.15,
  maxOffset = 8,
  className,
}: MagneticHoverProps) {
  const hostRef = useRef<HTMLSpanElement | null>(null);
  const innerRef = useRef<HTMLSpanElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const host = hostRef.current;
    const inner = innerRef.current;
    if (!host || !inner) return;

    const qx = gsap.quickTo(inner, "x", { duration: 0.45, ease: "power3.out" });
    const qy = gsap.quickTo(inner, "y", { duration: 0.45, ease: "power3.out" });

    const clamp = (v: number) => Math.max(-maxOffset, Math.min(maxOffset, v));

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      qx(clamp((e.clientX - cx) * strength));
      qy(clamp((e.clientY - cy) * strength));
    };
    const onLeave = () => {
      qx(0);
      qy(0);
    };

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, strength, maxOffset]);

  return (
    <span ref={hostRef} className={className} style={{ display: "inline-block" }}>
      <span
        ref={innerRef}
        style={{ display: "inline-block", willChange: "transform" }}
      >
        {children}
      </span>
    </span>
  );
}
