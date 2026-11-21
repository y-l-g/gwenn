import { fibrousRoots, grass, hypha, hyphalFan, roots, rng, rootMass, serratedLeaf, smoothPath, taproot, tuft } from "@/lib/organic";
import type { CSSProperties } from "react";
import { BeechLeaf, Cep, Chanterelle, Mycena, OakLeaf } from "./Botanical";

type RootSystemProps = {
  className?: string;
  seed?: number;
  width?: number;
  height?: number;
  color?: string;
  mode?: "load" | "view" | "static";
  depth?: number;
  length?: number;
  /** Several root crowns along the top edge; defaults to one in the middle. */
  origins?: RootOrigin[];
  /** Link neighbouring crowns with fine fungal threads. */
  network?: boolean;
  /** "slice" fills the box (crops the sides on narrow screens). */
  fit?: "meet" | "slice";
  /** Fade the whole system out toward the bottom. */
  fade?: boolean;
  threadColor?: string;
  /** A fine mat of rootlets all along the top edge. */
  mat?: boolean;
};

type RootOrigin = { x: number; angle?: number; length?: number; width?: number; depth?: number; seed?: number; gravity?: number };

/** Procedural root system, drawn stroke by stroke. */
export function RootSystem({
  className,
  seed = 4,
  width = 600,
  height = 360,
  color = "var(--color-chestnut)",
  mode = "load",
  depth = 5,
  length,
  origins,
  network = false,
  fit = "meet",
  fade = false,
  threadColor = "var(--color-moss)",
  mat = false,
}: RootSystemProps) {
  const matPath = mat
    ? (() => {
        const r = rng(seed * 3);
        const out: string[] = [];
        for (let x = 4; x < width; x += 9 + r() * 12) {
          fibrousRoots({ x, y: 0, seed: seed * 1000 + Math.round(x), count: 2 + Math.floor(r() * 2), length: 24 + r() * 46, spread: 50, width: 1 }).forEach((st) =>
            out.push(st.d),
          );
        }
        return out.join(" ");
      })()
    : "";
  const crowns: RootOrigin[] = origins ?? [{ x: width / 2 }];
  let order = 0;
  const segs = crowns.flatMap((o, i) =>
    roots({
      x: o.x,
      y: 0,
      angle: o.angle ?? 90,
      length: o.length ?? length ?? height * 0.36,
      depth: o.depth ?? depth,
      width: o.width ?? 9,
      spread: 34,
      gravity: o.gravity ?? 0.25,
      seed: o.seed ?? seed + i * 17,
    }).map((sg) => ({ ...sg, order: order++, delay: i * 180 })),
  );
  const sorted = [...crowns].sort((a, b) => a.x - b.x);
  const rand = rng(seed * 5);
  const threads = network
    ? sorted.slice(1).flatMap((o, i) => {
        const a = sorted[i];
        const ya = 40 + rand() * 60;
        const yb = 40 + rand() * 60;
        const h = hypha({ x: a.x + 10, y: ya }, { x: o.x - 10, y: yb }, seed + i * 11, 0.14, 3);
        return [h.main, ...h.side];
      })
    : [];
  const wrap = mode === "load" ? "draw-on-load" : mode === "view" ? "draw-on-view" : "";
  const fadeId = `roots-fade-${seed}`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`${wrap} ${className ?? ""}`} aria-hidden="true" preserveAspectRatio={`xMidYMin ${fit}`}>
      {fade && (
        <defs>
          <linearGradient id={`${fadeId}-g`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.35" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id={fadeId} maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}>
            <rect width={width} height={height} fill={`url(#${fadeId}-g)`} />
          </mask>
        </defs>
      )}
      <g mask={fade ? `url(#${fadeId})` : undefined}>
      {mat && <path d={matPath} fill="none" stroke={color} strokeWidth=".9" strokeLinecap="round" opacity=".75" />}
      <g fill="none" stroke={threadColor} strokeLinecap="round">
        {threads.map((d, i) => (
          <path key={i} d={d} pathLength={1} className="draw-path" strokeWidth={i % 4 === 0 ? 1 : 0.7} opacity={0.35} style={{ "--d": 900 + i * 25 } as CSSProperties} />
        ))}
      </g>
      <g fill="none" stroke={color} strokeLinecap="round">
        {segs.map((s) => (
          <path
            key={s.order}
            d={s.d}
            pathLength={1}
            className="draw-path"
            strokeWidth={s.width}
            opacity={0.95 - s.depth * 0.1}
            style={{ "--d": s.delay + s.depth * 260 + (s.order % 5) * 40 } as CSSProperties}
          />
        ))}
      </g>
      </g>
    </svg>
  );
}

