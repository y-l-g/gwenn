"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { business } from "@/content/business";
import { mainNav, serviceNav } from "@/content/navigation";
import { Logo } from "@/components/illustrations/Logo";
import { ChevronDown, CloseIcon, MenuIcon, PhoneIcon } from "@/components/ui/Icons";
import { ServiceArt, type ArtKind } from "@/components/illustrations/ServiceArt";

const artFor: Record<string, ArtKind> = {
  jardin: "jardin",
  construction: "construction",
  elagage: "elagage",
  habitat: "habitat",
  solaire: "solaire",
};

export function SiteHeader() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const drawerId = useId();
  const servicesRef = useRef<HTMLDivElement>(null);
  const drawerButton = useRef<HTMLButtonElement>(null);

  // Close menus when the route changes. The header stays mounted across
  // navigations, so this is derived from the pathname rather than an effect.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setServicesOpen(false);
    setDrawerOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!servicesOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setServicesOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        drawerButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [drawerOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const inServices = serviceNav.some((s) => isActive(s.href));

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled || drawerOpen ? "bg-paper/92 shadow-[0_1px_0_rgb(35_39_29/0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" className="rounded-md text-ink no-underline" aria-label={`${business.name}, accueil`}>
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-[0.97rem] font-medium">
            <li>
              <div ref={servicesRef} className="relative">
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls={menuId}
                  onClick={() => setServicesOpen((v) => !v)}
                  className={`flex items-center gap-1 rounded-full px-3.5 py-2 transition-colors hover:bg-ink/5 ${inServices ? "text-rust-deep" : ""}`}
                >
                  Services
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
                <div
                  id={menuId}
                  hidden={!servicesOpen}
                  className="absolute left-1/2 top-[calc(100%+0.6rem)] w-[min(44rem,90vw)] -translate-x-1/2 rounded-[1.6rem] border border-ink/10 bg-paper p-3 shadow-[0_30px_60px_-30px_rgb(35_39_29/0.45)]"
                >
                  <ul className="grid grid-cols-2 gap-1">
                    {serviceNav.map((s) => (
                      <li key={s.href}>
                        <Link
                          href={s.href}
                          className={`group flex items-start gap-3 rounded-2xl p-3 no-underline transition-colors hover:bg-paper-deep ${isActive(s.href) ? "bg-paper-deep" : ""}`}
                        >
                          <ServiceArt kind={artFor[s.key]} className="h-12 w-14 shrink-0 transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105" />
                          <span>
                            <span className="block font-semibold leading-tight">
                              {s.label}
                              {s.soon && <span className="ml-2 text-xs font-medium text-rust">bientôt</span>}
                            </span>
                            <span className="mt-1 block text-sm leading-snug text-ink-mute">{s.hint}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block rounded-full px-3.5 py-2 no-underline transition-colors hover:bg-ink/5 ${isActive(item.href) ? "text-rust-deep" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Below sm the fixed CallBar carries the phone number. */}
          <span className="hidden sm:block">
            <a href={business.phoneHref} className="btn !min-h-11 !px-4 !text-[0.95rem] whitespace-nowrap">
              <PhoneIcon className="h-4.5 w-4.5" />
              {business.phone}
            </a>
          </span>
          <button
            ref={drawerButton}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-ink/5 lg:hidden"
            aria-expanded={drawerOpen}
            aria-controls={drawerId}
            onClick={() => setDrawerOpen((v) => !v)}
          >
            <span className="sr-only">{drawerOpen ? "Fermer le menu" : "Ouvrir le menu"}</span>
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        id={drawerId}
        hidden={!drawerOpen}
        className="fixed inset-x-0 top-[var(--header-h)] h-[calc(100dvh-var(--header-h))] overflow-y-auto overscroll-contain bg-paper lg:hidden"
      >
        <nav aria-label="Navigation mobile" className="container-site pb-28 pt-4">
          <p className="mb-2 text-sm font-semibold text-ink-mute">Services</p>
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {serviceNav.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="flex items-center gap-4 py-3.5 no-underline">
                  <ServiceArt kind={artFor[s.key]} className="h-11 w-13 shrink-0" />
                  <span className="font-display text-xl">
                    {s.label}
                    {s.soon && <span className="ml-2 font-sans text-xs font-semibold text-rust">bientôt</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-2 font-display text-2xl no-underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <a href={business.phoneHref} className="btn">
              <PhoneIcon /> Appeler le {business.phone}
            </a>
            <a href={business.emailHref} className="btn btn-ghost">
              {business.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
