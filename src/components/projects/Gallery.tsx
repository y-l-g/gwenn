"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/content/projects";
import { ArrowRight, CloseIcon } from "@/components/ui/Icons";

export function Gallery({ photos, title }: { photos: Photo[]; title: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const open = (i: number, el: HTMLButtonElement) => {
    lastTrigger.current = el;
    setIndex(i);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const step = useCallback((d: number) => setIndex((i) => (i + d + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (!el.open) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => lastTrigger.current?.focus();
    window.addEventListener("keydown", onKey);
    el.addEventListener("close", onClose);
    return () => {
      window.removeEventListener("keydown", onKey);
      el.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = photos[index];

  return (
    <>
      <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {photos.map((p, i) => (
          <li key={p.src.src} className="mb-5 break-inside-avoid">
            <figure>
              <button
                type="button"
                onClick={(e) => open(i, e.currentTarget)}
                className="group relative block w-full overflow-hidden rounded-[1.5rem] bg-paper-deep"
                aria-label={`Agrandir la photo : ${p.alt}`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 46vw, 92vw"
                  className="h-auto w-full transition-transform duration-[1.2s] ease-[var(--ease-organic)] group-hover:scale-[1.03]"
                  loading={i < 2 ? "eager" : "lazy"}
                />
              </button>
              {p.caption && <figcaption className="mt-2.5 text-sm text-ink-mute">{p.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={`${title} : photo ${index + 1} sur ${photos.length}`}
        className="m-auto h-[100dvh] max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-humus/92 backdrop:backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="flex h-full flex-col items-center justify-center gap-4 p-4 text-mycelium sm:p-8" onClick={(e) => e.target === e.currentTarget && close()}>
          <div className="relative h-[72dvh] w-full max-w-6xl">
            <Image key={current.src.src} src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" quality={80} />
          </div>
          <div className="flex w-full max-w-6xl items-center justify-between gap-4">
            <p className="text-sm sm:text-base">
              <span className="tabular-nums text-spore">
                {index + 1} / {photos.length}
              </span>
              {current.caption && <span className="ml-3">{current.caption}</span>}
            </p>
            <div className="flex shrink-0 gap-2">
              <button type="button" onClick={() => step(-1)} className="flex h-11 w-11 items-center justify-center rounded-full bg-mycelium/10 hover:bg-mycelium/20" aria-label="Photo précédente">
                <ArrowRight className="h-5 w-5 rotate-180" />
              </button>
              <button type="button" onClick={() => step(1)} className="flex h-11 w-11 items-center justify-center rounded-full bg-mycelium/10 hover:bg-mycelium/20" aria-label="Photo suivante">
                <ArrowRight className="h-5 w-5" />
              </button>
              <button type="button" onClick={close} className="flex h-11 w-11 items-center justify-center rounded-full bg-chanterelle text-humus" aria-label="Fermer">
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
