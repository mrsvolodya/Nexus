import { cn } from "@/lib/utils";

export function GridBackground({
  className,
  withMesh = false,
}: {
  className?: string;
  withMesh?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div className="absolute inset-0 grid-overlay opacity-50" />
      {withMesh && (
        <div className="absolute inset-0 bg-mesh-1 opacity-60" />
      )}
    </div>
  );
}
