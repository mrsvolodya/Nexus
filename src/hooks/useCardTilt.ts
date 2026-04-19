"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "./useMediaQuery";

type TiltOptions = {
  /** Max rotation in degrees on each axis. */
  max?: number;
  /** Z translate on hover (adds perceived depth). */
  lift?: number;
  /** Optional scale on hover (1 = none). */
  scale?: number;
};

/**
 * Premium card tilt: cursor-driven 3D rotation + CSS variables for
 * directional glow. GSAP `quickTo` drives the transform — no React re-renders.
 *
 *  - Respects reduced-motion.
 *  - Skipped on touch / coarse pointers where hover doesn't apply.
 *  - Sets `--tilt-mx` / `--tilt-my` as px coordinates within the card so
 *    consumers can position a radial highlight that tracks the cursor.
 */
export function useCardTilt<T extends HTMLElement = HTMLDivElement>(
  options: TiltOptions = {},
) {
  const { max = 6, lift = 8, scale = 1 } = options;
  const ref = useRef<T | null>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const hasHover =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasHover) return;

    const qx = gsap.quickTo(el, "rotationY", {
      duration: 0.6,
      ease: "power3.out",
    });
    const qy = gsap.quickTo(el, "rotationX", {
      duration: 0.6,
      ease: "power3.out",
    });
    const qz = gsap.quickTo(el, "z", {
      duration: 0.45,
      ease: "power3.out",
    });
    const qs = gsap.quickTo(el, "scale", {
      duration: 0.45,
      ease: "power3.out",
    });

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      qx(nx * max);
      qy(-ny * max);
      el.style.setProperty("--tilt-mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--tilt-my", `${e.clientY - rect.top}px`);
    };
    const onEnter = () => {
      qz(lift);
      if (scale !== 1) qs(scale);
    };
    const onLeave = () => {
      qx(0);
      qy(0);
      qz(0);
      if (scale !== 1) qs(1);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, max, lift, scale]);

  return ref;
}
