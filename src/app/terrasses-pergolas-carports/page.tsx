import type { Metadata } from "next";
import Image from "next/image";
import terracePhoto from "@/assets/photos/terrasse-vue-ensemble.jpg";
import junctionPhoto from "@/assets/photos/terrasse-jonction-vue-haut.jpg";
import { getService } from "@/content/services";
import { projects } from "@/content/projects";
import { pageMetadata, serviceSchema } from "@/lib/seo";
import { ServiceHero, TaskSheets } from "@/components/service/ServiceParts";
import { FaqList, SectionIntro, Steps } from "@/components/ui/PageParts";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ContactBand } from "@/components/ui/ContactBand";
import { JsonLd } from "@/components/ui/JsonLd";

const service = getService("construction");

export const metadata: Metadata = pageMetadata({
  title: service.seo.title,
  description: service.seo.description,
  path: service.path,
});

const steps = [
  { title: "Visite", text: "Je viens voir le terrain, les accès, l'exposition et ce que vous imaginez. On prend les mesures ensemble." },
  { title: "Devis détaillé", text: "Essence de bois, structure, finitions et quincaillerie : tout est écrit, poste par poste." },
  { title: "Préparation", text: "Démarches en mairie si besoin, commande du bois, préparation du sol et des appuis." },
  { title: "Pose et finitions", text: "Structure, lames, rives et derniers réglages. Le chantier est rendu propre." },
];

export default function ConstructionPage() {
  const related = projects.filter((p) => p.services.includes("construction"));
  return (
    <>
      <ServiceHero
        crumbs={[{ name: "Terrasses, pergolas, carports", path: service.path }]}
        title={
          <>
            Terrasses, pergolas et carports <span className="wonk text-chestnut">en bois</span>
          </>
        }
        lead={
          <p>
            Des constructions simples, solides et bien finies, pensées pour votre maison et votre jardin. De Moréac à
            Vannes, Pontivy ou Ploërmel.
          </p>
        }
        image={{ src: terracePhoto, alt: "Terrasse en pin posée par Gwenn Joannic le long d'une maison à bardage bois", position: "object-[30%_60%]" }}
        note="Photo : une terrasse réalisée par Gwenn dans le centre Morbihan."
        mailSubject="Devis terrasse, pergola ou carport"
      />

      <section className="pb-20 sm:pb-28" aria-labelledby="build-title">
        <div className="container-site">
          <SectionIntro title="Ce que je construis" accent="pour vous">
            <p id="build-title">
              Je travaille surtout le pin traité autoclave, qui vieillit bien sous le climat breton, et je peux vous
              proposer des essences plus durables selon votre budget.
            </p>
          </SectionIntro>
          <div className="mt-12">
            <TaskSheets tasks={service.tasks} offset={1} />
          </div>
        </div>
      </section>

      <section className="bg-paper-deep py-20 sm:py-28" aria-labelledby="detail-title">
        <div className="container-site grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="detail-title" className="reveal display-lg">
              Le soin se voit <span className="wonk text-chestnut">aux jonctions</span>
            </h2>
            <div className="reveal mt-6 space-y-4 text-ink-soft">
              <p>
                Une terrasse dure quand l&apos;eau s&apos;évacue et que l&apos;air circule dessous : lambourdes sur appuis,
                lames espacées, aucune zone où l&apos;humidité stagne.
              </p>
              <p>
                Elle est belle quand les détails sont réglés : joints décalés, coupes nettes, rives habillées. Sur cette
                terrasse, une planche de jonction en diagonale reçoit les deux sens de pose.
              </p>
            </div>
          </div>
          <figure className="reveal lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
              <Image src={junctionPhoto} alt="Vue plongeante sur la planche de jonction en diagonale d'une terrasse en pin" fill placeholder="blur" sizes="(min-width: 1024px) 48rem, 92vw" className="object-cover object-[50%_58%]" />
            </div>
            <figcaption className="mt-3 text-sm text-ink-mute">Planche de jonction entre deux pans de lames, vue de l&apos;étage.</figcaption>
          </figure>
        </div>
      </section>

      <section className="py-20 sm:py-28" aria-labelledby="projects-title">
        <div className="container-site">
          <h2 id="projects-title" className="reveal display-lg">
            Réalisations <span className="wonk text-chestnut">en bois</span>
          </h2>
          <div className="mt-12 grid gap-12 sm:grid-cols-2">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28" aria-labelledby="steps-title">
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
      <ContactBand title="Un projet de terrasse" accent="ou d'abri ?" text="Décrivez-moi votre idée, même approximative : surface, usage, photos de l'endroit. Je viens voir et je vous fais un devis." />
      <JsonLd data={serviceSchema(service)} />
    </>
  );
}
