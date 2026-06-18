import type { Stage } from "@/lib/stages";

type Props = {
  activeStage?: Stage | null;
};

export function Schedule({ activeStage }: Props) {
  const timeline = activeStage?.schedule ?? [];
  const hasSchedule = timeline.length > 0;
  const dateLabel = activeStage?.date ?? "Date to be confirmed";

  return (
    <section
      id="schedule"
      className="border-b border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <p className="eyebrow mb-4">Schedule</p>
        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight mb-4">
          Event Day
        </h2>
        <p className="text-base text-[var(--color-fg-muted)] md:text-lg mb-12">
          {dateLabel}
        </p>

        {hasSchedule ? (
          <>
            <div className="relative max-w-xl">
              <div
                aria-hidden
                className="absolute left-[73px] top-4 bottom-4 w-px bg-[var(--color-border)] md:left-[91px]"
              />
              <div className="space-y-0">
                {timeline.map((entry, i) => (
                  <div key={i} className="relative flex items-start gap-5 py-4">
                    <span className="w-[58px] shrink-0 whitespace-nowrap text-right font-mono text-sm text-[var(--color-volt)] md:w-[76px]">
                      {entry.time}
                    </span>
                    <div className="relative z-10 mt-1.5 flex h-3 w-3 shrink-0 items-center justify-center">
                      <span
                        className={`block rounded-full ${
                          entry.time
                            ? "h-3 w-3 bg-[var(--color-volt)]"
                            : "h-2 w-2 bg-[var(--color-border-strong)]"
                        }`}
                      />
                    </div>
                    <span
                      className={`font-display text-lg uppercase tracking-wide md:text-xl ${
                        entry.time
                          ? "text-[var(--color-fg)]"
                          : "text-[var(--color-fg-muted)] text-base md:text-lg"
                      }`}
                    >
                      {entry.activity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-10 max-w-xl text-sm text-[var(--color-fg-muted)] md:text-base">
              Awards after each division, not at end of day. Spectators welcome
              throughout.
            </p>
          </>
        ) : (
          <div className="flex min-h-[160px] flex-col items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface)] py-10 text-center">
            <p className="font-display text-2xl text-[var(--color-fg-muted)] md:text-3xl">
              Schedule to be confirmed.
            </p>
            <p className="mt-3 max-w-md font-mono text-xs uppercase tracking-widest text-[var(--color-fg-faint)]">
              Times will be announced closer to the event
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
        )}
        <div className="mt-10 flex flex-col items-center gap-2 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-fg-faint)]">
            Already registered?
          </p>
          <a
            href="https://corexchallenge.vercel.app/my-schedule"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-volt text-xs"
          >
            Check your schedule
          </a>
        </div>
      </div>
    </section>
  );
}
