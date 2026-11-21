import Link from "next/link";
import { mainTowns } from "@/content/area";
import { ZoneMap } from "./ZoneMap";
import { ArrowRight } from "@/components/ui/Icons";

export function ZoneSection() {
  return (
    <section className="on-dark relative bg-humus pb-10 text-mycelium" aria-labelledby="zone-title">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="reveal order-2 lg:order-1 lg:col-span-7">
          <ZoneMap className="h-auto w-full" />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-5">
          <h2 id="zone-title" className="reveal display-lg">
            Zone <span className="wonk text-chanterelle">d&apos;intervention</span>
          </h2>
          <p className="reveal lead mt-6 text-mycelium/85">
            Basé à Moréac, j&apos;interviens dans le centre Morbihan : {mainTowns.map((t) => t.name).join(", ")} et les
            communes voisines.
          </p>
          <Link href="/zone-intervention" className="reveal mt-8 inline-flex items-center gap-2 font-semibold text-chanterelle link-quiet">
            Toutes les communes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
