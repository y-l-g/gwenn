import type { Metadata } from "next";
import { getService } from "@/content/services";
import sawPhoto from "@/assets/photos/elagage-scie.jpg";
import { pageMetadata, serviceSchema } from "@/lib/seo";
import { ServiceHero, TaskSheets } from "@/components/service/ServiceParts";
import { FaqList, SectionIntro } from "@/components/ui/PageParts";
import { ContactBand } from "@/components/ui/ContactBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { Apple, OakLeaf } from "@/components/illustrations/Botanical";
import { RootSystem } from "@/components/illustrations/Underground";

const service = getService("elagage");

export const metadata: Metadata = pageMetadata({
  title: service.seo.title,
  description: service.seo.description,
  path: service.path,
});

export default function PruningPage() {
  return (
    <>
      <ServiceHero
        crumbs={[{ name: service.name, path: service.path }]}
        title={
          <>
            Taille et élagage léger <span className="wonk text-moss">de vos arbres</span>
          </>
        }
        lead={
          <p>
            Fruitiers, arbres d&apos;ornement, branches basses ou mortes. Une taille qui respecte la forme et la santé de
            l&apos;arbre, autour de Moréac et jusqu&apos;à Vannes, Pontivy ou Ploërmel.
          </p>
        }
        image={{ src: sawPhoto, alt: "Coupe d'une branche à la scie d'élagage" }}
        mailSubject="Devis taille d'arbres"
      />

      <section className="pb-20 sm:pb-28" aria-labelledby="prune-title">
        <div className="container-site">
          <SectionIntro title="Tailler moins," accent="mais au bon endroit">
            <p id="prune-title">
              Une bonne coupe se fait juste au-dessus du bourrelet, à la jonction de la branche, pour que l&apos;arbre
              cicatrise seul. Mieux vaut plusieurs tailles légères qu&apos;une coupe sévère qui l&apos;affaiblit.
            </p>
          </SectionIntro>
          <div className="mt-12">
            <TaskSheets tasks={service.tasks} offset={3} />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-paper-deep py-20 sm:py-28" aria-labelledby="limits-title">
        <RootSystem className="pointer-events-none absolute -bottom-24 right-0 w-[640px] max-w-none opacity-25" width={640} height={380} seed={23} mode="view" />
        <div className="container-site relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="limits-title" className="reveal display-lg">
              Ce que je fais, <span className="wonk text-moss">ce que je confie</span>
            </h2>
            <p className="reveal mt-6 text-ink-soft">
              Je travaille au sol, à la perche et à l&apos;échelle, sur des arbres de taille raisonnable. Pour un grand
              sujet, un abattage ou un travail sur corde, je préfère vous le dire tout de suite et vous orienter vers un
              élagueur grimpeur équipé pour.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
            <div className="reveal rounded-[1.75rem] bg-paper p-6 ring-1 ring-ink/10">
              <svg viewBox="-30 -30 60 60" className="h-12 w-12" aria-hidden="true">
                <Apple s={1.1} y={-6} />
              </svg>
              <h3 className="mt-3 font-display text-xl">Je m&apos;en occupe</h3>
              <ul className="mt-3 space-y-2 text-[0.98rem] text-ink-soft">
                <li>Fruitiers et arbres d&apos;ornement</li>
                <li>Branches basses, mortes ou gênantes</li>
                <li>Arbustes et grands sujets de haie</li>
                <li>Ramassage des branches coupées</li>
              </ul>
            </div>
            <div className="reveal rounded-[1.75rem] bg-paper p-6 ring-1 ring-ink/10">
              <svg viewBox="-40 -120 80 130" className="h-12 w-12" aria-hidden="true">
                <OakLeaf fill="var(--color-chestnut)" />
              </svg>
              <h3 className="mt-3 font-display text-xl">Je vous oriente</h3>
              <ul className="mt-3 space-y-2 text-[0.98rem] text-ink-soft">
                <li>Grands arbres nécessitant une grimpe</li>
                <li>Abattage et démontage</li>
                <li>Arbres proches de lignes électriques</li>
                <li>Dessouchage</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FaqList faq={service.faq} />
      <ContactBand title="Un arbre qui vous pose question ?" accent="Parlons-en." text="Décrivez l'arbre, sa hauteur approximative et ce qui vous gêne. Une photo aide beaucoup." />
      <JsonLd data={serviceSchema(service)} />
    </>
  );
}
