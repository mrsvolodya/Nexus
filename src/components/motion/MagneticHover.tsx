"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type MagneticHoverProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

/**
 * Wrap any interactive element to give it a subtle cursor-magnet effect.
 * Animates the inner span with GSAP quickTo — no re-renders, no layout jank.
 */
export function MagneticHover({
  children,
  strength = 0.25,
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

    const qx = gsap.quickTo(inner, "x", { duration: 0.5, ease: "power3.out" });
    const qy = gsap.quickTo(inner, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      qx((e.clientX - cx) * strength);
      qy((e.clientY - cy) * strength);
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
  }, [reduce, strength]);

  return (
    <span ref={hostRef} className={className} style={{ display: "inline-block" }}>
      <span ref={innerRef} style={{ display: "inline-block", willChange: "transform" }}>
        {children}
      </span>
    </span>
  );
}
