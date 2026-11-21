import type { Metadata } from "next";
import terracePhoto from "@/assets/photos/terrasse-vue-ensemble.jpg";
import { getService } from "@/content/services";
import { workPhotos } from "@/content/photos";
import { pageMetadata, serviceSchema } from "@/lib/seo";
import { ServiceHero, TaskSheets } from "@/components/service/ServiceParts";
import { FaqList, Steps } from "@/components/ui/PageParts";
import { Gallery } from "@/components/projects/Gallery";
import { ContactBand } from "@/components/ui/ContactBand";
import { JsonLd } from "@/components/ui/JsonLd";

const service = getService("construction");

export const metadata: Metadata = pageMetadata({
  title: service.seo.title,
  description: service.seo.description,
  path: service.path,
});

const steps = [
  { title: "Visite", text: "Je viens voir l'endroit et on prend les mesures ensemble." },
  { title: "Devis détaillé", text: "Bois, structure, finitions : tout est écrit, poste par poste." },
  { title: "Préparation", text: "Démarches en mairie si besoin, commande du bois, préparation du sol." },
  { title: "Pose et finitions", text: "Structure, lames, finitions. Le chantier est rendu propre." },
];

export default function ConstructionPage() {
  return (
    <>
      <ServiceHero
        crumbs={[{ name: "Constructions légères en bois", path: service.path }]}
        title={
          <>
            Constructions légères <span className="wonk text-chestnut">en bois</span>
          </>
        }
        lead={<p>Des constructions simples, solides et bien finies, autour de Moréac.</p>}
        image={{ src: terracePhoto, alt: "Terrasse en pin le long d'une maison à bardage bois", position: "object-[30%_60%]" }}
        mailSubject="Terrasse, pergola ou carport"
      />

      <section className="pb-20 sm:pb-28" aria-labelledby="build-title">
        <div className="container-site">
          <h2 id="build-title" className="reveal display-lg">
            Ce que <span className="wonk text-rust">je construis</span>
          </h2>
          <div className="mt-12">
            <TaskSheets tasks={service.tasks} offset={1} />
          </div>
        </div>
      </section>

      <section id="photos" className="scroll-mt-28 bg-paper-deep py-20 sm:py-28" aria-labelledby="photos-title">
        <div className="container-site">
          <h2 id="photos-title" className="reveal display-lg">
            Photos <span className="wonk text-chestnut">de chantiers</span>
          </h2>
          <div className="mt-12">
            <Gallery photos={workPhotos} title="Photos de chantiers" />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28" aria-labelledby="steps-title">
        <div className="container-site">
          <h2 id="steps-title" className="reveal display-md">
            Comment se passe un projet
          </h2>
          <div className="mt-10">
            <Steps steps={steps} />
          </div>
        </div>
      </section>

      <FaqList faq={service.faq} />
      <ContactBand title="Un projet de terrasse" accent="ou d'abri ?" text="Décrivez-moi votre idée. Je viens voir et je vous fais un devis." />
      <JsonLd data={serviceSchema(service)} />
    </>
  );
}
