export type Town = {
  name: string;
  lat: number;
  lng: number;
  /** Approximate drive time from Moréac, in minutes */
  minutes: number;
  /** Main towns get a label and a paragraph on the area page */
  main?: boolean;
  note?: string;
  postalCode?: string;
};

export const home = { name: "Moréac", lat: 47.9203, lng: -2.8186 };

export const towns: Town[] = [
  {
    name: "Locminé",
    lat: 47.886,
    lng: -2.835,
    minutes: 8,
    main: true,
    postalCode: "56500",
    note: "La ville voisine, à quelques minutes. Entretien régulier de jardins, haies de lotissement, terrasses : c'est ici que je peux passer le plus souvent.",
  },
  {
    name: "Pontivy",
    lat: 48.068,
    lng: -2.963,
    minutes: 25,
    main: true,
    postalCode: "56300",
    note: "Par la D767, au nord. Entre les maisons de ville et les longères des communes autour, il y a autant de haies à tailler que de murs anciens à comprendre.",
  },
  {
    name: "Baud",
    lat: 47.875,
    lng: -3.02,
    minutes: 25,
    main: true,
    postalCode: "56150",
    note: "À l'ouest par la N24, vers la vallée du Blavet. Jardins arborés, fruitiers à tailler et bois de chauffage à fendre avant l'hiver.",
  },
  {
    name: "Vannes",
    lat: 47.658,
    lng: -2.76,
    minutes: 30,
    main: true,
    postalCode: "56000",
    note: "Au sud par la D767. Jardins de ville plus petits mais exigeants, terrasses et pergolas pour profiter du climat du golfe.",
  },
  {
    name: "Auray",
    lat: 47.668,
    lng: -2.982,
    minutes: 35,
    main: true,
    postalCode: "56400",
    note: "Au sud-ouest, à la limite de ma zone. Maisons anciennes en pierre où les questions d'humidité reviennent souvent.",
  },
  {
    name: "Ploërmel",
    lat: 47.932,
    lng: -2.397,
    minutes: 35,
    main: true,
    postalCode: "56800",
    note: "À l'est par la N24, en passant par Josselin. Grands terrains, haies champêtres et constructions bois.",
  },
  { name: "Josselin", lat: 47.952, lng: -2.547, minutes: 25 },
  { name: "Grand-Champ", lat: 47.758, lng: -2.843, minutes: 20 },
  { name: "Saint-Jean-Brévelay", lat: 47.846, lng: -2.722, minutes: 15 },
  { name: "Plumelec", lat: 47.839, lng: -2.64, minutes: 20 },
  { name: "Bignan", lat: 47.88, lng: -2.77, minutes: 10 },
  { name: "Moustoir-Ac", lat: 47.854, lng: -2.836, minutes: 12 },
  { name: "Évellys", lat: 47.993, lng: -2.833, minutes: 12 },
  { name: "Réguiny", lat: 47.975, lng: -2.745, minutes: 12 },
  { name: "Rohan", lat: 48.069, lng: -2.751, minutes: 22 },
  { name: "Pluméliau-Bieuzy", lat: 47.958, lng: -2.976, minutes: 18 },
  { name: "Guénin", lat: 47.907, lng: -2.979, minutes: 18 },
  { name: "Colpo", lat: 47.817, lng: -2.81, minutes: 15 },
  { name: "Guéhenno", lat: 47.893, lng: -2.638, minutes: 18 },
  { name: "Pluvigner", lat: 47.776, lng: -3.012, minutes: 28 },
  { name: "Sainte-Anne-d'Auray", lat: 47.7, lng: -2.955, minutes: 30 },
  { name: "Saint-Avé", lat: 47.688, lng: -2.736, minutes: 25 },
  { name: "Elven", lat: 47.732, lng: -2.59, minutes: 30 },
];

export const mainTowns = towns.filter((t) => t.main);

/* ---------- Map projection ---------- */

export const MAP = { width: 1000, height: 940, west: -3.25, east: -2.3, north: 48.15, south: 47.55 };

export function project(lat: number, lng: number) {
  const x = ((lng - MAP.west) / (MAP.east - MAP.west)) * MAP.width;
  const y = ((MAP.north - lat) / (MAP.north - MAP.south)) * MAP.height;
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}
