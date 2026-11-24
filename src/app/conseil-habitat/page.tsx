import type { Metadata } from "next";
import Image from "next/image";
import mossPhoto from "@/assets/photos/champignons-mousse.jpg";
import { business, mailto } from "@/content/business";
import { getService } from "@/content/services";
import { habitatTopics } from "@/content/habitat";
import { pageMetadata, serviceSchema } from "@/lib/seo";
import { Breadcrumbs, FaqList, Steps } from "@/components/ui/PageParts";
import { HabitatSection } from "@/components/home/HabitatSection";
import { ContactBand } from "@/components/ui/ContactBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { HouseCutaway, houseMarkerOrder } from "@/components/illustrations/House";
import { SoilHorizon, Sprouting } from "@/components/illustrations/Underground";
import { MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { ServiceArt } from "@/components/illustrations/ServiceArt";
import Link from "next/link";

const service = getService("habitat");

export const metadata: Metadata = pageMetadata({
  title: service.seo.title,
  description: service.seo.description,
  path: service.path,
});

const steps = [
  { title: "Vous appelez", text: "Ou vous m'écrivez pour fixer un créneau." },
  { title: "On fait le tour", text: "La maison, son âge, son chauffage, ce que vous constatez." },
  { title: "Je vous explique", text: "Les causes probables, ce qui presse et les erreurs à éviter." },
  { title: "Vous décidez", text: "Vous repartez avec des pistes claires." },
];

export default function HabitatPage() {
  return (
    <>
      <section className="on-dark relative overflow-x-clip bg-humus pb-16 pt-6 text-mycelium sm:pb-20 sm:pt-8">
        <div className="container-site">
          <Breadcrumbs items={[{ name: service.name, path: service.path }]} />
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="rise-in flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider">
                <span className="rounded-full bg-chanterelle px-3 py-1 text-humus">Gratuit</span>
                <span className="rounded-full bg-mycelium/10 px-3 py-1">Toute l&apos;année</span>
                <span className="rounded-full bg-mycelium/10 px-3 py-1">Par téléphone</span>
              </p>
              <h1 className="rise-in display-lg mt-6 text-[clamp(2.4rem,1.3rem+3.8vw,4.6rem)] text-mycelium">
                Conseil habitat, <span className="wonk text-chanterelle">30 minutes offertes</span>
              </h1>
              <p className="rise-in lead mt-6 max-w-[42ch] text-mycelium/85">
                Humidité, froid, factures, chauffage, isolation, ventilation, panneaux solaires : appelez-moi et parlons-en.
              </p>
              <div className="rise-in mt-8 flex flex-wrap gap-3">
                <a href={business.phoneHref} className="btn btn-light">
                  <PhoneIcon /> Appeler le {business.phone}
                </a>
                <a
                  href={mailto("Conseil habitat : demande d'appel", "Bonjour Gwenn,\n\nJe souhaiterais un appel conseil habitat.\n\nCe que je constate :\n\nCréneaux qui m'arrangent :\n\nMerci !")}
                  className="btn btn-ghost"
                >
                  <MailIcon /> Envoyer un e-mail
                </a>
              </div>
              <p className="rise-in mt-6 max-w-[48ch] text-sm text-spore">
                Sans engagement. Ce n&apos;est ni un DPE ni un audit énergétique.
              </p>
            </div>
            <figure className="relative lg:col-span-6">
              <div className="overflow-hidden rounded-[2rem] bg-[#e9dfc9] p-3">
                <HouseCutaway className="h-auto w-full" />
              </div>
              <figcaption className="mt-4">
                <span className="sr-only">Sujets illustrés sur la maison : </span>
                <ol className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-mycelium/85 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                  {houseMarkerOrder.map((id, i) => (
                    <li key={id} className="flex items-center gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-chanterelle text-[0.7rem] font-bold text-humus" aria-hidden="true">
                        {i + 1}
                      </span>
                      {habitatTopics.find((t) => t.id === id)!.label}
                    </li>
                  ))}
                </ol>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28" aria-labelledby="call-title">
        <div className="container-site">
          <h2 id="call-title" className="reveal display-md">
            Comment se passe l&apos;appel
          </h2>
          <div className="mt-10">
            <Steps steps={steps} tone="var(--color-rust)" />
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28" aria-labelledby="solar-advice-title">
        <div className="container-site">
          <div className="reveal grid items-center gap-8 rounded-[2rem] bg-paper-deep p-7 sm:p-10 md:grid-cols-[minmax(0,12rem)_1fr]">
            <ServiceArt kind="solaire" className="h-32 w-auto" />
            <div>
              <h2 id="solar-advice-title" className="font-display text-3xl leading-tight">
                Panneaux solaires : <span className="wonk text-rust">conseil dès maintenant</span>
              </h2>
              <p className="mt-3 max-w-2xl text-ink-soft">
                Une offre reçue, un démarchage, un devis à comparer ? Je vous aide à vérifier qu&apos;il s&apos;agit
                d&apos;une offre sérieuse pour éviter les arnaques.{" "}
                <Link href="/panneaux-solaires" className="font-semibold text-rust-deep link-quiet">
                  Kits solaires prêts à brancher
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <SoilHorizon seed={5} />
      <HabitatSection />
      <Sprouting seed={12} />

      <section className="py-20 sm:py-28" aria-labelledby="old-title">
        <div className="container-site grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="old-title" className="reveal display-lg">
              Les maisons anciennes <span className="wonk text-moss">en pierre</span>
            </h2>
            <div className="reveal mt-6 space-y-4 text-ink-soft">
              <p>
                Une longère en granit ou une maison en schiste ne fonctionne pas comme une maison récente : ses murs
                absorbent l&apos;humidité et la rendent à l&apos;air.
              </p>
              <p>
                Un enduit ciment, une peinture étanche ou un isolant mal choisi peuvent bloquer cet échange. Mieux vaut en
                parler avant de faire des travaux.
              </p>
            </div>
          </div>
          <figure className="reveal lg:col-span-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem_8rem_2rem_8rem]">
              <Image src={mossPhoto} alt="Petits champignons sur une branche couverte de mousse, en sous-bois" fill placeholder="blur" sizes="(min-width: 1024px) 40rem, 92vw" className="object-cover object-[40%_50%]" />
            </div>
          </figure>
        </div>
      </section>

      <FaqList faq={service.faq} />
      <ContactBand title="Une question sur votre maison ?" accent="Appelez, c'est gratuit." text="30 minutes au téléphone, sans engagement. Si je ne décroche pas, laissez un message." />
      <JsonLd data={serviceSchema(service)} />
    </>
  );
}
