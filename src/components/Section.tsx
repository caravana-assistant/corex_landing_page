import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  number?: string;
  eyebrow?: string;
  title?: string;
  children?: ReactNode;
  className?: string;
  bare?: boolean;
};

export function Section({
  id,
  number,
  eyebrow,
  title,
  children,
  className = "",
  bare = false,
}: SectionProps) {
  if (bare) {
    return (
      <section id={id} className={`relative ${className}`}>
        {children}
      </section>
    );
  }

  return (
    <section
      id={id}
      className={`relative border-t border-[var(--color-border)] py-20 md:py-28 ${className}`}
    >
      {number && (
        <div
          aria-hidden
          className="stage-marker absolute right-3 top-6 select-none md:right-10 md:top-10"
        >
          {number}
        </div>
      )}

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        {(eyebrow || title) && (
          <header className="mb-12 max-w-3xl md:mb-16">
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            {title && (
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl">
                {title}
              </h2>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
