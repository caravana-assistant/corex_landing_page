import type { Stage } from "@/lib/stages";
import { MapPinIcon } from "@/components/icons";

const checklist = [
  "Emirates ID or Passport",
  "Registration confirmation",
  "Training gear",
  "Water bottle (hydration stations available)",
  "Arrive early — check-in time is firm",
];

type Props = {
  activeStage?: Stage | null;
};

export function Venue({ activeStage }: Props) {
  const venue = activeStage?.venue;
  const city = activeStage?.city;
  const date = activeStage?.date;
  const timeWindow = activeStage?.timeWindow;
  const mapsHref = activeStage?.mapsHref;

  if (!venue && !city) {
    return (
      <section id="venue" className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
          <p className="eyebrow mb-4">Venue</p>
          <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight mb-12">
            Where It Happens
          </h2>
          <div className="flex min-h-[160px] flex-col items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface)] py-10 text-center">
            <p className="font-display text-2xl text-[var(--color-fg-muted)] md:text-3xl">
              Venue to be confirmed.
            </p>
            <p className="mt-3 max-w-md font-mono text-xs uppercase tracking-widest text-[var(--color-fg-faint)]">
              Location will be announced closer to the event
            </p>
            <a
              href="https://chat.whatsapp.com/K2aHcGZjRNO6hN99ZVqhFD"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-volt mt-6 text-xs"
            >
              Join WhatsApp for updates
            </a>
          </div>
        </div>
      </section>
    );
  }

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
          <div>
            <h3 className="font-display text-3xl leading-tight md:text-4xl">
              {venue ?? city}
            </h3>
            {venue && city && (
              <p className="mt-3 font-mono text-sm uppercase tracking-widest text-[var(--color-fg-muted)]">
                {city}
              </p>
            )}
            {date && (
              <p className="mt-1 font-mono text-sm text-[var(--color-fg-muted)]">
                {date}
              </p>
            )}
            {timeWindow && (
              <p className="mt-1 font-mono text-sm text-[var(--color-fg-muted)]">
                {timeWindow}
              </p>
            )}

            {mapsHref ? (
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-8 inline-flex gap-2"
              >
                <MapPinIcon className="h-5 w-5 shrink-0 text-[var(--color-volt)]" />
                Open in Maps
                <span aria-hidden className="text-sm text-[var(--color-volt)]">↗</span>
              </a>
            ) : (
              <p className="mt-8 font-mono text-xs uppercase tracking-widest text-[var(--color-fg-faint)]">
                Maps link coming soon
              </p>
            )}
          </div>

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
