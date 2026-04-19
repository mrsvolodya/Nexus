import { cn } from "@/utils/cn";

/**
 * Four architectural corner markers around a container — signals that the
 * content inside is part of the Nexus network visual system without adding
 * noise. Purely decorative; `aria-hidden`; pointer-events:none.
 */
export function CornerBrackets({ className }: { className?: string }) {
  return (
    <>
      <span
        aria-hidden
        className={cn("corner corner-tl", className)}
      />
      <span
        aria-hidden
        className={cn("corner corner-tr", className)}
      />
      <span
        aria-hidden
        className={cn("corner corner-bl", className)}
      />
      <span
        aria-hidden
        className={cn("corner corner-br", className)}
      />
    </>
  );
}