/** Grass blades rooted along a curve, for meadow edges. */
function blades(
  edge: (x: number) => number,
  { from, to, count, height, seed, clumps = [] }: { from: number; to: number; count: number; height: number; seed: number; clumps?: number[] },
) {
  const r = rng(seed);
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    // Two thirds of the blades gather around the clump centres.
    let x = from + r() * (to - from);
    if (clumps.length && r() < 0.66) {
      const c = clumps[Math.floor(r() * clumps.length)];
      x = c + (r() + r() + r() - 1.5) * 34;
    }
    const near = clumps.length ? Math.max(0, 1 - Math.min(...clumps.map((c) => Math.abs(c - x))) / 60) : 0;
    const y = edge(x) + 1.5;
    const v = r();
    const h = height * (0.3 + v * v * 1.1) * (1 + near * 0.7);
    const lean = (r() - 0.5) * h * 0.8;
    const w = 1.2 + r() * 1.5;
    out.push(
      `M${(x - w).toFixed(1)} ${y.toFixed(1)} Q${(x + lean * 0.25).toFixed(1)} ${(y - h * 0.6).toFixed(1)} ${(x + lean).toFixed(1)} ${(y - h).toFixed(1)} Q${(x + lean * 0.25 + w * 0.7).toFixed(1)} ${(y - h * 0.55).toFixed(1)} ${(x + w).toFixed(1)} ${y.toFixed(1)}Z`,
    );
  }
  return out.join(" ");
}

function Dandelion({ x, y, seed, flower = "bloom" }: { x: number; y: number; seed: number; flower?: "bloom" | "clock" | "none" }) {
  const r = rng(seed);
  const leaves = Array.from({ length: 6 }, (_, i) => ({ a: -70 + i * 28 + (r() - 0.5) * 12, l: 30 + r() * 14 }));
  const stemLean = (r() - 0.5) * 14;
  const top = { x: x + stemLean, y: y - 58 - r() * 12 };
  return (
    <g>
      {flower !== "none" && (
        <path d={`M${x} ${y} Q${x + stemLean * 0.2} ${y - 30} ${top.x} ${top.y}`} stroke="var(--color-fern)" strokeWidth="1.6" fill="none" />
      )}
      {leaves.map((l, i) => (
        <path key={i} d={serratedLeaf(l.l, 9, 7)} transform={`translate(${x} ${y}) rotate(${l.a})`} fill={i % 2 ? "var(--color-fern)" : "var(--color-moss)"} />
      ))}
      {flower === "bloom" && (
        <g transform={`translate(${top.x} ${top.y}) scale(1.3)`}>
          {Array.from({ length: 14 }, (_, i) => (
            <ellipse key={i} cx="0" cy="-5.5" rx="1.5" ry="4.6" transform={`rotate(${i * 25.7})`} fill="#f6c21c" />
          ))}
          <circle r="3.2" fill="#e09a12" />
        </g>
      )}
      {flower === "clock" && (
        <g transform={`translate(${top.x} ${top.y})`} stroke="var(--color-ink-mute)" strokeLinecap="round" opacity=".55">
          {Array.from({ length: 22 }, (_, i) => {
            const a = (i / 22) * Math.PI * 2;
            return <path key={i} d={`M0 0 L${(Math.cos(a) * 9).toFixed(1)} ${(Math.sin(a) * 9).toFixed(1)}`} strokeWidth=".6" />;
          })}
          <circle r="1.8" fill="var(--color-ink-mute)" stroke="none" />
        </g>
      )}
    </g>
  );
}

/** Tall flowering grass stems with spikelets, rising above the turf. */
function GrassStems({ edge, seed, count, width }: { edge: (x: number) => number; seed: number; count: number; width: number }) {
  const r = rng(seed);
  return (
    <g strokeLinecap="round">
      {Array.from({ length: count }, (_, i) => {
        const x = r() * width;
        const y = edge(x);
        const h = 54 + r() * 46;
        const lean = (r() - 0.5) * 40;
        const tip = { x: x + lean, y: y - h };
        const d = `M${x.toFixed(1)} ${y.toFixed(1)} Q${(x + lean * 0.15).toFixed(1)} ${(y - h * 0.6).toFixed(1)} ${tip.x.toFixed(1)} ${tip.y.toFixed(1)}`;
        const kind = r();
        const spikes = Array.from({ length: 7 }, (_, k) => {
          const t = 0.72 + (k / 7) * 0.28;
          // point on the quadratic curve
          const qx = (1 - t) * (1 - t) * x + 2 * (1 - t) * t * (x + lean * 0.15) + t * t * tip.x;
          const qy = (1 - t) * (1 - t) * y + 2 * (1 - t) * t * (y - h * 0.6) + t * t * tip.y;
          return { x: qx, y: qy, a: (k % 2 ? 1 : -1) * (24 + r() * 20) + lean * 0.4 };
        });
        return (
          <g key={i}>
            <path d={d} stroke={kind > 0.5 ? "var(--color-fern)" : "var(--color-moss)"} strokeWidth="1.1" fill="none" />
            {spikes.map((sp, k) => (
              <ellipse
                key={k}
                cx={sp.x}
                cy={sp.y}
                rx="1.3"
                ry="3.6"
                transform={`rotate(${sp.a.toFixed(0)} ${sp.x.toFixed(1)} ${sp.y.toFixed(1)})`}
                fill={kind > 0.66 ? "var(--color-beech)" : kind > 0.33 ? "var(--color-fern)" : "#a8a06a"}
              />
            ))}
          </g>
        );
      })}
    </g>
  );
}

