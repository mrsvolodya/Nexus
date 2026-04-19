/**
 * Ultra-subtle architectural grid — tighter mask, lighter strokes, larger
 * cell size than the previous iteration so it reads as blueprint ambience
 * rather than data-vis.
 */
export function BlueprintGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-25"
      style={{
        backgroundImage: `
          linear-gradient(to right, hsl(183 40% 60% / 0.12) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(183 40% 60% / 0.12) 1px, transparent 1px)
        `,
        backgroundSize: "88px 88px",
        maskImage:
          "radial-gradient(ellipse 55% 45% at 50% 40%, black 25%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 55% 45% at 50% 40%, black 25%, transparent 75%)",
      }}
    />
  );
}
