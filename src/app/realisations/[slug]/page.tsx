import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { absoluteUrl, business } from "@/content/business";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/PageParts";
import { Gallery } from "@/components/projects/Gallery";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ContactBand } from "@/components/ui/ContactBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArrowRight } from "@/components/ui/Icons";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/realisations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    ...pageMetadata({ title: project.title, description: project.intro.slice(0, 155), path: `/realisations/${project.slug}` }),
  };
}

/*
 * The slug is URL data, so the project body sits behind a Suspense boundary.
 * Every project is prerendered by generateStaticParams; the fallback only shows
 * during a client navigation whose link was not prefetched.
 */
export default function ProjectPage({ params }: PageProps<"/realisations/[slug]">) {
  return (
    <>
      <Suspense fallback={<ProjectSkeleton />}>
        <ProjectBody params={params} />
      </Suspense>
      <ContactBand title="Un projet similaire ?" accent="Parlons-en." />
    </>
  );
}

function ProjectSkeleton() {
  return (
    <div className="container-site pb-20 pt-6 sm:pt-8" aria-busy="true">
      <div className="h-4 w-48 rounded-full bg-ink/10" />
      <div className="mt-10 h-14 max-w-xl rounded-2xl bg-ink/10" />
      <div className="mt-12 aspect-[16/10] rounded-[2rem] bg-paper-deep sm:aspect-[2/1]" />
    </div>
  );
}

async function ProjectBody({ params }: { params: PageProps<"/realisations/[slug]">["params"] }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const others = projects.filter((p) => p.slug !== project.slug);
  const lead = project.photos[0];

  return (
    <>
      <article>
        <header className="pb-12 pt-6 sm:pt-8">
          <div className="container-site">
            <Breadcrumbs
              items={[
                { name: "Réalisations", path: "/realisations" },
                { name: project.title, path: `/realisations/${project.slug}` },
              ]}
            />
            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="text-sm text-ink-mute">
                  {project.services.map((k) => (
                    <Link key={k} href={getService(k).path} className="mr-3 font-medium text-ink-soft link-quiet">
                      {getService(k).name}
                    </Link>
                  ))}
                  <span>{project.place}</span>
                </p>
                <h1 className="rise-in mt-3 display-lg text-[clamp(2.2rem,1.3rem+3.2vw,4.2rem)]">{project.title}</h1>
              </div>
              <p className="rise-in lead text-ink-soft lg:col-span-5">{project.intro}</p>
            </div>
          </div>
        </header>

        <div className="container-site">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] sm:aspect-[2/1]">
            <Image src={lead.src} alt={lead.alt} fill preload placeholder="blur" sizes="(min-width: 1312px) 1232px, 94vw" className="object-cover object-[50%_60%]" quality={80} />
          </div>
        </div>

        <section className="py-16 sm:py-24" aria-labelledby="details-title">
          <div className="container-site grid gap-10 lg:grid-cols-12">
            <h2 id="details-title" className="reveal display-md lg:col-span-4">
              Les détails <span className="wonk text-chestnut">qui comptent</span>
            </h2>
            <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
              {project.details.map((d, i) => (
                <div key={d.label} className="reveal border-t border-ink/15 pt-5">
                  <dt className="flex items-baseline gap-3 font-display text-xl">
                    <span className="text-sm text-ink-mute wonk">{String(i + 1).padStart(2, "0")}</span>
                    {d.label}
                  </dt>
                  <dd className="mt-2 text-ink-soft">{d.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="pb-20 sm:pb-28" aria-labelledby="photos-title">
          <div className="container-site">
            <h2 id="photos-title" className="mb-8 font-display text-3xl">
              Toutes les photos
            </h2>
            <Gallery photos={project.photos} title={project.title} />
          </div>
        </section>
      </article>

      {others.length > 0 && (
        <section className="bg-paper-deep py-20" aria-labelledby="more-title">
          <div className="container-site">
            <div className="flex items-end justify-between gap-6">
              <h2 id="more-title" className="font-display text-3xl">
                Autres réalisations
              </h2>
              <Link href="/realisations" className="inline-flex items-center gap-2 font-semibold text-rust-deep link-quiet">
                Tout voir <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-12 sm:grid-cols-2">
              {others.slice(0, 2).map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.intro,
          image: project.photos.map((p) => absoluteUrl(p.src.src)),
          creator: { "@type": "Person", name: business.owner },
          locationCreated: { "@type": "Place", name: project.place },
        }}
      />
    </>
  );
}
