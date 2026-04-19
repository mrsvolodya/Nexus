"use client";

import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => <SceneFallback /> },
);

/**
 * Only renders the R3F scene on non-touch, sufficiently powerful viewports.
 * Mobile gets a lightweight CSS fallback to preserve the vibe without cost.
 */
export function HeroCanvas() {
  const isCoarse = useMediaQuery("(pointer: coarse)");
  const isSmall = useMediaQuery("(max-width: 640px)");

  if (isCoarse || isSmall) return <SceneFallback />;

  return (
    <div className="absolute inset-0">
      <HeroScene />
    </div>
  );
}

function SceneFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 50% 45%, rgba(94,234,212,0.6) 0%, rgba(56,189,248,0.35) 25%, transparent 55%), radial-gradient(circle at 30% 65%, rgba(251,191,36,0.35) 0%, transparent 45%), radial-gradient(circle at 70% 35%, rgba(245,158,11,0.25) 0%, transparent 45%)",
        filter: "blur(12px)",
      }}
    />
  );
}
