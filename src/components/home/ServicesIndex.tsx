import Link from "next/link";
import { services } from "@/content/services";
import { ServiceArt, type ArtKind } from "@/components/illustrations/ServiceArt";
import { ArrowRight } from "@/components/ui/Icons";

const numerals = ["I", "II", "III", "IV", "V"];
const art: Record<string, ArtKind[]> = {
  jardin: ["jardin", "bois"],
  construction: ["construction"],
  elagage: ["elagage"],
  habitat: ["habitat"],
  solaire: ["solaire"],
};

const toneText: Record<string, string> = {
  moss: "group-hover:text-moss",
  beech: "group-hover:text-chestnut",
  fern: "group-hover:text-moss",
  chanterelle: "group-hover:text-rust-deep",
  rust: "group-hover:text-rust",
};

export function ServicesIndex() {
  return (
    <section id="services" className="relative pb-20 pt-6 sm:pb-28" aria-labelledby="services-title">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="services-title" className="reveal display-lg lg:col-span-7">
            Du pied de la haie <span className="wonk text-moss">jusqu&apos;aux combles</span>
          </h2>
          <p className="reveal lead text-ink-soft lg:col-span-5">
            Quatre activités aujourd&apos;hui, une cinquième en germination. Elles se rejoignent plus souvent qu&apos;on ne
            le croit : une terrasse se pense avec le jardin, et une maison humide commence parfois par une gouttière.
          </p>
        </div>

        <ol className="relative mt-14 border-t border-ink/15">
          {services.map((s, i) => (
            <li key={s.key} className="reveal border-b border-ink/15">
              <Link
                href={s.path}
                className={`group relative grid grid-cols-[3rem_1fr] items-center gap-x-4 gap-y-4 py-7 no-underline sm:grid-cols-[4rem_9rem_1fr] sm:gap-x-6 lg:grid-cols-[4.5rem_13.5rem_minmax(0,1fr)_minmax(0,1.15fr)_3rem] lg:py-9 ${
                  s.available ? "" : "opacity-80"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-2 -inset-x-3 -z-10 origin-left scale-x-[0.98] rounded-[1.75rem] bg-paper-deep opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-organic)] group-hover:scale-x-100 group-hover:opacity-100 sm:-inset-x-5"
                />
                <span className="col-start-1 row-start-1 self-start pt-1 font-display text-2xl text-ink-mute wonk sm:row-span-2 sm:text-3xl lg:row-span-1" aria-hidden="true">
                  {numerals[i]}
                </span>
                <span className="relative col-start-2 row-start-2 flex h-28 w-44 sm:row-span-2 sm:row-start-1 sm:h-28 sm:w-36 sm:self-center lg:row-span-1 lg:h-36 lg:w-52">
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
                <span className="col-start-2 row-start-1 sm:col-start-3 sm:self-end lg:self-center">
                  <h3 className={`font-display text-[1.65rem] leading-tight transition-colors sm:text-3xl ${toneText[s.tone]}`}>
                    {s.name}
                    {!s.available && (
                      <span className="ml-3 inline-block translate-y-[-0.2em] rounded-full bg-rust/10 px-2.5 py-1 align-middle font-sans text-xs font-semibold text-rust">
                        bientôt
                      </span>
                    )}
                  </h3>
                </span>
                <span className="col-span-2 row-start-3 sm:col-span-1 sm:col-start-3 sm:row-start-2 lg:col-start-4 lg:row-start-1">
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
                  className="hidden h-12 w-12 items-center justify-center justify-self-end lg:col-start-5 lg:row-start-1 rounded-full border border-ink/20 transition-all duration-500 group-hover:border-rust group-hover:bg-rust group-hover:text-paper lg:flex"
                >
                  <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