const WORM = {
  a: "M-88 0C-78 -6 -66 -6 -56 0S-34 6 -24 0S-6 -5 0 0",
  b: "M-82 0C-72 5 -60 5 -50 0S-30 -6 -20 0S-5 4 0 0",
};

/** An earthworm body pointing right, head at the origin. Animated bodies wriggle. */
function WormBody({ wriggle = false }: { wriggle?: boolean }) {
  const anim = wriggle ? (
    <animate attributeName="d" dur="1.8s" repeatCount="indefinite" values={`${WORM.a};${WORM.b};${WORM.a}`} calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1" />
  ) : null;
  return (
    <g strokeLinecap="round" fill="none">
      <path d={WORM.a} stroke="#b9786a" strokeWidth="5.5">
        {anim}
      </path>
      <path d={WORM.a} stroke="#d39a8a" strokeWidth="2" strokeDasharray="1.2 4.2">
        {anim}
      </path>
      <path d={WORM.a} stroke="#a5604f" strokeWidth="6.5" strokeDasharray="0 22 8 100">
        {anim}
      </path>
    </g>
  );
}

type FlowerKind = "dandelion" | "clock" | "leaves" | "poppy" | "cornflower" | "daisy" | "clover" | "buttercup";

/** A stem rising from (x, y) with a slight lean; returns its path and tip. */
function stem(x: number, y: number, h: number, lean: number) {
  const tip = { x: x + lean, y: y - h };
  return { d: `M${x} ${y} Q${(x + lean * 0.15).toFixed(1)} ${(y - h * 0.55).toFixed(1)} ${tip.x.toFixed(1)} ${tip.y.toFixed(1)}`, tip };
}

function StemLeaves({ x, y, h, seed }: { x: number; y: number; h: number; seed: number }) {
  const r = rng(seed);
  return (
    <>
      {[0.25, 0.5].map((t, i) => (
        <path
          key={i}
          d={serratedLeaf(10 + r() * 8, 3.2, 3)}
          transform={`translate(${x} ${(y - h * t).toFixed(1)}) rotate(${i ? -40 - r() * 30 : -140 + r() * 30})`}
          fill="var(--color-fern)"
        />
      ))}
    </>
  );
}

function Wildflower({ x, y, seed, kind }: { x: number; y: number; seed: number; kind: Exclude<FlowerKind, "dandelion" | "clock" | "leaves"> }) {
  const r = rng(seed);
  if (kind === "clover") {
    const tip = { x: x + (r() - 0.5) * 6, y: y - 24 - r() * 8 };
    return (
      <g>
        <path d={`M${x} ${y} Q${x} ${y - 12} ${tip.x} ${tip.y}`} stroke="var(--color-fern)" strokeWidth="1.3" fill="none" />
        {[-1, 1].map((s) => (
          <g key={s} transform={`translate(${x + s * 7} ${y - 8})`} fill="var(--color-moss)">
            {[0, 120, 240].map((a) => (
              <ellipse key={a} cx="0" cy="-3.4" rx="2.6" ry="3.4" transform={`rotate(${a})`} />
            ))}
          </g>
        ))}
        <g transform={`translate(${tip.x.toFixed(1)} ${tip.y.toFixed(1)}) scale(1.25)`}>
          {Array.from({ length: 16 }, (_, i) => {
            const row = Math.floor(i / 6);
            const a = -80 + (i % 6) * 32 + row * 14;
            return <ellipse key={i} cx="0" cy={-3 - row * 1.5} rx="1.4" ry="3.8" transform={`rotate(${a})`} fill={i % 3 ? "#c4679a" : "#e49bbf"} />;
          })}
          <circle r="3" fill="#a74b7d" />
        </g>
      </g>
    );
  }
  const h = { poppy: 72, cornflower: 62, daisy: 40, buttercup: 58 }[kind] * (0.85 + r() * 0.3);
  const s = stem(x, y, h, (r() - 0.5) * 18);
  const t = s.tip;
  return (
    <g>
      <path d={s.d} stroke="var(--color-fern)" strokeWidth={kind === "daisy" ? 1.1 : 1.4} fill="none" />
      <StemLeaves x={x} y={y} h={h} seed={seed + 1} />
      <g transform={`translate(${t.x.toFixed(1)} ${t.y.toFixed(1)}) rotate(${((r() - 0.5) * 30).toFixed(0)}) scale(1.35)`}>
        {kind === "poppy" && (
          <>
            {[0, 90, 180, 270].map((a, i) => (
              <ellipse key={a} cx="0" cy="-5" rx="6.8" ry="6" transform={`rotate(${a + 45})`} fill={i % 2 ? "#c9361f" : "#e04a2c"} />
            ))}
            <ellipse cx="0" cy="-1" rx="5.5" ry="4.5" fill="#e85a36" opacity=".7" />
            <circle r="2.6" fill="#2b1d1a" />
            {Array.from({ length: 8 }, (_, i) => (
              <circle key={i} cx={Math.cos(i * 0.785) * 3.8} cy={Math.sin(i * 0.785) * 3.8} r=".7" fill="#2b1d1a" />
            ))}
          </>
        )}
        {kind === "cornflower" &&
          Array.from({ length: 9 }, (_, i) => (
            <path key={i} d="M0 0 L-1.6 -7 L-2.4 -9 L-0.8 -8.4 L0 -10 L0.8 -8.4 L2.4 -9 L1.6 -7Z" transform={`rotate(${i * 40})`} fill={i % 2 ? "#4f72c0" : "#3d5daa"} />
          ))}
        {kind === "cornflower" && <circle r="2.4" fill="#2c3a78" />}
        {kind === "daisy" && (
          <>
            {Array.from({ length: 16 }, (_, i) => (
              <ellipse key={i} cx="0" cy="-5" rx="1.4" ry="4.2" transform={`rotate(${i * 22.5})`} fill="#fffdf7" stroke="#d9cfb9" strokeWidth=".35" />
            ))}
            <circle r="2.8" fill="#f2b51f" />
          </>
        )}
        {kind === "buttercup" && (
          <>
            {Array.from({ length: 5 }, (_, i) => (
              <ellipse key={i} cx="0" cy="-4.2" rx="3.6" ry="4.4" transform={`rotate(${i * 72})`} fill={i % 2 ? "#f0bb12" : "#f7cd2a"} />
            ))}
            <circle r="2" fill="#d08d14" />
          </>
        )}
      </g>
    </g>
  );
}

