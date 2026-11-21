import Link from "next/link";
import { mailto } from "@/content/business";
import { ServiceArt } from "@/components/illustrations/ServiceArt";
import { ArrowRight } from "@/components/ui/Icons";

export function SolarTeaser() {
  return (
    <section className="pb-24 sm:pb-28" aria-labelledby="solar-title">
      <div className="container-site">
        <div className="reveal grid items-center gap-8 rounded-[2rem] border border-dashed border-rust/40 p-7 sm:p-10 md:grid-cols-[minmax(0,13rem)_1fr_auto]">
          <ServiceArt kind="solaire" className="h-36 w-auto md:h-40" />
          <div>
            <h2 id="solar-title" className="font-display text-3xl leading-tight">
              En germination : <span className="wonk text-rust">le solaire prêt à brancher</span>
            </h2>
            <p className="mt-3 max-w-2xl text-ink-soft">
              Je prépare une aide au dimensionnement et à la pose de kits solaires prêts à brancher, surtout en toiture.
              Ce service n&apos;est pas encore proposé, et je n&apos;interviens pas sur les tableaux électriques.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a href={mailto("Prévenez-moi : panneaux solaires prêts à brancher")} className="btn btn-ghost">
              Être prévenu
            </a>
            <Link href="/panneaux-solaires" className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-rust-deep link-quiet">
              En savoir plus <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
