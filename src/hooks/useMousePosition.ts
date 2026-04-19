"use client";

import { useEffect, useRef } from "react";

type Position = { x: number; y: number };

/**
 * Low-cost cursor tracking. Writes latest pointer coordinates to a ref so
 * consumers can read them from inside rAF loops without triggering React
 * re-renders.
 */
export function useMousePosition() {
  const ref = useRef<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      ref.current.x = e.clientX;
      ref.current.y = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return ref;
}