/**
 * Meadow edge under the home hero: dense layered grass and wildflowers, and
 * below the soil line a fine, dense mesh of roots that fades into the page.
 * An earthworm slowly crosses the topsoil from left to right.
 */
export function MeadowEdge({ className, seed = 3 }: { className?: string; seed?: number }) {
  const W = 1600;
  const H = 400;
  const edge = (x: number) => 126 + 6 * Math.sin(x / 230 + seed) + 3 * Math.sin(x / 71 + 0.7);
  const rand = rng(seed * 11);
  // Irregular clumps: some big tussocks, some small tufts.
  const clumps: { x: number; size: number }[] = [];
  for (let x = 30 + rand() * 40; x < W; x += 70 + rand() * 120) clumps.push({ x, size: 0.6 + rand() * 0.8 });
  const clumpX = clumps.map((c) => c.x);

  const flowers: { x: number; kind: FlowerKind }[] = [
    { x: 92, kind: "daisy" },
    { x: 168, kind: "leaves" },
    { x: 258, kind: "poppy" },
    { x: 352, kind: "dandelion" },
    { x: 446, kind: "cornflower" },
    { x: 528, kind: "clover" },
    { x: 606, kind: "daisy" },
    { x: 628, kind: "daisy" },
    { x: 731, kind: "clock" },
    { x: 822, kind: "poppy" },
    { x: 905, kind: "buttercup" },
    { x: 978, kind: "cornflower" },
    { x: 1046, kind: "dandelion" },
    { x: 1132, kind: "daisy" },
    { x: 1204, kind: "clover" },
    { x: 1270, kind: "poppy" },
    { x: 1362, kind: "cornflower" },
    { x: 1452, kind: "leaves" },
    { x: 1534, kind: "buttercup" },
  ];

  // A handful of root masses, reused (mirrored and scaled) under every plant.
  const big = [0, 1, 2].map((k) => rootMass({ seed: seed * 100 + k, count: 90, depth: 160, spread: 105, leaders: 5 }));
  const small = [0, 1, 2].map((k) => rootMass({ seed: seed * 200 + k, count: 30, depth: 90, spread: 110, leaders: 2 }));
  const id = `meadow-${seed}`;
  const placements = [
    // a continuous mat of shallow rootlets
    ...Array.from({ length: 40 }, (_, i) => {
      const x = 10 + i * 40 + rand() * 20;
      return { ref: `${id}-s${i % 3}`, x, sx: (i % 2 ? -1 : 1) * (0.45 + rand() * 0.2), sy: 0.45 + rand() * 0.2 };
    }),
    ...clumps.map((c, i) => ({ ref: `${id}-s${i % 3}`, x: c.x, sx: (i % 2 ? -1 : 1) * (0.7 + c.size * 0.4), sy: 0.8 + c.size * 0.35 })),
    ...flowers.map((f, i) => ({
      ref: `${id}-b${i % 3}`,
      x: f.x,
      sx: (i % 2 ? -1 : 1) * (f.kind === "clover" || f.kind === "daisy" ? 0.6 : 0.85 + (i % 3) * 0.1),
      sy: f.kind === "clover" || f.kind === "daisy" ? 0.6 : 0.85 + ((i + 1) % 3) * 0.12,
    })),
  ];
  // Dandelions keep a slender taproot.
  const taps = flowers
    .filter((f) => f.kind === "dandelion" || f.kind === "clock" || f.kind === "leaves")
    .map((f, i) => taproot({ x: f.x, y: edge(f.x) + 2, length: 120 + (i % 3) * 30, width: 3.4 + (i % 2), seed: seed * 90 + i }));

  // Fine fungal threads between neighbouring root zones.
  const crowns = flowers.map((f) => f.x).filter((_, i) => i % 2 === 0);
  const threads = crowns.slice(1).flatMap((x, i) => {
    const a = crowns[i];
    const h = hypha({ x: a + 14, y: edge(a) + 50 + rand() * 50 }, { x: x - 14, y: edge(x) + 50 + rand() * 50 }, seed * 7 + i, 0.16, 2);
    return [h.main, ...h.side];
  });

  // The earthworm's tunnel: a gentle wave through the topsoil, from beyond the left edge to beyond the right.
  const tunnel = smoothPath(
    Array.from({ length: 13 }, (_, i) => {
      const x = -160 + i * 160;
      return { x, y: edge(Math.max(0, Math.min(W, x))) + 62 + (i % 2 ? 26 : 0) + rand() * 14 };
    }),
  );

  const pebbles = Array.from({ length: 26 }, () => {
    const x = rand() * W;
    return { x, y: edge(x) + 10 + rand() * 26, rx: 2 + rand() * 4.5, ry: 1.4 + rand() * 2.2, r: rand() * 180 };
  });

  const leaves = Array.from({ length: 9 }, (_, i) => ({
    x: 120 + i * 175 + rand() * 60,
    r: 70 + rand() * 220,
    s: 0.17 + rand() * 0.07,
    oak: rand() > 0.5,
    fill: ["var(--color-rust)", "var(--color-chanterelle)", "var(--color-beech)"][Math.floor(rand() * 3)],
  }));

  const soil = (() => {
    const top: string[] = [];
    const bottom: string[] = [];
    for (let x = 0; x <= W; x += 25) {
      top.push(`${x} ${edge(x).toFixed(1)}`);
      bottom.push(`${x} ${(edge(x) + 30 + 10 * Math.sin(x / 140 + 2)).toFixed(1)}`);
    }
    return `M${top.join(" L")} L${bottom.reverse().join(" L")}Z`;
  })();

  const mass = (m: { lead: string; fine: string }, key: string, leadWidth: number) => (
    <g id={key} key={key} fill="none" stroke="var(--color-chestnut)" strokeLinecap="round">
      <path d={m.fine} strokeWidth=".45" opacity=".42" />
      <path d={m.lead} strokeWidth={leadWidth} opacity=".55" />
    </g>
  );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMin slice" className={`draw-on-load ${className ?? ""}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.45" stopColor="#fff" />
          <stop offset="0.97" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <rect width={W} height={H} fill={`url(#${id}-fade)`} />
        </mask>
        <mask id={`${id}-grow`} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <rect className="grow-down" y="108" width={W} height={H - 108} fill="#fff" />
        </mask>
        {big.map((m, k) => mass(m, `${id}-b${k}`, 1))}
        {small.map((m, k) => mass(m, `${id}-s${k}`, 0.8))}
      </defs>

      {/* topsoil, barely tinted */}
      <path d={soil} fill="var(--color-paper-deep)" />
      {pebbles.map((p, i) => (
        <ellipse key={i} cx={p.x} cy={p.y} rx={p.rx} ry={p.ry} transform={`rotate(${p.r} ${p.x} ${p.y})`} fill="var(--color-ink-mute)" opacity={0.12 + (i % 3) * 0.05} />
      ))}

      <g mask={`url(#${id}-mask)`}>
        <g mask={`url(#${id}-grow)`}>
          {placements.map((p, i) => (
            <use key={i} href={`#${p.ref}`} transform={`translate(${p.x.toFixed(1)} ${(edge(p.x) + 3).toFixed(1)}) scale(${p.sx.toFixed(2)} ${p.sy.toFixed(2)})`} />
          ))}
          {taps.map((t, i) => (
            <g key={i}>
              <path d={t.body} fill="#8a5a34" opacity=".55" />
              <path d={t.side.map((s) => s.d).join(" ")} fill="none" stroke="var(--color-chestnut)" strokeWidth=".6" opacity=".45" />
            </g>
          ))}
        </g>
        <g fill="none" stroke="var(--color-moss)" strokeLinecap="round">
          {threads.map((d, i) => (
            <path key={i} d={d} pathLength={1} className="draw-path" strokeWidth={i % 3 ? 0.55 : 0.8} opacity=".4" style={{ "--d": 1600 + i * 30 } as CSSProperties} />
          ))}
        </g>
      </g>

      {/* The earthworm crosses from left to right; still, mid-field, for reduced motion. */}
      <g className="worm-moving">
        <g>
          <WormBody wriggle />
          <animateMotion dur="52s" repeatCount="indefinite" rotate="auto" path={tunnel} />
        </g>
      </g>
      <g className="worm-still" transform={`translate(${W / 2 + 40} ${edge(W / 2) + 84}) rotate(-6)`}>
        <WormBody />
      </g>

      {/* the meadow */}
      <GrassStems edge={edge} seed={seed + 7} count={34} width={W} />
      <path d={blades(edge, { from: 0, to: W, count: 900, height: 34, seed: seed + 1, clumps: clumpX })} fill="var(--color-fern)" opacity=".75" />
      {flowers.map((f, i) =>
        f.kind === "dandelion" || f.kind === "clock" || f.kind === "leaves" ? (
          <Dandelion key={i} x={f.x} y={edge(f.x) + 1} seed={seed * 3 + i} flower={f.kind === "dandelion" ? "bloom" : f.kind === "clock" ? "clock" : "none"} />
        ) : null,
      )}
      <path d={blades(edge, { from: 0, to: W, count: 760, height: 26, seed: seed + 2, clumps: clumpX })} fill="var(--color-moss)" />
      {flowers.map((f, i) =>
        f.kind === "dandelion" || f.kind === "clock" || f.kind === "leaves" ? null : (
          <Wildflower key={i} x={f.x} y={edge(f.x) + 1} seed={seed * 13 + i} kind={f.kind} />
        ),
      )}
      <path d={blades(edge, { from: 0, to: W, count: 420, height: 15, seed: seed + 3 })} fill="var(--color-moss-deep)" />
      {leaves.map((l, i) =>
        l.oak ? (
          <OakLeaf key={i} x={l.x} y={edge(l.x) + 2} r={l.r} s={l.s} fill={l.fill} />
        ) : (
          <BeechLeaf key={i} x={l.x} y={edge(l.x) + 2} r={l.r} s={l.s} fill={l.fill} />
        ),
      )}
    </svg>
  );
}


