import Image from "next/image";
import Link from "next/link";
import { getProject } from "@/content/projects";
import { ArrowRight } from "@/components/ui/Icons";
import { Acorn, BeechLeaf } from "@/components/illustrations/Botanical";

export function FeaturedWork() {
  const terrace = getProject("terrasse-pin-lames-croisees")!;
  const boxes = getProject("coffrets-bois-compteurs")!;
  const wide = terrace.photos[1];
  const tall = terrace.photos[2];
  const detail = terrace.photos[3];

  return (
    <section className="relative overflow-x-clip bg-paper-deep py-20 sm:py-28" aria-labelledby="work-title">
      <svg viewBox="-60 -130 120 150" className="pointer-events-none absolute -right-6 top-10 w-24 rotate-[24deg] opacity-90 sm:w-32" aria-hidden="true">
        <BeechLeaf fill="var(--color-chanterelle)" />
      </svg>
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="work-title" className="reveal display-lg lg:col-span-7">
            Sur le chantier : <span className="wonk text-chestnut">{terrace.title.replace("Une terrasse en pin ", "une terrasse ")}</span>
          </h2>
          <p className="reveal text-ink-soft lg:col-span-5">{terrace.intro}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-12">
          <figure className="reveal relative lg:col-span-7 lg:row-span-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] lg:aspect-auto lg:h-full">
              <Image src={wide.src} alt={wide.alt} fill placeholder="blur" sizes="(min-width: 1024px) 52vw, 92vw" className="object-cover" />
            </div>
            <figcaption className="absolute bottom-4 left-4 rounded-full bg-paper/92 px-4 py-2 text-sm font-medium backdrop-blur">{wide.caption}</figcaption>
          </figure>
          <figure className="reveal relative lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] sm:aspect-[16/10]">
              <Image src={tall.src} alt={tall.alt} fill placeholder="blur" sizes="(min-width: 1024px) 36vw, 92vw" className="object-cover object-[50%_60%]" />
            </div>
            <figcaption className="absolute bottom-4 left-4 rounded-full bg-paper/92 px-4 py-2 text-sm font-medium backdrop-blur">{tall.caption}</figcaption>
          </figure>
          <div className="reveal grid gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-5">
            <figure className="relative">
              <div className="relative aspect-square overflow-hidden rounded-[1.75rem]">
                <Image src={detail.src} alt={detail.alt} fill placeholder="blur" sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 92vw" className="object-cover object-[70%_50%]" />
              </div>
            </figure>
            <dl className="flex flex-col justify-between gap-4 rounded-[1.75rem] bg-paper p-6">
              {terrace.details.slice(0, 2).map((d) => (
                <div key={d.label}>
                  <dt className="font-display text-lg wonk text-chestnut">{d.label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink-soft">{d.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-ink/15 pt-8 md:flex-row md:items-center md:justify-between">
          <Link href={`/realisations/${terrace.slug}`} prefetch className="btn btn-moss self-start">
            Voir toute la terrasse <ArrowRight className="h-4.5 w-4.5" />
          </Link>
          <Link href={`/realisations/${boxes.slug}`} prefetch className="group flex items-center gap-4 no-underline">
            <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-2xl">
              <Image src={boxes.cover.src} alt="" fill sizes="80px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </span>
            <span>
              <span className="block text-sm text-ink-mute">Et aussi</span>
              <span className="font-display text-lg leading-tight group-hover:underline">{boxes.title}</span>
            </span>
            <svg viewBox="-14 -12 28 44" className="h-9 w-6 shrink-0 transition-transform duration-500 group-hover:rotate-12" aria-hidden="true">
              <Acorn />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
