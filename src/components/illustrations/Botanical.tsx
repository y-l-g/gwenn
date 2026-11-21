import { beechLeafPath, beechVeins, oakLeafPath, rng, serratedLeaf } from "@/lib/organic";
import type { CSSProperties, ReactNode } from "react";

type Place = {
  x?: number;
  y?: number;
  s?: number;
  r?: number;
  className?: string;
  style?: CSSProperties;
};

function G({ x = 0, y = 0, s = 1, r = 0, className, style, children }: Place & { children: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <g className={className} style={style}>
        {children}
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ leaves */

export function OakLeaf({ fill = "var(--color-moss)", vein = "rgb(255 248 230 / .45)", ...p }: Place & { fill?: string; vein?: string }) {
  return (
    <G {...p}>
      <path d="M0 -6 L0 8" stroke="var(--color-chestnut)" strokeWidth="2.4" strokeLinecap="round" />
      <path d={oakLeafPath} fill={fill} />
      <path
        d="M0 -10 L0 -110 M0 -22 L-13 -24 M0 -22 L13 -24 M0 -38 L-17 -42 M0 -38 L17 -42 M0 -55 L-16 -60 M0 -55 L16 -60 M0 -72 L-13 -76 M0 -72 L13 -76 M0 -88 L-8 -92 M0 -88 L8 -92"
        stroke={vein}
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
      />
    </G>
  );
}

export function BeechLeaf({ fill = "var(--color-beech)", vein = "rgb(80 40 10 / .35)", ...p }: Place & { fill?: string; vein?: string }) {
  return (
    <G {...p}>
      <path d="M0 -4 L0 9" stroke="var(--color-chestnut)" strokeWidth="2.2" strokeLinecap="round" />
      <path d={beechLeafPath} fill={fill} />
      <path d={beechVeins()} stroke={vein} strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </G>
  );
}

export function ChestnutLeaf({ fill = "var(--color-chanterelle)", vein = "rgb(90 45 10 / .35)", ...p }: Place & { fill?: string; vein?: string }) {
  const veins: string[] = ["M0 0 L0 -128"];
  for (let i = 1; i < 14; i++) {
    const y = -i * 9;
    const w = 13 * Math.pow(Math.sin((Math.PI * i) / 14), 0.8);
    veins.push(`M0 ${y} L${(w).toFixed(1)} ${(y - 7).toFixed(1)} M0 ${y} L${(-w).toFixed(1)} ${(y - 7).toFixed(1)}`);
  }
  return (
    <G {...p}>
      <path d="M0 0 L0 12" stroke="var(--color-chestnut)" strokeWidth="2.2" strokeLinecap="round" />
      <path d={serratedLeaf(132, 34, 15)} fill={fill} />
      <path d={veins.join(" ")} stroke={vein} strokeWidth="1" fill="none" />
    </G>
  );
}

/* ------------------------------------------------------------------- fruit */

export function Acorn(p: Place) {
  return (
    <G {...p}>
      <path d="M0 -8 Q1 -14 4 -17" stroke="var(--color-chestnut)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M-8 2 C-9.5 12 -5 22 0 25 C5 22 9.5 12 8 2Z" fill="#b57b2c" />
      <path d="M-4 6 C-5 12 -3 18 -1 21" stroke="rgb(255 240 210 / .5)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M0 25 l0 3" stroke="#6b4a22" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M-11 2 C-11 -5 -6 -9 0 -9 C6 -9 11 -5 11 2 C7 5 -7 5 -11 2Z" fill="#7a5a2c" />
      <path d="M-8 -3 l3 3 M-4 -6 l3 3 M0 -7 l3 3 M4 -6 l3 3 M-9 1 l3 2 M-5 -1 l3 3 M-1 -2 l3 3 M3 -2 l3 3 M7 -1 l2 2" stroke="#4e3a1c" strokeWidth="1" strokeLinecap="round" />
    </G>
  );
}

export function Blackberry({ seed = 3, ...p }: Place & { seed?: number }) {
  const rand = rng(seed);
  const drupes: { x: number; y: number; r: number }[] = [];
  for (let row = 0; row < 6; row++) {
    const y = -2 + row * 4.4;
    const span = 9 * Math.sin((Math.PI * (row + 0.7)) / 6.6);
    const n = Math.max(2, Math.round(span / 3.2) + 1);
    for (let i = 0; i < n; i++) {
      const x = n === 1 ? 0 : -span + (i * 2 * span) / (n - 1);
      drupes.push({ x: x + (rand() - 0.5), y, r: 3 + rand() * 0.5 });
    }
  }
  return (
    <G {...p}>
      <path d="M0 -6 Q-1 -14 2 -20" stroke="var(--color-moss)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {drupes.map((d, i) => (
        <g key={i}>
          <circle cx={d.x} cy={d.y} r={d.r} fill={i % 3 === 0 ? "#3a2236" : "var(--color-sloe)"} />
          <circle cx={d.x - d.r * 0.35} cy={d.y - d.r * 0.35} r={d.r * 0.32} fill="rgb(255 235 245 / .35)" />
        </g>
      ))}
      <path d="M0 -5 L-7 -9 M0 -5 L7 -9 M0 -5 L-4 -11 M0 -5 L4 -11 M0 -5 L0 -10" stroke="var(--color-fern)" strokeWidth="1.8" strokeLinecap="round" />
    </G>
  );
}

