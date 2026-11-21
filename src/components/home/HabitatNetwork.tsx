"use client";

import { useId, useState, type CSSProperties } from "react";
import type { HabitatTopic } from "@/content/habitat";

export type EdgeGeometry = { a: string; b: string; wide: { main: string; side: string[] }; narrow: { main: string; side: string[] } };

type Props = {
  topics: HabitatTopic[];
  edges: EdgeGeometry[];
  tufts: { wide: string[]; narrow: string[] };
};

export function HabitatNetwork({ topics, edges, tufts }: Props) {
  const [active, setActive] = useState(topics[0].id);
  const panelId = useId();
  const current = topics.find((t) => t.id === active)!;
  const linked = new Set(current.links);

  const renderSvg = (variant: "wide" | "narrow") => (
    <svg
      viewBox={variant === "wide" ? "0 0 1000 625" : "0 0 600 800"}
      className={`absolute inset-0 h-full w-full ${variant === "wide" ? "hidden md:block" : "md:hidden"}`}
      aria-hidden="true"
    >
      <g fill="none" stroke="var(--color-mycelium)" strokeLinecap="round">
        {tufts[variant].map((d, i) => (
          <path key={i} d={d} strokeWidth="0.8" opacity="0.18" />
        ))}
        {edges.map((e) => {
          const on = e.a === active || e.b === active;
          const g = e[variant];
          return (
            <g key={`${e.a}-${e.b}`} className="transition-opacity duration-700" opacity={on ? 1 : 0.32}>
              <path d={g.main} strokeWidth={on ? 2 : 1.1} stroke={on ? "var(--color-chanterelle)" : "var(--color-mycelium)"} className="transition-[stroke,stroke-width] duration-700" />
              {g.side.map((d, i) => (
                <path key={i} d={d} strokeWidth={0.9} opacity={on ? 0.7 : 0.45} stroke={on ? "var(--color-chanterelle)" : "var(--color-mycelium)"} />
              ))}
              {on && (
                <path
                  d={g.main}
                  stroke="#fff3cf"
                  strokeWidth={3}
                  strokeDasharray="2 38"
                  className="motion-safe:animate-[pulse-flow_1.6s_linear_infinite]"
                  style={{ animationDirection: e.a === active ? "normal" : "reverse" } as CSSProperties}
                />
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="relative aspect-[3/4] w-full sm:aspect-[4/5] md:aspect-[16/10] lg:col-span-8">
        {renderSvg("wide")}
        {renderSvg("narrow")}
        <ul className="absolute inset-0" aria-label="Sujets abordés pendant l'appel">
          {topics.map((t) => {
            const isActive = t.id === active;
            const isLinked = linked.has(t.id);
            return (
              <li
                key={t.id}
                className="absolute left-[var(--mx)] top-[var(--my)] -translate-x-1/2 -translate-y-1/2 md:left-[var(--x)] md:top-[var(--y)]"
                style={{ "--x": `${t.pos.x}%`, "--y": `${t.pos.y}%`, "--mx": `${t.mpos.x}%`, "--my": `${t.mpos.y}%` } as CSSProperties}
              >
                <button
                  type="button"
                  aria-pressed={isActive}
                  aria-controls={panelId}
                  onClick={() => setActive(t.id)}
                  onMouseEnter={() => setActive(t.id)}
                  className={`group flex flex-col items-center gap-2 rounded-2xl px-2 py-1 text-center transition-transform duration-500 ${isActive ? "scale-105" : "hover:scale-105"}`}
                >
                  <span className="relative flex h-5 w-5 items-center justify-center" aria-hidden="true">
                    <span
                      className={`absolute inset-0 rounded-full transition-all duration-700 ${
                        isActive ? "scale-[2.4] bg-chanterelle/25" : isLinked ? "scale-[1.8] bg-chanterelle/15" : "scale-100 bg-mycelium/10"
                      }`}
                    />
                    <span
                      className={`relative h-3.5 w-3.5 rounded-full border-2 transition-colors duration-500 ${
                        isActive ? "border-chanterelle bg-chanterelle" : isLinked ? "border-chanterelle bg-humus" : "border-mycelium/70 bg-humus"
                      }`}
                    />
                  </span>
                  <span
                    className={`max-w-[8.5rem] rounded-full px-2.5 py-1 text-[0.82rem] font-semibold leading-tight transition-colors duration-500 sm:text-sm md:max-w-none md:whitespace-nowrap ${
                      isActive ? "bg-chanterelle text-humus" : isLinked ? "bg-humus-3 text-mycelium" : "bg-humus-2/80 text-mycelium/80"
                    }`}
                  >
                    {t.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div id={panelId} aria-live="polite" className="flex flex-col justify-center lg:col-span-4">
        <h3 className="font-display text-3xl text-chanterelle wonk">{current.label}</h3>
        <dl className="mt-5 space-y-5">
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wider text-spore">Ce qu&apos;on remarque</dt>
            <dd className="mt-1.5 text-mycelium/90">{current.signs}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wider text-spore">Ce qu&apos;on regarde ensemble</dt>
            <dd className="mt-1.5 text-mycelium/90">{current.angle}</dd>
          </div>
        </dl>
        <p className="mt-6 text-sm text-spore">Relié à</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {current.links.map((id) => {
            const t = topics.find((x) => x.id === id)!;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => setActive(id)}
                  className="rounded-full border border-mycelium/25 px-3 py-1.5 text-sm transition-colors hover:border-chanterelle hover:text-chanterelle"
                >
                  {t.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
