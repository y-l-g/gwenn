import type { Metadata } from "next";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/PageParts";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Mentions légales",
    description: "Mentions légales du site Services Jardin Joannic.",
    path: "/mentions-legales",
  }),
  robots: { index: false, follow: true },
};

/*
 * TODO before going live: fill in the SIRET number and the hosting provider.
 * Both are required by French law (LCEN, article 6).
 */
const SIRET = process.env.NEXT_PUBLIC_SIRET ?? "à compléter";
const HOST = process.env.NEXT_PUBLIC_HOST_NAME ?? "à compléter";

export default function LegalPage() {
  return (
    <section className="pb-24 pt-6 sm:pt-8">
      <div className="container-site">
        <Breadcrumbs items={[{ name: "Mentions légales", path: "/mentions-legales" }]} />
        <div className="prose-site mt-8">
          <h1 className="display-lg">Mentions légales</h1>
          <h2>Éditeur du site</h2>
          <p>
            {business.name}, entreprise individuelle de {business.owner}
            <br />
            {business.locality} ({business.postalCode}), {business.department}, France
            <br />
            SIRET : {SIRET}
            <br />
            Téléphone : <a href={business.phoneHref}>{business.phone}</a>
            <br />
            E-mail : <a href={business.emailHref}>{business.email}</a>
          </p>
          <p>Directeur de la publication : {business.owner}.</p>
          <h2>Hébergement</h2>
          <p>{HOST}</p>
          <h2>Données personnelles</h2>
          <p>
            Ce site ne dépose aucun cookie de suivi et n&apos;utilise pas d&apos;outil de mesure d&apos;audience. Les
            informations que vous envoyez par e-mail ou par téléphone servent uniquement à répondre à votre demande et ne
            sont jamais cédées à des tiers.
          </p>
          <p>
            Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données en écrivant à{" "}
            <a href={business.emailHref}>{business.email}</a>.
          </p>
          <h2>Crédits photographiques</h2>
          <p>
            Les photos des réalisations appartiennent à {business.owner}. Les autres photographies d&apos;illustration
            proviennent de banques d&apos;images libres de droits (Pixabay). Illustrations : créations originales pour ce
            site.
          </p>
        </div>
      </div>
    </section>
  );
}
