/**
 * Small deterministic generators for organic SVG shapes: roots, hyphae,
 * grass and leaf outlines. Everything is seeded so the server output is
 * stable from one build to the next.
 */

export function rng(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

type Pt = { x: number; y: number };

/** Catmull-Rom spline through points, as a cubic Bézier path. */
export function smoothPath(points: Pt[], tension = 0.5) {
  if (points.length < 2) return "";
  let d = `M${r1(points[0].x)} ${r1(points[0].y)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + ((p2.x - p0.x) / 6) * tension * 2;
    const c1y = p1.y + ((p2.y - p0.y) / 6) * tension * 2;
    const c2x = p2.x - ((p3.x - p1.x) / 6) * tension * 2;
    const c2y = p2.y - ((p3.y - p1.y) / 6) * tension * 2;
    d += ` C${r1(c1x)} ${r1(c1y)} ${r1(c2x)} ${r1(c2y)} ${r1(p2.x)} ${r1(p2.y)}`;
  }
  return d;
}

/* ---------------------------------------------------------------- roots */

export type RootSeg = { d: string; width: number; depth: number; order: number };

type RootOptions = {
  x: number;
  y: number;
  angle?: number; // degrees, 90 points down
  length?: number;
  depth?: number;
  width?: number;
  spread?: number;
  seed?: number;
  gravity?: number;
};

export function roots(opts: RootOptions): RootSeg[] {
  const {
    x,
    y,
    angle = 90,
    length = 120,
    depth = 5,
    width = 7,
    spread = 38,
    seed = 1,
    gravity = 0.25,
  } = opts;
  const rand = rng(seed);
  const out: RootSeg[] = [];
  let order = 0;

  const grow = (sx: number, sy: number, a: number, len: number, w: number, level: number) => {
    // pull angles back toward "down" so roots dive rather than curl up
    const target = a + (90 - a) * gravity;
    const steps = 3 + Math.floor(rand() * 2);
    const pts: Pt[] = [{ x: sx, y: sy }];
    let cx = sx;
    let cy = sy;
    let ca = a;
    for (let i = 0; i < steps; i++) {
      ca += (target - ca) * 0.3 + (rand() - 0.5) * 22;
      const step = len / steps;
      cx += Math.cos((ca * Math.PI) / 180) * step;
      cy += Math.sin((ca * Math.PI) / 180) * step;
      pts.push({ x: cx, y: cy });
    }
    out.push({ d: smoothPath(pts), width: r1(w), depth: level, order: order++ });
    if (level >= depth || w < 0.6) return;
    const children = level === 0 ? 3 : rand() > 0.35 ? 2 : 3;
    for (let c = 0; c < children; c++) {
      const offset = (c - (children - 1) / 2) * spread + (rand() - 0.5) * spread * 0.8;
      // fine rootlets can also start part-way along the parent
      const from = c === 0 || rand() > 0.5 ? pts[pts.length - 1] : pts[1 + Math.floor(rand() * (pts.length - 2))];
      grow(from.x, from.y, ca + offset, len * (0.55 + rand() * 0.25), w * (0.52 + rand() * 0.12), level + 1);
    }
  };

  grow(x, y, angle, length, width, 0);
  return out;
}

/* --------------------------------------------------------------- hyphae */

/** A wandering thread between two points, plus a few short side branches. */
export function hypha(a: Pt, b: Pt, seed: number, wobble = 0.12, branches = 3) {
  const rand = rng(seed);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const nx = -dy / len;
  const ny = dx / len;
  const n = Math.max(3, Math.round(len / 60));
  const pts: Pt[] = [a];
  for (let i = 1; i < n; i++) {
    const t = i / n;
    const off = (rand() - 0.5) * len * wobble * Math.sin(Math.PI * t) * 2;
    pts.push({ x: a.x + dx * t + nx * off, y: a.y + dy * t + ny * off });
  }
  pts.push(b);
  const main = smoothPath(pts);

  const side: string[] = [];
  for (let i = 0; i < branches; i++) {
    const base = pts[1 + Math.floor(rand() * (pts.length - 2))];
    const dir = rand() > 0.5 ? 1 : -1;
    const l = 14 + rand() * 30;
    const ang = Math.atan2(dy, dx) + dir * (0.6 + rand() * 0.9);
    const mid = { x: base.x + Math.cos(ang) * l * 0.5 + (rand() - 0.5) * 6, y: base.y + Math.sin(ang) * l * 0.5 + (rand() - 0.5) * 6 };
    const end = { x: base.x + Math.cos(ang) * l, y: base.y + Math.sin(ang) * l };
    side.push(smoothPath([base, mid, end]));
    if (rand() > 0.5) {
      const ang2 = ang + dir * (0.5 + rand() * 0.5);
      side.push(smoothPath([mid, { x: mid.x + Math.cos(ang2) * l * 0.5, y: mid.y + Math.sin(ang2) * l * 0.5 }]));
    }
  }
  return { main, side };
}

/** Free-floating mycelium tufts radiating from a point. */
export function tuft(c: Pt, seed: number, count = 7, reach = 40) {
  const rand = rng(seed);
  const paths: string[] = [];
  for (let i = 0; i < count; i++) {
    const ang = (i / count) * Math.PI * 2 + rand() * 0.6;
    const l = reach * (0.5 + rand() * 0.6);
    const mid = { x: c.x + Math.cos(ang) * l * 0.5 + (rand() - 0.5) * 8, y: c.y + Math.sin(ang) * l * 0.5 + (rand() - 0.5) * 8 };
    paths.push(smoothPath([c, mid, { x: c.x + Math.cos(ang + (rand() - 0.5) * 0.6) * l, y: c.y + Math.sin(ang + (rand() - 0.5) * 0.6) * l }]));
  }
  return paths;
}

/* ---------------------------------------------------------------- grass */

export function grass(width: number, baseY: number, seed: number, density = 0.35, height = 22) {
  const rand = rng(seed);
  const blades: string[] = [];
  const count = Math.floor(width * density);
  for (let i = 0; i < count; i++) {
    const x = rand() * width;
    const h = height * (0.35 + rand() * 0.9);
    const lean = (rand() - 0.5) * h * 0.9;
    const w = 1.2 + rand() * 1.6;
    blades.push(
      `M${r1(x - w)} ${baseY} Q${r1(x + lean * 0.3)} ${r1(baseY - h * 0.6)} ${r1(x + lean)} ${r1(baseY - h)} Q${r1(x + lean * 0.3 + w * 0.6)} ${r1(baseY - h * 0.55)} ${r1(x + w)} ${baseY}Z`,
    );
  }
  return blades.join(" ");
}

/* --------------------------------------------------------------- leaves */

/** Serrated, lance-shaped leaf (sweet chestnut), pointing up from (0,0). */
export function serratedLeaf(length: number, width: number, teeth = 14) {
  const left: Pt[] = [];
  const right: Pt[] = [];
  const steps = teeth * 2;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const profile = Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.05)), 0.85) * (1 - t * 0.25);
    const tooth = i % 2 === 1 && t > 0.08 && t < 0.96 ? 1.12 : 1;
    const w = (width / 2) * profile * tooth;
    const y = -t * length;
    const lean = i % 2 === 1 ? -length * 0.012 : 0;
    left.push({ x: -w, y: y + lean });
    right.push({ x: w, y: y + lean });
  }
  const pts = [...left, ...right.reverse()];
  return `M${pts.map((p) => `${r1(p.x)} ${r1(p.y)}`).join(" L")}Z`;
}

/** Lobed oak leaf pointing up, stem at (0,0), about 60 x 120 units. */
export const oakLeafPath =
  "M0 -8 C-4 -12 -8 -14 -12 -14 C-20 -14 -22 -22 -16 -26 C-24 -28 -26 -38 -18 -42 C-26 -46 -26 -58 -17 -60 C-24 -66 -22 -76 -14 -76 C-18 -84 -14 -92 -8 -92 C-10 -102 -6 -112 0 -116 C6 -112 10 -102 8 -92 C14 -92 18 -84 14 -76 C22 -76 24 -66 17 -60 C26 -58 26 -46 18 -42 C26 -38 24 -28 16 -26 C22 -22 20 -14 12 -14 C8 -14 4 -12 0 -8Z";

/** Oval beech leaf pointing up, stem at (0,0). */
export const beechLeafPath =
  "M0 -6 C-16 -22 -22 -52 -16 -78 C-12 -94 -5 -106 0 -112 C5 -106 12 -94 16 -78 C22 -52 16 -22 0 -6Z";

export function beechVeins(count = 7) {
  const out: string[] = ["M0 -4 L0 -108"];
  for (let i = 1; i <= count; i++) {
    const y = -12 - i * 12;
    const span = 14 * Math.sin((Math.PI * i) / (count + 1)) + 3;
    out.push(`M0 ${y} Q${r1(span * 0.5)} ${y - 6} ${r1(span)} ${y - 13}`);
    out.push(`M0 ${y} Q${r1(-span * 0.5)} ${y - 6} ${r1(-span)} ${y - 13}`);
  }
  return out.join(" ");
}

/* ------------------------------------------------------- fibrous roots */

export type Strand = { d: string; width: number; depth: number };

/**
 * Fibrous roots of a grass clump or small plant: many thin, wavy strands
 * fanning down from a crown, each with a few root hairs.
 */
export function fibrousRoots({
  x,
  y,
  seed,
  count = 12,
  length = 90,
  spread = 70,
  width = 1.6,
}: {
  x: number;
  y: number;
  seed: number;
  count?: number;
  length?: number;
  spread?: number;
  width?: number;
}): Strand[] {
  const rand = rng(seed);
  const out: Strand[] = [];
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0.5 : i / (count - 1);
    let a = 90 + (t - 0.5) * spread * 2 + (rand() - 0.5) * 14;
    const len = length * (0.45 + rand() * 0.6) * (1 - Math.abs(t - 0.5) * 0.5);
    const steps = 5;
    const pts: Pt[] = [{ x: x + (rand() - 0.5) * 10, y }];
    let cx = pts[0].x;
    let cy = y;
    for (let s = 0; s < steps; s++) {
      a += (90 - a) * 0.18 + (rand() - 0.5) * 26;
      cx += Math.cos((a * Math.PI) / 180) * (len / steps);
      cy += Math.sin((a * Math.PI) / 180) * (len / steps);
      pts.push({ x: cx, y: cy });
    }
    out.push({ d: smoothPath(pts), width: r1(width * (0.55 + rand() * 0.55)), depth: 0 });
    // root hairs along the strand
    const hairs = 1 + Math.floor(rand() * 3);
    for (let h = 0; h < hairs; h++) {
      const base = pts[1 + Math.floor(rand() * (pts.length - 2))];
      const ha = a + (rand() > 0.5 ? 1 : -1) * (35 + rand() * 40);
      const hl = 8 + rand() * 18;
      const mid = { x: base.x + Math.cos((ha * Math.PI) / 180) * hl * 0.5, y: base.y + Math.sin((ha * Math.PI) / 180) * hl * 0.5 + 2 };
      const end = { x: base.x + Math.cos((ha * Math.PI) / 180) * hl, y: base.y + Math.sin((ha * Math.PI) / 180) * hl + 5 };
      out.push({ d: smoothPath([base, mid, end]), width: 0.6, depth: 1 });
    }
  }
  return out;
}

/** A tapering taproot (dandelion, dock) as a filled shape, plus side rootlets. */
export function taproot({ x, y, length, width, seed }: { x: number; y: number; length: number; width: number; seed: number }) {
  const rand = rng(seed);
  const n = 8;
  const spine: Pt[] = [];
  let cx = x;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    cx += (rand() - 0.5) * 6;
    spine.push({ x: cx, y: y + t * length });
  }
  const left: Pt[] = [];
  const right: Pt[] = [];
  spine.forEach((p, i) => {
    const t = i / n;
    const w = (width / 2) * Math.pow(1 - t, 1.4) + 0.3;
    left.push({ x: p.x - w, y: p.y });
    right.push({ x: p.x + w, y: p.y });
  });
  const body = `${smoothPath(left)} L${r1(right[right.length - 1].x)} ${r1(right[right.length - 1].y)} ${smoothPath(right.reverse()).replace(/^M[^C]+/, "")} Z`;
  const side: Strand[] = [];
  for (let i = 2; i < n; i++) {
    if (rand() > 0.75) continue;
    const p = spine[i];
    const dir = rand() > 0.5 ? 1 : -1;
    const l = 14 + rand() * 26 * (1 - i / n);
    side.push({
      d: smoothPath([p, { x: p.x + dir * l * 0.5, y: p.y + l * 0.25 }, { x: p.x + dir * l, y: p.y + l * 0.6 + rand() * 8 }]),
      width: 0.8,
      depth: 1,
    });
  }
  return { body, side };
}

/* ------------------------------------------------------- hyphal fans */

/**
 * Mycelium spreading from the foot of a mushroom: a fan of wandering,
 * repeatedly forking hyphae that thin out as they go.
 */
export function hyphalFan({
  x,
  y,
  seed,
  reach = 110,
  arms = 7,
  depth = 3,
  width = 1.5,
  fan = [15, 165],
}: {
  x: number;
  y: number;
  seed: number;
  reach?: number;
  arms?: number;
  depth?: number;
  width?: number;
  /** Angular range in degrees (0 = right, 90 = down). */
  fan?: [number, number];
}) {
  const rand = rng(seed);
  const out: Strand[] = [];
  const tips: Pt[] = [];
  const grow = (sx: number, sy: number, a: number, len: number, w: number, level: number) => {
    const steps = 4;
    const pts: Pt[] = [{ x: sx, y: sy }];
    let cx = sx;
    let cy = sy;
    let ca = a;
    for (let i = 0; i < steps; i++) {
      ca += (rand() - 0.5) * 44;
      cx += Math.cos((ca * Math.PI) / 180) * (len / steps);
      cy += Math.sin((ca * Math.PI) / 180) * (len / steps);
      pts.push({ x: cx, y: cy });
    }
    out.push({ d: smoothPath(pts), width: r1(w), depth: level });
    if (level >= depth) {
      tips.push({ x: cx, y: cy });
      return;
    }
    const kids = rand() > 0.4 ? 2 : 3;
    for (let k = 0; k < kids; k++) {
      const from = pts[1 + Math.floor(rand() * (pts.length - 1))];
      grow(from.x, from.y, ca + (rand() - 0.5) * 80, len * (0.5 + rand() * 0.3), Math.max(0.35, w * 0.62), level + 1);
    }
  };
  for (let i = 0; i < arms; i++) {
    const t = arms === 1 ? 0.5 : i / (arms - 1);
    const a = fan[0] + (fan[1] - fan[0]) * t + (rand() - 0.5) * 12;
    grow(x + (rand() - 0.5) * 6, y, a, reach * (0.45 + rand() * 0.35), width * (0.7 + rand() * 0.4), 0);
  }
  return { strands: out, tips };
}

/** Compact smooth path through integer-rounded points (quadratic midpoints), for very many fine strands. */
function finePath(pts: Pt[]) {
  const p = pts.map((q) => ({ x: Math.round(q.x), y: Math.round(q.y) }));
  let d = `M${p[0].x} ${p[0].y}`;
  for (let i = 1; i < p.length - 1; i++) {
    d += `Q${p[i].x} ${p[i].y} ${Math.round((p[i].x + p[i + 1].x) / 2)} ${Math.round((p[i].y + p[i + 1].y) / 2)}`;
  }
  const last = p[p.length - 1];
  return `${d}L${last.x} ${last.y}`;
}

/**
 * A dense, hair-fine root mass around a crown at (0, 0), like the fibrous
 * root ball of a meadow plant: many thin wandering strands, each with short
 * laterals. Returns a few thicker leading roots and one merged path of fine ones.
 */
export function rootMass({
  seed,
  count = 60,
  depth = 150,
  spread = 80,
  leaders = 5,
}: {
  seed: number;
  count?: number;
  depth?: number;
  spread?: number;
  leaders?: number;
}) {
  const rand = rng(seed);
  const fine: string[] = [];
  const lead: string[] = [];
  const strand = (a0: number, len: number, wobble: number, out: string[], laterals: number) => {
    let a = a0;
    let x = (rand() - 0.5) * 6;
    let y = rand() * 3;
    const steps = 7;
    const pts: Pt[] = [{ x, y }];
    for (let s = 0; s < steps; s++) {
      a += (90 - a) * 0.09 + (rand() - 0.5) * wobble;
      x += Math.cos((a * Math.PI) / 180) * (len / steps);
      y += Math.sin((a * Math.PI) / 180) * (len / steps);
      pts.push({ x, y });
    }
    out.push(finePath(pts));
    for (let k = 0; k < laterals; k++) {
      const base = pts[1 + Math.floor(rand() * (steps - 1))];
      let la = a + (rand() > 0.5 ? 1 : -1) * (30 + rand() * 50);
      let lx = base.x;
      let ly = base.y;
      const ll = len * (0.12 + rand() * 0.22);
      const lp: Pt[] = [{ x: lx, y: ly }];
      for (let s = 0; s < 3; s++) {
        la += (rand() - 0.5) * 40 + (90 - la) * 0.15;
        lx += Math.cos((la * Math.PI) / 180) * (ll / 3);
        ly += Math.sin((la * Math.PI) / 180) * (ll / 3);
        lp.push({ x: lx, y: ly });
      }
      fine.push(finePath(lp));
    }
  };
  for (let i = 0; i < leaders; i++) {
    strand(90 + (rand() - 0.5) * spread, depth * (0.7 + rand() * 0.35), 22, lead, 3);
  }
  for (let i = 0; i < count; i++) {
    // Most strands fan out sideways first, then dive: an oval root ball.
    const t = rand() * 2 - 1;
    const a = 90 + t * spread * (0.5 + rand() * 0.6);
    const len = depth * (0.3 + rand() * 0.75) * (1 - Math.abs(t) * 0.25);
    strand(a, len, 46, fine, 2 + Math.floor(rand() * 3));
  }
  return { lead: lead.join(""), fine: fine.join("") };
}
