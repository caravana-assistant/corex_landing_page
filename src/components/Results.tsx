import type { Stage } from "@/lib/stages";

type Props = { stage: Stage };

export function Results({ stage }: Props) {
  const results = stage.results;

  const hasResults = results.length > 0;
  const headline = !hasResults
    ? "Coming soon."
    : stage.status === "completed"
      ? "Who took the crown."
      : "Live results.";

  return (
    <div>
      <header className="mb-8 flex flex-col gap-2 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-2">{stage.label} · Podium</p>
          <h3 className="font-display text-3xl leading-none md:text-5xl">
            {headline}
          </h3>
        </div>
        <p className="text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">
          Top 3 per division
        </p>
      </header>

      {results.length === 0 ? <EmptyResults stage={stage} /> : <ResultsGrid stage={stage} />}
    </div>
  );
}

function ResultsGrid({ stage }: { stage: Stage }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {stage.results.map((row) => (
        <article
          key={row.division}
          className="group relative border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-volt)]"
        >
          <p className="eyebrow mb-4">{row.division}</p>
          <ol className="space-y-2.5">
            {row.podium.map((p) => (
              <li
                key={p.rank}
                className="flex items-baseline gap-3 border-b border-[var(--color-border)] pb-2 last:border-b-0 last:pb-0"
              >
                <span
                  className={`font-display text-2xl leading-none ${
                    p.rank === 1
                      ? "text-[var(--color-volt)]"
                      : "text-[var(--color-fg-muted)]"
                  }`}
                >
                  {p.rank}
                </span>
                <span className="flex-1 truncate text-base">{p.name}</span>
                {p.time && (
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">
                    {p.time}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </article>
      ))}
    </div>
  );
}

function EmptyResults({ stage }: { stage: Stage }) {
  if (stage.status === "tbc") {
    return (
      <div className="flex min-h-[160px] flex-col items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface)] py-10 text-center">
        <p className="font-display text-2xl text-[var(--color-fg-muted)] md:text-3xl">
          Race not yet scheduled.
        </p>
      </div>
    );
  }

  if (stage.status === "loading") {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <article
            key={i}
            aria-hidden
            className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
          >
            <div className="loading-shimmer mb-4 h-3 w-24 rounded" />
            <div className="space-y-3">
              {[1, 2, 3].map((rank) => (
                <div
                  key={rank}
                  className="flex items-baseline gap-3 border-b border-[var(--color-border)] pb-2 last:border-b-0"
                >
                  <span
                    className={`font-display text-2xl leading-none ${
                      rank === 1
                        ? "text-[var(--color-volt)]"
                        : "text-[var(--color-fg-faint)]"
                    }`}
                  >
                    {rank}
                  </span>
                  <div className="loading-shimmer h-3 flex-1 rounded" />
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    );
  }

  // Completed or current — placeholder cards with TBA
  const placeholderDivisions =
    stage.number === 1
      ? [
          "Pro Men",
          "Pro Women",
          "Open Men",
          "Open Women",
          "Doubles Men",
          "Doubles Women",
        ]
      : [
          "Open Men",
          "Open Women",
          "Doubles Men",
          "Doubles Women",
          "Relay",
          "POD Men",
        ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {placeholderDivisions.map((div) => (
          <article
            key={div}
            aria-hidden
            className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
          >
            <p className="eyebrow mb-4">{div}</p>
            <ol className="space-y-2.5">
              {[1, 2, 3].map((rank) => (
                <li
                  key={rank}
                  className="flex items-baseline gap-3 border-b border-[var(--color-border)] pb-2 last:border-b-0 last:pb-0"
                >
                  <span
                    className={`font-display text-2xl leading-none ${
                      rank === 1
                        ? "text-[var(--color-volt)]"
                        : "text-[var(--color-fg-faint)]"
                    }`}
                  >
                    {rank}
                  </span>
                  <span className="flex-1 truncate font-mono text-xs uppercase tracking-widest text-[var(--color-fg-faint)]">
                    To be announced
                  </span>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </div>
  );
}
