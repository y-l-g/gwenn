import Link from "next/link";
import { mainTowns, towns } from "@/content/area";
import { slug } from "@/lib/text";
import { ZoneMap } from "./ZoneMap";
import { ArrowRight } from "@/components/ui/Icons";

export function ZoneSection() {
  const others = towns.filter((t) => !t.main).sort((a, b) => a.minutes - b.minutes);
  return (
    <section className="on-dark relative bg-humus pb-10 text-mycelium" aria-labelledby="zone-title">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="reveal order-2 lg:order-1 lg:col-span-7">
          <ZoneMap className="h-auto w-full" />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-5">
          <h2 id="zone-title" className="reveal display-lg">
            Moréac, <span className="wonk text-chanterelle">au carrefour</span>
          </h2>
          <p className="reveal lead mt-6 text-mycelium/85">
            Moréac se trouve au croisement de la N24 et de la D767. En une demi-heure, je suis à Pontivy, à Vannes, à
            Ploërmel ou à Baud.
          </p>
          <ul className="reveal mt-8 divide-y divide-mycelium/10 border-y border-mycelium/10">
            {[...mainTowns].sort((a, b) => a.minutes - b.minutes).map((t) => (
              <li key={t.name}>
                <Link href={`/zone-intervention#${slug(t.name)}`} className="group flex items-baseline justify-between gap-4 py-3 no-underline">
                  <span className="font-display text-2xl group-hover:text-chanterelle">{t.name}</span>
                  <span className="flex-1 border-b border-dotted border-mycelium/25" aria-hidden="true" />
                  <span className="text-sm tabular-nums text-spore">≈ {t.minutes} min</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="reveal mt-6 text-sm leading-relaxed text-mycelium/65">
            Et aussi : {others.map((t) => t.name).join(", ")}. Votre commune n&apos;y figure pas ? Appelez, on regarde
            ensemble.
          </p>
          <Link href="/zone-intervention" className="reveal mt-8 inline-flex items-center gap-2 font-semibold text-chanterelle link-quiet">
            Détails par secteur <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
