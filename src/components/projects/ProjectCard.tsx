import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { getService } from "@/content/services";
import { ArrowRight } from "@/components/ui/Icons";

export function ProjectCard({ project, priority = false, headingLevel = 3 }: { project: Project; priority?: boolean; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="group relative">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-paper-deep">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 40rem, (min-width: 640px) 46vw, 92vw"
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-organic)] group-hover:scale-[1.04]"
          loading={priority ? "eager" : "lazy"}
        />
        <span className="absolute left-4 top-4 rounded-full bg-paper/92 px-3 py-1 text-xs font-semibold backdrop-blur">
          {project.photos.length} photos
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="flex flex-wrap gap-x-3 text-sm text-ink-mute">
            {project.services.map((k) => (
              <span key={k}>{getService(k).short}</span>
            ))}
            <span aria-hidden="true">·</span>
            <span>{project.place}</span>
          </p>
          <H className="mt-1.5 font-display text-2xl leading-tight">
            <Link href={`/realisations/${project.slug}`} prefetch className="no-underline after:absolute after:inset-0 group-hover:underline">
              {project.title}
            </Link>
          </H>
          <p className="mt-2 text-ink-soft">{project.teaser}</p>
        </div>
        <span className="mt-6 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-colors duration-300 group-hover:border-rust group-hover:bg-rust group-hover:text-paper" aria-hidden="true">
          <ArrowRight className="h-5 w-5" />
        </span>
      </div>
    </article>
  );
}
