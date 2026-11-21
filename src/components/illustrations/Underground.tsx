import { grass, hypha, roots, rng, tuft } from "@/lib/organic";
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
}: RootSystemProps) {
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
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`${wrap} ${className ?? ""}`} aria-hidden="true" preserveAspectRatio="xMidYMin meet">
      <g fill="none" stroke="var(--color-moss)" strokeLinecap="round">
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

/** The reverse: dark soil giving way to a light section, with shoots. */
/**
 * Transition from a dark section into a light one: the forest floor at night,
 * mushrooms fruiting on its edge, and below it (on the light side) the
 * mycelium that links them, drawn as the band scrolls into view.
 */
export function Sprouting({ className, seed = 8, from = "var(--color-humus)", to = "var(--color-paper)" }: { className?: string; seed?: number; from?: string; to?: string }) {
  const W = 1600;
  const H = 230;
  const edge = (x: number) => 128 + 7 * Math.sin(x / 190 + seed) + 4 * Math.sin(x / 61 + 1.3);
  const pts: string[] = [];
  for (let x = 0; x <= W; x += 20) pts.push(`${x} ${edge(x).toFixed(1)}`);
  const ground = `M0 0 H${W} V${edge(W).toFixed(1)} L${pts.reverse().join(" L")} Z`;

  // Fruiting bodies, left to right. `b` is where the stem meets the ground.
  const fungi = [
    { kind: "mycena", x: 150, s: 1.5, seed: 21 },
    { kind: "chanterelle", x: 380, s: 1.05 },
    { kind: "chanterelle", x: 420, s: 0.75 },
    { kind: "cep", x: 760, s: 1.35 },
    { kind: "mycena", x: 1010, s: 1.2, seed: 9 },
    { kind: "cep", x: 1270, s: 0.9 },
    { kind: "mycena", x: 1480, s: 1.35, seed: 4 },
  ].map((f) => ({ ...f, b: edge(f.x) }));

  const rand = rng(seed * 13);
  const leaves = Array.from({ length: 11 }, (_, i) => ({
    x: 60 + i * 140 + rand() * 70,
    r: 60 + rand() * 240,
    s: 0.2 + rand() * 0.1,
    oak: rand() > 0.5,
    fill: ["var(--color-rust)", "var(--color-chanterelle)", "var(--color-beech)", "var(--color-chestnut)"][Math.floor(rand() * 4)],
  }));

  // Mycelium under the light side, linking neighbouring mushrooms.
  const threads = fungi.slice(1).flatMap((f, i) => {
    const a = fungi[i];
    const sag = Math.min(H - 8, Math.max(a.b, f.b) + 48 + rand() * 40);
    return [
      `M${a.x} ${(a.b + 4).toFixed(1)} C${a.x + 40} ${sag} ${f.x - 40} ${sag} ${f.x} ${(f.b + 4).toFixed(1)}`,
      hypha({ x: a.x, y: a.b + 8 }, { x: f.x, y: f.b + 8 }, seed * 7 + i, 0.1, 2).main,
    ];
  });

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

  return (
    <div className={className} style={{ background: to }} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMin slice" className="draw-on-view block h-[140px] w-full sm:h-[180px] lg:h-[230px]">
        <path d={ground} fill={from} />
        <g fill="none" stroke="var(--color-moss)" strokeLinecap="round">
          {threads.map((d, i) => (
            <path key={i} d={d} pathLength={1} className="draw-path" strokeWidth={i % 2 ? 0.8 : 1.1} opacity={i % 2 ? 0.22 : 0.34} />
          ))}
        </g>
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
