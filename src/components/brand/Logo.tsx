import { cn } from "@/utils/cn";

export function Logo({
  className,
  onlyMark = false,
}: {
  className?: string;
  onlyMark?: boolean;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-2.5 text-foreground", className)}
    >
      <LogoMark />
      {!onlyMark && (
        <span className="font-display text-lg font-semibold tracking-tight">
          Nexus
        </span>
      )}
    </span>
  );
}

function LogoMark() {
  return (
    <span
      aria-hidden
      className="relative grid h-9 w-9 place-items-center rounded-xl shadow-glow-teal"
      style={{
        background:
          "linear-gradient(135deg, hsl(183 74% 40%) 0%, hsl(189 94% 50%) 55%, hsl(38 92% 55%) 120%)",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M2 13V3L14 13V3"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