/** Horizon line with grass, used where a page goes "underground". */
export function SoilHorizon({
  className,
  seed = 2,
  from = "var(--color-paper)",
  to = "var(--color-humus)",
}: {
  className?: string;
  seed?: number;
  from?: string;
  to?: string;
}) {
  const W = 1600;
  const rand = rng(seed);
  const stones = Array.from({ length: 34 }, () => ({
    x: rand() * W,
    y: 112 + rand() * 60,
    rx: 3 + rand() * 9,
    ry: 2 + rand() * 4,
    r: rand() * 180,
  }));
  return (
    <div className={className} style={{ background: from }} aria-hidden="true">
      <svg viewBox={`0 0 ${W} 190`} preserveAspectRatio="xMidYMax slice" className="block h-[120px] w-full sm:h-[150px] lg:h-[190px]">
        <path d={grass(W, 92, seed, 0.55, 30)} fill="var(--color-moss)" />
        <path d={grass(W, 94, seed + 9, 0.3, 18)} fill="var(--color-fern)" />
        <path d="M0 92 C200 86 380 98 600 92 C820 86 1020 99 1240 93 C1400 89 1500 94 1600 92 V190 H0Z" fill="var(--color-chestnut)" />
        <path d="M0 112 C240 104 440 120 700 110 C960 101 1180 120 1600 108 V190 H0Z" fill="#4a2a17" />
        <path d="M0 142 C300 132 520 150 820 140 C1100 131 1320 148 1600 138 V190 H0Z" fill="#2f2419" />
        <path d="M0 168 C260 160 600 174 900 166 C1200 158 1400 170 1600 164 V190 H0Z" fill={to} />
        {stones.map((s, i) => (
          <ellipse key={i} cx={s.x} cy={s.y} rx={s.rx} ry={s.ry} transform={`rotate(${s.r} ${s.x} ${s.y})`} fill={i % 3 ? "#5b3a24" : "#6e5440"} opacity=".7" />
        ))}
      </svg>
    </div>
  );
}

