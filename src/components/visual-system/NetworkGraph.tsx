"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type GraphNode = {
  id: string;
  x: number;
  y: number;
  /** Can be clicked — triggers an expanding pulse wave. */
  interactive?: boolean;
};

type GraphEdge = { a: string; b: string };

type Pulse = { key: number; x: number; y: number };

/**
 * Engineering-network accent system — deliberately sparse.
 *
 * Two small corner clusters + two solo accent points, rather than a
 * full-screen web. The solo points are `interactive`: clicking them
 * radiates a pulse wave through the SVG. Everything else is ambient.
 *
 * Performance:
 *   - Pure SVG, zero canvas/WebGL.
 *   - GSAP `matchMedia` disables the continuous signal interval on mobile.
 *   - ScrollTrigger pauses node pulses when the hero leaves viewport.
 *   - Respects `prefers-reduced-motion`.
 */

const NODES: readonly GraphNode[] = [
  // Top-left cluster
  { id: "tl1", x: 6, y: 14 },
  { id: "tl2", x: 14, y: 22 },
  // Bottom-right cluster
  { id: "br1", x: 88, y: 50 },
  { id: "br2", x: 94, y: 56 },
  // Solo accents — interactive hotspots
  { id: "tr", x: 92, y: 12, interactive: true },
  { id: "bl", x: 6, y: 58, interactive: true },
] as const;

const EDGES: readonly GraphEdge[] = [
  { a: "tl1", b: "tl2" },
  { a: "br1", b: "br2" },
] as const;

const byId = (id: string) => NODES.find((n) => n.id === id)!;

export function NetworkGraph() {
  const rootRef = useRef<SVGSVGElement>(null);
  const reduce = usePrefersReducedMotion();
  const [pulses, setPulses] = useState<Pulse[]>([]);

  useEffect(() => {
    if (reduce) return;
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    const drawEdges = (duration = 1.4, perEdgeDelay = 0.12) => {
      const edges = root.querySelectorAll<SVGLineElement>("[data-edge]");
      edges.forEach((edge, i) => {
        const len = edge.getTotalLength();
        edge.style.strokeDasharray = `${len}`;
        edge.style.strokeDashoffset = `${len}`;
        gsap.to(edge, {
          strokeDashoffset: 0,
          duration,
          delay: i * perEdgeDelay,
          ease: "power3.out",
        });
      });
    };

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        drawEdges();

        const glows = root.querySelectorAll<SVGCircleElement>(
          "[data-node-glow]",
        );
        const pulseTween = gsap.to(glows, {
          opacity: () => 0.3 + Math.random() * 0.4,
          scale: () => 0.9 + Math.random() * 0.25,
          transformOrigin: "center center",
          duration: 2.4,
          stagger: { each: 0.4, repeat: -1, yoyo: true },
          ease: "sine.inOut",
        });

        // Signal traffic — slower cadence since we have fewer edges.
        const edgeEls = Array.from(
          root.querySelectorAll<SVGLineElement>("[data-edge]"),
        );
        const signals: SVGCircleElement[] = [];
        const sendSignal = () => {
          if (edgeEls.length === 0) return;
          const edge = edgeEls[Math.floor(Math.random() * edgeEls.length)];
          const x1 = Number(edge.getAttribute("x1"));
          const y1 = Number(edge.getAttribute("y1"));
          const x2 = Number(edge.getAttribute("x2"));
          const y2 = Number(edge.getAttribute("y2"));
          const signal = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle",
          );
          signal.setAttribute("r", "0.55");
          signal.setAttribute("cx", String(x1));
          signal.setAttribute("cy", String(y1));
          signal.setAttribute("fill", "hsl(189 94% 50%)");
          signal.style.filter = "drop-shadow(0 0 2px hsl(189 94% 60%))";
          root.appendChild(signal);
          signals.push(signal);
          gsap.to(signal, {
            attr: { cx: x2, cy: y2 },
            duration: 1.4 + Math.random() * 0.5,
            ease: "power1.inOut",
            onComplete: () => {
              signal.remove();
              const idx = signals.indexOf(signal);
              if (idx >= 0) signals.splice(idx, 1);
            },
          });
        };
        const intv = window.setInterval(sendSignal, 3000);

        const parent = root.parentElement;
        const trigger = parent
          ? ScrollTrigger.create({
              trigger: parent,
              start: "top bottom",
              end: "bottom top",
              onLeave: () => pulseTween.pause(),
              onLeaveBack: () => pulseTween.pause(),
              onEnter: () => pulseTween.play(),
              onEnterBack: () => pulseTween.play(),
            })
          : null;

        return () => {
          window.clearInterval(intv);
          signals.forEach((s) => s.remove());
          trigger?.kill();
        };
      }, root);
      return () => ctx.revert();
    });

    mm.add("(max-width: 767px)", () => {
      const ctx = gsap.context(() => drawEdges(1.1, 0.08), root);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [reduce]);

  const firePulse = (node: GraphNode) => {
    if (reduce) return;
    setPulses((p) => [
      ...p,
      { key: performance.now(), x: node.x, y: node.y },
    ]);
  };

  return (
    <svg
      ref={rootRef}
      aria-hidden
      viewBox="0 0 100 64"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: "none" }}
    >
      <defs>
        <linearGradient id="ng-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(183 74% 45%)" stopOpacity="0" />
          <stop
            offset="50%"
            stopColor="hsl(183 74% 45%)"
            stopOpacity="0.55"
          />
          <stop offset="100%" stopColor="hsl(189 94% 45%)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ng-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(183 74% 45%)" stopOpacity="0.75" />
          <stop offset="100%" stopColor="hsl(183 74% 45%)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {EDGES.map((e, i) => {
        const a = byId(e.a);
        const b = byId(e.b);
        return (
          <line
            key={i}
            data-edge
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="url(#ng-edge)"
            strokeWidth="0.18"
            strokeLinecap="round"
          />
        );
      })}

      {NODES.map((n) => (
        <circle
          key={`glow-${n.id}`}
          data-node-glow
          cx={n.x}
          cy={n.y}
          r={3}
          fill="url(#ng-glow)"
          opacity="0.5"
        />
      ))}

      {NODES.map((n) => (
        <circle
          key={n.id}
          cx={n.x}
          cy={n.y}
          r={0.6}
          fill="white"
          stroke="hsl(183 74% 40%)"
          strokeWidth="0.18"
        />
      ))}

      {/* Interactive hotspots — larger transparent hit area above the node */}
      {NODES.filter((n) => n.interactive).map((n) => (
        <circle
          key={`hit-${n.id}`}
          cx={n.x}
          cy={n.y}
          r={2.4}
          fill="transparent"
          style={{
            pointerEvents: "auto",
            cursor: "pointer",
          }}
          role="button"
          tabIndex={0}
          aria-label="Trigger signal pulse"
          onClick={() => firePulse(n)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") firePulse(n);
          }}
        />
      ))}

      {/* Click pulse waves */}
      <AnimatePresence>
        {pulses.map((p) => (
          <motion.circle
            key={p.key}
            cx={p.x}
            cy={p.y}
            fill="transparent"
            stroke="hsl(183 74% 50%)"
            strokeWidth={0.2}
            initial={{ r: 0.6, opacity: 0.85 }}
            animate={{ r: 14, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() =>
              setPulses((list) => list.filter((x) => x.key !== p.key))
            }
          />
        ))}
      </AnimatePresence>
    </svg>
  );
}
