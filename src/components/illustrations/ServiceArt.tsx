import { rng } from "@/lib/organic";
import { Acorn, BeechLeaf, OakLeaf } from "./Botanical";

export type ArtKind = "jardin" | "bois" | "construction" | "elagage" | "habitat" | "solaire";

const r1 = (n: number) => Math.round(n * 10) / 10;

function blade(px: number, py: number, tx: number, ty: number, w: number) {
  const a = Math.atan2(ty - py, tx - px);
  const nx = Math.cos(a + Math.PI / 2);
  const ny = Math.sin(a + Math.PI / 2);
  return `M${r1(px + nx * w)} ${r1(py + ny * w)} L${r1(tx + nx * 0.8)} ${r1(ty + ny * 0.8)} L${r1(tx)} ${r1(ty)} L${r1(px - nx * w * 0.2)} ${r1(py - ny * w * 0.2)}Z`;
}

function Shadow({ y = 146, rx = 78 }: { y?: number; rx?: number }) {
  return <ellipse cx="100" cy={y} rx={rx} ry="6" fill="var(--color-ink)" opacity=".1" />;
}

function Hedge() {
  const rand = rng(12);
  const bumps = Array.from({ length: 70 }, () => ({
    x: 36 + rand() * 128,
    y: 70 + rand() * 66,
    r: 5 + rand() * 7,
    c: rand(),
  }));
  return (
    <>
      <Shadow />
      <path d="M30 142 V72 Q30 63 39 63 H102 C104 50 120 44 128 52 C136 43 154 47 157 60 C169 60 173 72 171 84 V142Z" fill="var(--color-moss-deep)" />
      {bumps
        .filter((b) => !(b.x < 100 && b.y - b.r < 66))
        .map((b, i) => (
          <circle key={i} cx={r1(b.x)} cy={r1(b.y)} r={r1(b.r)} fill={b.c > 0.66 ? "var(--color-fern)" : b.c > 0.33 ? "var(--color-moss)" : "#365124"} opacity=".9" />
        ))}
      <path d="M39 63 H102" stroke="#a9bb7a" strokeWidth="2" strokeLinecap="round" opacity=".8" />
      <path d="M20 80 l7 -3 M14 98 l6 1 M24 112 l5 -4" stroke="var(--color-fern)" strokeWidth="3" strokeLinecap="round" />
      <g transform="translate(6 -6)">
        <path d={blade(104, 54, 52, 20, 5)} fill="#9aa19a" />
        <path d={blade(104, 54, 60, 12, 5)} fill="#c3c8c0" />
        <path d="M104 54 L148 92 M104 54 L156 84" stroke="var(--color-chestnut)" strokeWidth="7" strokeLinecap="round" />
        <circle cx="104" cy="54" r="3.4" fill="var(--color-ink)" />
      </g>
    </>
  );
}

function Logs() {
  const rows = [
    { y: 124, xs: [52, 84, 116, 148] },
    { y: 96, xs: [68, 100, 132] },
    { y: 68, xs: [84, 116] },
    { y: 40, xs: [100] },
  ];
  const rand = rng(4);
  return (
    <>
      <Shadow y={144} />
      {rows.flatMap((row) =>
        row.xs.map((x) => {
          const r = 15 + rand() * 2;
          const tone = rand() > 0.5 ? "#dcaa62" : "#cf9446";
          const crack = rand() * 360;
          return (
            <g key={`${x}-${row.y}`}>
              <circle cx={x} cy={row.y} r={r} fill={tone} stroke="var(--color-chestnut)" strokeWidth="3.6" />
              <circle cx={x} cy={row.y} r={r * 0.62} fill="none" stroke="#a96e2c" strokeWidth=".9" opacity=".7" />
              <circle cx={x} cy={row.y} r={r * 0.3} fill="none" stroke="#a96e2c" strokeWidth=".9" opacity=".7" />
              <path d={`M${x} ${row.y} l${r1(Math.cos(crack) * r * 0.8)} ${r1(Math.sin(crack) * r * 0.8)}`} stroke="#7d4c1d" strokeWidth="1.2" strokeLinecap="round" />
            </g>
          );
        }),
      )}
      <path d="M170 142 L186 92" stroke="var(--color-chestnut)" strokeWidth="5" strokeLinecap="round" />
      <path d="M180 88 L196 94 L192 108 C188 102 184 100 176 100Z" fill="#9aa19a" />
    </>
  );
}

