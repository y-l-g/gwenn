export type HabitatTopic = {
  id: string;
  label: string;
  /** What people usually notice */
  signs: string;
  /** What we look at together during the call */
  angle: string;
  links: string[];
  /** Position on the wide diagram (0 to 100) */
  pos: { x: number; y: number };
  /** Position on the narrow diagram (0 to 100) */
  mpos: { x: number; y: number };
};

export const habitatTopics: HabitatTopic[] = [
  {
    id: "humidite",
    label: "Humidité",
    signs: "Taches noires dans les angles, odeur de renfermé, papier peint qui se décolle, buée sur les vitres le matin.",
    angle: "On cherche d'où vient l'eau : air intérieur trop chargé, remontées dans un mur ancien, enduit qui empêche la pierre de respirer, gouttière qui déborde.",
    links: ["ventilation", "isolation", "bati", "froid", "menuiseries"],
    pos: { x: 22, y: 30 },
    mpos: { x: 26, y: 14 },
  },
  {
    id: "froid",
    label: "Sensation de froid",
    signs: "Le thermostat affiche 20 °C et pourtant on a froid, surtout près des murs et des fenêtres.",
    angle: "Le confort dépend aussi de la température des parois, des courants d'air et de l'humidité de l'air. Monter le chauffage ne règle pas toujours le problème.",
    links: ["isolation", "menuiseries", "humidite", "chauffage", "ventilation"],
    pos: { x: 50, y: 18 },
    mpos: { x: 74, y: 12 },
  },
  {
    id: "factures",
    label: "Factures d'électricité",
    signs: "Une facture qui grimpe d'une année sur l'autre sans que vos habitudes aient changé.",
    angle: "On reprend les postes un par un : chauffage, eau chaude, réglages, appareils, puissance souscrite. Souvent, la facture raconte où la maison perd sa chaleur.",
    links: ["chauffage", "isolation", "menuiseries", "ventilation"],
    pos: { x: 79, y: 28 },
    mpos: { x: 30, y: 38 },
  },
  {
    id: "chauffage",
    label: "Chauffage",
    signs: "Radiateurs qui chauffent mal, poêle qui tire mal, pompe à chaleur qui tourne sans arrêt.",
    angle: "Un chauffage bien dimensionné et bien réglé consomme moins. On regarde aussi s'il est adapté à la maison telle qu'elle est aujourd'hui.",
    links: ["factures", "froid", "isolation", "humidite"],
    pos: { x: 66, y: 56 },
    mpos: { x: 72, y: 36 },
  },
  {
    id: "menuiseries",
    label: "Fenêtres et portes",
    signs: "Courants d'air, simple vitrage, joints fatigués, portes qui frottent ou ferment mal.",
    angle: "Changer ses fenêtres améliore le confort, mais rend la maison plus étanche : sans ventilation adaptée, la condensation peut apparaître. Les deux vont ensemble.",
    links: ["froid", "ventilation", "humidite", "factures"],
    pos: { x: 36, y: 62 },
    mpos: { x: 24, y: 62 },
  },
  {
    id: "isolation",
    label: "Isolation",
    signs: "Combles froids, murs glacés au toucher, pièces qui ne gardent pas la chaleur.",
    angle: "Par où part la chaleur, et dans quel ordre agir : les combles d'abord, puis les murs, les planchers. Avec des matériaux compatibles avec votre bâti.",
    links: ["froid", "factures", "humidite", "chauffage", "bati"],
    pos: { x: 50, y: 40 },
    mpos: { x: 50, y: 50 },
  },
  {
    id: "ventilation",
    label: "Ventilation",
    signs: "VMC absente, encrassée ou bruyante, entrées d'air bouchées, salle de bains qui ne sèche pas.",
    angle: "Une maison a besoin de renouveler son air pour évacuer l'humidité produite au quotidien. C'est souvent la pièce manquante du puzzle.",
    links: ["humidite", "menuiseries", "froid", "factures"],
    pos: { x: 14, y: 68 },
    mpos: { x: 76, y: 64 },
  },
  {
    id: "bati",
    label: "État général du bâti",
    signs: "Fissures, toiture fatiguée, enduits qui cloquent, maison ancienne dont on ne connaît pas l'histoire.",
    angle: "Comprendre comment la maison a été construite avant de la modifier, surtout pour une longère ou une maison en pierre.",
    links: ["humidite", "isolation", "menuiseries"],
    pos: { x: 86, y: 70 },
    mpos: { x: 50, y: 86 },
  },
];
