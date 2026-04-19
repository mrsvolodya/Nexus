"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type GraphNode = {
  id: string;
  x: number;
  y: number;
  size?: number;
};

type GraphEdge = {
  a: string;
  b: string;
};

/**
 * Engineering-network hero visualization.
 *
 * An SVG graph of nodes connected by thin lines, with signals occasionally
 * traveling along edges. Replaces the generic floating-orb decoration with
 * a visual that communicates connection, scale and systems thinking.
 *
 * Performance:
 *  - SVG-only (no canvas, no WebGL).
 *  - GSAP `matchMedia` splits desktop/mobile: mobile gets a one-shot draw-in,
 *    desktop gets continuous pulses + signal traffic.
 *  - ScrollTrigger disables the animation when the hero is off-screen.
 *  - Reduced-motion preference: render the graph statically.
 */

const NODES: readonly GraphNode[] = [
  { id: "n1", x: 14, y: 18, size: 1.4 },
  { id: "n2", x: 32, y: 10, size: 1 },
  { id: "n3", x: 50, y: 22, size: 1.6 },
  { id: "n4", x: 66, y: 12, size: 1 },
  { id: "n5", x: 84, y: 20, size: 1.2 },
  { id: "n6", x: 22, y: 38, size: 1 },
  { id: "n7", x: 40, y: 44, size: 1.4 },
  { id: "n8", x: 58, y: 36, size: 1 },
  { id: "n9", x: 72, y: 46, size: 1.2 },
  { id: "n10", x: 88, y: 38, size: 1 },
  { id: "n11", x: 12, y: 50, size: 1 },
  { id: "n12", x: 50, y: 56, size: 1.4 },
] as const;

const EDGES: readonly GraphEdge[] = [
  { a: "n1", b: "n2" },
  { a: "n1", b: "n3" },
  { a: "n2", b: "n3" },
  { a: "n3", b: "n4" },
  { a: "n4", b: "n5" },
  { a: "n1", b: "n6" },
  { a: "n6", b: "n7" },
  { a: "n7", b: "n8" },
  { a: "n8", b: "n9" },
  { a: "n9", b: "n10" },
  { a: "n5", b: "n10" },
  { a: "n3", b: "n7" },
  { a: "n3", b: "n8" },
  { a: "n6", b: "n11" },
  { a: "n11", b: "n7" },
  { a: "n7", b: "n12" },
  { a: "n12", b: "n9" },
] as const;

const byId = (id: string) => NODES.find((n) => n.id === id)!;

export function NetworkGraph() {
  const rootRef = useRef<SVGSVGElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    // Shared: entry draw-in for every edge.
    const drawEdges = (duration = 1.4, perEdgeDelay = 0.05) => {
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

    // Desktop: richer loop — node pulse + signal traffic. Paused when
    // the hero leaves the viewport.
    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        drawEdges();

        const nodes = root.querySelectorAll<SVGCircleElement>(
          "[data-node-glow]",
        );
        const pulseTween = gsap.to(nodes, {
          opacity: () => 0.35 + Math.random() * 0.5,
          scale: () => 0.9 + Math.random() * 0.25,
          transformOrigin: "center center",
          duration: 2.2,
          stagger: { each: 0.25, repeat: -1, yoyo: true },
          ease: "sine.inOut",
        });

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
          signal.setAttribute("class", "drop-shadow");
          signal.style.filter = "drop-shadow(0 0 2px hsl(189 94% 60%))";
          root.appendChild(signal);
          signals.push(signal);

          gsap.to(signal, {
            attr: { cx: x2, cy: y2 },
            duration: 1.1 + Math.random() * 0.6,
            ease: "power1.inOut",
            onComplete: () => {
              signal.remove();
              const idx = signals.indexOf(signal);
              if (idx >= 0) signals.splice(idx, 1);
            },
          });
        };

        const signalInterval = window.setInterval(sendSignal, 850);

        // Pause animations when hero leaves viewport.
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
          window.clearInterval(signalInterval);
          signals.forEach((s) => s.remove());
          trigger?.kill();
        };
      }, root);

      return () => ctx.revert();
    });

    // Mobile / tablet: single draw-in, no continuous loops.
    mm.add("(max-width: 767px)", () => {
      const ctx = gsap.context(() => {
        drawEdges(1.1, 0.03);
      }, root);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [reduce]);

  return (
    <svg
      ref={rootRef}
      aria-hidden
      viewBox="0 0 100 64"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
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
          <stop offset="0%" stopColor="hsl(183 74% 45%)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(183 74% 45%)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Edges */}
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

      {/* Node glows */}
      {NODES.map((n) => (
        <circle
          key={`glow-${n.id}`}
          data-node-glow
          cx={n.x}
          cy={n.y}
          r={3 * (n.size ?? 1)}
          fill="url(#ng-glow)"
          opacity="0.55"
        />
      ))}

      {/* Nodes */}
      {NODES.map((n) => (
        <circle
          key={n.id}
          cx={n.x}
          cy={n.y}
          r={0.6 * (n.size ?? 1)}
          fill="white"
          stroke="hsl(183 74% 40%)"
          strokeWidth="0.18"
        />
      ))}
    </svg>
  );
}
