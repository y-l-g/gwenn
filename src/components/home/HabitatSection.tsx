import Link from "next/link";
import { business, mailto } from "@/content/business";
import { habitatTopics } from "@/content/habitat";
import { hypha, tuft } from "@/lib/organic";
import { HabitatNetwork, type EdgeGeometry } from "./HabitatNetwork";
import { ArrowRight, MailIcon, PhoneIcon } from "@/components/ui/Icons";

function buildGeometry() {
  const seen = new Set<string>();
  const edges: EdgeGeometry[] = [];
  const byId = new Map(habitatTopics.map((t) => [t.id, t]));
  let seed = 3;
  for (const t of habitatTopics) {
    for (const l of t.links) {
      const key = [t.id, l].sort().join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      const o = byId.get(l)!;
      seed += 7;
      edges.push({
        a: t.id,
        b: l,
        wide: hypha({ x: t.pos.x * 10, y: t.pos.y * 6.25 }, { x: o.pos.x * 10, y: o.pos.y * 6.25 }, seed, 0.14, 3),
        narrow: hypha({ x: t.mpos.x * 6, y: t.mpos.y * 8 }, { x: o.mpos.x * 6, y: o.mpos.y * 8 }, seed + 1, 0.14, 2),
      });
    }
  }
  const tufts = {
    wide: habitatTopics.flatMap((t, i) => tuft({ x: t.pos.x * 10, y: t.pos.y * 6.25 }, i + 40, 9, 46)),
    narrow: habitatTopics.flatMap((t, i) => tuft({ x: t.mpos.x * 6, y: t.mpos.y * 8 }, i + 60, 7, 34)),
  };
  return { edges, tufts };
}

export function HabitatSection({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const { edges, tufts } = buildGeometry();
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <section className="on-dark relative bg-humus pb-24 pt-10 text-mycelium sm:pb-32" aria-labelledby="habitat-title">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Heading id="habitat-title" className="reveal display-lg text-mycelium lg:col-span-7">
            Dans une maison, <span className="wonk text-chanterelle">tout est relié</span>
          </Heading>
          <div className="reveal lg:col-span-5">
            <p className="lead text-mycelium/85">
              Les problèmes d&apos;une maison sont souvent liés : l&apos;humidité refroidit les murs, le froid fait
              tourner le chauffage, des fenêtres neuves changent la circulation de l&apos;air.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <HabitatNetwork topics={habitatTopics} edges={edges} tufts={tufts} />
        </div>

        <div className="mt-16 grid gap-8 rounded-[2rem] bg-humus-2 p-7 ring-1 ring-mycelium/10 sm:p-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] leading-tight">
              30 minutes au téléphone, <span className="wonk text-chanterelle">offertes.</span>
            </p>
            <p className="mt-4 max-w-xl text-mycelium/80">
              J&apos;ai travaillé six ans dans le bâtiment. Vous m&apos;expliquez ce que vous constatez, on cherche
              ensemble les causes et vous repartez avec des pistes claires. Toute l&apos;année, solaire compris.
            </p>
            <p className="mt-4 text-sm text-spore">
              Un conseil, pas un diagnostic officiel (DPE ou audit énergétique).{" "}
              <Link href="/conseil-habitat" className="font-semibold text-mycelium link-quiet">
                En savoir plus
              </Link>
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-5 lg:items-end">
            <a href={business.phoneHref} className="btn btn-light w-full sm:w-auto">
              <PhoneIcon /> Appeler le {business.phone}
            </a>
            <a
              href={mailto(
                "Conseil habitat : demande d'appel de 30 minutes",
                "Bonjour Gwenn,\n\nJe souhaiterais un appel conseil habitat.\n\nCe que je constate :\n\nAnnée de construction (environ) :\nType de chauffage :\nCréneaux qui m'arrangent :\n\nMerci !",
              )}
              className="btn btn-ghost w-full sm:w-auto"
            >
              <MailIcon /> Proposer un créneau par e-mail <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
