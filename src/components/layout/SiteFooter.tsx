import Link from "next/link";
import { business } from "@/content/business";
import { mainTowns, towns } from "@/content/area";
import { services } from "@/content/services";
import { LogoMark } from "@/components/illustrations/Logo";
import { RootSystem } from "@/components/illustrations/Underground";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";

export function SiteFooter() {
  const others = towns.filter((t) => !t.main).map((t) => t.name);
  return (
    <footer className="on-dark relative overflow-hidden bg-humus text-mycelium">
      <RootSystem
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] w-full opacity-[0.13] md:h-full md:opacity-[0.22]"
        width={1600}
        height={560}
        seed={17}
        color="var(--color-mycelium)"
        threadColor="var(--color-chanterelle)"
        mode="static"
        fit="slice"
        fade
        network
        mat
        origins={[
          { x: 170, angle: 84, length: 130, width: 7, depth: 5 },
          { x: 470, angle: 96, length: 92, width: 5, depth: 4, gravity: 0.2 },
          { x: 760, angle: 88, length: 150, width: 8.5, depth: 5 },
          { x: 1010, angle: 100, length: 84, width: 4.5, depth: 4 },
          { x: 1240, angle: 80, length: 132, width: 7, depth: 5 },
          { x: 1500, angle: 94, length: 96, width: 5.5, depth: 4 },
          { x: 330, angle: 70, length: 56, width: 3, depth: 4, gravity: 0.1 },
          { x: 610, angle: 108, length: 50, width: 2.6, depth: 3, gravity: 0.1 },
          { x: 1380, angle: 112, length: 58, width: 3, depth: 4, gravity: 0.1 },
        ]}
      />
      <div className="container-site relative grid gap-12 pb-28 pt-20 md:grid-cols-12 lg:pb-14">
        <div className="md:col-span-5">
          <Link href="/" className="inline-flex items-center gap-3 no-underline">
            <LogoMark className="h-12 w-12 text-mycelium" />
            <span className="font-display text-2xl wonk">Services Jardin Joannic</span>
          </Link>
          <p className="mt-5 max-w-sm text-mycelium/75">
            Gwenn Joannic, à son compte à Moréac. Entretien de jardin, constructions en bois et conseil habitat dans le
            centre Morbihan.
          </p>
          <ul className="mt-7 space-y-3">
            <li>
              <a href={business.phoneHref} className="group inline-flex items-center gap-3 text-xl font-semibold no-underline">
                <PhoneIcon className="h-5 w-5 text-chanterelle" />
                <span className="link-quiet">{business.phone}</span>
              </a>
            </li>
            <li>
              <a href={business.emailHref} className="inline-flex items-center gap-3 no-underline">
                <MailIcon className="h-5 w-5 text-chanterelle" />
                <span className="link-quiet break-all">{business.email}</span>
              </a>
            </li>
            <li className="inline-flex items-center gap-3 text-mycelium/80">
              <PinIcon className="h-5 w-5 text-chanterelle" />
              {business.locality} ({business.postalCode}), {business.department}
            </li>
          </ul>
        </div>

        <nav aria-label="Services" className="md:col-span-3">
          <h2 className="font-display text-lg text-chanterelle">Services</h2>
          <ul className="mt-4 space-y-2.5">
            {services.map((s) => (
              <li key={s.key}>
                <Link href={s.path} className="link-quiet no-underline hover:underline">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="font-display text-lg text-chanterelle">
            <Link href="/zone-intervention" className="no-underline hover:underline">
              Zone d&apos;intervention
            </Link>
          </h2>
          <p className="mt-4 text-mycelium/85">
            <span className="font-semibold">{mainTowns.map((t) => t.name).join(", ")}</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-mycelium/60">et aussi {others.join(", ")}.</p>
        </div>
      </div>
      <div className="relative border-t border-mycelium/10">
        <div className="container-site flex flex-col gap-2 py-6 pb-24 text-sm text-mycelium/55 sm:flex-row sm:items-center sm:justify-between lg:pb-6">
          <p>© {COPYRIGHT_YEAR} {business.name}, entreprise individuelle.</p>
          <p className="flex gap-5">
            <Link href="/mentions-legales" className="hover:underline">
              Mentions légales
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

// Fixed at build time: Cache Components treats `new Date()` as request data.
const COPYRIGHT_YEAR = 2026;
