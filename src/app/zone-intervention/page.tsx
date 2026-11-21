import type { Metadata } from "next";
import { mainTowns, towns } from "@/content/area";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/PageParts";
import { ZoneMap } from "@/components/home/ZoneMap";
import { ContactBand } from "@/components/ui/ContactBand";
import { SoilHorizon, Sprouting } from "@/components/illustrations/Underground";

export const metadata: Metadata = pageMetadata({
  title: "Zone d'intervention : Moréac, Locminé, Pontivy, Vannes, Ploërmel, Baud, Auray",
  description:
    "Jardinier et constructeur bois basé à Moréac, j'interviens dans le centre Morbihan : Locminé, Pontivy, Baud, Vannes, Auray, Ploërmel, Josselin, Grand-Champ, Saint-Jean-Brévelay et communes voisines.",
  path: "/zone-intervention",
});

export default function AreaPage() {
  const others = towns.filter((t) => !t.main).sort((a, b) => a.name.localeCompare(b.name, "fr"));
  return (
    <>
      <section className="pb-14 pt-6 sm:pt-8">
        <div className="container-site">
          <Breadcrumbs items={[{ name: "Zone d'intervention", path: "/zone-intervention" }]} />
          <h1 className="rise-in display-lg mt-8 max-w-[20ch] text-[clamp(2.4rem,1.3rem+3.8vw,4.6rem)]">
            Zone <span className="wonk text-rust">d&apos;intervention</span>
          </h1>
          <p className="rise-in lead mt-6 max-w-[56ch] text-ink-soft">
            Je suis basé à Moréac (56500) et j&apos;interviens dans le centre Morbihan, de Pontivy à Vannes et de Baud à
            Ploërmel.
          </p>
        </div>
      </section>

      <SoilHorizon seed={7} />
      <section className="on-dark bg-humus pb-16 text-mycelium" aria-labelledby="towns-title">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <ZoneMap className="h-auto w-full" />
          </div>
          <div className="lg:col-span-5">
            <h2 id="towns-title" className="display-md">
              Communes
            </h2>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-mycelium/85">
              <li className="font-semibold text-chanterelle">Moréac</li>
              {[...mainTowns, ...others].map((t) => (
                <li key={t.name} className={t.main ? "font-semibold text-mycelium" : ""}>
                  {t.name}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-mycelium/65">Votre commune n&apos;y figure pas ? Appelez, on en parle.</p>
          </div>
        </div>
      </section>
      <Sprouting seed={3} />
      <ContactBand title="Vous êtes dans le secteur ?" accent="Appelez-moi." />
    </>
  );
}
