type MarkProps = { className?: string; title?: string };

/** A "J" that sprouts two leaves above ground and curls into a root below. */
export function LogoMark({ className, title }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <path d="M5 29.5 Q24 27.6 43 29.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".55" />
      <path d="M27 11 V29 C27 37.5 23.8 42 18.6 42 C14.6 42 12.6 39 12.8 35.8" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M27 15.5 C20.5 15.6 16.4 11.6 15.4 5.6 C21.6 5.4 26 8.8 27 15.5Z" fill="var(--color-rust)" />
      <path d="M27 12.6 C29.6 7.4 34.6 4.6 41 5.2 C39.4 11.2 34 13.8 27 12.6Z" fill="var(--color-fern)" />
      <path d="M21.5 15.2 Q19 11.6 17.4 7.6 M33.5 9.4 Q31 11 28.6 12.2" stroke="var(--color-paper)" strokeWidth=".8" fill="none" opacity=".7" />
      <path d="M22.4 41 l1.6 3.6 M17 41.8 l-2.4 3 M13.2 37.4 l-3.4 .8 M25.6 37.6 l3 2.4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className="h-10 w-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.45rem] tracking-tight wonk" style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1, "opsz" 48' }}>
          Joannic
        </span>
        {!compact && (
          <span className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] opacity-75">Services Jardin</span>
        )}
      </span>
    </span>
  );
}
