"use client";

import { useId, useState } from "react";

const CAP = 5000;
const euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export function CesuCalculator() {
  const [amount, setAmount] = useState(600);
  const id = useId();
  const eligible = Math.min(amount, CAP);
  const credit = Math.round(eligible * 0.5);
  const net = amount - credit;
  const ratio = Math.min(1, net / Math.max(amount, 1));

  return (
    <div className="rounded-[2rem] bg-paper p-6 shadow-[0_30px_60px_-40px_rgb(35_39_29/0.6)] ring-1 ring-ink/10 sm:p-8">
      <label htmlFor={id} className="block font-display text-2xl leading-tight">
        Combien coûte vraiment l&apos;entretien du jardin ?
      </label>
      <p className="mt-2 text-sm text-ink-mute">Faites glisser pour indiquer vos dépenses de jardinage sur l&apos;année.</p>

      <div className="mt-7 flex items-baseline justify-between gap-4">
        <span className="text-sm font-semibold text-ink-soft">Montant payé</span>
        <output htmlFor={id} className="font-display text-3xl tabular-nums">
          {euro.format(amount)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={100}
        max={6000}
        step={50}
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-paper-deep accent-moss [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-moss [&::-webkit-slider-thumb]:shadow-[0_0_0_5px_rgb(63_90_43/0.18)]"
        aria-valuetext={euro.format(amount)}
      />

      <div className="mt-8 h-4 overflow-hidden rounded-full bg-chanterelle/35" aria-hidden="true">
        <div className="h-full rounded-full bg-moss transition-[width] duration-300" style={{ width: `${ratio * 100}%` }} />
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <dt className="flex items-center gap-2 text-sm text-ink-mute">
            <span className="h-2.5 w-2.5 rounded-full bg-moss" aria-hidden="true" />
            Reste à votre charge
          </dt>
          <dd className="font-display text-2xl tabular-nums">{euro.format(net)}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-2 text-sm text-ink-mute">
            <span className="h-2.5 w-2.5 rounded-full bg-chanterelle" aria-hidden="true" />
            Crédit d&apos;impôt estimé
          </dt>
          <dd className="font-display text-2xl tabular-nums text-rust-deep">{euro.format(credit)}</dd>
        </div>
      </dl>
      <p className="mt-5 text-xs leading-relaxed text-ink-mute" aria-live="polite">
        {amount > CAP
          ? `Au-delà de ${euro.format(CAP)} de dépenses de jardinage par an, le crédit d'impôt est plafonné à ${euro.format(CAP / 2)}.`
          : "Estimation indicative pour les petits travaux de jardinage, sous réserve des conditions fiscales en vigueur."}
      </p>
    </div>
  );
}
