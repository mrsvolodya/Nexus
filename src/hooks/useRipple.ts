"use client";

import { useCallback, type MouseEvent } from "react";
import { usePrefersReducedMotion } from "./useMediaQuery";

/**
 * Spawns an expanding ripple circle at the click point inside an element.
 * The element needs `position: relative` and `overflow: hidden`. The
 * `.btn-ripple` CSS class runs the expand + fade animation.
 *
 * Respects reduced-motion. Cleans itself up on `animationend` — no leaks.
 */
export function useRipple<T extends HTMLElement = HTMLElement>() {
  const reduce = usePrefersReducedMotion();

  return useCallback(
    (e: MouseEvent<T>) => {
      if (reduce) return;
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "btn-ripple";
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      ripple.addEventListener(
        "animationend",
        () => ripple.remove(),
        { once: true },
      );
      target.appendChild(ripple);
    },
    [reduce],
  );
}
