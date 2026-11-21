export type ServiceKey = "jardin" | "construction" | "elagage" | "habitat" | "solaire";

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
    summary:
      "Taille de haies, tonte, désherbage, et votre bois de chauffage fendu puis rangé pour qu'il sèche bien.",
    keywords: ["Taille de haies", "Tonte", "Désherbage", "Bois de chauffage"],
    tasks: [
      {
        title: "Taille de haies",
        text: "Laurier, thuya, charmille, haies champêtres. Taille nette, en respectant la période de nidification des oiseaux, et branchages ramassés.",
      },
      {
        title: "Tonte de pelouse",
        text: "Passages réguliers en saison ou remise en état d'une pelouse laissée de côté. Bordures et pieds d'arbres finis.",
      },
      {
        title: "Désherbage",
        text: "Massifs, allées, pieds de murs et terrasses, à la main ou à l'outil. Aucun produit chimique : la loi les interdit dans les jardins des particuliers.",
      },
      {
        title: "Bois de chauffage",
        text: "Fendage de vos bûches et rangement en piles stables, aérées et à l'abri, pour un bois sec à l'hiver suivant.",
      },
    ],
    available: true,
    tone: "moss",
    seo: {
      title: "Entretien de jardin, taille de haies et tonte autour de Moréac",
      description:
        "Taille de haies, tonte de pelouse, désherbage, fendage et rangement du bois de chauffage à Moréac, Locminé, Pontivy, Baud, Vannes et alentours. CESU accepté, crédit d'impôt possible.",
    },
    faq: [
      {
        q: "Quand faut-il tailler une haie ?",
        a: "Idéalement en fin d'hiver (février, mars) puis en fin d'été (septembre, octobre). L'Office français de la biodiversité recommande de ne pas tailler entre la mi-mars et la fin juillet, quand les oiseaux nichent.",
      },
      {
        q: "Est-ce que vous emportez les déchets verts ?",
        a: "Les tailles et tontes sont ramassées. Pour leur évacuation, on regarde ensemble la solution la plus simple chez vous : compost, broyage ou déchetterie.",
      },
      {
        q: "Puis-je payer en CESU ?",
        a: "Oui. Les petits travaux de jardinage peuvent en plus ouvrir droit à un crédit d'impôt de 50 %, sous conditions.",
      },
      {
        q: "Combien de temps faut-il pour que le bois sèche ?",
        a: "Comptez en général 18 à 24 mois pour un feuillu fendu, rangé à l'abri de la pluie et bien ventilé. Fendre tôt au printemps fait gagner une saison de séchage.",
      },
    ],
  },
  {
    key: "construction",
    path: "/terrasses-pergolas-carports",
    name: "Terrasses, pergolas et carports en bois",
    short: "Constructions bois",
    summary:
      "Terrasses, pergolas, carports et petits ouvrages en bois, dessinés pour votre maison et posés avec soin.",
    keywords: ["Terrasses", "Pergolas", "Carports", "Sur mesure"],
    tasks: [
      {
        title: "Terrasses en bois",
        text: "Lames en pin traité ou en essences plus durables, structure ventilée, finitions de rive soignées. Plain-pied ou légèrement surélevée.",
      },
      {
        title: "Pergolas",
        text: "Une structure pour accrocher une glycine, tendre une toile ou simplement dessiner un coin d'ombre au bout de la terrasse.",
      },
      {
        title: "Carports en bois",
        text: "Un abri simple et solide pour la voiture ou le bois, en harmonie avec la maison.",
      },
      {
        title: "Petits ouvrages sur mesure",
        text: "Coffrets pour habiller les compteurs, cache-poubelles, bacs, bordures : ces détails qui changent l'entrée d'une maison.",
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
        a: "Le pin traité autoclave classe 4 offre un très bon rapport qualité prix. Le douglas ou les bois exotiques durent plus longtemps sans traitement. Dans tous les cas, une structure bien ventilée compte autant que l'essence.",
      },
      {
        q: "Faut-il une autorisation pour une pergola ou un carport ?",
        a: "Selon la surface créée, une déclaration préalable en mairie peut être nécessaire, en général à partir de 5 m² d'emprise au sol. On vérifie ensemble le règlement de votre commune avant de commencer.",
      },
      {
        q: "Est-ce que vous fournissez les matériaux ?",
        a: "Oui, c'est le cas le plus courant : le bois et la quincaillerie sont chiffrés dans le devis. Si vous avez déjà le matériel, on en parle.",
      },
    ],
  },
  {
    key: "elagage",
    path: "/elagage",
    name: "Taille et élagage léger",
    short: "Élagage léger",
    summary:
      "Fruitiers, arbres d'ornement, branches basses ou mortes : une taille raisonnée, à hauteur d'homme et d'échelle.",
    keywords: ["Fruitiers", "Ornement", "Bois mort"],
    tasks: [
      {
        title: "Taille des fruitiers",
        text: "Pommiers, poiriers, pruniers : aérer la ramure, retirer le bois mort, préparer de belles récoltes.",
      },
      {
        title: "Arbres et arbustes d'ornement",
        text: "Réduire une couronne qui gêne, rééquilibrer une silhouette, dégager une fenêtre ou un toit.",
      },
      {
        title: "Branches basses et bois mort",
        text: "Relever les branches qui frôlent la voiture, le passage ou la clôture, et supprimer les branches mortes.",
      },
    ],
    available: true,
    tone: "fern",
    seo: {
      title: "Élagage léger et taille d'arbres fruitiers autour de Moréac",
      description:
        "Taille de fruitiers, d'arbres d'ornement, suppression de branches basses et de bois mort à Moréac, Locminé, Pontivy, Vannes et environs.",
    },
    faq: [
      {
        q: "Jusqu'à quelle hauteur intervenez-vous ?",
        a: "Je travaille au sol, à la perche et à l'échelle. Pour un grand arbre qui demande une intervention sur corde ou un abattage, je vous oriente vers un élagueur grimpeur.",
      },
      {
        q: "Quelle est la bonne période pour tailler un arbre ?",
        a: "La plupart des tailles se font hors sève, de novembre à mars, en évitant les périodes de gel. Une taille légère en vert est possible en été pour certains arbres.",
      },
    ],
  },
  {
    key: "habitat",
    path: "/conseil-habitat",
    name: "Conseil habitat",
    short: "Conseil habitat",
    summary:
      "Humidité, froid, factures qui grimpent : 30 minutes au téléphone, gratuites, pour comprendre ce qui se passe chez vous.",
    keywords: ["Humidité", "Froid", "Factures", "Isolation", "Ventilation"],
    tasks: [
      {
        title: "Un appel de 30 minutes, gratuit",
        text: "Vous m'expliquez ce que vous constatez, je vous pose les bonnes questions et je vous aide à y voir clair. Sans engagement.",
      },
      {
        title: "Les sujets qu'on aborde",
        text: "Humidité, sensation de froid, factures d'électricité, chauffage, fenêtres et portes, isolation, ventilation, état général du bâti.",
      },
      {
        title: "Et ensuite, si besoin",
        text: "Si des travaux se justifient, on en discute et je vous fais un devis. Sinon, vous repartez simplement avec des pistes claires.",
      },
    ],
    available: true,
    tone: "chanterelle",
    seo: {
      title: "Conseil habitat gratuit : humidité, froid, isolation, chauffage",
      description:
        "30 minutes de conseil gratuit par téléphone pour comprendre l'humidité, la sensation de froid, les factures d'électricité, le chauffage, l'isolation et la ventilation de votre maison, surtout ancienne. Morbihan.",
    },
    faq: [
      {
        q: "L'appel est-il vraiment gratuit ?",
        a: "Oui. Les 30 premières minutes sont offertes, sans engagement et sans relance commerciale. Si un déplacement ou des travaux sont utiles, on en reparle et je vous fais un devis.",
      },
      {
        q: "Est-ce un diagnostic officiel ?",
        a: "Non. Ce n'est ni un DPE ni un audit énergétique. C'est un échange avec quelqu'un qui a travaillé six ans dans le bâtiment, pour comprendre votre situation et savoir par où commencer.",
      },
      {
        q: "Ma maison est ancienne, en pierre. Est-ce que ça change quelque chose ?",
        a: "Beaucoup. Un mur en pierre ne se traite pas comme un mur en parpaing : il a besoin d'échanger l'humidité avec l'air. Certains enduits ou isolants mal choisis peuvent aggraver les problèmes. C'est justement le genre de sujet dont on peut parler.",
      },
      {
        q: "Comment se passe l'appel ?",
        a: "Appelez ou envoyez un e-mail en précisant le sujet et un créneau qui vous arrange. Préparez si possible l'année de construction, le type de chauffage et une ou deux photos des endroits qui vous posent question.",
      },
    ],
  },
  {
    key: "solaire",
    path: "/panneaux-solaires",
    name: "Panneaux solaires prêts à brancher",
    short: "Solaire (bientôt)",
    summary:
      "Bientôt : aide au dimensionnement et à la pose de kits solaires prêts à brancher, notamment en toiture.",
    keywords: ["Dimensionnement", "Pose en toiture"],
    tasks: [
      {
        title: "Dimensionner",
        text: "Estimer la puissance utile selon votre consommation en journée, l'orientation et l'ombrage.",
      },
      {
        title: "Poser",
        text: "Fixer les panneaux sur une toiture ou au sol, proprement et durablement.",
      },
    ],
    available: false,
    tone: "rust",
    seo: {
      title: "Panneaux solaires plug and play : bientôt disponible",
      description:
        "Services Jardin Joannic proposera prochainement une aide au dimensionnement et à la pose de panneaux solaires prêts à brancher en toiture, autour de Moréac.",
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
