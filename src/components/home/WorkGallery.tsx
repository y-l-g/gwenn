import Image from "next/image";
import Link from "next/link";
import { workPhotos } from "@/content/photos";
import { ArrowRight } from "@/components/ui/Icons";

/** Home page photo strip: five photos of completed work, no captions. */
export function WorkGallery() {
  const [a, b, c, d, e] = workPhotos;
  const tile = "relative overflow-hidden rounded-[1.75rem] bg-paper";
  const img = "object-cover transition-transform duration-[1.2s] ease-[var(--ease-organic)] hover:scale-[1.03]";

  return (
    <section className="relative bg-paper-deep py-20 sm:py-24" aria-labelledby="work-title">
      <div className="container-site">
        <h2 id="work-title" className="sr-only">
          Photos de réalisations
        </h2>
        <div className="reveal grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
          <div className={`${tile} col-span-2 aspect-[4/3] lg:row-span-2 lg:aspect-auto`}>
            <Image src={a.src} alt={a.alt} fill placeholder="blur" sizes="(min-width: 1024px) 46vw, 92vw" className={img} />
          </div>
          {[b, c, d, e].filter(Boolean).map((p) => (
            <div key={p.src.src} className={`${tile} aspect-square`}>
              <Image src={p.src} alt={p.alt} fill placeholder="blur" sizes="(min-width: 1024px) 23vw, 46vw" className={img} />
            </div>
          ))}
        </div>
        <Link href="/terrasses-pergolas-carports#photos" className="mt-8 inline-flex items-center gap-2 font-semibold text-rust-deep link-quiet">
          Voir le détail <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
