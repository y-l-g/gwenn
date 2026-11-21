export type Town = {
  name: string;
  lat: number;
  lng: number;
  /** Main towns get a label on the map and are listed first */
  main?: boolean;
};

export const home = { name: "Moréac", lat: 47.9203, lng: -2.8186 };

/** Towns drawn on the map (a readable subset of the communes below). */
export const towns: Town[] = [
  { name: "Locminé", lat: 47.8803, lng: -2.8384, main: true },
  { name: "Pontivy", lat: 48.0663, lng: -2.9697, main: true },
  { name: "Baud", lat: 47.8693, lng: -3.0287, main: true },
  { name: "Grand-Champ", lat: 47.762, lng: -2.8509, main: true },
  { name: "Saint-Jean-Brévelay", lat: 47.8314, lng: -2.7243, main: true },
  { name: "Rohan", lat: 48.0891, lng: -2.7475 },
  { name: "Noyal-Pontivy", lat: 48.0544, lng: -2.8786 },
  { name: "Réguiny", lat: 47.9879, lng: -2.7661 },
  { name: "Évellys", lat: 47.9714, lng: -2.8675 },
  { name: "Pluméliau-Bieuzy", lat: 47.9726, lng: -2.9896 },
  { name: "Guénin", lat: 47.9007, lng: -2.9669 },
  { name: "Bignan", lat: 47.8737, lng: -2.7498 },
  { name: "Moustoir-Ac", lat: 47.844, lng: -2.8571 },
  { name: "Colpo", lat: 47.8169, lng: -2.8108 },
  { name: "Plumelec", lat: 47.8237, lng: -2.6227 },
  { name: "Guégon", lat: 47.925, lng: -2.5903 },
  { name: "Pleugriffet", lat: 47.9924, lng: -2.6896 },
];

/**
 * Every Morbihan commune whose centre lies within 20 km of Moréac
 * (source: geo.api.gouv.fr, straight-line distance), listed on /zone-intervention.
 */
export const communes = [
  "Baud", "Bignan", "Billio", "Brandivy", "Bréhan", "Buléon", "Camors", "Colpo", "Crédin", "Cruguel",
  "Évellys", "Grand-Champ", "Guégon", "Guéhenno", "Gueltas", "Guénin", "Kerfourn", "La Chapelle-Neuve",
  "Lantillac", "Le Sourn", "Locmaria-Grand-Champ", "Locminé", "Locqueltas", "Moréac", "Moustoir-Ac",
  "Noyal-Pontivy", "Plaudren", "Pleugriffet", "Plumelec", "Plumelin", "Pluméliau-Bieuzy", "Pontivy",
  "Radenac", "Réguiny", "Rohan", "Saint-Allouestre", "Saint-Barthélemy", "Saint-Jean-Brévelay",
  "Saint-Thuriau",
].sort((a, b) => a.localeCompare(b, "fr"));

export const RADIUS_KM = 20;

export const mainTowns = towns.filter((t) => t.main);

/* ---------- Map projection ---------- */

// Framed on the 20 km zone; about 20 px per km on both axes.
export const MAP = { width: 1000, height: 980, west: -3.15, east: -2.48, north: 48.14, south: 47.7 };

export function project(lat: number, lng: number) {
  const x = ((lng - MAP.west) / (MAP.east - MAP.west)) * MAP.width;
  const y = ((MAP.north - lat) / (MAP.north - MAP.south)) * MAP.height;
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}
