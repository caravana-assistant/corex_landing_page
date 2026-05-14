import { site } from "@/lib/site";

const checklist = [
  "Emirates ID or Passport",
  "Registration confirmation",
  "Training gear",
  "Water bottle (hydration stations available)",
  "Arrive early \u2014 check-in at 4:00 PM is firm",
];

export function Venue() {
  return (
    <section
      id="venue"
      className="border-b border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <p className="eyebrow mb-4">Venue</p>
        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight mb-12">
          Where It Happens
        </h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          {/* Left: venue info */}
          <div>
            <h3 className="font-display text-3xl leading-tight md:text-4xl">
              {site.event.venue}
            </h3>
            <p className="mt-3 font-mono text-sm uppercase tracking-widest text-[var(--color-fg-muted)]">
              {site.event.city}
            </p>
            <p className="mt-1 font-mono text-sm text-[var(--color-fg-muted)]">
              {site.event.date}
            </p>
            <p className="mt-1 font-mono text-sm text-[var(--color-fg-muted)]">
              {site.event.timeWindow}
            </p>

            <a
              href={site.event.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost mt-8 inline-flex gap-2"
            >
              <span aria-hidden className="text-[var(--color-volt)]">
                &#x1F4CD;
              </span>
              Open in Maps
              <span
                aria-hidden
                className="text-sm text-[var(--color-volt)]"
              >
                &#x2197;
              </span>
            </a>
          </div>

          {/* Right: checklist */}
          <div>
            <h3 className="font-display text-xl uppercase tracking-wide text-[var(--color-volt)] mb-6">
              What to Bring
            </h3>
            <ul className="space-y-4">
              {checklist.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-[var(--color-fg-muted)] md:text-base"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[var(--color-border-strong)]">
                    <span className="block h-2 w-2 rounded-sm bg-[var(--color-volt)]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
