import { business } from "@/content/business";
import { MailIcon, PhoneIcon } from "@/components/ui/Icons";

/** Thumb-reach contact bar on small screens. */
export function CallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        <a href={business.phoneHref} className="btn flex-1 !min-h-12">
          <PhoneIcon /> Appeler Gwenn
        </a>
        <a href={business.emailHref} className="btn btn-ghost !min-h-12 !px-4" aria-label={`Écrire à ${business.email}`}>
          <MailIcon />
          <span className="xs:inline hidden">E-mail</span>
        </a>
      </div>
    </div>
  );
}