function Pergola() {
  return (
    <>
      <Shadow y={148} rx={88} />
      <path d="M20 134 H180 L156 110 H44Z" fill="#d6a050" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
        const t = i / 10;
        return <path key={i} d={`M${r1(20 + 160 * t)} 134 L${r1(44 + 112 * t)} 110`} stroke="#a8722e" strokeWidth="1" />;
      })}
      <rect x="20" y="134" width="160" height="9" fill="#b0752f" />
      <rect x="58" y="52" width="5" height="60" fill="#a8722e" />
      <rect x="137" y="52" width="5" height="60" fill="#a8722e" />
      <rect x="40" y="38" width="8" height="98" fill="#c08236" />
      <rect x="152" y="38" width="8" height="98" fill="#c08236" />
      <rect x="28" y="32" width="144" height="8" rx="1" fill="#b0752f" />
      <rect x="50" y="46" width="100" height="5" fill="#a8722e" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <path key={i} d={`M${46 + i * 15} 30 L${57 + i * 12} 50`} stroke="#c88a3d" strokeWidth="4.4" strokeLinecap="square" />
      ))}
      <path d="M44 134 C36 120 50 108 42 94 C36 82 50 72 44 58 C40 48 46 40 52 36" stroke="var(--color-moss)" strokeWidth="2" fill="none" />
      {[
        [40, 120, -50],
        [48, 104, 40],
        [38, 88, -60],
        [50, 72, 50],
        [42, 58, -40],
        [52, 42, 30],
      ].map(([x, y, r], i) => (
        <path key={i} transform={`translate(${x} ${y}) rotate(${r})`} d="M0 0 C-4 -4 -4 -10 0 -14 C4 -10 4 -4 0 0Z" fill={i % 2 ? "var(--color-fern)" : "var(--color-moss)"} />
      ))}
    </>
  );
}

function Branch() {
  const teeth: string[] = [];
  for (let i = 0; i <= 26; i++) {
    const t = i / 26;
    const x = 52 + 100 * t;
    const y = 128 - 26 * t + 10 * Math.sin(Math.PI * t);
    teeth.push(`${r1(x)} ${r1(y + (i % 2 ? 3.4 : 0))}`);
  }
  return (
    <>
      <path d="M-4 78 C40 70 90 58 128 48 C146 43 160 40 170 38" stroke="#7d5f45" strokeWidth="16" fill="none" strokeLinecap="butt" />
      <path d="M14 74 l10 -2 M48 66 l12 -3 M92 56 l9 -3 M120 49 l10 -3" stroke="#5c4330" strokeWidth="1.4" strokeLinecap="round" />
      <ellipse cx="170" cy="38" rx="6" ry="8" transform="rotate(-14 170 38)" fill="#e7c48b" />
      <ellipse cx="170" cy="38" rx="3" ry="4.4" transform="rotate(-14 170 38)" fill="none" stroke="#b58449" strokeWidth=".9" />
      <path d="M60 64 C62 46 74 34 90 28" stroke="#7d5f45" strokeWidth="4" fill="none" strokeLinecap="round" />
      <OakLeaf x={90} y={28} r={70} s={0.36} fill="var(--color-fern)" />
      <OakLeaf x={78} y={36} r={-30} s={0.32} fill="var(--color-moss)" />
      <OakLeaf x={68} y={50} r={-70} s={0.3} fill="var(--color-beech)" vein="rgb(90 50 10 / .3)" />
      <g transform="rotate(26 184 92)">
        <rect x="176" y="80" width="16" height="22" rx="2" fill="#7d5f45" />
        <ellipse cx="184" cy="80" rx="8" ry="3.4" fill="#e7c48b" />
      </g>
      <path d={`M48 132 Q100 128 156 102 L157 99 Q102 120 52 124Z`} fill="#c3c8c0" />
      <path d={`M${teeth.join(" L")}`} stroke="#8d938b" strokeWidth="1.2" fill="none" />
      <rect x="14" y="122" width="40" height="15" rx="7" fill="var(--color-moss)" transform="rotate(-6 34 130)" />
      <circle cx="22" cy="130" r="2" fill="var(--color-paper)" opacity=".6" />
    </>
  );
}

