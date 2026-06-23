import type { Stage } from "@/lib/stages";

// COR-169 P2b: Results & Rankings index on the home page. Links each completed
// stage to its Results tab (#/stage/N). No fabricated season aggregate — it
// surfaces the per-stage results that exist.
export function ResultsRankings({ stages }: { stages: Stage[] }) {
  const done = stages.filter((s) => s.status === "completed");
  return (
    <section id="results" className="border-b border-[var(--color-border)] px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1100px]">
        <p className="eyebrow mb-4">Results & Rankings</p>
        <h2 className="font-display text-3xl leading-tight md:text-5xl">Stage results</h2>
        {done.length === 0 ? (
          <p className="mt-6 text-base text-[var(--color-fg-muted)]">
            Results post here after each stage. Check back once Stage 01 wraps.
          </p>
        ) : (
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {done.map((s) => (
              <a
                key={s.number}
                href={`#/stage/${s.number}`}
                className="group rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-volt)]"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-xl">{s.label}</span>
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">{s.dateShort ?? ""}</span>
                </div>
                <p className="mt-1 text-sm text-[var(--color-fg-muted)]">{[s.venue, s.city].filter(Boolean).join(" · ")}</p>
                {s.recap && (
                  <p className="mt-3 font-mono text-xs text-[var(--color-fg-muted)]">
                    {s.recap.athletes} athletes · {s.recap.divisions} divisions
                  </p>
                )}
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-volt)]">
                  View results <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
