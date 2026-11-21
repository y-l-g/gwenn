import type { Metadata } from "next";
import Image from "next/image";
import benchPhoto from "@/assets/photos/banc-automne.jpg";
import { business } from "@/content/business";
import { towns } from "@/content/area";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/PageParts";
import { ContactForm } from "@/components/contact/ContactForm";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { Acorn } from "@/components/illustrations/Botanical";

export const metadata: Metadata = pageMetadata({
  title: "Contact : Gwenn Joannic, 07 52 08 70 16",
  description:
    "Contactez Gwenn Joannic, Services Jardin Joannic à Moréac : 07 52 08 70 16 ou gwennjoannic@gmail.com. Entretien de jardin, constructions bois, élagage léger, conseil habitat.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="pb-24 pt-6 sm:pb-32 sm:pt-8">
      <div className="container-site">
        <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
        <div className="mt-8 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h1 className="rise-in display-lg text-[clamp(2.4rem,1.3rem+3.8vw,4.6rem)]">
              Le plus simple, <span className="wonk text-rust">c&apos;est d&apos;appeler</span>
            </h1>
            <p className="rise-in lead mt-6 text-ink-soft">
              Je réponds moi-même. Si je suis sur un chantier, laissez un message avec votre commune et l&apos;objet de
              votre appel : je vous rappelle.
            </p>

            <ul className="mt-10 space-y-4">
              <li>
                <a href={business.phoneHref} className="group flex items-center gap-4 rounded-[1.5rem] bg-rust p-5 text-paper no-underline transition-colors hover:bg-rust-deep">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper/15">
                    <PhoneIcon className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block text-sm opacity-80">Téléphone</span>
                    <span className="font-display text-3xl tabular-nums">{business.phone}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={business.emailHref} className="group flex items-center gap-4 rounded-[1.5rem] bg-paper-deep p-5 no-underline transition-colors hover:bg-paper-warm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/5">
                    <MailIcon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-ink-mute">E-mail</span>
                    <span className="block break-all font-display text-xl sm:text-2xl">{business.email}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-4 p-5 pt-2">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/5">
                  <PinIcon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-sm text-ink-mute">Basé à</span>
                  <span className="font-display text-xl">
                    {business.locality} ({business.postalCode}), {business.department}
                  </span>
                </span>
              </li>
            </ul>

            <div className="relative mt-10 hidden aspect-[3/2] overflow-hidden rounded-[2rem_7rem_2rem_7rem] lg:block">
              <Image src={benchPhoto} alt="Banc en bois au pied d'un arbre, herbes dorées d'automne" fill placeholder="blur" sizes="34rem" className="object-cover" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-[2rem] bg-paper-deep p-6 sm:p-10">
              <svg viewBox="-14 -20 28 52" className="absolute -top-6 right-8 h-14 w-8 rotate-12" aria-hidden="true">
                <Acorn />
              </svg>
              <h2 className="font-display text-3xl">Préparer un message</h2>
              <p className="mt-2 text-ink-soft">
                Remplissez ce qui vous paraît utile : votre messagerie s&apos;ouvrira avec un e-mail prêt à envoyer.
              </p>
              <div className="mt-8">
                <ContactForm towns={[business.locality, ...towns.map((t) => t.name)]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
