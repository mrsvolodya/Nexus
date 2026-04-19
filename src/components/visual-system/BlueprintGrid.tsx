/**
 * Subtle architectural grid — drawn as a tiled SVG pattern.
 * Zero JS, zero animation, no runtime cost beyond a repeat background.
 */
export function BlueprintGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-40"
      style={{
        backgroundImage: `
          linear-gradient(to right, hsl(183 40% 60% / 0.15) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(183 40% 60% / 0.15) 1px, transparent 1px)
        `,
        backgroundSize: "56px 56px",
        maskImage:
          "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 85%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 85%)",
      }}
    />
  );
}
