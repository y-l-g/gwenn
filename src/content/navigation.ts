import { services } from "./services";

export const serviceNav = services.map((s) => ({
  href: s.path,
  label: s.name,
  hint: s.summary,
  soon: !s.available,
  key: s.key,
}));

export const mainNav = [
  { href: "/terrasses-pergolas-carports#photos", label: "Photos" },
  { href: "/zone-intervention", label: "Zone d'intervention" },
];
