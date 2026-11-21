export type Town = {
  name: string;
  lat: number;
  lng: number;
  /** Main towns get a label on the map and are listed first */
  main?: boolean;
};

export const home = { name: "Moréac", lat: 47.9203, lng: -2.8186 };

export const towns: Town[] = [
  { name: "Locminé", lat: 47.886, lng: -2.835, main: true },
  { name: "Pontivy", lat: 48.068, lng: -2.963, main: true },
  { name: "Baud", lat: 47.875, lng: -3.02, main: true },
  { name: "Vannes", lat: 47.658, lng: -2.76, main: true },
  { name: "Auray", lat: 47.668, lng: -2.982, main: true },
  { name: "Ploërmel", lat: 47.932, lng: -2.397, main: true },
  { name: "Josselin", lat: 47.952, lng: -2.547 },
  { name: "Grand-Champ", lat: 47.758, lng: -2.843 },
  { name: "Saint-Jean-Brévelay", lat: 47.846, lng: -2.722 },
  { name: "Plumelec", lat: 47.839, lng: -2.64 },
  { name: "Bignan", lat: 47.88, lng: -2.77 },
  { name: "Moustoir-Ac", lat: 47.854, lng: -2.836 },
  { name: "Évellys", lat: 47.993, lng: -2.833 },
  { name: "Réguiny", lat: 47.975, lng: -2.745 },
  { name: "Rohan", lat: 48.069, lng: -2.751 },
  { name: "Pluméliau-Bieuzy", lat: 47.958, lng: -2.976 },
  { name: "Guénin", lat: 47.907, lng: -2.979 },
  { name: "Colpo", lat: 47.817, lng: -2.81 },
  { name: "Guéhenno", lat: 47.893, lng: -2.638 },
  { name: "Pluvigner", lat: 47.776, lng: -3.012 },
  { name: "Sainte-Anne-d'Auray", lat: 47.7, lng: -2.955 },
  { name: "Saint-Avé", lat: 47.688, lng: -2.736 },
  { name: "Elven", lat: 47.732, lng: -2.59 },
];

export const mainTowns = towns.filter((t) => t.main);

/* ---------- Map projection ---------- */

export const MAP = { width: 1000, height: 940, west: -3.25, east: -2.3, north: 48.15, south: 47.55 };

export function project(lat: number, lng: number) {
  const x = ((lng - MAP.west) / (MAP.east - MAP.west)) * MAP.width;
  const y = ((MAP.north - lat) / (MAP.north - MAP.south)) * MAP.height;
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}
