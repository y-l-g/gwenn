import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { SeasonCalendar } from "@/components/home/SeasonCalendar";
import { HabitatSection } from "@/components/home/HabitatSection";
import { ZoneSection } from "@/components/home/ZoneSection";
import { AboutCesu } from "@/components/home/AboutCesu";
import { SolarTeaser } from "@/components/home/SolarTeaser";
import { ContactBand } from "@/components/ui/ContactBand";
import { SoilHorizon, Sprouting } from "@/components/illustrations/Underground";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Jardinier, terrasses bois et conseil habitat à Moréac · Services Jardin Joannic",
  description:
    "Gwenn Joannic, à son compte à Moréac : taille de haies, tonte, désherbage, bois de chauffage, terrasses, pergolas et carports en bois, élagage léger et 30 minutes de conseil habitat gratuit. Locminé, Pontivy, Baud, Vannes, Auray, Ploërmel. CESU accepté.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesIndex />
      <FeaturedWork />
      <SeasonCalendar />
      <SoilHorizon />
      <HabitatSection />
      <ZoneSection />
      <Sprouting />
      <AboutCesu />
      <SolarTeaser />
      <ContactBand />
    </>
  );
}
