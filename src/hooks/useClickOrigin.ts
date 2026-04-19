"use client";

import { useCallback, useState } from "react";

export type ClickOrigin = { x: number; y: number } | null;

/**
 * Capture a click's viewport position so a modal/popover can expand from
 * that exact point (origin-based transform-origin animation).
 */
export function useClickOrigin() {
  const [origin, setOrigin] = useState<ClickOrigin>(null);

  const capture = useCallback(
    (e: { clientX: number; clientY: number }) => {
      setOrigin({ x: e.clientX, y: e.clientY });
    },
    [],
  );

  const clear = useCallback(() => setOrigin(null), []);

  return { origin, capture, clear };
}
