export const months = ["Jan", "Fév", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];
export const monthsLong = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

/** 0 = rarely, 1 = possible, 2 = the right time. "n" = birds nesting, avoid. */
export type Level = 0 | 1 | 2 | "n";

export type SeasonRow = {
  label: string;
  tone: "moss" | "beech" | "fern" | "chanterelle" | "chestnut";
  levels: Level[];
  note: string;
};

export const seasonRows: SeasonRow[] = [
  {
    label: "Taille de haies",
    tone: "moss",
    levels: [1, 2, 2, "n", "n", "n", "n", 1, 2, 2, 1, 1],
    note: "Pas de taille de la mi-mars à fin juillet : les oiseaux nichent.",
  },
  {
    label: "Tonte",
    tone: "fern",
    levels: [0, 0, 1, 2, 2, 2, 1, 1, 2, 2, 1, 0],
    note: "Plus haute en été pour que la pelouse résiste à la sécheresse.",
  },
  {
    label: "Désherbage",
    tone: "fern",
    levels: [0, 1, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0],
    note: "Au printemps, avant que les herbes ne montent en graines.",
  },
  {
    label: "Bois de chauffage",
    tone: "chestnut",
    levels: [2, 2, 2, 2, 1, 0, 0, 0, 0, 1, 1, 2],
    note: "Fendu tôt, il profite de tout l'été pour sécher.",
  },
  {
    label: "Taille des arbres",
    tone: "moss",
    levels: [2, 2, 1, 0, 0, 0, 1, 1, 0, 0, 2, 2],
    note: "Hors sève en hiver, ou légère en vert au cœur de l'été.",
  },
  {
    label: "Terrasses, pergolas",
    tone: "beech",
    levels: [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0],
    note: "Par temps sec, du printemps à l'automne.",
  },
  {
    label: "Conseil habitat",
    tone: "chanterelle",
    levels: [2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
    note: "Toute l'année, mais c'est en hiver qu'on sent le froid et l'humidité.",
  },
];
