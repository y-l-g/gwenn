import { hypha, rng, roots, smoothPath } from "@/lib/organic";
import { Apple, Cep, Chanterelle, Mycena } from "./Botanical";
import type { CSSProperties } from "react";

const r1 = (n: number) => Math.round(n * 10) / 10;

function stoneWall(x0: number, x1: number, y0: number, y1: number, seed: number) {
  const rand = rng(seed);
  const stones: { x: number; y: number; w: number; h: number; c: string }[] = [];
  const palette = ["#b9ad98", "#a89c86", "#c7bba5", "#9d917c", "#b3a58c", "#c2b49a"];
  let y = y0;
  while (y < y1) {
    const h = 12 + rand() * 9;
    let x = x0 - rand() * 14;
    while (x < x1) {
      const w = 18 + rand() * 30;
      stones.push({ x, y, w: Math.min(w, x1 - x), h: Math.min(h, y1 - y), c: palette[Math.floor(rand() * palette.length)] });
      x += w + 2;
    }
    y += h + 2;
  }
  return stones.filter((s) => s.w > 3 && s.h > 3).map((s) => ({ ...s, x: Math.max(s.x, x0) }));
}

const markers = [
  { n: 1, x: 296, y: 352 },
  { n: 2, x: 432, y: 292 },
  { n: 3, x: 318, y: 272 },
  { n: 4, x: 352, y: 336 },
  { n: 5, x: 170, y: 262 },
  { n: 6, x: 372, y: 232 },
  { n: 7, x: 468, y: 246 },
  { n: 8, x: 222, y: 236 },
];