/**
 * Transition from a dark section into a light one: the forest floor at night,
 * mushrooms fruiting on its edge, and below it (on the light side) the
 * mycelium they grow from: a fan of hyphae under each mushroom, braided cords
 * linking them, and grass roots the fungus wraps around.
 */
export function Sprouting({ className, seed = 8, from = "var(--color-humus)", to = "var(--color-paper)" }: { className?: string; seed?: number; from?: string; to?: string }) {
  const W = 1600;
  const H = 330;
  const edge = (x: number) => 118 + 7 * Math.sin(x / 190 + seed) + 4 * Math.sin(x / 61 + 1.3);
  const pts: string[] = [];
  for (let x = 0; x <= W; x += 20) pts.push(`${x} ${edge(x).toFixed(1)}`);
  const ground = `M0 0 H${W} V${edge(W).toFixed(1)} L${pts.reverse().join(" L")} Z`;

  // Fruiting bodies, left to right. `b` is where the stem meets the ground.
  const fungi = [
    { kind: "mycena", x: 150, s: 1.5, seed: 21, reach: 120 },
    { kind: "chanterelle", x: 380, s: 1.05, reach: 150 },
    { kind: "chanterelle", x: 420, s: 0.75, reach: 90 },
    { kind: "cep", x: 760, s: 1.35, reach: 200 },
    { kind: "mycena", x: 1010, s: 1.2, seed: 9, reach: 120 },
    { kind: "cep", x: 1270, s: 0.9, reach: 160 },
    { kind: "mycena", x: 1480, s: 1.35, seed: 4, reach: 120 },
  ].map((f) => ({ ...f, b: edge(f.x) }));

  const rand = rng(seed * 13);
  const leaves = Array.from({ length: 11 }, (_, i) => ({
    x: 60 + i * 140 + rand() * 70,
    r: 60 + rand() * 240,
    s: 0.2 + rand() * 0.1,
    oak: rand() > 0.5,
    fill: ["var(--color-rust)", "var(--color-chanterelle)", "var(--color-beech)", "var(--color-chestnut)"][Math.floor(rand() * 4)],
  }));

  // A fan of hyphae under every mushroom.
  const fans = fungi.map((f, i) =>
    hyphalFan({ x: f.x, y: f.b + 3, seed: seed * 100 + i * 7, reach: f.reach, arms: 6 + Math.round(f.s * 3), depth: 3, width: 1.1 + f.s * 0.5, fan: [8, 172] }),
  );

  // Rhizomorphs: braided cords sagging from one mushroom to the next.
  const cords = fungi.slice(1).flatMap((f, i) => {
    const a = fungi[i];
    const sag = 34 + rand() * 36;
    return [0, 1, 2].map((k) => {
      const n = 9;
      const p = Array.from({ length: n + 1 }, (_, t) => {
        const u = t / n;
        const x = a.x + (f.x - a.x) * u;
        const y = a.b + (f.b - a.b) * u + Math.sin(Math.PI * u) * sag + (t && t < n ? (rand() - 0.5) * 9 : 0) + k * 2.2;
        return { x, y: y + 4 };
      });
      return smoothPath(p);
    });
  });

  // Grass roots hanging from the turf; the fungus sheathes their tips.
  const grassRoots = Array.from({ length: 22 }, (_, i) => {
    const x = 40 + i * 72 + rand() * 30;
    return fibrousRoots({ x, y: edge(x) + 2, seed: seed * 300 + i, count: 4 + Math.floor(rand() * 3), length: 40 + rand() * 50, spread: 40, width: 1.1 });
  }).flat();

  // Anastomoses: hyphal tips fuse with their nearest neighbours into a net.
  const tips = fans.flatMap((fan) => fan.tips);
  const seen = new Set<string>();
  const lace: string[] = [];
  tips.forEach((a, i) => {
    tips
      .map((b, j) => ({ j, d: Math.hypot(a.x - b.x, a.y - b.y) }))
      .filter((o) => o.j !== i && o.d < 75)
      .sort((p, q) => p.d - q.d)
      .slice(0, 2)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) return;
        seen.add(key);
        lace.push(hypha(a, tips[j], seed * 17 + i * 3 + j, 0.28, 0).main);
      });
  });

  // Hyphal knots where fans end, some of them future mushrooms (primordia).
  const knots = fans.flatMap((fan, i) => fan.tips.filter((_, k) => (k + i) % 5 === 0));

  // Grass blades rooted on the wavy edge, rising into the dark.
  const blades = (density: number, height: number, s2: number) => {
    const r = rng(s2);
    const out: string[] = [];
    for (let i = 0; i < W * density; i++) {
      const x = r() * W;
      const y = edge(x) + 2;
      const h = height * (0.35 + r() * 0.9);
      const lean = (r() - 0.5) * h * 0.9;
      const w = 1.3 + r() * 1.6;
      out.push(`M${(x - w).toFixed(1)} ${y.toFixed(1)} Q${(x + lean * 0.3).toFixed(1)} ${(y - h * 0.6).toFixed(1)} ${(x + lean).toFixed(1)} ${(y - h).toFixed(1)} Q${(x + lean * 0.3 + w * 0.6).toFixed(1)} ${(y - h * 0.55).toFixed(1)} ${(x + w).toFixed(1)} ${y.toFixed(1)}Z`);
    }
    return out.join(" ");
  };

  const id = `sprout-${seed}`;
  return (
    <div className={className} style={{ background: to }} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMin slice" className="draw-on-view block h-[190px] w-full sm:h-[250px] lg:h-[330px]">
        <defs>
          <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.45" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
            <rect width={W} height={H} fill={`url(#${id}-fade)`} />
          </mask>
          <radialGradient id={`${id}-glow`}>
            <stop offset="0" stopColor="var(--color-chanterelle)" stopOpacity=".16" />
            <stop offset="1" stopColor="var(--color-chanterelle)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g mask={`url(#${id}-mask)`}>
          {/* a faint warmth in the soil where each colony lives */}
          {fungi.map((f, i) => (
            <ellipse key={i} cx={f.x} cy={f.b + f.reach * 0.35} rx={f.reach * 1.1} ry={f.reach * 0.6} fill={`url(#${id}-glow)`} />
          ))}
          <path d={grassRoots.map((g) => g.d).join(" ")} fill="none" stroke="var(--color-chestnut)" strokeWidth=".8" strokeLinecap="round" opacity=".28" />

          <g fill="none" stroke="var(--color-beech)" strokeLinecap="round">
            {cords.map((d, i) => (
              <path key={i} d={d} pathLength={1} className="draw-path" strokeWidth={i % 3 === 0 ? 1.4 : 0.8} opacity={i % 3 === 0 ? 0.55 : 0.35} />
            ))}
            {fans.flatMap((fan, i) =>
              fan.strands
                .filter((st) => st.depth < 2)
                .map((st, k) => (
                  <path key={`${i}-${k}`} d={st.d} pathLength={1} className="draw-path" strokeWidth={st.width} opacity={st.depth ? 0.45 : 0.65} />
                )),
            )}
          </g>
          {/* finest hyphae, merged per colony */}
          <g className="fade-on-view" fill="none" stroke="#b07a2a" strokeLinecap="round">
            {fans.map((fan, i) => (
              <path key={i} d={fan.strands.filter((st) => st.depth >= 2).map((st) => st.d).join(" ")} strokeWidth=".5" opacity=".45" />
            ))}
          </g>
          <path className="fade-on-view" d={lace.join(" ")} fill="none" stroke="#b07a2a" strokeWidth=".55" strokeLinecap="round" opacity=".42" />
          <g className="fade-on-view" fill="var(--color-chanterelle)">
            {knots.map((k, i) => (
              <circle key={i} cx={k.x.toFixed(1)} cy={k.y.toFixed(1)} r={i % 3 ? 1.4 : 2.4} opacity={i % 3 ? 0.5 : 0.75} />
            ))}
          </g>
        </g>

        <path d={ground} fill={from} />
        <path d={blades(0.16, 46, seed)} fill="var(--color-humus-3)" />
        <path d={blades(0.06, 30, seed + 5)} fill="var(--color-moss-deep)" />
        {leaves.map((l, i) =>
          l.oak ? (
            <OakLeaf key={i} x={l.x} y={edge(l.x) + 3} r={l.r} s={l.s} fill={l.fill} />
          ) : (
            <BeechLeaf key={i} x={l.x} y={edge(l.x) + 3} r={l.r} s={l.s} fill={l.fill} />
          ),
        )}
        {fungi.map((f, i) =>
          f.kind === "cep" ? (
            <Cep key={i} x={f.x} y={f.b - 33 * f.s} s={f.s} />
          ) : f.kind === "chanterelle" ? (
            <Chanterelle key={i} x={f.x} y={f.b - 28 * f.s} s={f.s} />
          ) : (
            <Mycena key={i} x={f.x} y={f.b} s={f.s} seed={f.seed} />
          ),
        )}
      </svg>
    </div>
  );
}

