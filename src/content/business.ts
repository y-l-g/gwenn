export const business = {
  name: "Services Jardin Joannic",
  owner: "Gwenn Joannic",
  phone: "07 52 08 70 16",
  phoneHref: "tel:+33752087016",
  phoneIntl: "+33 7 52 08 70 16",
  email: "gwennjoannic@gmail.com",
  emailHref: "mailto:gwennjoannic@gmail.com",
  locality: "Moréac",
  postalCode: "56500",
  department: "Morbihan",
  region: "Bretagne",
  country: "FR",
  geo: { lat: 47.9203, lng: -2.8186 },
  radius: "20 km autour de Moréac",
  /**
   * Public URL of the site, used for canonical links, the sitemap and
   * structured data. Set NEXT_PUBLIC_SITE_URL once the domain is known.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.servicesjardinjoannic.fr").replace(/\/$/, ""),
} as const;

export function absoluteUrl(path = "/") {
  return `${business.url}${path === "/" ? "" : path}`;
}

export function mailto(subject: string, body?: string) {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `${business.emailHref}?${params.toString().replace(/\+/g, "%20")}`;
}
