import type { Metadata } from "next";
import solarHouse from "@/assets/photos/maison-panneaux-solaires.jpg";
import { mailto } from "@/content/business";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { ServiceHero } from "@/components/service/ServiceParts";
import { ContactBand } from "@/components/ui/ContactBand";
import { ServiceArt } from "@/components/illustrations/ServiceArt";
import Link from "next/link";

const service = getService("solaire");

export const metadata: Metadata = pageMetadata({
  title: service.seo.title,
  description: service.seo.description,
  path: service.path,
});

export default function SolarPage() {
  return (
    <>
      <ServiceHero
        crumbs={[{ name: "Panneaux solaires (bientôt)", path: service.path }]}
        title={
          <>
            Panneaux solaires prêts à brancher, <span className="wonk text-rust">bientôt</span>
          </>
        }
        lead={
          <p>
            Je prépare une aide au dimensionnement et à la pose de kits solaires prêts à brancher, dits « plug and play »,
            notamment sur les toitures. <strong className="font-semibold text-ink">Ce service n&apos;est pas encore disponible.</strong>
          </p>
        }
        image={{ src: solarHouse, alt: "Maison avec panneaux solaires sur la toiture, entourée d'arbres en automne", position: "object-[50%_40%]" }}
        mailSubject="Prévenez-moi : panneaux solaires prêts à brancher"
        ctaLabel="Être prévenu"
      />

      <section className="pb-24 sm:pb-32">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="prose-site">
              <h2>Ce que je proposerai</h2>
              <ul>
                <li>
                  <strong>Le dimensionnement</strong> : estimer la puissance utile selon votre consommation en journée,
                  l&apos;orientation de votre toit et les ombres portées, pour éviter de surinvestir.
                </li>
                <li>
                  <strong>La pose</strong> : fixer les panneaux proprement et durablement, en toiture ou au sol.
                </li>
              </ul>
              <h2>Ce que je ne ferai pas</h2>
              <p>
                Je ne suis pas qualifié pour intervenir sur un tableau électrique. Un kit prêt à brancher se raccorde sur une
                prise dédiée ; si votre installation nécessite une modification du tableau ou une ligne spécifique, ce sera
                le travail d&apos;un électricien.
              </p>
              <h2>En attendant</h2>
              <p>
                Si le sujet vous intéresse, écrivez-moi : je vous préviendrai dès que le service sera ouvert. Et si votre
                question porte plutôt sur votre consommation ou votre chauffage, le{" "}
                <Link href="/conseil-habitat">conseil habitat</Link> est déjà disponible.
              </p>
            </div>
            <a href={mailto("Prévenez-moi : panneaux solaires prêts à brancher")} className="btn mt-10">
              Être prévenu de l&apos;ouverture
            </a>
          </div>
          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-[2rem] border border-dashed border-rust/40 p-8 text-center">
              <ServiceArt kind="solaire" className="mx-auto h-44 w-auto" />
              <p className="mt-4 font-display text-2xl wonk text-rust">En germination</p>
              <p className="mt-2 text-ink-soft">Le service n&apos;est pas encore ouvert. Écrivez-moi pour être prévenu.</p>
            </div>
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