export function RowanCluster({ seed = 7, ...p }: Place & { seed?: number }) {
  const rand = rng(seed);
  const berries: { x: number; y: number }[] = [];
  for (let i = 0; i < 16; i++) {
    const a = -Math.PI / 2 + (rand() - 0.5) * 2.2;
    const d = 12 + rand() * 18;
    berries.push({ x: Math.cos(a) * d, y: Math.sin(a) * d * 0.7 - 8 });
  }
  return (
    <G {...p}>
      {berries.map((b, i) => (
        <path key={`s${i}`} d={`M0 12 Q${(b.x * 0.4).toFixed(1)} ${(b.y * 0.2 + 6).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`} stroke="#8a5a2a" strokeWidth=".9" fill="none" />
      ))}
      <path d="M0 12 L0 26" stroke="#8a5a2a" strokeWidth="1.6" strokeLinecap="round" />
      {berries.map((b, i) => (
        <g key={i}>
          <circle cx={b.x} cy={b.y} r={3.4} fill={i % 4 === 0 ? "#d9662f" : "var(--color-rowan)"} />
          <circle cx={b.x - 1} cy={b.y - 1.1} r={1} fill="rgb(255 240 220 / .6)" />
        </g>
      ))}
    </G>
  );
}

export function Apple(p: Place) {
  return (
    <G {...p}>
      <path d="M0 -2 C-4 -6 -14 -8 -18 0 C-23 10 -15 24 -6 24 C-3 24 -1 22 0 22 C1 22 3 24 6 24 C15 24 23 10 18 0 C14 -8 4 -6 0 -2Z" fill="var(--color-rowan)" />
      <path d="M6 -2 C14 -4 19 2 18 10 C16 4 12 0 6 -2Z" fill="var(--color-beech)" opacity=".75" />
      <path d="M-11 3 C-14 7 -14 12 -12 16" stroke="rgb(255 235 215 / .5)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M0 -2 Q1 -9 4 -12" stroke="var(--color-chestnut)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M3 -9 C8 -15 15 -15 18 -12 C14 -8 8 -7 3 -9Z" fill="var(--color-fern)" />
    </G>
  );
}

export function ChestnutBurr({ seed = 11, ...p }: Place & { seed?: number }) {
  const rand = rng(seed);
  const spines: string[] = [];
  for (let i = 0; i < 46; i++) {
    const a = (i / 46) * Math.PI * 2 + rand() * 0.1;
    const r0 = 11;
    const r = 18 + rand() * 6;
    spines.push(`M${(Math.cos(a) * r0).toFixed(1)} ${(Math.sin(a) * r0).toFixed(1)} L${(Math.cos(a + (rand() - 0.5) * 0.2) * r).toFixed(1)} ${(Math.sin(a + (rand() - 0.5) * 0.2) * r).toFixed(1)}`);
  }
  return (
    <G {...p}>
      <path d={spines.join(" ")} stroke="#9aa04d" strokeWidth="1" strokeLinecap="round" />
      <circle r="13" fill="#8c934a" />
      <path d="M-9 -2 C-8 -10 8 -10 9 -2 C8 6 -8 6 -9 -2Z" fill="var(--color-chestnut)" />
      <path d="M-4 -5 C-1 -7 3 -6 5 -4" stroke="rgb(255 230 200 / .45)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </G>
  );
}

/* --------------------------------------------------------------- mushrooms */

