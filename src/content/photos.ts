import type { StaticImageData } from "next/image";

import terrasseAngleCiel from "@/assets/photos/terrasse-angle-ciel.jpg";
import terrasseVueEnsemble from "@/assets/photos/terrasse-vue-ensemble.jpg";
import terrassePaves from "@/assets/photos/terrasse-paves.jpg";
import terrasseSauge from "@/assets/photos/terrasse-sauge.jpg";
import terrasseJonction from "@/assets/photos/terrasse-jonction-vue-haut.jpg";
import terrassePotager from "@/assets/photos/terrasse-vue-haut-potager.jpg";
import coffretsRue from "@/assets/photos/coffrets-compteurs-rue.jpg";
import coffretOuvert from "@/assets/photos/coffret-compteur-ouvert.jpg";

export type Photo = { src: StaticImageData; alt: string };

/**
 * Photos of completed work, shown in the gallery on /terrasses-pergolas-carports.
 * To add a photo: drop the file in src/assets/photos, import it above and add
 * an entry below with a short description (read aloud by screen readers).
 */
export const workPhotos: Photo[] = [
  { src: terrasseVueEnsemble, alt: "Terrasse en pin le long d'une maison à bardage bois" },
  { src: terrasseJonction, alt: "Terrasse en pin vue d'en haut, avec une planche de jonction en diagonale" },
  { src: coffretsRue, alt: "Deux coffrets en bois pour compteurs devant une clôture en schiste" },
  { src: terrasseAngleCiel, alt: "Terrasse en pin vue au ras des lames" },
  { src: terrasseSauge, alt: "Bord de terrasse en bois avec un spot encastré" },
  { src: terrassePaves, alt: "Terrasse en pin posée contre une bordure de pavés" },
  { src: terrassePotager, alt: "Terrasse en bois, pas japonais et carrés potagers vus de l'étage" },
  { src: coffretOuvert, alt: "Coffret en bois ouvert sur les compteurs" },
];
