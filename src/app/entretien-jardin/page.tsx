import type { Metadata } from "next";
import Link from "next/link";
import hedgePhoto from "@/assets/photos/taille-haie.jpg";
import { getService } from "@/content/services";
import { pageMetadata, serviceSchema } from "@/lib/seo";
import { ServiceHero, TaskSheets } from "@/components/service/ServiceParts";
import { FaqList } from "@/components/ui/PageParts";
import { SeasonCalendar } from "@/components/home/SeasonCalendar";
import { ContactBand } from "@/components/ui/ContactBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArrowRight } from "@/components/ui/Icons";

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
            Taille de haies, tonte, désherbage, taille d&apos;arbres et bois de chauffage. Un passage ponctuel ou un
            entretien régulier, à Moréac et alentours.
          </p>
        }
        image={{ src: hedgePhoto, alt: "Taille d'une haie de noisetiers au taille-haie sur perche, depuis un escabeau", position: "object-[40%_50%]" }}
        note={
          <>
            CESU accepté. Jusqu&apos;à 50 % de crédit d&apos;impôt sur les petits travaux de jardinage.
          </>
        }
        mailSubject="Entretien de jardin"
      />

      <section className="pb-20 sm:pb-28" aria-labelledby="tasks-title">
        <div className="container-site">
          <h2 id="tasks-title" className="reveal display-lg">
            Ce que <span className="wonk text-rust">je fais</span>
          </h2>
          <div className="mt-12">
            <TaskSheets tasks={service.tasks} />
          </div>
        </div>
      </section>

      <SeasonCalendar />

      <section className="pb-6" aria-label="Autres services">
        <div className="container-site">
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/terrasses-pergolas-carports" className="group flex items-center justify-between gap-6 rounded-[1.75rem] bg-paper-deep p-6 no-underline">
              <span>
                <span className="block text-sm text-ink-mute">Aussi</span>
                <span className="font-display text-2xl group-hover:underline">Terrasses, pergolas, carports</span>
              </span>
              <ArrowRight className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/conseil-habitat" className="group flex items-center justify-between gap-6 rounded-[1.75rem] bg-humus p-6 text-mycelium no-underline">
              <span>
                <span className="block text-sm text-spore">Gratuit, toute l&apos;année</span>
                <span className="font-display text-2xl group-hover:underline">Conseil habitat</span>
              </span>
              <ArrowRight className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <FaqList faq={service.faq} />
      <ContactBand title="Un jardin" accent="à entretenir ?" />
      <JsonLd data={serviceSchema(service)} />
    </>
  );
}
