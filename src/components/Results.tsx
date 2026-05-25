import { useState } from "react";
import type { DivisionResult, Stage } from "@/lib/stages";
import { useResults, type FullResultRow } from "@/lib/useResults";

type Props = { stage: Stage };

type View = "podium" | "full";

export function Results({ stage }: Props) {
  const { results: liveResults, allResults, loading: liveLoading, published } = useResults(stage.eventId);
  const results = published ? liveResults : stage.results;
  const isLoading = stage.eventId ? liveLoading : false;
  const [view, setView] = useState<View>("podium");

  const hasResults = results.length > 0;
  const headline = isLoading
    ? "Loading results..."
    : !hasResults
      ? "Coming soon."
      : stage.status === "completed"
        ? "Who took the crown."
        : "Live results.";

  return (
    <div>
      <header className="mb-8 flex flex-col gap-4 md:mb-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-2">{stage.label} · Results</p>
            <h3 className="font-display text-3xl leading-none md:text-5xl">
              {headline}
            </h3>
          </div>
          {hasResults && !isLoading && (
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setView("podium")}
                className={`font-mono text-[11px] uppercase tracking-[0.18em] px-4 py-2 border transition-colors ${
                  view === "podium"
                    ? "border-[var(--color-volt)] bg-[var(--color-volt)]/10 text-[var(--color-volt)]"
                    : "border-[var(--color-border-strong)] text-[var(--color-fg-muted)] hover:border-[var(--color-fg-muted)]"
                }`}
              >
                Podium
              </button>
              <button
                type="button"
                onClick={() => setView("full")}
                className={`font-mono text-[11px] uppercase tracking-[0.18em] px-4 py-2 border transition-colors ${
                  view === "full"
                    ? "border-[var(--color-volt)] bg-[var(--color-volt)]/10 text-[var(--color-volt)]"
                    : "border-[var(--color-border-strong)] text-[var(--color-fg-muted)] hover:border-[var(--color-fg-muted)]"
                }`}
              >
                All Results
              </button>
            </div>
          )}
        </div>
      </header>

      {isLoading ? (
        <LoadingShimmer />
      ) : results.length === 0 ? (
        <EmptyResults stage={stage} />
      ) : view === "podium" ? (
        <ResultsGrid results={results} />
      ) : (
        <FullResultsTable rows={allResults} />
      )}
    </div>
  );
}

