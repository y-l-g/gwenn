import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import hedgePhoto from "@/assets/photos/taille-haie.jpg";
import woodPhoto from "@/assets/photos/bois-chauffage.jpg";
import { getService } from "@/content/services";
import { pageMetadata, serviceSchema } from "@/lib/seo";
import { ServiceHero, TaskSheets } from "@/components/service/ServiceParts";
import { FaqList, SectionIntro } from "@/components/ui/PageParts";
import { SeasonCalendar } from "@/components/home/SeasonCalendar";
import { ContactBand } from "@/components/ui/ContactBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArrowRight } from "@/components/ui/Icons";
import { ServiceArt } from "@/components/illustrations/ServiceArt";

const service = getService("jardin");

export const metadata: Metadata = pageMetadata({
  title: service.seo.title,
  description: service.seo.description,
  path: service.path,
});

export default function GardenPage() {
  return (
    <>
      <ServiceHero
        crumbs={[{ name: service.name, path: service.path }]}
        title={
          <>
            Entretien de jardin <span className="wonk text-moss">autour de Moréac</span>
          </>
        }
        lead={
          <p>
            Taille de haies, tonte, désherbage et bois de chauffage. Un passage ponctuel avant l&apos;été ou un entretien
            régulier toute l&apos;année, à Moréac, Locminé, Pontivy, Baud, Vannes et alentours.
          </p>
        }
        image={{ src: hedgePhoto, alt: "Taille d'une haie de noisetiers au taille-haie sur perche, depuis un escabeau", position: "object-[40%_50%]" }}
        note={
          <>
            CESU accepté.{" "}
            <Link href="/cesu-credit-impot" className="font-semibold text-ink link-quiet">
              Jusqu&apos;à 50 % de crédit d&apos;impôt
            </Link>{" "}
            sur les petits travaux de jardinage.
          </>
        }
        mailSubject="Devis entretien de jardin"
      />

      <section className="pb-20 sm:pb-28" aria-labelledby="tasks-title">
        <div className="container-site">
          <SectionIntro title="Ce que je prends" accent="en charge">
            <p id="tasks-title">
              Chaque jardin a son rythme. On fait le tour ensemble, je vous dis ce qui presse et ce qui peut attendre, et
              on fixe la fréquence qui vous convient.
            </p>
          </SectionIntro>
          <div className="mt-12">
            <TaskSheets tasks={service.tasks} />
          </div>
        </div>
      </section>

      <section className="bg-paper-deep py-20 sm:py-28" aria-labelledby="wood-title">
        <div className="container-site grid items-center gap-12 lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
              <Image src={woodPhoto} alt="Bûches de bois de chauffage fendues et empilées" fill placeholder="blur" sizes="(min-width: 1024px) 40rem, 92vw" className="object-cover" />
            </div>
            <ServiceArt kind="bois" className="absolute -bottom-10 -right-4 h-32 w-auto drop-shadow-sm sm:h-40" />
          </div>
          <div className="lg:col-span-6 lg:pl-6">
            <h2 id="wood-title" className="reveal display-lg">
              Le bois de chauffage, <span className="wonk text-chestnut">fendu et rangé</span>
            </h2>
            <div className="reveal mt-6 space-y-4 text-ink-soft">
              <p>
                Vous avez fait livrer des bûches ou abattu un arbre ? Je fends le bois à la bonne section pour votre poêle
                ou votre cheminée, puis je le range en piles stables, surélevées du sol, couvertes sur le dessus et
                ouvertes sur les côtés.
              </p>
              <p>
                Un bois bien empilé sèche plus vite et plus régulièrement. Fendu au printemps, il aura tout l&apos;été pour
                perdre son humidité et chauffera mieux, avec moins de fumée et moins de suie dans le conduit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SeasonCalendar />

      <section className="pb-6" aria-label="Autres services">
        <div className="container-site">
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/elagage" className="group flex items-center justify-between gap-6 rounded-[1.75rem] bg-paper-deep p-6 no-underline">
              <span>
                <span className="block text-sm text-ink-mute">Un arbre à reprendre ?</span>
                <span className="font-display text-2xl group-hover:underline">Taille et élagage léger</span>
              </span>
              <ArrowRight className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/terrasses-pergolas-carports" className="group flex items-center justify-between gap-6 rounded-[1.75rem] bg-paper-deep p-6 no-underline">
              <span>
                <span className="block text-sm text-ink-mute">Envie d&apos;un coin terrasse ?</span>
                <span className="font-display text-2xl group-hover:underline">Terrasses, pergolas, carports</span>
              </span>
              <ArrowRight className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <FaqList faq={service.faq} />
      <ContactBand title="Un jardin à reprendre" accent="avant la saison ?" />
      <JsonLd data={serviceSchema(service)} />
    </>
  );
}