type Node = { x: number; y: number };

/** A web of hyphae linking nodes, for backgrounds on dark sections. */
export function MyceliumField({
  className,
  nodes,
  edges,
  width = 1000,
  height = 600,
  seed = 1,
  color = "var(--color-mycelium)",
  mode = "view",
  style,
}: {
  className?: string;
  nodes: Node[];
  edges: [number, number][];
  width?: number;
  height?: number;
  seed?: number;
  color?: string;
  mode?: "view" | "load" | "static";
  style?: CSSProperties;
}) {
  const wrap = mode === "load" ? "draw-on-load" : mode === "view" ? "draw-on-view" : "";
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`${wrap} ${className ?? ""}`} style={style} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <g fill="none" stroke={color} strokeLinecap="round">
        {edges.map(([a, b], i) => {
          const h = hypha(nodes[a], nodes[b], seed * 31 + i, 0.1, 3);
          return (
            <g key={i}>
              <path d={h.main} pathLength={1} className="draw-path" strokeWidth={1.2} opacity={0.5} />
              {h.side.map((d, j) => (
                <path key={j} d={d} pathLength={1} className="draw-path" strokeWidth={0.8} opacity={0.32} />
              ))}
            </g>
          );
        })}
        {nodes.map((n, i) =>
          tuft(n, seed + i * 7, 6, 22).map((d, j) => <path key={`${i}-${j}`} d={d} strokeWidth={0.7} opacity={0.3} />),
        )}
      </g>
    </svg>
  );
}
