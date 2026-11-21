import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import heroPhoto from "@/assets/photos/terrasse-angle-ciel.jpg";
import { business } from "@/content/business";
import { BeechLeaf, ChestnutLeaf, OakLeaf, OakTwig } from "@/components/illustrations/Botanical";
import { RootSystem } from "@/components/illustrations/Underground";
import { ArrowRight, ClockIcon, EuroIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { grass } from "@/lib/organic";

const falling = [
  { left: "8%", dur: "19s", delay: "-4s", x: "70px", r: "320deg", kind: "beech", fill: "var(--color-beech)" },
  { left: "58%", dur: "23s", delay: "-13s", x: "-90px", r: "-280deg", kind: "oak", fill: "var(--color-rust)" },
  { left: "86%", dur: "27s", delay: "-8s", x: "-40px", r: "200deg", kind: "chestnut", fill: "var(--color-chanterelle)" },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-x-clip" aria-labelledby="hero-title">
      <div className="container-site grid items-start gap-x-10 gap-y-12 pt-6 sm:pt-10 lg:grid-cols-12 lg:pt-12">
        <div className="relative z-10 lg:col-span-6 lg:pt-14">
          <h1 id="hero-title" className="rise-in display-xl max-w-[13ch] lg:text-[clamp(3rem,1.2rem+4.4vw,5.6rem)]">
            Haies taillées, bois fendu, terrasses posées{" "}
            <span className="wonk block text-rust">autour de Moréac.</span>
          </h1>
          <p className="rise-in lead mt-7 max-w-[38ch] text-ink-soft" style={{ "--rise-delay": "120ms" } as CSSProperties}>
            Je m&apos;appelle Gwenn Joannic. J&apos;entretiens les jardins, je construis terrasses, pergolas et carports en
            bois, et je mets mes six années dans le bâtiment à votre service pour mieux comprendre votre maison.
          </p>
          <div className="rise-in mt-9 flex flex-wrap gap-3" style={{ "--rise-delay": "220ms" } as CSSProperties}>
            <a href={business.phoneHref} className="btn">
              <PhoneIcon /> {business.phone}
            </a>
            <Link href="#services" className="btn btn-ghost">
              Découvrir les services <ArrowRight className="h-4.5 w-4.5" />
            </Link>
          </div>
          <ul className="rise-in mt-10 grid gap-3 text-[0.98rem] text-ink-soft sm:max-w-lg" style={{ "--rise-delay": "320ms" } as CSSProperties}>
            <li className="flex gap-3">
              <EuroIcon className="mt-0.5 h-5 w-5 shrink-0 text-moss" />
              <span>
                <Link href="/cesu-credit-impot" className="font-semibold text-ink link-quiet">
                  CESU acceptés
                </Link>
                , crédit d&apos;impôt possible sur le jardinage
              </span>
            </li>
            <li className="flex gap-3">
              <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-moss" />
              <span>
                <Link href="/conseil-habitat" className="font-semibold text-ink link-quiet">
                  Conseil habitat
                </Link>{" "}
                : 30 minutes au téléphone, offertes
              </span>
            </li>
            <li className="flex gap-3">
              <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-moss" />
              <span>
                Moréac et{" "}
                <Link href="/zone-intervention" className="font-semibold text-ink link-quiet">
                  30 minutes autour
                </Link>{" "}
                : Pontivy, Vannes, Ploërmel, Baud, Auray
              </span>
            </li>
          </ul>
        </div>

        <figure className="relative mx-auto w-full max-w-[34rem] lg:col-span-6 lg:mr-0">
          {falling.map((f, i) => (
            <svg
              key={i}
              viewBox="-40 -130 80 150"
              aria-hidden="true"
              className="falling-leaf pointer-events-none absolute top-0 z-20 w-7 sm:w-9"
              style={{ left: f.left, "--dur": f.dur, "--delay": f.delay, "--drift-x": f.x, "--drift-r": f.r } as CSSProperties}
            >
              {f.kind === "oak" && <OakLeaf fill={f.fill} />}
              {f.kind === "beech" && <BeechLeaf fill={f.fill} />}
              {f.kind === "chestnut" && <ChestnutLeaf fill={f.fill} s={0.85} />}
            </svg>
          ))}
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[1.75rem] bg-paper-deep shadow-[0_40px_80px_-40px_rgb(35_39_29/0.55)]">
            <Image
              src={heroPhoto}
              alt="Terrasse en pin construite par Gwenn Joannic, vue à ras des lames, devant une maison à bardage bois"
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1024px) 34rem, (min-width: 640px) 34rem, 92vw"
              className="object-cover object-[62%_50%]"
              quality={80}
            />
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-ink/10" />
          </div>
          <OakTwig className="pointer-events-none absolute -left-10 -top-8 z-10 w-[58%] max-w-[300px] sm:-left-20 sm:-top-10" />
          <figcaption className="absolute -bottom-3 right-3 z-30 max-w-[15rem] rotate-[-2deg] rounded-xl bg-paper px-4 py-3 text-sm leading-snug shadow-[0_12px_30px_-16px_rgb(35_39_29/0.5)] sm:-right-6">
            <span className="font-display text-base wonk">Terrasse en pin</span>
            <br />
            <span className="text-ink-mute">Lames croisées, rives habillées.</span>{" "}
            <Link href="/realisations/terrasse-pin-lames-croisees" prefetch className="font-semibold text-rust-deep link-quiet">
              Voir le chantier
            </Link>
          </figcaption>
        </figure>
      </div>

      <div className="relative mt-10 sm:mt-14" aria-hidden="true">
        <svg viewBox="0 0 1600 40" preserveAspectRatio="xMidYMax slice" className="block h-8 w-full">
          <path d={grass(1600, 40, 31, 0.32, 26)} fill="var(--color-moss)" opacity=".85" />
          <path d="M0 39 C300 37 600 40 900 38 C1200 36 1400 39 1600 38 V40 H0Z" fill="var(--color-chestnut)" opacity=".6" />
        </svg>
        <RootSystem
          className="mx-auto -mt-1 h-auto w-[max(100%,900px)] max-w-none opacity-80 [margin-inline:calc(50%-max(50%,450px))]"
          width={1600}
          height={230}
          seed={9}
          depth={5}
          network
          origins={[
            { x: 800, length: 74, width: 9 },
            { x: 330, angle: 70, length: 52, width: 6, depth: 4, gravity: 0.15 },
            { x: 560, angle: 115, length: 38, width: 4, depth: 3, gravity: 0.1 },
            { x: 1090, angle: 62, length: 46, width: 5.5, depth: 4, gravity: 0.12 },
            { x: 1330, angle: 105, length: 40, width: 4.5, depth: 3, gravity: 0.15 },
            { x: 120, angle: 80, length: 30, width: 3, depth: 3 },
            { x: 1520, angle: 100, length: 30, width: 3, depth: 3 },
          ]}
        />
      </div>
    </section>
  );
}
