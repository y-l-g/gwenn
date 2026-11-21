import Link from "next/link";
import { business } from "@/content/business";
import { Cep, Chanterelle, Mycena } from "@/components/illustrations/Botanical";
import { RootSystem } from "@/components/illustrations/Underground";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pb-24 pt-16 sm:pt-24">
      <div className="container-site relative z-10 text-center">
        <svg viewBox="-80 -50 160 60" className="mx-auto h-24 w-auto" aria-hidden="true">
          <Mycena x={-50} y={8} seed={3} />
          <Cep x={0} y={-24} s={1.05} />
          <Chanterelle x={48} y={-20} s={0.8} />
          <path d="M-80 9 H80" stroke="var(--color-moss)" strokeWidth="2" />
        </svg>
        <h1 className="mt-8 display-lg">
          Page <span className="wonk text-rust">introuvable</span>
        </h1>
        <p className="lead mx-auto mt-6 max-w-[44ch] text-ink-soft">
          Cette page n&apos;existe pas ou plus. Repartez de l&apos;accueil, ou appelez-moi.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn">
            Retour à l&apos;accueil
          </Link>
          <a href={business.phoneHref} className="btn btn-ghost">
            {business.phone}
          </a>
        </div>
      </div>
      <RootSystem className="mx-auto mt-6 w-[700px] max-w-none opacity-50" width={700} height={260} seed={41} />
    </section>
  );
}
