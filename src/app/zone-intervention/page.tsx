import type { Metadata } from "next";
import { communes, RADIUS_KM } from "@/content/area";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/PageParts";
import { ZoneMap } from "@/components/home/ZoneMap";
import { ContactBand } from "@/components/ui/ContactBand";
import { SoilHorizon, Sprouting } from "@/components/illustrations/Underground";

export const metadata: Metadata = pageMetadata({
  title: "Zone d'intervention : Moréac, Locminé, Pontivy, Baud, Grand-Champ, Saint-Jean-Brévelay",
  description: `Jardinier et constructeur bois basé à Moréac, j'interviens dans un rayon de 20 km : ${communes
    .filter((c) => c !== "Moréac")
    .slice(0, 12)
    .join(", ")} et toutes les communes voisines du Morbihan.`,
  path: "/zone-intervention",
});

export default function AreaPage() {
  return (
    <>
      <section className="pb-14 pt-6 sm:pt-8">
        <div className="container-site">
          <Breadcrumbs items={[{ name: "Zone d'intervention", path: "/zone-intervention" }]} />
          <h1 className="rise-in display-lg mt-8 max-w-[20ch] text-[clamp(2.4rem,1.3rem+3.8vw,4.6rem)]">
            Zone <span className="wonk text-rust">d&apos;intervention</span>
          </h1>
          <p className="rise-in lead mt-6 max-w-[56ch] text-ink-soft">
            Je suis basé à Moréac (56500) et j&apos;interviens dans un rayon de {RADIUS_KM} km, de Pontivy à Grand-Champ
            et de Baud à Guégon.
          </p>
        </div>
      </section>

      <SoilHorizon seed={7} />
      <section className="on-dark bg-humus pb-16 text-mycelium" aria-labelledby="towns-title">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <ZoneMap className="h-auto w-full" />
          </div>
          <div className="lg:col-span-6">
            <h2 id="towns-title" className="display-md">
              Les {communes.length} communes
            </h2>
            <ul className="mt-6 columns-2 gap-x-6 text-mycelium/85 sm:columns-3">
              {communes.map((name) => (
                <li key={name} className={`py-0.5 ${name === "Moréac" ? "font-semibold text-chanterelle" : ""}`}>
                  {name}
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
