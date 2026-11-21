import Link from "next/link";
import { business } from "@/content/business";
import { getService, services, type Service } from "@/content/services";
import { ServiceArt, type ArtKind } from "@/components/illustrations/ServiceArt";
import { ArrowRight, PhoneIcon } from "@/components/ui/Icons";

const art: Record<string, ArtKind[]> = {
  jardin: ["jardin", "elagage"],
  construction: ["construction"],
  solaire: ["solaire"],
};

const toneText: Record<string, string> = {
  moss: "group-hover:text-moss",
  beech: "group-hover:text-chestnut",
  rust: "group-hover:text-rust",
};

function ServiceRow({ s }: { s: Service }) {
  return (
    <li className="reveal border-b border-ink/15">
      <Link
        href={s.path}
        className={`group relative grid grid-cols-1 items-center gap-x-6 gap-y-4 py-7 no-underline sm:grid-cols-[9rem_1fr] lg:grid-cols-[13.5rem_minmax(0,1fr)_minmax(0,1.15fr)_3rem] lg:py-9 ${
          s.available ? "" : "opacity-80"
        }`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-2 -inset-x-3 -z-10 origin-left scale-x-[0.98] rounded-[1.75rem] bg-paper-deep opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-organic)] group-hover:scale-x-100 group-hover:opacity-100 sm:-inset-x-5"
        />
        <span className="relative row-start-2 flex h-28 w-44 sm:row-span-2 sm:row-start-1 sm:h-28 sm:w-36 sm:self-center lg:row-span-1 lg:h-36 lg:w-52">
          {art[s.key].map((k, j) => (
            <ServiceArt
              key={k}
              kind={k}
              className={`h-full w-auto shrink-0 transition-transform duration-700 ease-[var(--ease-organic)] ${
                j === 0
                  ? `group-hover:-translate-y-1 group-hover:-rotate-2 ${art[s.key].length > 1 ? "max-w-[68%]" : ""}`
                  : "absolute bottom-0 right-0 !h-[66%] group-hover:translate-x-1 group-hover:rotate-3"
              }`}
            />
          ))}
        </span>
        <span className="row-start-1 sm:col-start-2 sm:self-end lg:self-center">
          <h3 className={`font-display text-[1.65rem] leading-tight transition-colors sm:text-3xl ${toneText[s.tone]}`}>
            {s.name}
            {!s.available && (
              <span className="ml-3 inline-block translate-y-[-0.2em] rounded-full bg-rust/10 px-2.5 py-1 align-middle font-sans text-xs font-semibold text-rust">
                bientôt
              </span>
            )}
          </h3>
        </span>
        <span className="row-start-3 sm:col-start-2 sm:row-start-2 lg:col-start-3 lg:row-start-1">
          <span className="block text-ink-soft">{s.summary}</span>
          <span className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-ink-mute">
            {s.keywords.map((k) => (
              <span key={k} className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-fern" aria-hidden="true" />
                {k}
              </span>
            ))}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="hidden h-12 w-12 items-center justify-center justify-self-end rounded-full border border-ink/20 transition-all duration-500 group-hover:border-rust group-hover:bg-rust group-hover:text-paper lg:col-start-4 lg:row-start-1 lg:flex"
        >
          <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-0.5" />
        </span>
      </Link>
    </li>
  );
}

export function ServicesIndex() {
  const habitat = getService("habitat");
  const work = services.filter((s) => s.available && s.key !== "habitat");
  const soon = services.filter((s) => !s.available);
  return (
    <section id="services" className="relative pb-20 pt-6 sm:pb-28" aria-labelledby="services-title">
      <div className="container-site">
        <h2 id="services-title" className="reveal display-lg">
          Mes <span className="wonk text-moss">services</span>
        </h2>

        <ul className="relative mt-12 border-t border-ink/15">
          {work.map((s) => (
            <ServiceRow key={s.key} s={s} />
          ))}
        </ul>

        {/* Conseil habitat: free and available all year, so it gets its own card. */}
        <div className="reveal on-dark relative mt-10 grid items-center gap-8 overflow-hidden rounded-[2rem] bg-humus p-7 text-mycelium sm:p-10 md:grid-cols-[minmax(0,12rem)_1fr] lg:grid-cols-[13.5rem_minmax(0,1fr)_auto]">
          <ServiceArt kind="habitat" className="h-32 w-auto lg:h-36" />
          <div>
            <p className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider">
              <span className="rounded-full bg-chanterelle px-3 py-1 text-humus">Gratuit</span>
              <span className="rounded-full bg-mycelium/10 px-3 py-1 text-mycelium">Toute l&apos;année</span>
            </p>
            <h3 className="mt-4 font-display text-3xl leading-tight">
              <Link href={habitat.path} className="no-underline hover:underline">
                {habitat.name}
              </Link>
            </h3>
            <p className="mt-3 max-w-xl text-mycelium/80">{habitat.summary}</p>
          </div>
          <div className="flex flex-col gap-3 md:col-span-2 lg:col-span-1">
            <a href={business.phoneHref} className="btn btn-light">
              <PhoneIcon /> {business.phone}
            </a>
            <Link href={habitat.path} className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-chanterelle link-quiet">
              En savoir plus <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {soon.length > 0 && (
          <ul className="relative mt-10 border-t border-ink/15">
            {soon.map((s) => (
              <ServiceRow key={s.key} s={s} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
