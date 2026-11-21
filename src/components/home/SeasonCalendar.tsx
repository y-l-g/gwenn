"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { months, monthsLong, seasonRows, type Level } from "@/content/seasons";

const toneColor: Record<string, string> = {
  moss: "var(--color-moss)",
  fern: "var(--color-fern)",
  beech: "var(--color-beech)",
  chestnut: "var(--color-chestnut)",
};

const levelLabel = (l: Level) => (l === 2 ? "idéal" : l === 1 ? "possible" : l === "n" ? "à éviter, nidification" : "rarement");

function Glyph({ level, color }: { level: Level; color: string }) {
  if (level === "n") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M5 14 C6 19 18 19 19 14Z" fill="none" stroke="var(--color-ink-mute)" strokeWidth="1.3" />
        <path d="M4 14 H20" stroke="var(--color-ink-mute)" strokeWidth="1.3" strokeLinecap="round" />
        <ellipse cx="10" cy="12" rx="2.4" ry="3" fill="#cfd9da" />
        <ellipse cx="14.5" cy="12.4" rx="2.2" ry="2.8" fill="#dfe6e3" />
      </svg>
    );
  }
  if (level === 0) return <span className="block h-1.5 w-1.5 rounded-full bg-ink/15" aria-hidden="true" />;
  return (
    <svg viewBox="-10 -24 20 26" className={level === 2 ? "h-6 w-5" : "h-4 w-3.5 opacity-55"} aria-hidden="true">
      <path d="M0 0 C-8 -6 -9 -16 0 -23 C9 -16 8 -6 0 0Z" fill={color} />
      <path d="M0 -2 L0 -19" stroke="rgb(255 248 230 / .55)" strokeWidth="1.1" />
    </svg>
  );
}

const subscribe = () => () => {};
const currentMonth = () => new Date().getMonth();

export function SeasonCalendar() {
  // The month is only known in the browser; the prerendered HTML shows no highlight.
  const now = useSyncExternalStore(subscribe, currentMonth, () => null);

  return (
    <section className="py-20 sm:py-28" aria-labelledby="calendar-title">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-4">
          <h2 id="calendar-title" className="reveal display-lg">
            Le calendrier <span className="wonk text-rust">du jardin</span>
          </h2>
          <p className="reveal mt-6 text-ink-soft">
            Les meilleures périodes pour chaque travail. Au printemps et à l&apos;automne, appelez un peu à l&apos;avance.
          </p>
          <p className="reveal mt-6 rounded-2xl bg-humus p-5 text-[0.98rem] text-mycelium">
            <Link href="/conseil-habitat" className="font-display text-lg text-chanterelle no-underline hover:underline">
              Conseil habitat
            </Link>
            <br />
            Disponible toute l&apos;année.
          </p>
        </div>

        <div className="reveal min-w-0 lg:col-span-8">
          <div className="relative -mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] pb-2 focus-visible:outline-2 focus-visible:outline-moss sm:mx-0 sm:px-0" tabIndex={0} role="region" aria-labelledby="calendar-title">
            <table className="w-full min-w-[34rem] border-separate border-spacing-0 text-sm">
              <caption className="sr-only">Calendrier des travaux par mois</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[9.5rem] pb-3 text-left font-normal text-ink-mute sm:w-44">
                    <span className="sr-only">Travaux</span>
                  </th>
                  {months.map((m, i) => (
                    <th
                      key={m}
                      scope="col"
                      className={`pb-3 text-center text-xs font-semibold uppercase tracking-wider ${i === now ? "text-rust" : "text-ink-mute"}`}
                    >
                      <abbr title={monthsLong[i]} className="no-underline">
                        {m}
                      </abbr>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {seasonRows.map((row) => (
                  <tr key={row.label} className="group">
                    <th scope="row" className="sticky left-0 z-10 border-t border-ink/10 bg-paper py-3 pr-3 text-left align-middle font-medium sm:static sm:bg-transparent">
                      <span className="block leading-tight">{row.label}</span>
                      <span className="mt-0.5 hidden text-xs font-normal leading-snug text-ink-mute xl:block">{row.note}</span>
                    </th>
                    {row.levels.map((l, i) => (
                      <td
                        key={i}
                        className={`border-t border-ink/10 py-3 text-center align-middle ${i === now ? "bg-chanterelle/15" : ""} ${
                          l === "n" ? "bg-[repeating-linear-gradient(135deg,transparent_0_5px,rgb(35_39_29/0.05)_5px_6px)]" : ""
                        }`}
                      >
                        <span className="flex h-7 items-center justify-center">
                          <Glyph level={l} color={toneColor[row.tone]} />
                        </span>
                        <span className="sr-only">
                          {monthsLong[i]} : {levelLabel(l)}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-mute" aria-label="Légende">
            <li className="flex items-center gap-2">
              <Glyph level={2} color="var(--color-moss)" /> Période idéale
            </li>
            <li className="flex items-center gap-2">
              <Glyph level={1} color="var(--color-moss)" /> Possible
            </li>
            <li className="flex items-center gap-2">
              <Glyph level="n" color="" /> Nidification, on évite
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
