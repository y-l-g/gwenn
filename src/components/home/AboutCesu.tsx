import Image from "next/image";
import Link from "next/link";
import treeRings from "@/assets/photos/bois-chauffage.jpg";
import { CesuCalculator } from "./CesuCalculator";
import { ArrowRight } from "@/components/ui/Icons";
import { Blackberry, RowanCluster } from "@/components/illustrations/Botanical";

export function AboutCesu() {
  return (
    <section className="relative overflow-x-clip pb-24 pt-14 sm:pb-32" aria-labelledby="about-title">
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <h2 id="about-title" className="reveal display-lg">
            Un seul interlocuteur, <span className="wonk text-moss">du devis au dernier coup de balai</span>
          </h2>
          <div className="reveal mt-8 space-y-5 text-ink-soft">
            <p>
              Je travaille seul, à mon compte, depuis Moréac. Quand vous m&apos;appelez, c&apos;est moi qui viens voir,
              moi qui chiffre et moi qui fais le travail. Vous avez toujours la même personne au bout du fil.
            </p>
            <p>
              J&apos;ai aussi six ans d&apos;expérience dans le bâtiment. C&apos;est ce qui me permet de construire des
              ouvrages en bois solides, et de vous aider à comprendre comment vit votre maison, surtout si elle est
              ancienne.
            </p>
          </div>
          <figure className="reveal relative mt-10 flex items-center gap-5">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full sm:h-32 sm:w-32">
              <Image src={treeRings} alt="Bûches de bois de chauffage empilées, vues en bout" fill sizes="128px" className="object-cover" placeholder="blur" />
            </div>
            <figcaption className="font-display text-xl leading-snug wonk text-chestnut sm:text-2xl">
              Fendu et rangé au printemps, le bois est sec pour l&apos;hiver suivant.
            </figcaption>
          </figure>
        </div>

        <div className="relative lg:col-span-6 lg:pl-6">
          <h3 className="reveal font-display text-3xl">
            CESU acceptés, <span className="wonk text-rust">50 % de crédit d&apos;impôt possible</span>
          </h3>
          <p className="reveal mt-4 text-ink-soft">
            Tonte, taille de haies, désherbage : ces petits travaux de jardinage chez vous peuvent ouvrir droit à un crédit
            d&apos;impôt égal à la moitié des sommes versées, même si vous n&apos;êtes pas imposable.
          </p>
          <div className="reveal relative mt-10">
            <CesuCalculator />
            {/* Fruit hung on the card corners, clear of any text. */}
            <svg viewBox="-40 -60 80 100" className="pointer-events-none absolute -right-3 -top-14 z-10 w-16 rotate-12 sm:-right-6 sm:w-20" aria-hidden="true">
              <RowanCluster />
            </svg>
            <svg viewBox="-16 -24 32 52" className="pointer-events-none absolute -bottom-5 right-10 z-10 w-9 rotate-[18deg]" aria-hidden="true">
              <Blackberry />
            </svg>
          </div>
          <Link href="/cesu-credit-impot" className="reveal mt-6 inline-flex items-center gap-2 font-semibold text-rust-deep link-quiet">
            Conditions et prestations concernées <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
