import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Services Jardin Joannic",
    short_name: "Jardin Joannic",
    description: "Entretien de jardin, constructions bois et conseil habitat autour de Moréac.",
    start_url: "/",
    display: "browser",
    background_color: "#f4eee2",
    theme_color: "#3f5a2b",
    lang: "fr",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
