import { CesuCalculator } from "./CesuCalculator";
import { Blackberry, RowanCluster } from "@/components/illustrations/Botanical";

export function AboutCesu() {
  return (
    <section className="relative overflow-x-clip pb-24 pt-14 sm:pb-32" aria-labelledby="cesu-title">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 id="cesu-title" className="reveal display-lg">
            CESU acceptés, <span className="wonk text-rust">50 % de crédit d&apos;impôt possible</span>
          </h2>
          <p className="reveal mt-6 max-w-xl text-ink-soft">
            Les petits travaux de jardinage chez vous (tonte, taille de haies, désherbage) peuvent ouvrir droit à un
            crédit d&apos;impôt égal à la moitié des sommes versées, même si vous n&apos;êtes pas imposable.
          </p>
        </div>
        <div className="relative lg:col-span-6 lg:pl-6">
          <div className="reveal relative">
            <CesuCalculator />
            {/* Fruit hung on the card corners, clear of any text. */}
            <svg viewBox="-40 -60 80 100" className="pointer-events-none absolute -right-3 -top-14 z-10 w-16 rotate-12 sm:-right-6 sm:w-20" aria-hidden="true">
              <RowanCluster />
            </svg>
            <svg viewBox="-16 -24 32 52" className="pointer-events-none absolute -bottom-5 right-10 z-10 w-9 rotate-[18deg]" aria-hidden="true">
              <Blackberry />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
