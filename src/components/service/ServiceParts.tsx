import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { business } from "@/content/business";
import type { Task } from "@/content/services";
import { Breadcrumbs } from "@/components/ui/PageParts";
import { MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { Acorn, BeechLeaf, Blackberry, ChestnutLeaf, OakLeaf, RowanCluster } from "@/components/illustrations/Botanical";

type HeroProps = {
  crumbs: { name: string; path: string }[];
  title: ReactNode;
  lead: ReactNode;
  image?: { src: StaticImageData; alt: string; position?: string };
  art?: ReactNode;
  note?: ReactNode;
  mailSubject?: string;
  ctaLabel?: string;
};

export function ServiceHero({ crumbs, title, lead, image, art, note, mailSubject, ctaLabel = "Demander un devis" }: HeroProps) {
  return (
    <section className="relative overflow-x-clip pb-16 pt-6 sm:pb-24 sm:pt-8">
      <div className="container-site">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h1 className="rise-in display-lg text-[clamp(2.4rem,1.3rem+3.8vw,4.6rem)]">{title}</h1>
            <div className="rise-in lead mt-6 max-w-[40ch] text-ink-soft" style={{ "--rise-delay": "120ms" } as CSSProperties}>
              {lead}
            </div>
            <div className="rise-in mt-8 flex flex-wrap gap-3" style={{ "--rise-delay": "220ms" } as CSSProperties}>
              <a href={business.phoneHref} className="btn">
                <PhoneIcon /> {business.phone}
              </a>
              <a
                href={mailSubject ? `${business.emailHref}?subject=${encodeURIComponent(mailSubject)}` : business.emailHref}
                className="btn btn-ghost"
              >
                <MailIcon /> {ctaLabel}
              </a>
            </div>
            {note && <div className="rise-in mt-6 text-sm text-ink-mute" style={{ "--rise-delay": "300ms" } as CSSProperties}>{note}</div>}
          </div>
          <div className="relative lg:col-span-6">
            {image ? (
              <div className="relative">
                <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem_8rem_2rem_8rem] shadow-[0_40px_80px_-40px_rgb(35_39_29/0.55)] sm:rounded-[2.5rem_11rem_2.5rem_11rem]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    preload
                    placeholder="blur"
                    sizes="(min-width: 1024px) 40rem, 92vw"
                    className={`object-cover ${image.position ?? ""}`}
                  />
                </div>
                <svg viewBox="-70 -140 140 160" className="sway pointer-events-none absolute -bottom-8 -left-6 w-24 sm:w-32" aria-hidden="true" style={{ "--origin": "50% 100%" } as CSSProperties}>
                  <OakLeaf r={-28} fill="var(--color-rust)" />
                  <BeechLeaf r={22} x={18} fill="var(--color-beech)" />
                </svg>
              </div>
            ) : (
              art
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const specimens = [
  (k: number) => <OakLeaf key={k} s={0.42} r={-12} fill="var(--color-moss)" />,
  (k: number) => <BeechLeaf key={k} s={0.42} r={10} fill="var(--color-beech)" />,
  (k: number) => <ChestnutLeaf key={k} s={0.36} r={-8} fill="var(--color-chanterelle)" />,
  (k: number) => <Acorn key={k} s={1.3} y={-30} />,
  (k: number) => <RowanCluster key={k} s={0.95} y={-26} />,
  (k: number) => <Blackberry key={k} s={1.4} y={-28} />,
];

/** Tasks presented as herbarium sheets. */
export function TaskSheets({ tasks, offset = 0 }: { tasks: Task[]; offset?: number }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-[repeat(var(--cols),minmax(0,1fr))]" style={{ ["--cols" as string]: Math.min(tasks.length, 4) }}>
      {tasks.map((t, i) => (
        <li
          key={t.title}
          className="reveal relative rounded-[1.5rem] bg-paper p-6 pt-5 shadow-[0_20px_40px_-30px_rgb(35_39_29/0.5)] ring-1 ring-ink/10"
          style={{ rotate: `${[-0.6, 0.5, -0.3, 0.7][i % 4]}deg` } as CSSProperties}
        >
          <span aria-hidden="true" className="absolute -top-2 left-8 h-5 w-14 rotate-[-4deg] rounded-sm bg-lichen/70" />
          <div className="flex items-start justify-between gap-4">
            <span className="font-display text-sm wonk text-ink-mute">N° {String(i + 1 + offset).padStart(2, "0")}</span>
            <svg viewBox="-30 -60 60 66" className="h-14 w-12 shrink-0" aria-hidden="true">
              {specimens[(i + offset) % specimens.length](i)}
            </svg>
          </div>
          <h3 className="mt-2 font-display text-2xl leading-tight">{t.title}</h3>
          <p className="mt-3 text-[0.98rem] text-ink-soft">{t.text}</p>
        </li>
      ))}
    </ul>
  );
}
