import type { MetadataRoute } from "next";
import { absoluteUrl, business } from "@/content/business";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", ...(business.indexable ? { allow: "/" } : { disallow: "/" }) },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: business.url,
  };
}