export function Cep(p: Place) {
  return (
    <G {...p}>
      <path d="M-9 1 C-13 13 -16 25 -11 31 C-5 35 5 35 11 31 C16 25 13 13 9 1Z" fill="#eadcbf" />
      <path d="M-7 10 l4 3 l4 -3 l4 3 M-9 17 l4 3 l4 -3 l4 3 l4 -3 M-8 24 l4 3 l4 -3 l4 3 l4 -3" stroke="#c9b48c" strokeWidth=".9" fill="none" />
      <path d="M-26 0 C-26 -17 -13 -25 0 -25 C13 -25 26 -17 26 0 C18 4 -18 4 -26 0Z" fill="#7b4625" />
      <path d="M-24 0 C-14 4 14 4 24 0 C16 6 -16 6 -24 0Z" fill="#d6bf72" />
      <path d="M-16 -15 C-11 -20 -3 -22 4 -21" stroke="rgb(255 230 200 / .35)" strokeWidth="3" fill="none" strokeLinecap="round" />
    </G>
  );
}

export function Chanterelle(p: Place) {
  return (
    <G {...p}>
      <path d="M-20 -14 C-14 -20 -6 -16 0 -19 C6 -16 14 -20 20 -14 C16 -8 8 -4 4 4 L3.4 26 C3.4 29.5 -3.4 29.5 -3.4 26 L-4 4 C-8 -4 -16 -8 -20 -14Z" fill="var(--color-chanterelle)" />
      <path d="M-14 -12 C-8 -8 -4 -2 -2 6 M-6 -13 C-3 -8 -1 -2 0 6 M6 -13 C3 -8 1 -2 0 6 M14 -12 C8 -8 4 -2 2 6" stroke="#b9761f" strokeWidth="1" fill="none" />
      <path d="M-20 -14 C-14 -20 -6 -16 0 -19 C6 -16 14 -20 20 -14 C14 -15 6 -13 0 -15 C-6 -13 -14 -15 -20 -14Z" fill="#f2c062" />
    </G>
  );
}

export function Mycena({ seed = 5, ...p }: Place & { seed?: number }) {
  const rand = rng(seed);
  const stems = [0, 1, 2].map((i) => ({
    x: (i - 1) * 9 + (rand() - 0.5) * 4,
    h: 22 + rand() * 16,
    lean: (rand() - 0.5) * 8,
    s: 0.7 + rand() * 0.4,
  }));
  return (
    <G {...p}>
      {stems.map((m, i) => (
        <g key={i}>
          <path d={`M${m.x} 0 Q${m.x + m.lean * 0.3} ${-m.h * 0.5} ${m.x + m.lean} ${-m.h}`} stroke="#efe6d2" strokeWidth={1.6 * m.s} fill="none" strokeLinecap="round" />
          <path
            transform={`translate(${m.x + m.lean} ${-m.h}) scale(${m.s})`}
            d="M-7 2 C-7 -4 -3 -8 0 -8 C3 -8 7 -4 7 2 C3 1 -3 1 -7 2Z"
            fill="#cbbfa4"
          />
        </g>
      ))}
    </G>
  );
}

/* ------------------------------------------------------------ composites */

/** Autumn oak twig with leaves and acorns. viewBox suggested: 0 0 320 240 */
export function OakTwig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 -50 320 290" className={className} aria-hidden="true">
      <g className="sway" style={{ "--origin": "0% 50%", "--sway-dur": "9s" } as CSSProperties}>
        <path d="M-10 60 C40 70 90 92 140 110 C190 128 240 150 300 196" stroke="var(--color-chestnut)" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M120 103 C130 80 150 66 176 58 M200 136 C206 160 222 176 246 186" stroke="var(--color-chestnut)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <OakLeaf x={176} y={58} r={64} s={0.82} fill="var(--color-beech)" vein="rgb(90 50 10 / .35)" />
        <OakLeaf x={150} y={110} r={150} s={0.9} fill="var(--color-moss)" />
        <OakLeaf x={70} y={78} r={-20} s={0.95} fill="var(--color-rust)" />
        <OakLeaf x={246} y={186} r={120} s={0.7} fill="var(--color-chanterelle)" vein="rgb(90 50 10 / .35)" />
        <OakLeaf x={230} y={160} r={20} s={0.78} fill="var(--color-fern)" />
        <Acorn x={112} y={112} r={-8} s={1.15} />
        <Acorn x={128} y={118} r={18} s={1.05} />
        <Acorn x={286} y={190} r={-30} s={0.9} />
      </g>
    </svg>
  );
}
