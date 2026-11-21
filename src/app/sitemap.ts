import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/business";
import { services } from "@/content/services";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    ...services.map((s) => ({ path: s.path, priority: s.available ? 0.9 : 0.4, changeFrequency: "monthly" as const })),
    { path: "/realisations", priority: 0.8, changeFrequency: "monthly" },
    ...projects.map((p) => ({ path: `/realisations/${p.slug}`, priority: 0.6, changeFrequency: "yearly" as const })),
    { path: "/zone-intervention", priority: 0.8, changeFrequency: "yearly" },
    { path: "/cesu-credit-impot", priority: 0.7, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  ];
  return pages.map((p) => ({
    url: absoluteUrl(p.path),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
