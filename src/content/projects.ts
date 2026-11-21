import type { StaticImageData } from "next/image";
import type { ServiceKey } from "./services";

import terrasseAngleCiel from "@/assets/photos/terrasse-angle-ciel.jpg";
import terrasseVueEnsemble from "@/assets/photos/terrasse-vue-ensemble.jpg";
import terrassePaves from "@/assets/photos/terrasse-paves.jpg";
import terrasseSauge from "@/assets/photos/terrasse-sauge.jpg";
import terrasseJonction from "@/assets/photos/terrasse-jonction-vue-haut.jpg";
import terrassePotager from "@/assets/photos/terrasse-vue-haut-potager.jpg";
import coffretsRue from "@/assets/photos/coffrets-compteurs-rue.jpg";
import coffretOuvert from "@/assets/photos/coffret-compteur-ouvert.jpg";

export type Photo = { src: StaticImageData; alt: string; caption?: string };

export type Project = {
  slug: string;
  title: string;
  /** Short line for cards */
  teaser: string;
  place: string;
  /** A project can showcase several activities */
  services: ServiceKey[];
  intro: string;
  details: { label: string; text: string }[];
  cover: Photo;
  photos: Photo[];
};

/**
 * Completed work, photographed on site.
 * To add a project: drop the photos in src/assets/photos, import them here
 * and add an entry. List every activity the project involved in `services`.
 */
export const projects: Project[] = [
  {
    slug: "terrasse-pin-lames-croisees",
    title: "Une terrasse en pin qui change de cap",
    teaser: "Deux pans de lames qui se rejoignent en diagonale pour suivre le terrain.",
    place: "Centre Morbihan",
    services: ["construction"],
    intro:
      "Une grande terrasse en pin traité au pied d'une maison à bardage bois. Elle longe la façade puis s'oriente vers le jardin : les lames changent alors de sens. Une planche de jonction posée en diagonale reçoit les deux pans, ce qui donne une ligne franche à l'endroit où la terrasse tourne.",
    details: [
      {
        label: "Jonction",
        text: "Une planche posée en diagonale reçoit les deux pans de lames. Elle marque l'angle et évite les coupes fragiles en pointe.",
      },
      {
        label: "Rives",
        text: "Un bandeau habille tout le pourtour et cache la structure. Des spots y sont encastrés pour éclairer le bord le soir.",
      },
      {
        label: "Lames",
        text: "Pin traité, sous-face rainurée pour limiter le tuilage, joints décalés pour une surface vivante.",
      },
      {
        label: "Abords",
        text: "La terrasse s'arrête net contre une bordure de pavés, ce qui facilite la tonte et l'entretien de la pelouse.",
      },
    ],
    cover: {
      src: terrasseAngleCiel,
      alt: "Terrasse en pin vue à ras des lames, avec la maison à bardage bois et le ciel d'été",
    },
    photos: [
      {
        src: terrasseAngleCiel,
        alt: "Terrasse en pin vue à ras des lames, avec la maison à bardage bois et le ciel d'été",
        caption: "Le nez des lames, à hauteur de pelouse.",
      },
      {
        src: terrasseVueEnsemble,
        alt: "Vue d'ensemble de la terrasse en pin le long de la maison, pelouse et maisons voisines",
        caption: "Le premier pan, le long de la baie vitrée.",
      },
      {
        src: terrasseJonction,
        alt: "Vue plongeante sur la planche de jonction en diagonale entre deux pans de lames",
        caption: "La planche de jonction, vue d'en haut.",
      },
      {
        src: terrasseSauge,
        alt: "Bandeau de rive de la terrasse avec un spot encastré, une sauge rouge au premier plan",
        caption: "Le bandeau de rive et son spot encastré.",
      },
      {
        src: terrassePaves,
        alt: "Terrasse en pin posée contre une bordure de pavés gris, avec les carrés potagers au fond",
        caption: "Arrêt net sur la bordure de pavés.",
      },
      {
        src: terrassePotager,
        alt: "Vue verticale sur les lames de la terrasse, le pas japonais en ardoise et les carrés potagers",
        caption: "Vu de l'étage : la terrasse, le pas japonais et le potager.",
      },
    ],
  },
  {
    slug: "coffrets-bois-compteurs",
    title: "Des coffrets en bois pour habiller les compteurs",
    teaser: "Les compteurs disparaissent derrière une porte à lames en chevrons.",
    place: "Centre Morbihan",
    services: ["construction"],
    intro:
      "En bord de rue, entre les plaques de schiste de la clôture, les coffrets techniques en plastique attiraient l'œil. Deux habillages en pin traité les font oublier : un grand coffret pour l'électricité et le gaz, une colonne plus étroite à côté. Tout reste accessible pour les relevés.",
    details: [
      {
        label: "Porte",
        text: "Lames posées en chevrons sur un cadre, montées sur charnières : la porte s'ouvre en grand pour les techniciens.",
      },
      {
        label: "Toit",
        text: "Un chapeau en lames débordantes protège le dessus et laisse filer l'eau de pluie.",
      },
      {
        label: "Intégration",
        text: "Les coffrets s'appuient sur l'alignement de la clôture en schiste et gardent les teintes chaudes du bois face à la pierre sombre.",
      },
    ],
    cover: {
      src: coffretsRue,
      alt: "Deux coffrets en bois à lames en chevrons devant une clôture en plaques de schiste, en bord de rue",
    },
    photos: [
      {
        src: coffretsRue,
        alt: "Deux coffrets en bois à lames en chevrons devant une clôture en plaques de schiste, en bord de rue",
        caption: "Le grand coffret et la colonne, côté rue.",
      },
      {
        src: coffretOuvert,
        alt: "Coffret en bois ouvert montrant les compteurs électriques et gaz à l'intérieur",
        caption: "Porte ouverte : les compteurs restent accessibles.",
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
