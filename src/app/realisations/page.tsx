import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/PageParts";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ContactBand } from "@/components/ui/ContactBand";
import { ServiceArt, type ArtKind } from "@/components/illustrations/ServiceArt";

export const metadata: Metadata = pageMetadata({
  title: "Réalisations : terrasses, constructions bois et jardins autour de Moréac",
  description:
    "Quelques chantiers réalisés par Gwenn Joannic dans le centre Morbihan : terrasses en bois, coffrets et petits ouvrages sur mesure, entretien de jardin.",
  path: "/realisations",
});

const art: Record<string, ArtKind> = { jardin: "jardin", construction: "construction", elagage: "elagage", habitat: "habitat", solaire: "solaire" };

export default function ProjectsPage() {
  // Group projects by activity. A project with several activities appears in each group.
  const groups = services
    .map((s) => ({ service: s, items: projects.filter((p) => p.services.includes(s.key)) }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <section className="pb-12 pt-6 sm:pt-8">
        <div className="container-site">
          <Breadcrumbs items={[{ name: "Réalisations", path: "/realisations" }]} />
          <h1 className="rise-in mt-8 display-lg max-w-[18ch] text-[clamp(2.4rem,1.3rem+3.8vw,4.6rem)]">
            Des chantiers <span className="wonk text-chestnut">photographiés sur place</span>
          </h1>
          <p className="rise-in lead mt-6 max-w-[54ch] text-ink-soft">
            Quelques travaux récents, classés par activité. Toutes les photos ont été prises sur les chantiers. D&apos;autres
            viendront au fil des saisons.
          </p>
          {groups.length > 1 && (
            <nav aria-label="Activités" className="mt-8">
              <ul className="flex flex-wrap gap-2">
                {groups.map((g) => (
                  <li key={g.service.key}>
                    <a href={`#${g.service.key}`} className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-sm font-medium no-underline hover:border-ink">
                      {g.service.short} <span className="text-ink-mute">{g.items.length}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </section>

      {groups.map((g) => (
        <section key={g.service.key} id={g.service.key} className="scroll-mt-24 pb-20 sm:pb-28" aria-labelledby={`${g.service.key}-title`}>
          <div className="container-site">
            <div className="flex items-end justify-between gap-6 border-b border-ink/15 pb-5">
              <h2 id={`${g.service.key}-title`} className="font-display text-3xl sm:text-4xl">
                {g.service.name}
              </h2>
              <ServiceArt kind={art[g.service.key]} className="h-16 w-auto shrink-0 sm:h-20" />
            </div>
            <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2">
              {g.items.map((p, i) => (
                <ProjectCard key={p.slug} project={p} priority={i < 2} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <ContactBand title="Votre projet sera" accent="peut-être le prochain." />
    </>
  );
}
