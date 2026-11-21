import { home, landmarks, MAP, project, RADIUS_KM, towns } from "@/content/area";
import { hypha, smoothPath, tuft } from "@/lib/organic";
import type { CSSProperties } from "react";

type LabelPos = { dx: number; dy: number; anchor: "start" | "middle" | "end" };

const labelPos: Record<string, LabelPos> = {
  Locminé: { dx: -16, dy: 34, anchor: "end" },
  Pontivy: { dx: 18, dy: -14, anchor: "start" },
  Baud: { dx: -18, dy: 34, anchor: "start" },
  "Grand-Champ": { dx: 18, dy: 10, anchor: "start" },
  "Saint-Jean-Brévelay": { dx: 16, dy: 34, anchor: "start" },
  Vannes: { dx: 18, dy: -6, anchor: "start" },
};

const ll = (lat: number, lng: number) => project(lat, lng);

// Rough coastline of the Gulf of Morbihan and the Étel-Carnac shore.
const sea = [
  [47.62, -3.25], [47.645, -3.17], [47.6, -3.1], [47.585, -3.03], [47.6, -2.97], [47.57, -2.95],
  [47.59, -2.88], [47.62, -2.84], [47.635, -2.8], [47.648, -2.76], [47.628, -2.72], [47.6, -2.7],
  [47.585, -2.66], [47.567, -2.75], [47.561, -2.85], [47.553, -2.9],
].map(([a, b]) => ll(a, b));

const blavet = [[48.15, -3.0], [48.068, -2.963], [48.02, -3.02], [47.98, -3.04], [47.93, -3.06], [47.87, -3.04], [47.82, -3.12], [47.79, -3.25]].map(([a, b]) => ll(a, b));
const oust = [[48.15, -2.72], [48.069, -2.751], [48.02, -2.66], [47.952, -2.547], [47.9, -2.44], [47.81, -2.38], [47.75, -2.3]].map(([a, b]) => ll(a, b));
const n24 = [[47.932, -2.397], [47.952, -2.547], [47.91, -2.68], [47.886, -2.835], [47.875, -3.02], [47.86, -3.25]].map(([a, b]) => ll(a, b));
const d767 = [[48.15, -3.04], [48.068, -2.963], [47.97, -2.88], [47.886, -2.835], [47.78, -2.8], [47.658, -2.76]].map(([a, b]) => ll(a, b));

