import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import type { Faq } from "@/content/services";
import { hypha } from "@/lib/organic";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <>
      <nav aria-label="Fil d'Ariane" className="text-sm text-ink-mute">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link href="/" className="link-quiet">
              Accueil
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={item.path} className="flex items-center gap-2">
              <span aria-hidden="true" className="text-ink/30">
                /
              </span>
              {i === items.length - 1 ? (
                <span aria-current="page" className="text-ink-soft">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="link-quiet">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}

export function FaqList({ faq, title = "Questions fréquentes" }: { faq: Faq[]; title?: string }) {
  if (!faq.length) return null;
  return (
    <section className="py-20 sm:py-24" aria-labelledby="faq-title">
      <div className="container-site grid gap-10 lg:grid-cols-12">
        <h2 id="faq-title" className="reveal display-md lg:col-span-4">
          {title}
        </h2>
        <div className="lg:col-span-8">
          {faq.map((f) => (
            <details key={f.q} className="group border-b border-ink/15 first:border-t">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-display text-xl leading-snug marker:hidden [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="relative mt-1 h-6 w-6 shrink-0 rounded-full border border-ink/25 transition-transform duration-300 before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-2.5 before:-translate-x-1/2 before:bg-current after:absolute after:left-1/2 after:top-1/2 after:h-2.5 after:w-px after:-translate-y-1/2 after:bg-current group-open:rotate-45"
                />
              </summary>
              <p className="max-w-[62ch] pb-6 text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd data={faqSchema(faq)} />
    </section>
  );
}

export function Steps({ steps, tone = "var(--color-chestnut)" }: { steps: { title: string; text: string }[]; tone?: string }) {
  const W = 1000;
  // Low wobble keeps the whole curve inside the 60px-high band.
  const thread = hypha({ x: 40, y: 30 }, { x: W - 40, y: 30 }, 5, 0.015, 0);
  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} 60`} preserveAspectRatio="none" className="draw-on-view absolute inset-x-0 top-0 hidden h-[60px] w-full lg:block" aria-hidden="true">
        <path d={thread.main} pathLength={1} className="draw-path" fill="none" stroke={tone} strokeWidth="1.5" opacity=".5" />
      </svg>
      <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))]" style={{ ["--n" as string]: steps.length }}>
        {steps.map((s, i) => (
          <li key={s.title} className="reveal">
            <span className="flex h-[60px] items-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper font-display text-xl wonk ring-1 ring-ink/20">
                {i + 1}
              </span>
            </span>
            <h3 className="mt-4 font-display text-xl">{s.title}</h3>
            <p className="mt-2 text-[0.98rem] text-ink-soft">{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function SectionIntro({ title, accent, children, className = "" }: { title: string; accent?: string; children?: ReactNode; className?: string }) {
  return (
    <div className={`grid gap-6 lg:grid-cols-12 lg:items-end ${className}`}>
      <h2 className="reveal display-lg lg:col-span-7">
        {title} {accent && <span className="wonk text-rust">{accent}</span>}
      </h2>
      {children && <div className="reveal text-ink-soft lg:col-span-5">{children}</div>}
    </div>
  );
}
