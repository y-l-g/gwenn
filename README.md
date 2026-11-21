# Services Jardin Joannic

Site vitrine de Gwenn Joannic, à Moréac (Morbihan) : entretien de jardin, terrasses, pergolas et carports en bois, taille légère, et conseil habitat.

Construit avec Next.js 16 (App Router, Cache Components, Partial Prefetching), React 19 et Tailwind CSS 4. Toutes les pages sont générées en statique.

## Développement

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

```bash
npm run build   # build de production
npx eslint .    # lint
```

## Variables d'environnement

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Domaine définitif (URL canoniques, sitemap, données structurées). |
| `NEXT_PUBLIC_SIRET` | Numéro SIRET affiché dans les mentions légales. |
| `NEXT_PUBLIC_HOST_NAME` | Hébergeur affiché dans les mentions légales. |

## Contenu

Les textes et données sont dans `src/content/` :

- `business.ts` : coordonnées.
- `services.ts` : prestations, FAQ et métadonnées SEO.
- `photos.ts` : photos de chantiers, affichées sur l'accueil (les cinq premières) et sur la page terrasses. Pour en ajouter une, déposer le fichier dans `src/assets/photos/`, l'importer, puis ajouter une ligne au tableau `workPhotos` avec une courte description.
- `area.ts` : communes desservies.
- `habitat.ts`, `seasons.ts` : contenu du réseau « conseil habitat » et du calendrier des saisons.

Les illustrations sont des SVG procéduraux dans `src/components/illustrations/`.
