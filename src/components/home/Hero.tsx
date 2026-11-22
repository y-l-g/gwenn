import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import heroPhoto from "@/assets/photos/terrasse-angle-ciel.jpg";
import { business } from "@/content/business";
import { BeechLeaf, ChestnutLeaf, OakLeaf, OakTwig } from "@/components/illustrations/Botanical";
import { MeadowEdge } from "@/components/illustrations/Underground";
import { ArrowRight, ClockIcon, EuroIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";

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
          <h1 id="hero-title" className="rise-in display-xl max-w-[18ch] text-[clamp(2.5rem,1.6rem+3.4vw,4.4rem)]">
            Paysagiste en éco-jardinage, constructions bois légères{" "}
            <span className="wonk text-rust">et conseil en bâtiment</span>
          </h1>
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
                <strong className="font-semibold text-ink">CESU acceptés</strong>, crédit d&apos;impôt possible sur le
                jardinage
              </span>
            </li>
            <li className="flex gap-3">
              <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-moss" />
              <span>
                <Link href="/conseil-habitat" className="font-semibold text-ink link-quiet">
                  Conseil habitat
                </Link>{" "}
                gratuit ou payant, toute l&apos;année
              </span>
            </li>
            <li className="flex gap-3">
              <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-moss" />
              <span>
                <Link href="/zone-intervention" className="font-semibold text-ink link-quiet">
                  Moréac et alentours
                </Link>{" "}
                : Locminé, Pontivy, Baud, Grand-Champ
              </span>
            </li>
          </ul>
        </div>

        <figure className="relative mx-auto w-full lg:col-span-6 lg:mt-10">
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
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem_8rem_2rem_8rem] bg-paper-deep shadow-[0_40px_80px_-40px_rgb(35_39_29/0.55)] sm:rounded-[2.5rem_11rem_2.5rem_11rem]">
            <Image
              src={heroPhoto}
              alt="Terrasse en pin construite par Gwenn Joannic, vue à ras des lames, devant une maison à bardage bois"
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1024px) 40rem, 92vw"
              className="object-cover object-[62%_50%]"
              quality={80}
            />
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-ink/10" />
          </div>
          <OakTwig className="pointer-events-none absolute -left-10 -top-16 z-10 w-[58%] max-w-[300px] sm:-left-20 sm:-top-[5.5rem]" />
        </figure>
      </div>

      <MeadowEdge className="mt-2 block h-[220px] w-full sm:mt-4 sm:h-[280px] lg:h-[350px]" />
    </section>
  );
}
