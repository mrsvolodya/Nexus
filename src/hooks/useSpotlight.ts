"use client";

import { useCallback, type PointerEvent } from "react";

/**
 * Attach to an element's onPointerMove to drive the `.spotlight` utility.
 * Writes CSS custom properties instead of state to stay off the React render path.
 */
export function useSpotlight() {
  return useCallback((e: PointerEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    target.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);
}
