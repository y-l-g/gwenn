import { services } from "./services";

export const serviceNav = services.map((s) => ({
  href: s.path,
  label: s.name,
  hint: s.summary,
  soon: !s.available,
  key: s.key,
}));

export const mainNav = [
  { href: "/realisations", label: "Réalisations" },
  { href: "/zone-intervention", label: "Zone d'intervention" },
  { href: "/cesu-credit-impot", label: "CESU" },
  { href: "/contact", label: "Contact" },
];
