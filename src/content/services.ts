export type ServiceKey = "jardin" | "construction" | "habitat" | "solaire";

export type Task = { title: string; text: string };
export type Faq = { q: string; a: string };

export type Service = {
  key: ServiceKey;
  path: string;
  name: string;
  /** Name used in navigation and compact lists */
  short: string;
  /** One sentence for lists and cards */
  summary: string;
  tasks: Task[];
  /** Short keywords shown under the summary in the home index */
  keywords: string[];
  available: boolean;
  /** CSS colour token used for accents */
  tone: "moss" | "beech" | "fern" | "chanterelle" | "rust";
  seo: { title: string; description: string };
  faq: Faq[];
};

export const services: Service[] = [
  {
    key: "jardin",
    path: "/entretien-jardin",
    name: "Entretien du jardin",
    short: "Jardin",
    summary: "Taille de haies, tonte, désherbage, taille d'arbres et bois de chauffage.",
    keywords: ["Haies", "Tonte", "Désherbage", "Taille d'arbres", "Bois de chauffage"],
    tasks: [
      {
        title: "Taille de haies",
        text: "Tous types de haies. Les branchages sont ramassés.",
      },
      {
        title: "Tonte de pelouse",
        text: "Passages réguliers ou remise en état d'une pelouse, bordures comprises.",
      },
      {
        title: "Désherbage",
        text: "Massifs, allées et terrasses, sans produit chimique.",
      },
      {
        title: "Taille d'arbres et élagage léger",
        text: "Fruitiers, arbres d'ornement, branches basses ou mortes. Travail au sol, à la perche ou à l'échelle.",
      },
      {
        title: "Bois de chauffage",
        text: "Fendage et rangement de vos bûches.",
      },
    ],
    available: true,
    tone: "moss",
    seo: {
      title: "Entretien de jardin, taille de haies et élagage léger autour de Moréac",
      description:
        "Taille de haies, tonte, désherbage, taille d'arbres fruitiers, élagage léger et bois de chauffage à Moréac, Locminé, Pontivy, Baud, Vannes et alentours. CESU accepté, crédit d'impôt possible.",
    },
    faq: [
      {
        q: "Quand faut-il tailler une haie ?",
        a: "En fin d'hiver (février, mars) et en fin d'été (septembre, octobre). On évite de tailler entre la mi-mars et la fin juillet, quand les oiseaux nichent.",
      },
      {
        q: "Est-ce que vous emportez les déchets verts ?",
        a: "Les tailles et tontes sont ramassées. Pour l'évacuation, on choisit ensemble : compost, broyage ou déchetterie.",
      },
      {
        q: "Puis-je payer en CESU ?",
        a: "Oui. Les petits travaux de jardinage peuvent en plus ouvrir droit à un crédit d'impôt de 50 %, sous conditions.",
      },
      {
        q: "Jusqu'à quelle hauteur taillez-vous les arbres ?",
        a: "Je travaille au sol, à la perche et à l'échelle. Pour un grand arbre à élaguer sur corde ou à abattre, je vous oriente vers un élagueur grimpeur.",
      },
    ],
  },
  {
    key: "construction",
    path: "/terrasses-pergolas-carports",
    name: "Terrasses, pergolas et carports en bois",
    short: "Constructions bois",
    summary: "Terrasses, pergolas, carports et petits ouvrages en bois, sur mesure.",
    keywords: ["Terrasses", "Pergolas", "Carports", "Sur mesure"],
    tasks: [
      {
        title: "Terrasses en bois",
        text: "En pin traité ou en bois plus durable, de plain-pied ou surélevées.",
      },
      {
        title: "Pergolas",
        text: "Pour une plante grimpante, une toile ou un coin d'ombre.",
      },
      {
        title: "Carports en bois",
        text: "Un abri solide pour la voiture ou le bois.",
      },
      {
        title: "Petits ouvrages sur mesure",
        text: "Coffrets de compteurs, cache-poubelles, bacs, bordures.",
      },
    ],
    available: true,
    tone: "beech",
    seo: {
      title: "Terrasse bois, pergola et carport autour de Moréac",
      description:
        "Construction de terrasses en bois, pergolas, carports et petits ouvrages sur mesure dans le Morbihan : Moréac, Locminé, Pontivy, Vannes, Ploërmel, Auray, Baud.",
    },
    faq: [
      {
        q: "Quel bois choisir pour une terrasse en Bretagne ?",
        a: "Le pin traité autoclave classe 4 a un bon rapport qualité prix. Le douglas ou les bois exotiques durent plus longtemps. Une structure bien ventilée compte autant que l'essence.",
      },
      {
        q: "Faut-il une autorisation pour une pergola ou un carport ?",
        a: "Une déclaration préalable en mairie est en général nécessaire à partir de 5 m² d'emprise au sol. On vérifie ensemble les règles de votre commune.",
      },
      {
        q: "Est-ce que vous fournissez les matériaux ?",
        a: "Oui, en général le bois et la quincaillerie sont compris. Si vous avez déjà le matériel, on en parle.",
      },
    ],
  },
  {
    key: "habitat",
    path: "/conseil-habitat",
    name: "Conseil habitat",
    short: "Conseil habitat",
    summary: "30 minutes au téléphone, gratuites, toute l'année : humidité, froid, factures, isolation, solaire.",
    keywords: ["Humidité", "Froid", "Factures", "Isolation", "Ventilation", "Solaire"],
    tasks: [
      {
        title: "Un appel de 30 minutes, gratuit",
        text: "Vous m'expliquez ce que vous constatez, je vous aide à y voir clair. Sans engagement.",
      },
      {
        title: "Les sujets qu'on aborde",
        text: "Humidité, froid, factures d'électricité, chauffage, fenêtres, isolation, ventilation, état du bâti, panneaux solaires.",
      },
    ],
    available: true,
    tone: "chanterelle",
    seo: {
      title: "Conseil habitat gratuit : humidité, froid, isolation, solaire",
      description:
        "30 minutes de conseil gratuit par téléphone, toute l'année : humidité, froid, factures d'électricité, chauffage, isolation, ventilation et panneaux solaires. Moréac, Morbihan.",
    },
    faq: [
      {
        q: "L'appel est-il vraiment gratuit ?",
        a: "Oui. Les 30 premières minutes sont offertes, sans engagement.",
      },
      {
        q: "Est-ce un diagnostic officiel ?",
        a: "Non. Ce n'est ni un DPE ni un audit énergétique, mais un échange avec quelqu'un qui a travaillé six ans dans le bâtiment.",
      },
      {
        q: "Ma maison est ancienne, en pierre. Est-ce que ça change quelque chose ?",
        a: "Oui. Un mur en pierre ne se traite pas comme un mur en parpaing. Certains enduits ou isolants mal choisis peuvent aggraver l'humidité.",
      },
      {
        q: "Pouvez-vous me conseiller sur des panneaux solaires ?",
        a: "Oui, dès maintenant. Je vous aide à juger un devis ou une offre, pour éviter les arnaques et les installations mal dimensionnées.",
      },
      {
        q: "Comment se passe l'appel ?",
        a: "Appelez ou envoyez un e-mail avec le sujet et un créneau qui vous arrange.",
      },
    ],
  },
  {
    key: "solaire",
    path: "/panneaux-solaires",
    name: "Panneaux solaires prêts à brancher",
    short: "Solaire (bientôt)",
    summary: "Bientôt : pose de kits solaires prêts à brancher. Le conseil solaire est déjà disponible.",
    keywords: ["Dimensionnement", "Pose en toiture"],
    tasks: [
      {
        title: "Dimensionner",
        text: "Choisir la bonne puissance selon votre consommation et votre toit.",
      },
      {
        title: "Poser",
        text: "Fixer les panneaux en toiture ou au sol.",
      },
    ],
    available: false,
    tone: "rust",
    seo: {
      title: "Panneaux solaires prêts à brancher : conseil et pose autour de Moréac",
      description:
        "Conseil gratuit sur le solaire dès maintenant, pour éviter les arnaques. Bientôt, pose de kits solaires prêts à brancher en toiture autour de Moréac.",
    },
    faq: [],
  },
];

export const getService = (key: ServiceKey) => {
  const service = services.find((s) => s.key === key);
  if (!service) throw new Error(`Unknown service ${key}`);
  return service;
};

export const activeServices = services.filter((s) => s.available);