function House() {
  return (
    <>
      <path d="M10 122 H190" stroke="var(--color-moss)" strokeWidth="4" strokeLinecap="round" />
      <path d="M46 122 V64 H154 V122Z" fill="var(--color-paper-warm)" stroke="var(--color-ink)" strokeWidth="2.2" />
      <path d="M36 66 L100 22 L164 66Z" fill="#4e5a62" />
      <path d="M50 56 L100 22 L150 56" fill="none" stroke="#6b7880" strokeWidth="1" />
      <path d="M62 48 H138 M74 40 H126 M86 31 H114" stroke="#6b7880" strokeWidth=".9" />
      <rect x="128" y="24" width="10" height="20" fill="#5b4a3e" />
      <path d="M50 66 l6 -4 l6 4 l6 -4 l6 4 l6 -4 l6 4 l6 -4 l6 4 l6 -4 l6 4 l6 -4 l6 4 l6 -4 l6 4 l6 -4 l6 4" stroke="#d8b552" strokeWidth="2.2" fill="none" />
      <rect x="116" y="80" width="26" height="26" fill="#c9d8db" stroke="var(--color-ink)" strokeWidth="1.8" />
      <path d="M129 80 V106 M116 93 H142" stroke="var(--color-ink)" strokeWidth="1.4" />
      <path d="M150 86 q8 2 14 -2 M150 94 q8 2 16 -1" stroke="var(--color-water)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M66 86 C66 92 60 96 60 101 A6 6 0 0 0 72 101 C72 96 66 92 66 86Z" fill="var(--color-water)" />
      <rect x="90" y="78" width="7" height="30" rx="3.5" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1.6" />
      <circle cx="93.5" cy="108" r="6" fill="var(--color-rowan)" stroke="var(--color-ink)" strokeWidth="1.6" />
      <rect x="92" y="88" width="3" height="18" fill="var(--color-rowan)" />
      <path d="M84 30 q4 -6 0 -12 q-4 -6 0 -12" stroke="var(--color-ink-mute)" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity=".7" />
    </>
  );
}

function Solar() {
  return (
    <>
      <circle cx="132" cy="50" r="30" fill="var(--color-chanterelle)" />
      <circle cx="132" cy="50" r="40" fill="none" stroke="var(--color-chanterelle)" strokeWidth="1.4" strokeDasharray="2 6" opacity=".8" />
      <path d="M10 140 L96 82 L190 140Z" fill="var(--color-rust)" />
      <path d="M24 130 L96 82 L176 130" fill="none" stroke="var(--color-rust-deep)" strokeWidth="1" />
      <path d="M78 104 L118 78 L156 102 L116 128Z" fill="#2f3e4a" />
      <path d="M88 98 L128 72 M98 110 L138 84 M106 116 L146 90 M92 108 L130 84 M104 96 L140 118 M94 90 L132 112" stroke="#5d7385" strokeWidth=".8" opacity=".9" />
      <path d="M0 148 C30 136 70 136 100 146 V160 H0Z" fill="var(--color-chestnut)" />
      <path d="M44 142 C44 128 46 118 50 108" stroke="var(--color-moss)" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M50 110 C40 108 32 100 32 92 C42 92 50 100 50 110Z" fill="var(--color-fern)" />
      <path d="M50 108 C54 98 62 92 72 94 C70 104 60 110 50 108Z" fill="var(--color-moss)" />
    </>
  );
}

export function ServiceArt({ kind, className }: { kind: ArtKind; className?: string }) {
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
      {kind === "jardin" && <Hedge />}
      {kind === "bois" && <Logs />}
      {kind === "construction" && <Pergola />}
      {kind === "elagage" && <Branch />}
      {kind === "habitat" && <House />}
      {kind === "solaire" && <Solar />}
    </svg>
  );
}

/** Small leaf ornament used as a list bullet or separator. */
export function LeafMark({ className, kind = "beech" }: { className?: string; kind?: "beech" | "oak" | "acorn" }) {
  return (
    <svg viewBox="-20 -60 40 70" className={className} aria-hidden="true">
      {kind === "beech" && <BeechLeaf s={0.48} />}
      {kind === "oak" && <OakLeaf s={0.46} fill="var(--color-rust)" />}
      {kind === "acorn" && <Acorn y={-20} s={1.3} />}
    </svg>
  );
}