function ResultsGrid({ results }: { results: DivisionResult[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {results.map((row) => (
        <article
          key={row.division}
          className="group relative border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-volt)]"
        >
          <p className="eyebrow mb-4">{row.division}</p>
          <ol className="space-y-2.5">
            {row.podium.map((p, i) => {
              const medalColor = p.rank === 1 ? "#FFD700" : p.rank === 2 ? "#C0C0C0" : "#CD7F32";
              return (
                <li
                  key={`${p.rank}-${i}`}
                  className={`flex items-center gap-3 border-b border-[var(--color-border)] pb-2 last:border-b-0 last:pb-0 ${
                    p.rank === 1
                      ? "border-l-2 border-l-[#FFD700] pl-2 bg-[rgba(255,215,0,0.05)]"
                      : p.rank === 2
                        ? "border-l-2 border-l-[#C0C0C0] pl-2 bg-[rgba(192,192,192,0.04)]"
                        : "border-l-2 border-l-[#CD7F32] pl-2 bg-[rgba(205,127,50,0.04)]"
                  }`}
                >
                  <MedalIcon color={medalColor} rank={p.rank} />
                  <span className="flex-1 truncate text-base">{p.name}</span>
                  {p.time && (
                    <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">
                      {p.time}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </article>
      ))}
    </div>
  );
}

function FullResultsTable({ rows }: { rows: FullResultRow[] }) {
  // Group by division for section headers
  const sections: { division: string; rows: FullResultRow[] }[] = [];
  let currentDiv = "";
  for (const row of rows) {
    if (row.division !== currentDiv) {
      currentDiv = row.division;
      sections.push({ division: currentDiv, rows: [] });
    }
    sections[sections.length - 1].rows.push(row);
  }

  return (
    <div className="border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[3rem_1fr_auto_5rem] md:grid-cols-[3rem_1fr_12rem_5rem] gap-x-4 bg-[var(--color-bg)] px-5 py-3 border-b border-[var(--color-border)]">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-muted)] text-center">#</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-muted)]">Name</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-muted)] hidden md:block">Division</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-muted)] text-right">Time</span>
      </div>

      {sections.map((section) => (
        <div key={section.division}>
          {/* Division header */}
          <div className="border-b border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-2.5">
            <span className="font-display text-sm uppercase tracking-wide text-[var(--color-volt)]">
              {section.division}
            </span>
            <span className="ml-3 font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-faint)]">
              {section.rows.length} finisher{section.rows.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Rows */}
          {section.rows.map((row, i) => {
            const medalBg =
              row.rank === 1
                ? "bg-[rgba(255,215,0,0.08)] border-l-2 border-l-[#FFD700]"
                : row.rank === 2
                  ? "bg-[rgba(192,192,192,0.06)] border-l-2 border-l-[#C0C0C0]"
                  : row.rank === 3
                    ? "bg-[rgba(205,127,50,0.06)] border-l-2 border-l-[#CD7F32]"
                    : "";
            const medalColor = row.rank === 1 ? "#FFD700" : row.rank === 2 ? "#C0C0C0" : row.rank === 3 ? "#CD7F32" : null;

            return (
            <div
              key={`${section.division}-${i}`}
              className={`grid grid-cols-[3rem_1fr_auto_5rem] md:grid-cols-[3rem_1fr_12rem_5rem] gap-x-4 px-5 py-2.5 border-b border-[var(--color-border)] last:border-b-0 transition-colors hover:bg-[var(--color-surface-2,rgba(255,255,255,0.02))] ${
                medalBg || (i % 2 === 0 ? "" : "bg-[rgba(255,255,255,0.01)]")
              }`}
            >
              <span
                className={`font-display text-lg leading-none text-center ${
                  row.rank === 1
                    ? "text-[#FFD700]"
                    : row.rank === 2
                      ? "text-[#C0C0C0]"
                      : row.rank === 3
                        ? "text-[#CD7F32]"
                        : "text-[var(--color-fg-muted)]"
                }`}
              >
                {medalColor ? <MedalIcon color={medalColor} rank={row.rank} /> : row.rank}
              </span>
              <span
                className={`text-sm truncate ${
                  row.rank <= 3 ? "font-semibold text-[var(--color-fg)]" : "text-[var(--color-fg-muted)]"
                }`}
              >
                {row.name}
              </span>
              <span className="font-mono text-xs text-[var(--color-fg-faint)] hidden md:block">
                {row.division}
              </span>
              <span
                className={`font-mono text-xs text-right ${
                  row.rank <= 3 ? "text-[var(--color-fg)]" : "text-[var(--color-fg-muted)]"
                }`}
              >
                {row.time}
              </span>
            </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function LoadingShimmer() {
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
    return <LoadingShimmer />;
  }

  const placeholderDivisions =
    stage.number === 1
      ? ["Pro Men", "Pro Women", "Open Men", "Open Women", "Doubles Men", "Doubles Women"]
      : ["Open Men", "Open Women", "Doubles Men", "Doubles Women", "Relay", "POD Men"];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {placeholderDivisions.map((div) => (
        <article key={div} aria-hidden className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <p className="eyebrow mb-4">{div}</p>
          <ol className="space-y-2.5">
            {[1, 2, 3].map((rank) => (
              <li key={rank} className="flex items-baseline gap-3 border-b border-[var(--color-border)] pb-2 last:border-b-0 last:pb-0">
                <span className={`font-display text-2xl leading-none ${rank === 1 ? "text-[var(--color-volt)]" : "text-[var(--color-fg-faint)]"}`}>
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
  );
}

function MedalIcon({ color, rank }: { color: string; rank: number }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-label={`${rank === 1 ? "Gold" : rank === 2 ? "Silver" : "Bronze"} medal`}>
      <path d="M8 1L11 8L14 1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <circle cx="11" cy="13" r="7" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" />
      <text x="11" y="14" textAnchor="middle" dominantBaseline="central" fill={color} fontSize="8" fontWeight="bold" fontFamily="var(--font-display)">
        {rank}
      </text>
    </svg>
  );
}
