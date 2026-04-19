"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Premium hero backdrop — pure CSS/SVG. Feels like a refractive sphere
 * with floating satellites, but without the R3F runtime instability that
 * surfaced under React 19 strict-mode double-mount.
 *
 * Entirely pointer-events:none; nothing in this layer interrupts clicks.
 */
export function HeroCanvas() {
  const reduce = usePrefersReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Core orb */}
      <motion.div
        className="absolute left-1/2 top-[48%] h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9) 0%, rgba(94,234,212,0.55) 35%, rgba(56,189,248,0.35) 60%, rgba(14,165,165,0.25) 90%)",
          filter: "blur(2px)",
          boxShadow:
            "inset 20px 20px 60px rgba(255,255,255,0.45), inset -40px -40px 80px rgba(56,189,248,0.25), 0 30px 80px -20px rgba(14,165,165,0.35)",
        }}
        animate={
          reduce
            ? undefined
            : {
                scale: [1, 1.03, 1],
                rotate: [0, 2, -2, 0],
              }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Specular highlight */}
      <div
        className="absolute left-1/2 top-[42%] h-28 w-40 -translate-x-[130%] -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.9), transparent 70%)",
        }}
      />

      {/* Satellites */}
      <Satellite
        className="top-[18%] left-[22%] h-16 w-16"
        color="rgba(251,191,36,0.85)"
        drift={{ x: [0, 10, 0], y: [0, -12, 0], duration: 9 }}
        reduce={reduce}
      />
      <Satellite
        className="top-[72%] left-[32%] h-12 w-12"
        color="rgba(250,204,21,0.75)"
        drift={{ x: [0, -8, 0], y: [0, 10, 0], duration: 11 }}
        reduce={reduce}
      />
      <Satellite
        className="top-[30%] right-[22%] h-20 w-20"
        color="rgba(56,189,248,0.6)"
        drift={{ x: [0, -12, 0], y: [0, 14, 0], duration: 12 }}
        reduce={reduce}
      />
      <Satellite
        className="top-[68%] right-[28%] h-14 w-14"
        color="rgba(245,158,11,0.75)"
        drift={{ x: [0, 14, 0], y: [0, -10, 0], duration: 10 }}
        reduce={reduce}
      />

      {/* Soft outer glow */}
      <div
        className="absolute left-1/2 top-[48%] h-[680px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(94,234,212,0.45) 0%, rgba(56,189,248,0.2) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}

function Satellite({
  className,
  color,
  drift,
  reduce,
}: {
  className: string;
  color: string;
  drift: { x: number[]; y: number[]; duration: number };
  reduce: boolean;
}) {
  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      style={{
        background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.8), ${color} 60%, transparent 90%)`,
        filter: "blur(1px)",
        boxShadow: `0 12px 36px -10px ${color}`,
      }}
      animate={reduce ? undefined : { x: drift.x, y: drift.y }}
      transition={{
        duration: drift.duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
