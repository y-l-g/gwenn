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

const service = getService("habitat");

export const metadata: Metadata = pageMetadata({
  title: service.seo.title,
  description: service.seo.description,
  path: service.path,
});

const steps = [
  { title: "Vous appelez", text: "Ou vous m'écrivez pour fixer un créneau. Dites-moi en deux mots ce qui vous préoccupe." },
  { title: "On fait le tour", text: "Je vous pose des questions sur la maison, son âge, son chauffage, ce que vous constatez et depuis quand." },
  { title: "Je vous explique", text: "Les causes probables, ce qui est urgent ou non, les erreurs à éviter et les pistes possibles." },
  { title: "Vous décidez", text: "Vous repartez avec des idées claires. Si des travaux sont utiles, on peut en reparler et je vous fais un devis." },
];

export default function HabitatPage() {
  return (
    <>
      <section className="relative overflow-x-clip pb-16 pt-6 sm:pt-8">
        <div className="container-site">
          <Breadcrumbs items={[{ name: service.name, path: service.path }]} />
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h1 className="rise-in display-lg text-[clamp(2.4rem,1.3rem+3.8vw,4.6rem)]">
                Comprendre votre maison, <span className="wonk text-rust">30 minutes offertes</span>
              </h1>
              <p className="rise-in lead mt-6 max-w-[42ch] text-ink-soft">
                Humidité, sensation de froid, factures d&apos;électricité, chauffage, fenêtres, isolation, ventilation :
                appelez-moi et parlons-en. Six ans dans le bâtiment m&apos;ont appris que les causes se cachent souvent
                ailleurs que là où le problème se voit.
              </p>
              <div className="rise-in mt-8 flex flex-wrap gap-3">
                <a href={business.phoneHref} className="btn">
                  <PhoneIcon /> Appeler le {business.phone}
                </a>
                <a
                  href={mailto("Conseil habitat : demande d'appel de 30 minutes", "Bonjour Gwenn,\n\nJe souhaiterais un appel conseil habitat.\n\nCe que je constate :\n\nAnnée de construction (environ) :\nType de chauffage :\nCréneaux qui m'arrangent :\n\nMerci !")}
                  className="btn btn-ghost"
                >
                  <MailIcon /> Proposer un créneau
                </a>
              </div>
              <p className="rise-in mt-6 max-w-[48ch] text-sm text-ink-mute">
                Gratuit et sans engagement. Ce n&apos;est ni un DPE ni un audit énergétique, mais un échange pour savoir par
                où commencer.
              </p>
            </div>
            <figure className="relative lg:col-span-6">
              <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#e9dfc9_0%,#e9dfc9_72%,var(--color-humus-2)_72%)] p-3 ring-1 ring-ink/10">
                <HouseCutaway className="h-auto w-full" />
              </div>
              <figcaption className="mt-4">
                <span className="sr-only">Sujets illustrés sur la maison : </span>
                <ol className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-ink-soft sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
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

      <section className="pb-20 sm:pb-28" aria-labelledby="call-title">
        <div className="container-site">
          <h2 id="call-title" className="reveal display-md">
            Comment se passe l&apos;appel
          </h2>
          <div className="mt-10">
            <Steps steps={steps} tone="var(--color-rust)" />
          </div>
          <div className="reveal mt-12 rounded-[1.75rem] bg-paper-deep p-6 sm:p-8">
            <h3 className="font-display text-xl">Pour gagner du temps, préparez si possible</h3>
            <ul className="mt-4 grid gap-2 text-ink-soft sm:grid-cols-2">
              <li>· l&apos;année de construction, même approximative ;</li>
              <li>· le type de murs (pierre, parpaing, brique, bois) ;</li>
              <li>· le mode de chauffage et d&apos;eau chaude ;</li>
              <li>· vos dernières factures d&apos;énergie ;</li>
              <li>· les travaux déjà faits (fenêtres, isolation, VMC) ;</li>
              <li>· une ou deux photos des endroits qui posent question.</li>
            </ul>
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
              Les maisons anciennes <span className="wonk text-moss">ont leur logique</span>
            </h2>
            <div className="reveal mt-6 space-y-4 text-ink-soft">
              <p>
                Longères en granit, maisons de bourg en schiste, murs épais montés à la chaux : une maison ancienne
                fonctionne autrement qu&apos;une construction récente. Ses murs absorbent l&apos;humidité et la rendent à
                l&apos;air, comme un sol de forêt.
              </p>
              <p>
                Un enduit ciment, une peinture étanche ou un isolant mal choisi peuvent bloquer cet échange et faire
                apparaître des problèmes qui n&apos;existaient pas. Avant de changer quelque chose, mieux vaut comprendre
                comment la maison respire.
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
      <ContactBand title="Une question sur votre maison ?" accent="Appelez, c'est offert." text="30 minutes au téléphone pour y voir clair, sans engagement. Si je ne décroche pas, laissez un message avec vos disponibilités." />
      <JsonLd data={serviceSchema(service)} />
    </>
  );
}
