import type { Metadata } from "next";
import Link from "next/link";
import { mainTowns, towns } from "@/content/area";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { slug } from "@/lib/text";
import { Breadcrumbs } from "@/components/ui/PageParts";
import { ZoneMap } from "@/components/home/ZoneMap";
import { ContactBand } from "@/components/ui/ContactBand";
import { SoilHorizon, Sprouting } from "@/components/illustrations/Underground";

export const metadata: Metadata = pageMetadata({
  title: "Zone d'intervention : Moréac, Locminé, Pontivy, Vannes, Ploërmel, Baud, Auray",
  description:
    "Jardinier et constructeur bois basé à Moréac, j'interviens à environ 30 minutes : Locminé, Pontivy, Baud, Vannes, Auray, Ploërmel, Josselin, Grand-Champ, Saint-Jean-Brévelay et communes voisines du Morbihan.",
  path: "/zone-intervention",
});

export default function AreaPage() {
  const others = towns.filter((t) => !t.main).sort((a, b) => a.name.localeCompare(b.name, "fr"));
  const available = services.filter((s) => s.available);
  return (
    <>
      <section className="pb-14 pt-6 sm:pt-8">
        <div className="container-site">
          <Breadcrumbs items={[{ name: "Zone d'intervention", path: "/zone-intervention" }]} />
          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h1 className="rise-in display-lg max-w-[20ch] text-[clamp(2.4rem,1.3rem+3.8vw,4.6rem)]">
                Moréac, et <span className="wonk text-rust">une demi-heure à la ronde</span>
              </h1>
              <p className="rise-in lead mt-6 max-w-[56ch] text-ink-soft">
                Je suis basé à Moréac (56500), au cœur du Morbihan. J&apos;interviens dans un rayon d&apos;environ 30
                minutes de route, de Pontivy au nord jusqu&apos;à Vannes et Auray au sud, de Baud à l&apos;ouest
                jusqu&apos;à Ploërmel à l&apos;est.
              </p>
            </div>
            <div className="rise-in lg:col-span-5">
              <h2 className="font-display text-xl">Temps de route depuis Moréac</h2>
              <ul className="mt-4 space-y-3">
                {[...mainTowns]
                  .sort((a, b) => a.minutes - b.minutes)
                  .map((t) => (
                    <li key={t.name} className="grid grid-cols-[6.5rem_1fr_3.5rem] items-center gap-3 text-sm">
                      <a href={`#${slug(t.name)}`} className="font-semibold link-quiet">
                        {t.name}
                      </a>
                      <span className="relative h-2.5" aria-hidden="true">
                        <span className="absolute inset-y-0 left-0" style={{ width: `${(t.minutes / 40) * 100}%` }}>
                          <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="h-full w-full overflow-visible">
                            <path d="M0 5 C25 2 45 8 70 4.5 S92 5 100 5" stroke="var(--color-chestnut)" strokeWidth="2" strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke" />
                          </svg>
                          <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-moss" />
                        </span>
                      </span>
                      <span className="text-right tabular-nums text-ink-mute">{t.minutes} min</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SoilHorizon seed={7} />
      <section className="on-dark bg-humus pb-16 text-mycelium">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <ZoneMap className="h-auto w-full" />
          </div>
          <div className="lg:col-span-5">
            <h2 className="display-md">Communes desservies</h2>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-mycelium/85">
              <li className="font-semibold text-chanterelle">Moréac</li>
              {[...mainTowns, ...others].map((t) => (
                <li key={t.name} className={t.main ? "font-semibold text-mycelium" : ""}>
                  {t.main ? (
                    <a href={`#${slug(t.name)}`} className="link-quiet">
                      {t.name}
                    </a>
                  ) : (
                    t.name
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-mycelium/65">
              Les temps de trajet sont donnés à titre indicatif depuis Moréac. Votre commune n&apos;apparaît pas ? Elle est
              peut-être à portée : appelez, on en parle.
            </p>
          </div>
        </div>
      </section>
      <Sprouting seed={3} />

      <section className="py-16 sm:py-24" aria-labelledby="sectors-title">
        <div className="container-site">
          <h2 id="sectors-title" className="reveal display-lg">
            Secteur <span className="wonk text-moss">par secteur</span>
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mainTowns.map((t) => (
              <article key={t.name} id={slug(t.name)} className="reveal scroll-mt-28 rounded-[1.75rem] bg-paper-deep p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-3xl">{t.name}</h3>
                  <span className="text-sm tabular-nums text-ink-mute">≈ {t.minutes} min</span>
                </div>
                <p className="mt-1 text-sm text-ink-mute">{t.postalCode}, Morbihan</p>
                <p className="mt-4 text-ink-soft">{t.note}</p>
                <p className="mt-5 text-sm">
                  <span className="text-ink-mute">À {t.name} : </span>
                  {available.map((s, i) => (
                    <span key={s.key}>
                      <Link href={s.path} className="font-medium text-ink link-quiet">
                        {s.short.toLowerCase()}
                      </Link>
                      {i < available.length - 1 ? ", " : "."}
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactBand title="Vous êtes dans le secteur ?" accent="Appelez-moi." />
    </>
  );
}
