"use client";

import { useId, useState, type FormEvent } from "react";
import { business } from "@/content/business";
import { ArrowRight } from "@/components/ui/Icons";

const topics = [
  "Entretien du jardin",
  "Taille de haies",
  "Bois de chauffage",
  "Terrasse, pergola ou carport",
  "Taille d'arbres",
  "Conseil habitat (appel gratuit)",
  "Autre demande",
];

/**
 * Builds a ready-to-send e-mail in the visitor's own mail app.
 * Nothing is stored or sent by the website itself.
 */
export function ContactForm({ towns }: { towns: string[] }) {
  const id = useId();
  const [chosen, setChosen] = useState<string[]>([]);
  const [opened, setOpened] = useState(false);

  const toggle = (t: string) => setChosen((c) => (c.includes(t) ? c.filter((x) => x !== t) : [...c, t]));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const town = String(data.get("town") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const when = String(data.get("when") ?? "").trim();
    const subject = `${chosen.length ? chosen.join(", ") : "Demande"}${town ? ` à ${town}` : ""}`;
    const body = [
      "Bonjour Gwenn,",
      "",
      message || "(décrivez votre demande ici)",
      "",
      chosen.length ? `Sujet : ${chosen.join(", ")}` : null,
      town ? `Commune : ${town}` : null,
      phone ? `Téléphone : ${phone}` : null,
      when ? `Disponibilités : ${when}` : null,
      "",
      name ? `${name}` : null,
    ]
      .filter((l) => l !== null)
      .join("\n");
    const href = `${business.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
    // mailto: opens the visitor's mail app; this is not an in-app navigation.
    window.open(href, "_self");
  };

  const field = "mt-2 w-full rounded-2xl border border-ink/20 bg-paper px-4 py-3 text-base text-ink placeholder:text-ink-mute/70 focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/25";

  return (
    <form onSubmit={onSubmit} className="space-y-7" noValidate>
      <fieldset>
        <legend className="font-display text-xl">De quoi s&apos;agit-il ?</legend>
        <p className="mt-1 text-sm text-ink-mute">Plusieurs choix possibles.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {topics.map((t) => {
            const on = chosen.includes(t);
            return (
              <button
                type="button"
                key={t}
                aria-pressed={on}
                onClick={() => toggle(t)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  on ? "border-moss bg-moss text-paper" : "border-ink/20 hover:border-ink/50"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="font-semibold">
            Votre nom
          </label>
          <input id={`${id}-name`} name="name" autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-town`} className="font-semibold">
            Commune
          </label>
          <input id={`${id}-town`} name="town" list={`${id}-towns`} autoComplete="address-level2" className={field} placeholder="Moréac, Locminé, Vannes…" />
          <datalist id={`${id}-towns`}>
            {towns.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="font-semibold">
            Téléphone <span className="font-normal text-ink-mute">(pour être rappelé)</span>
          </label>
          <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" inputMode="tel" className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-when`} className="font-semibold">
            Quand vous joindre ?
          </label>
          <input id={`${id}-when`} name="when" className={field} placeholder="En semaine après 17 h, le samedi matin…" />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="font-semibold">
          Votre message
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={6}
          className={field}
          placeholder="Longueur de haie, surface de pelouse, idée de terrasse, problème d'humidité… Plus c'est précis, plus je peux vous répondre vite."
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="btn self-start">
          Préparer l&apos;e-mail <ArrowRight className="h-4.5 w-4.5" />
        </button>
        <p className="text-sm text-ink-mute">Votre messagerie s&apos;ouvre avec le message prêt à envoyer. Rien n&apos;est enregistré sur ce site.</p>
      </div>
      <p aria-live="polite" className="text-sm">
        {opened && (
          <>
            Votre messagerie ne s&apos;est pas ouverte ? Écrivez directement à{" "}
            <a href={business.emailHref} className="font-semibold text-rust-deep underline">
              {business.email}
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
