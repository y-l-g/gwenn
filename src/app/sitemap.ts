import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/business";
import { services } from "@/content/services";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    ...services.map((s) => ({ path: s.path, priority: s.available ? 0.9 : 0.4, changeFrequency: "monthly" as const })),
    { path: "/zone-intervention", priority: 0.8, changeFrequency: "yearly" },
  ];
  return pages.map((p) => ({
    url: absoluteUrl(p.path),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
