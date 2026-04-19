/**
 * Architectural whisper grid — pure CSS, no JS. Intentionally almost
 * imperceptible: you only notice it once you're looking. Radial mask keeps
 * it contained to the hero center; hard fades at the edges.
 */
export function BlueprintGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.18]"
      style={{
        backgroundImage: `
          linear-gradient(to right, hsl(183 35% 55% / 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(183 35% 55% / 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "120px 120px",
        maskImage:
          "radial-gradient(ellipse 45% 40% at 50% 40%, black 20%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 45% 40% at 50% 40%, black 20%, transparent 80%)",
      }}
    />
  );
}
