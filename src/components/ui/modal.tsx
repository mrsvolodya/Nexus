"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import { useEscape } from "@/hooks/useEscape";
import type { ClickOrigin } from "@/hooks/useClickOrigin";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Viewport point the modal should expand from (set by the trigger). */
  origin?: ClickOrigin;
};

const SIZE: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  className,
  size = "md",
  origin,
}: ModalProps) {
  useEscape(open, onClose);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted) return null;

  const transformOrigin = origin
    ? `${origin.x}px ${origin.y}px`
    : "50% 50%";

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center p-4"
          aria-modal="true"
          role="dialog"
          aria-labelledby={title ? "modal-title" : undefined}
          aria-describedby={description ? "modal-description" : undefined}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-slate-900/20"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Glow expanding from the click point */}
          {origin && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute h-40 w-40 rounded-full"
              style={{
                left: origin.x - 80,
                top: origin.y - 80,
                background:
                  "radial-gradient(closest-side, rgba(94,234,212,0.7), rgba(56,189,248,0.3) 60%, transparent 80%)",
                filter: "blur(30px)",
              }}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: [0.8, 0.2], scale: [0.5, 4] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
          )}

          {/* Panel — expands from the click origin */}
          <motion.div
            role="document"
            className={cn(
              "glass-modal relative w-full rounded-2xl p-6 sm:p-8",
              SIZE[size],
              className,
            )}
            style={{ transformOrigin }}
            initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-4 top-4 inline-grid h-9 w-9 place-items-center rounded-full border border-white/60 bg-white/60 text-foreground/70 transition-colors hover:bg-white/80 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            {title && (
              <h2
                id="modal-title"
                className="font-display text-2xl font-semibold tracking-tight text-foreground"
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                id="modal-description"
                className="mt-2 text-sm text-muted-foreground"
              >
                {description}
              </p>
            )}

            <div className={cn(title || description ? "mt-6" : "")}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