export function ZoneMap({ className }: { className?: string }) {
  const c = project(home.lat, home.lng);
  const points = towns.map((t) => ({ ...t, p: project(t.lat, t.lng) }));
  const kmPx = MAP.height / ((MAP.north - MAP.south) * 111);
  const seaPath = `M0 ${sea[0].y} ${sea.map((p) => `L${p.x} ${p.y}`).join(" ")} L${sea[sea.length - 1].x} ${MAP.height} L0 ${MAP.height}Z`;
  const marks = landmarks.map((t) => ({ ...t, p: project(t.lat, t.lng) }));

  return (
    <svg viewBox={`0 0 ${MAP.width} ${MAP.height}`} className={`draw-on-view ${className ?? ""}`} role="img" aria-labelledby="map-title map-desc">
      <title id="map-title">Zone d&apos;intervention autour de Moréac</title>
      <desc id="map-desc">
        Carte stylisée du centre Morbihan, de Pontivy au golfe du Morbihan : Moréac au centre et un cercle de {RADIUS_KM} km, qui englobe Locminé, Pontivy, Baud, Grand-Champ, Saint-Jean-Brévelay et les communes voisines. Vannes, Josselin et Pluvigner sont indiqués comme repères.
      </desc>
      <defs>
        <radialGradient id="zone-glow">
          <stop offset="0" stopColor="var(--color-chanterelle)" stopOpacity=".26" />
          <stop offset=".6" stopColor="var(--color-chanterelle)" stopOpacity=".08" />
          <stop offset="1" stopColor="var(--color-chanterelle)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={MAP.width} height={MAP.height} fill="var(--color-humus-2)" rx="28" />
      <path d={seaPath} fill="#1c2a2c" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={smoothPath(sea.map((p) => ({ x: p.x, y: p.y + 16 + i * 16 })))} fill="none" stroke="var(--color-water)" strokeWidth="1" opacity={0.3 - i * 0.08} />
      ))}
      <ellipse cx={ll(47.59, -2.845).x} cy={ll(47.59, -2.845).y} rx="16" ry="7" fill="var(--color-humus-2)" transform={`rotate(-30 ${ll(47.59, -2.845).x} ${ll(47.59, -2.845).y})`} />
      <ellipse cx={ll(47.596, -2.795).x} cy={ll(47.596, -2.795).y} rx="12" ry="6" fill="var(--color-humus-2)" />
      <text x="120" y="910" className="fill-water font-display" fontSize="26" fontStyle="italic" opacity=".8">
        Golfe du Morbihan
      </text>

      <circle cx={c.x} cy={c.y} r={(RADIUS_KM + 3) * kmPx} fill="url(#zone-glow)" />
      <circle cx={c.x} cy={c.y} r={RADIUS_KM * kmPx} fill="none" stroke="var(--color-chanterelle)" strokeOpacity=".35" strokeDasharray="3 9" strokeWidth="1.5" />

      <path d={smoothPath(blavet)} fill="none" stroke="var(--color-water)" strokeWidth="3" opacity=".75" />
      <path d={smoothPath(oust)} fill="none" stroke="var(--color-water)" strokeWidth="3" opacity=".75" />
      <text x={ll(47.99, -3.06).x - 8} y={ll(47.99, -3.06).y} className="fill-water font-display" fontSize="20" fontStyle="italic" textAnchor="end">
        Blavet
      </text>
      <text x={ll(48.02, -2.64).x + 10} y={ll(48.02, -2.64).y} className="fill-water font-display" fontSize="20" fontStyle="italic">
        Oust
      </text>

      <path d={smoothPath(n24)} fill="none" stroke="var(--color-spore)" strokeWidth="2" strokeDasharray="10 7" opacity=".45" />
      <path d={smoothPath(d767)} fill="none" stroke="var(--color-spore)" strokeWidth="2" strokeDasharray="10 7" opacity=".45" />
      <text x={ll(47.915, -2.69).x} y={ll(47.915, -2.69).y + 26} fontSize="15" className="fill-spore" opacity=".7" fontWeight="600" letterSpacing="1">
        N24
      </text>
      <text x={ll(47.75, -2.79).x + 10} y={ll(47.75, -2.79).y} fontSize="15" className="fill-spore" opacity=".7" fontWeight="600" letterSpacing="1">
        D767
      </text>

      <g fill="none" stroke="var(--color-mycelium)" strokeLinecap="round">
        {points.map((t, i) => {
          const h = hypha(c, t.p, 100 + i * 13, 0.09, t.main ? 3 : 1);
          return (
            <g key={t.name} opacity={t.main ? 0.85 : 0.45}>
              <path d={h.main} pathLength={1} className="draw-path" strokeWidth={t.main ? 2 : 1.2} />
              {h.side.map((d, j) => (
                <path key={j} d={d} strokeWidth={0.9} opacity={0.6} />
              ))}
            </g>
          );
        })}
        {tuft(c, 3, 14, 60).map((d, i) => (
          <path key={i} d={d} strokeWidth="1" opacity=".5" />
        ))}
      </g>

      {points.map((t) => {
        const lp = labelPos[t.name];
        return (
          <g key={t.name}>
            <circle cx={t.p.x} cy={t.p.y} r={t.main ? 9 : 5} fill="var(--color-humus)" stroke="var(--color-mycelium)" strokeWidth={t.main ? 2.5 : 1.5} />
            {t.main ? (
              <text
                x={t.p.x + (lp?.dx ?? 14)}
                y={t.p.y + (lp?.dy ?? 6)}
                textAnchor={lp?.anchor ?? "start"}
                className="fill-mycelium font-display"
                fontSize="32"
              >
                {t.name}
              </text>
            ) : (
              <text x={t.p.x + 10} y={t.p.y + 5} className="hidden fill-spore sm:inline" fontSize="15">
                {t.name}
              </text>
            )}
          </g>
        );
      })}

      {/* Landmarks outside the zone, for orientation */}
      {marks.map((t) => {
        const lp = labelPos[t.name];
        return (
          <g key={t.name} opacity=".75">
            <circle cx={t.p.x} cy={t.p.y} r={t.main ? 8 : 5} fill="none" stroke="var(--color-spore)" strokeWidth={t.main ? 2 : 1.5} />
            <text
              x={t.p.x + (lp?.dx ?? 10)}
              y={t.p.y + (lp?.dy ?? 5)}
              textAnchor={lp?.anchor ?? "start"}
              className={t.main ? "fill-spore font-display" : "hidden fill-spore sm:inline"}
              fontSize={t.main ? 28 : 18}
            >
              {t.name}
            </text>
          </g>
        );
      })}

      <g>
        <circle cx={c.x} cy={c.y} r="30" fill="var(--color-chanterelle)" opacity=".18" className="motion-safe:animate-[glow_4s_ease-in-out_infinite]" style={{ transformOrigin: "center" } as CSSProperties} />
        <circle cx={c.x} cy={c.y} r="13" fill="var(--color-chanterelle)" />
        <text x={c.x + 24} y={c.y - 14} className="fill-chanterelle font-display" fontSize="40" fontStyle="italic">
          Moréac
        </text>
      </g>

      <g transform={`translate(${MAP.width - 60 - 10 * kmPx} ${MAP.height - 50})`}>
        <path d={`M0 0 H${10 * kmPx}`} stroke="var(--color-spore)" strokeWidth="3" />
        <path d={`M0 -6 V6 M${10 * kmPx} -6 V6`} stroke="var(--color-spore)" strokeWidth="2" />
        <text x={5 * kmPx} y="-12" textAnchor="middle" fontSize="16" className="fill-spore">
          10 km
        </text>
      </g>
    </svg>
  );
}
