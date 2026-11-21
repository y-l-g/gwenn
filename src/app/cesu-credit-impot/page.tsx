import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs, FaqList } from "@/components/ui/PageParts";
import { CesuCalculator } from "@/components/home/CesuCalculator";
import { ContactBand } from "@/components/ui/ContactBand";
import { BeechLeaf, ChestnutLeaf, OakLeaf } from "@/components/illustrations/Botanical";

export const metadata: Metadata = pageMetadata({
  title: "CESU et crédit d'impôt de 50 % pour l'entretien du jardin",
  description:
    "Payez l'entretien de votre jardin en CESU et bénéficiez, sous conditions, d'un crédit d'impôt de 50 % : tonte, taille de haies, désherbage autour de Moréac, Locminé, Pontivy, Vannes.",
  path: "/cesu-credit-impot",
});

const faq = [
  {
    q: "Faut-il être imposable pour en profiter ?",
    a: "Non. C'est un crédit d'impôt : si son montant dépasse votre impôt, ou si vous n'êtes pas imposable, la différence vous est remboursée.",
  },
  {
    q: "Quel est le plafond pour le jardinage ?",
    a: "Les petits travaux de jardinage sont retenus dans la limite de 5 000 € de dépenses par an et par foyer, soit 2 500 € de crédit d'impôt au maximum.",
  },
  {
    q: "Une terrasse ou un carport donnent-ils droit au crédit d'impôt ?",
    a: "Non. Les constructions ne font pas partie des services à la personne. Le crédit d'impôt concerne l'entretien courant du jardin.",
  },
  {
    q: "Puis-je payer avec des CESU préfinancés par mon employeur ?",
    a: "Oui, les CESU sont acceptés. Le reste éventuel peut être réglé par un autre moyen de paiement.",
  },
];

export default function CesuPage() {
  return (
    <>
      <section className="relative overflow-x-clip pb-16 pt-6 sm:pt-8">
        <svg viewBox="-90 -150 180 170" className="pointer-events-none absolute -right-10 top-24 hidden w-56 rotate-12 lg:block" aria-hidden="true">
          <OakLeaf r={-30} x={-30} fill="var(--color-moss)" />
          <BeechLeaf r={14} x={20} fill="var(--color-beech)" />
          <ChestnutLeaf r={40} x={50} s={0.8} fill="var(--color-chanterelle)" />
        </svg>
        <div className="container-site">
          <Breadcrumbs items={[{ name: "CESU et crédit d'impôt", path: "/cesu-credit-impot" }]} />
          <h1 className="rise-in mt-8 display-lg max-w-[18ch] text-[clamp(2.4rem,1.3rem+3.8vw,4.6rem)]">
            CESU et crédit d&apos;impôt : <span className="wonk text-rust">le jardin à moitié prix</span>
          </h1>
          <p className="rise-in lead mt-6 max-w-[52ch] text-ink-soft">
            L&apos;entretien de votre jardin peut se régler en CESU et ouvrir droit, sous conditions, à un crédit
            d&apos;impôt égal à 50 % des sommes versées.
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="prose-site lg:col-span-7">
            <h2 className="!mt-0">Comment ça marche</h2>
            <p>
              Les petits travaux de jardinage réalisés à votre domicile font partie des services à la personne. À ce titre,
              la moitié de ce que vous payez peut vous revenir sous forme de crédit d&apos;impôt, l&apos;année suivant la
              dépense, après votre déclaration de revenus.
            </p>
            <h3>Ce qui est concerné</h3>
            <ul>
              <li>la tonte de pelouse ;</li>
              <li>la taille de haies et d&apos;arbustes ;</li>
              <li>le désherbage des massifs et des allées ;</li>
              <li>la taille légère d&apos;arbres accessibles.</li>
            </ul>
            <h3>Ce qui ne l&apos;est pas</h3>
            <ul>
              <li>les terrasses, pergolas, carports et autres constructions ;</li>
              <li>les travaux d&apos;élagage lourds ou d&apos;abattage.</li>
            </ul>
            <p>
              Pour le bois de chauffage, tout dépend de la prestation : posez-moi la question au moment du devis, je vous
              dirai ce qui peut être retenu.
            </p>
            <h3>Les plafonds</h3>
            <p>
              Les dépenses de jardinage sont retenues dans la limite de <strong>5 000 € par an et par foyer</strong>, soit
              un crédit d&apos;impôt maximal de 2 500 €. Elles s&apos;inscrivent dans le plafond global des services à la
              personne.
            </p>
            <h3>Un exemple</h3>
            <p>
              Quatre passages de tonte et deux tailles de haie dans l&apos;année, pour 900 € au total : 450 € vous
              reviennent en crédit d&apos;impôt. Votre jardin vous coûte réellement 450 €.
            </p>
            <p className="text-sm text-ink-mute">
              Les règles fiscales évoluent : vérifiez les conditions à jour sur{" "}
              <a href="https://www.service-public.fr/particuliers/vosdroits/F12" rel="noopener noreferrer" target="_blank">
                service-public.fr
              </a>{" "}
              ou auprès de votre centre des impôts.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <CesuCalculator />
              <p className="mt-5 text-sm text-ink-soft">
                Une question sur votre cas ? Appelez le{" "}
                <a href={business.phoneHref} className="font-semibold text-ink link-quiet">
                  {business.phone}
                </a>{" "}
                ou consultez la page{" "}
                <Link href="/entretien-jardin" className="font-semibold text-ink link-quiet">
                  entretien du jardin
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <FaqList faq={faq} />
      <ContactBand />
    </>
  );
}
