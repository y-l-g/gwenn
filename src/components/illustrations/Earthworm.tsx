"use client";

import { useEffect, useRef, type RefObject } from "react";
import { smoothPath } from "@/lib/organic";

/** Still body, pointing right with the head at the origin (used for reduced motion). */
const STILL = "M-88 0C-78 -6 -66 -6 -56 0S-34 6 -24 0S-6 -5 0 0";

/** Three strokes: skin, ring bands and a darker tail. Pass `bodyRef` to move the body from script. */
export function WormBody({ d = STILL, bodyRef }: { d?: string; bodyRef?: RefObject<SVGGElement | null> }) {
  return (
    <g ref={bodyRef} strokeLinecap="round" fill="none">
      <path d={d} stroke="#b9786a" strokeWidth="5.5" />
      <path d={d} stroke="#d39a8a" strokeWidth="2" strokeDasharray="1.2 4.2" />
      <path d={d} stroke="#a5604f" strokeWidth="6.5" strokeDasharray="0 22 8 100" />
    </g>
  );
}

const CROSSING = 52; // seconds for one crossing of the meadow
const WAVES = 29; // contraction waves per crossing (about 1.8 s each)
const SURGE = 0.35; // how much the forward speed rises and falls with each wave
const CONTRACTION = 0.2; // how much each wave squeezes or stretches the body
const SEGMENTS = 14;
const BODY = 88; // head-to-tail length in px
const START = 40; // the head starts this far along the tunnel, already on screen
const FADE_IN = 0.8; // seconds

/**
 * An earthworm that crawls along the tunnel path. Each frame the body is laid
 * out on the tunnel, so it follows the curve, and contraction waves travel from
 * tail to head while the head surges forward with them.
 */
export function Earthworm({ path }: { path: string }) {
  const measureRef = useRef<SVGPathElement>(null);
  const bodyRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const measure = measureRef.current;
    const body = bodyRef.current;
    if (!measure || !body || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const paths = Array.from(body.querySelectorAll("path"));
    const total = measure.getTotalLength();
    const at = (s: number) => {
      const pt = measure.getPointAtLength(Math.min(total, Math.max(0, s)));
      return { x: pt.x, y: pt.y };
    };

    let frame = 0;
    const started = performance.now();
    const draw = (now: number) => {
      const t = (now - started) / 1000;
      const p = (t % CROSSING) / CROSSING;
      const phase = 2 * Math.PI * WAVES * p;

      // Progress along the tunnel: the derivative stays positive, so the worm never reverses.
      const q = p + (SURGE / (2 * Math.PI * WAVES)) * Math.sin(phase);
      const head = START + (total + BODY - START) * q;

      // Distance from the head back to each segment. Waves run toward the head, so each
      // segment is squeezed or stretched a little later than the one behind it.
      const pts: { x: number; y: number }[] = [];
      let back = 0;
      for (let i = 0; i <= SEGMENTS; i++) {
        pts.unshift(at(head - back));
        back += (BODY / SEGMENTS) * (1 + CONTRACTION * Math.sin(phase + i * 0.55));
      }

      const d = smoothPath(pts);
      paths.forEach((el) => el.setAttribute("d", d));
      // Fade in at each crossing, so the restart at the left edge is not a hard pop.
      body.style.opacity = String(Math.min(1, (t % CROSSING) / FADE_IN));
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [path]);

  return (
    <>
      <path ref={measureRef} d={path} fill="none" visibility="hidden" />
      <WormBody d="" bodyRef={bodyRef} />
    </>
  );
}
