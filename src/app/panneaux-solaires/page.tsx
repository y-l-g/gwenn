import type { Metadata } from "next";
import solarHouse from "@/assets/photos/maison-panneaux-solaires.jpg";
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
        crumbs={[{ name: "Panneaux solaires", path: service.path }]}
        title={
          <>
            Panneaux solaires <span className="wonk text-rust">prêts à brancher</span>
          </>
        }
        lead={
          <p>
            Je prépare une aide au dimensionnement et à la pose de kits solaires prêts à brancher, surtout en toiture.{" "}
            <strong className="font-semibold text-ink">La pose n&apos;est pas encore proposée, mais le conseil est déjà
            disponible.</strong>
          </p>
        }
        image={{ src: solarHouse, alt: "Maison avec panneaux solaires sur la toiture, entourée d'arbres en automne", position: "object-[50%_40%]" }}
        mailSubject="Conseil sur les panneaux solaires"
      />

      <section className="pb-24 sm:pb-32">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="prose-site">
              <h2>Dès maintenant : du conseil</h2>
              <p>
                Je conseille toute l&apos;année sur le solaire afin d&apos;éviter les arnaques : une offre reçue, un
                démarchage, un devis à comparer. C&apos;est gratuit, dans le cadre du{" "}
                <Link href="/conseil-habitat">conseil habitat</Link>.
              </p>
              <h2>Bientôt : la pose</h2>
              <ul>
                <li>
                  <strong>Dimensionner</strong> : choisir la bonne puissance selon votre consommation et votre toit.
                </li>
                <li>
                  <strong>Poser</strong> : fixer les panneaux en toiture ou au sol.
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-[2rem] border border-dashed border-rust/40 p-8 text-center">
              <ServiceArt kind="solaire" className="mx-auto h-44 w-auto" />
              <p className="mt-4 font-display text-2xl wonk text-rust">Conseil : disponible</p>
              <p className="mt-2 text-ink-soft">Pose de kits : bientôt.</p>
            </div>
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
