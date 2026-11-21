import Link from "next/link";
import { business } from "@/content/business";
import { mainTowns, towns } from "@/content/area";
import { services } from "@/content/services";
import { LogoMark } from "@/components/illustrations/Logo";
import { RootSystem } from "@/components/illustrations/Underground";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { slug } from "@/lib/text";

export function SiteFooter() {
  const others = towns.filter((t) => !t.main).map((t) => t.name);
  return (
    <footer className="on-dark relative overflow-hidden bg-humus text-mycelium">
      <RootSystem
        className="pointer-events-none absolute -top-2 left-1/2 w-[900px] max-w-none -translate-x-1/2 opacity-[0.14]"
        width={900}
        height={420}
        seed={17}
        color="var(--color-mycelium)"
        mode="view"
        depth={5}
      />
      <div className="container-site relative grid gap-12 pb-28 pt-20 md:grid-cols-12 lg:pb-14">
        <div className="md:col-span-5">
          <Link href="/" className="inline-flex items-center gap-3 no-underline">
            <LogoMark className="h-12 w-12 text-mycelium" />
            <span className="font-display text-2xl wonk">Services Jardin Joannic</span>
          </Link>
          <p className="mt-5 max-w-sm text-mycelium/75">
            Gwenn Joannic, à son compte près de Moréac. Entretien de jardin, constructions en bois, taille légère et
            conseil habitat, à environ 30 minutes à la ronde.
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
            <li>
              <Link href="/realisations" className="link-quiet no-underline hover:underline">
                Réalisations
              </Link>
            </li>
            <li>
              <Link href="/cesu-credit-impot" className="link-quiet no-underline hover:underline">
                CESU et crédit d&apos;impôt
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="font-display text-lg text-chanterelle">
            <Link href="/zone-intervention" className="no-underline hover:underline">
              Zone d&apos;intervention
            </Link>
          </h2>
          <p className="mt-4 text-mycelium/85">
            {mainTowns.map((t, i) => (
              <span key={t.name}>
                <Link href={`/zone-intervention#${slug(t.name)}`} className="font-semibold no-underline hover:underline">
                  {t.name}
                </Link>
                {i < mainTowns.length - 1 ? ", " : ""}
              </span>
            ))}
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
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

// Fixed at build time: Cache Components treats `new Date()` as request data.
const COPYRIGHT_YEAR = 2026;
