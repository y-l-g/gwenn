import { business } from "@/content/business";
import { Apple, ChestnutBurr, OakLeaf } from "@/components/illustrations/Botanical";
import { MailIcon, PhoneIcon } from "./Icons";

export function ContactBand({
  title = "Parlons de votre jardin",
  accent = "ou de votre maison.",
  text = "Appelez pour fixer une visite ou poser une question. Si je ne décroche pas, laissez un message : je vous rappelle.",
}: {
  title?: string;
  accent?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-moss-deep text-mycelium on-dark" aria-labelledby="contact-band-title">
      <svg viewBox="0 0 400 300" className="pointer-events-none absolute -right-10 -top-8 w-[22rem] opacity-90 sm:w-[28rem]" aria-hidden="true">
        <OakLeaf x={250} y={240} r={-35} s={1.5} fill="var(--color-moss)" vein="rgb(255 248 230 / .18)" />
        <OakLeaf x={330} y={210} r={25} s={1.2} fill="var(--color-rust)" vein="rgb(255 248 230 / .25)" />
        <Apple x={200} y={250} s={1.6} r={-10} />
        <ChestnutBurr x={350} y={90} s={1.3} />
      </svg>
      <div className="container-site relative py-20 sm:py-24">
        <h2 id="contact-band-title" className="display-lg max-w-[16ch]">
          {title} <span className="wonk text-chanterelle">{accent}</span>
        </h2>
        <p className="lead mt-6 max-w-xl text-mycelium/85">{text}</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a href={business.phoneHref} className="btn btn-light !min-h-14 !px-6 !text-lg">
            <PhoneIcon /> {business.phone}
          </a>
          <a href={business.emailHref} className="btn btn-ghost !min-h-14">
            <MailIcon /> {business.email}
          </a>
        </div>
      </div>
    </section>
  );
}