/** A Breton stone house in cutaway, with the hidden life of the soil below. */
export function HouseCutaway({ className, showMarkers = true }: { className?: string; showMarkers?: boolean }) {
  const wall = stoneWall(92, 282, 214, 380, 5);
  const rand = rng(14);
  const soilThreads = Array.from({ length: 12 }, (_, i) =>
    hypha({ x: 20 + rand() * 560, y: 400 + rand() * 30 }, { x: 20 + rand() * 560, y: 440 + rand() * 70 }, 70 + i, 0.18, 2),
  );
  const treeRoots = roots({ x: 540, y: 382, length: 54, depth: 4, width: 6, spread: 40, seed: 31 });

  return (
    <svg viewBox="0 0 600 520" className={className} aria-hidden="true">
      {/* soil */}
      <path d="M0 380 H600 V520 H0Z" fill="var(--color-humus-2)" />
      <path d="M0 380 C120 376 240 384 360 379 C460 375 540 382 600 380 V392 H0Z" fill="var(--color-chestnut)" />
      <g fill="none" stroke="var(--color-chanterelle)" strokeLinecap="round" className="draw-on-view">
        {soilThreads.map((t, i) => (
          <g key={i} opacity=".55">
            <path d={t.main} strokeWidth="1.1" pathLength={1} className="draw-path" />
            {t.side.map((d, j) => (
              <path key={j} d={d} strokeWidth=".7" opacity=".7" />
            ))}
          </g>
        ))}
      </g>
      <g fill="none" stroke="#8a5a34" strokeLinecap="round">
        {treeRoots.map((s) => (
          <path key={s.order} d={s.d} strokeWidth={s.width} opacity={0.9 - s.depth * 0.12} />
        ))}
      </g>
      <path d="M92 380 V396 H470 V380" fill="#6e6250" />

      {/* gutter and downpipe */}
      <path d="M70 216 H490" stroke="#59646b" strokeWidth="5" strokeLinecap="round" />
      <path d="M80 216 V372 Q80 380 72 380" stroke="#59646b" strokeWidth="4" fill="none" />

      {/* stone facade (left) */}
      <rect x="92" y="214" width="190" height="166" fill="#a89c86" />
      {wall.map((s, i) => (
        <rect key={i} x={r1(s.x)} y={r1(s.y)} width={r1(s.w)} height={r1(s.h)} rx="4" fill={s.c} />
      ))}
      <path d="M222 222 l-6 10 l5 6 l-7 12 l4 8" stroke="#5c5142" strokeWidth="1.6" fill="none" />
      <rect x="140" y="268" width="56" height="64" fill="#41525c" />
      <path d="M168 268 V332 M140 300 H196" stroke="#d9cfba" strokeWidth="3" />
      <rect x="140" y="268" width="56" height="64" fill="none" stroke="#d9cfba" strokeWidth="3" />
      <rect x="126" y="266" width="12" height="68" fill="var(--color-moss)" />
      <rect x="198" y="266" width="12" height="68" fill="var(--color-moss)" />
      <path d="M134 334 H202" stroke="#8b7f6a" strokeWidth="5" />
      <path d="M232 380 V314 Q232 292 252 292 Q272 292 272 314 V380Z" fill="var(--color-rust-deep)" />
      <circle cx="264" cy="342" r="2.2" fill="var(--color-chanterelle)" />

      {/* cutaway (right) */}
      <rect x="282" y="214" width="188" height="166" fill="#efe1c4" />
      <rect x="282" y="214" width="188" height="34" fill="#d8c8a6" />
      <path d={`M284 236 ${Array.from({ length: 31 }, (_, i) => `l3 ${i % 2 ? 8 : -8}`).join(" ")}`} stroke="#d9b54f" strokeWidth="3" fill="none" />
      <rect x="282" y="246" width="188" height="6" fill="#8b6b45" />
      <rect x="282" y="372" width="188" height="8" fill="#9c7a50" />
      <path d="M282 214 V380" stroke="#7a6e5a" strokeWidth="8" />
      <path d="M470 214 V380" stroke="#7a6e5a" strokeWidth="8" />
      {/* back window */}
      <rect x="406" y="276" width="48" height="56" fill="#c4d7dc" stroke="#8a7a60" strokeWidth="3" />
      <path d="M430 276 V332" stroke="#8a7a60" strokeWidth="2" />
      <path d="M396 290 q-10 4 -18 0 M398 302 q-12 5 -22 0 M396 314 q-10 4 -18 0" stroke="var(--color-water)" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* radiator and warmth */}
      <rect x="330" y="340" width="46" height="26" rx="3" fill="#f6f1e6" stroke="#8a7a60" strokeWidth="2" />
      <path d="M338 342 V364 M346 342 V364 M354 342 V364 M362 342 V364 M370 342 V364" stroke="#c9bda6" strokeWidth="1.5" />
      <path d="M338 334 q4 -8 0 -16 M352 334 q4 -8 0 -16 M366 334 q4 -8 0 -16" stroke="var(--color-rowan)" strokeWidth="1.8" fill="none" strokeLinecap="round" className="motion-safe:animate-[glow_3s_ease-in-out_infinite]" />
      {/* meter */}
      <rect x="300" y="262" width="22" height="30" rx="2" fill="#f6f1e6" stroke="#8a7a60" strokeWidth="2" />
      <rect x="304" y="268" width="14" height="7" fill="#41525c" />
      {/* damp at wall base */}
      <path d="M288 372 C292 358 300 352 296 340 C306 350 312 360 308 372Z" fill="#7d8f7a" opacity=".55" />
      <path d="M298 330 C298 334 294 337 294 340 A4 4 0 0 0 302 340 C302 337 298 334 298 330Z" fill="var(--color-water)" />
      {/* ventilation */}
      <circle cx="448" cy="262" r="8" fill="#f6f1e6" stroke="#8a7a60" strokeWidth="2" />
      <path d="M448 256 V268 M442 262 H454" stroke="#8a7a60" strokeWidth="1.4" className="origin-[448px_262px] motion-safe:animate-[spin_6s_linear_infinite]" style={{ transformBox: "view-box" } as CSSProperties} />

      {/* roof */}
      <path d="M74 216 L100 102 L460 102 L486 216Z" fill="#46525a" />
      {Array.from({ length: 9 }, (_, i) => {
        const y = 114 + i * 12.6;
        const t = (y - 102) / 114;
        return <path key={i} d={`M${r1(100 - 26 * t)} ${r1(y)} H${r1(460 + 26 * t)}`} stroke="#5d6a72" strokeWidth="1" />;
      })}
      <path d="M100 102 H460" stroke="#2f383e" strokeWidth="4" strokeLinecap="round" />
      <rect x="100" y="64" width="28" height="42" fill="#9d917c" />
      <rect x="96" y="60" width="36" height="7" fill="#7f7462" />
      <rect x="432" y="64" width="28" height="42" fill="#9d917c" />
      <rect x="428" y="60" width="36" height="7" fill="#7f7462" />
      <path d="M116 54 q6 -10 0 -20 q-6 -10 0 -20" stroke="var(--color-ink-mute)" strokeWidth="2" fill="none" opacity=".45" strokeLinecap="round" />

      {/* garden */}
      <path d="M540 382 C538 350 542 320 536 296" stroke="#6b4a2e" strokeWidth="9" strokeLinecap="round" fill="none" />
      {Array.from({ length: 26 }, (_, i) => {
        const a = (i / 26) * Math.PI * 2;
        const rr = 26 + ((i * 37) % 17);
        return <circle key={i} cx={r1(538 + Math.cos(a) * rr * 0.9)} cy={r1(268 + Math.sin(a) * rr * 0.75)} r={14 + (i % 4) * 3} fill={i % 3 === 0 ? "var(--color-fern)" : i % 3 === 1 ? "var(--color-moss)" : "#4d6a35"} />;
      })}
      <circle cx="538" cy="268" r="26" fill="var(--color-moss)" />
      <Apple x={518} y={262} s={0.42} />
      <Apple x={556} y={282} s={0.42} />
      <Apple x={542} y={242} s={0.38} />
      <Cep x={36} y={366} s={0.55} />
      <Chanterelle x={58} y={370} s={0.42} />
      <Mycena x={500} y={380} s={0.6} seed={9} />
      <path d={smoothPath([{ x: 0, y: 381 }, { x: 600, y: 379 }])} stroke="var(--color-moss)" strokeWidth="3" />

      {showMarkers &&
        markers.map((m) => (
          <g key={m.n}>
            <circle cx={m.x} cy={m.y} r="10" fill="var(--color-chanterelle)" stroke="var(--color-humus)" strokeWidth="2" />
            <text x={m.x} y={m.y + 4.2} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--color-humus)">
              {m.n}
            </text>
          </g>
        ))}
    </svg>
  );
}

export const houseMarkerOrder = ["humidite", "froid", "factures", "chauffage", "menuiseries", "isolation", "ventilation", "bati"];
