import { useState } from "react";

// Stage 03 \u2014 CoreX 3rd Series \u00b7 Individual (Open). 200m run between stations,
// then run to the finish line. Source: Briefing_Stage03 / 2026-06-16 EventGuide.
const sequence = [
  { type: "run", label: "200m Run" },
  { type: "station", label: "40 Wall Balls" },
  { type: "run", label: "200m Run" },
  { type: "station", label: "500/400m Row" },
  { type: "run", label: "200m Run" },
  { type: "station", label: "80m DB Farmers Carry" },
  { type: "run", label: "200m Run" },
  { type: "station", label: "60m Burpee Broad Jump" },
  { type: "run", label: "200m Run" },
  { type: "station", label: "40m Sandbag Lunges" },
  { type: "run", label: "200m Run" },
  { type: "station", label: "500/400m Ski" },
  { type: "run", label: "Run to Finish" },
] as const;

const weights = [
  { division: "Men Open", dumbbell: "15kg", sandbag: "20kg", wallBall: "6kg" },
  { division: "Women Open", dumbbell: "10kg", sandbag: "10kg", wallBall: "4kg" },
  { division: "Double Men", dumbbell: "15kg", sandbag: "20kg", wallBall: "6kg" },
  { division: "Double Women", dumbbell: "10kg", sandbag: "10kg", wallBall: "4kg" },
  { division: "Relay", dumbbell: "15/10kg", sandbag: "20/10kg", wallBall: "6/4kg" },
  { division: "Junior Boys 14-17", dumbbell: "6kg", sandbag: "\u2014", wallBall: "6kg" },
  { division: "Junior Girls 14-17", dumbbell: "4kg", sandbag: "\u2014", wallBall: "4kg" },
  { division: "Youth Boys 11-13", dumbbell: "4kg", sandbag: "\u2014", wallBall: "\u2014" },
  { division: "Youth Girls 11-13", dumbbell: "2kg", sandbag: "\u2014", wallBall: "\u2014" },
  { division: "Kids 7-10", dumbbell: "\u2014", sandbag: "\u2014", wallBall: "\u2014" },
  { division: "POD Men", dumbbell: "\u2014", sandbag: "\u2014", wallBall: "4kg" },
  { division: "POD Women", dumbbell: "\u2014", sandbag: "\u2014", wallBall: "2kg" },
] as const;

/* Station icons — inline SVGs, no external deps */
function RunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M13 3.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="currentColor" stroke="none" />
      <path d="M8.5 7l3-1.5 2.5 3M10 9l-4 7M11.5 8.5l1.5 4-3 3.5M6.5 5.5l3 1.5" />
    </svg>
  );
}

function StationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="8" width="16" height="4" rx="1" />
      <path d="M4 8V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v3M12 8V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v3M4 12v3M16 12v3M1 15h4M15 15h4" />
    </svg>
  );
}

export function Workout({ confirmed = true }: { confirmed?: boolean }) {
  const [showWeights, setShowWeights] = useState(false);

  /* Separate stations from runs for the grid layout */
  const stations = sequence.filter((s) => s.type === "station");

  if (!confirmed) {
    return (
      <section id="workout" className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
          <p className="eyebrow mb-4">Race Format</p>
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight mb-4">
            The Challenge
          </h2>
          <div className="flex min-h-[160px] flex-col items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface)] py-10 text-center">
            <p className="font-display text-2xl text-[var(--color-fg-muted)] md:text-3xl">
              Workout to be confirmed.
            </p>
            <p className="mt-3 max-w-md font-mono text-xs uppercase tracking-widest text-[var(--color-fg-faint)]">
              Details will be announced closer to the event
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
      id="workout"
      className="border-b border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <p className="eyebrow mb-4">Race Format</p>
        <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight mb-4">
          The Challenge
        </h2>
        <p className="max-w-2xl text-base text-[var(--color-fg-muted)] md:text-lg mb-6">
          6 stations. 200m run between each. For time.
        </p>

        {/* Format summary strip */}
        <div className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm md:text-base">
          <span className="inline-flex items-center gap-2 text-[var(--color-volt)]">
            <RunIcon />
            <span className="font-display uppercase tracking-wide">200m Run</span>
          </span>
          <span className="text-[var(--color-fg-faint)]">between each station</span>
          <span aria-hidden className="hidden text-[var(--color-border-strong)] md:inline">/</span>
          <span className="text-[var(--color-fg-muted)]">{sequence.length} segments total</span>
        </div>

        {/* ── STATION CARDS GRID ── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {stations.map((station, i) => {
            const stepNum = (i + 1) * 2; // stations are even-numbered steps
            return (
              <div
                key={station.label}
                className="group relative overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-all duration-300 hover:border-[var(--color-volt)] hover:bg-[color-mix(in_srgb,var(--color-volt)_4%,var(--color-surface))]"
              >
                {/* Glow on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
                  style={{ background: "radial-gradient(closest-side, var(--color-volt-glow), transparent)" }}
                />

                {/* Step number */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-faint)]">
                    Station {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-faint)]">
                    Step {String(stepNum).padStart(2, "0")}/{sequence.length}
                  </span>
                </div>

                {/* Station icon + label */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 text-[var(--color-volt)] opacity-60 group-hover:opacity-100 transition-opacity">
                    <StationIcon />
                  </div>
                  <p className="font-display text-xl uppercase tracking-tight leading-tight md:text-2xl">
                    {station.label}
                  </p>
                </div>

                {/* Run connector below */}
                <div className="mt-4 flex items-center gap-2 border-t border-[var(--color-border)] pt-3">
                  <RunIcon />
                  <span className="font-mono text-xs text-[var(--color-volt)] uppercase tracking-widest">
                    {i < stations.length - 1 ? "200m Run →" : "Run to Finish"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── FULL SEQUENCE — compact reference ── */}
        <div className="mb-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--color-border)]">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-muted)]">
              Full Sequence
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-0 px-5 py-4">
            {sequence.map((step, i) => (
              <div key={i} className="flex items-center">
                <span
                  className={`font-display text-sm uppercase tracking-wide whitespace-nowrap px-2 py-1 rounded ${
                    step.type === "run"
                      ? "text-[var(--color-volt)] bg-[color-mix(in_srgb,var(--color-volt)_8%,transparent)]"
                      : "text-[var(--color-fg)]"
                  }`}
                >
                  {step.label}
                </span>
                {i < sequence.length - 1 && (
                  <span
                    aria-hidden
                    className="mx-1 text-[var(--color-border-strong)] text-xs"
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── NOTES ── */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <p className="font-display text-lg uppercase tracking-wide text-[var(--color-volt)] mb-2">
              Doubles
            </p>
            <p className="text-sm text-[var(--color-fg-muted)] md:text-base leading-relaxed">
              Synchro 200m runs, 80 Wall Balls, 800/600m Row & Ski, 60m Sandbag Lunges.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <p className="font-display text-lg uppercase tracking-wide text-[var(--color-volt)] mb-2">
              Kids & POD
            </p>
            <p className="text-sm text-[var(--color-fg-muted)] md:text-base leading-relaxed">
              Adapted workouts with age-appropriate movements and loads.
            </p>
          </div>
        </div>

        {/* ── EQUIPMENT WEIGHTS TABLE ── */}
        <div className="rounded-lg border border-[var(--color-border)] overflow-hidden">
          <button
            type="button"
            onClick={() => setShowWeights((v) => !v)}
            aria-expanded={showWeights}
            className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-[color-mix(in_srgb,var(--color-volt)_6%,transparent)]"
          >
            <div className="flex items-center gap-3">
              <StationIcon />
              <span className="font-display text-xl uppercase tracking-wide">
                Equipment Weights
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-muted)]">
                {weights.length} divisions
              </span>
              <span
                className="text-[var(--color-volt)] transition-transform duration-200"
                style={{ transform: showWeights ? "rotate(180deg)" : "rotate(0)" }}
              >
                ▾
              </span>
            </div>
          </button>

          {showWeights && (
            <div className="overflow-x-auto border-t border-[var(--color-border)]">
              <table className="w-full min-w-[480px] text-left">
                <thead>
                  <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                    {["Division", "Dumbbell", "Sandbag", "Wall Ball"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-6 py-3 font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-muted)]"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {weights.map((row, i) => (
                    <tr
                      key={row.division}
                      className={`border-b border-[var(--color-border)] last:border-b-0 transition-colors hover:bg-[color-mix(in_srgb,var(--color-volt)_3%,transparent)] ${
                        i % 2 === 0 ? "" : "bg-[var(--color-surface)]"
                      }`}
                    >
                      <td className="px-6 py-3.5 font-display text-sm uppercase tracking-wide text-[var(--color-fg)]">
                        {row.division}
                      </td>
                      <td className="px-6 py-3.5 font-mono text-sm text-[var(--color-fg-muted)]">
                        {row.dumbbell}
                      </td>
                      <td className="px-6 py-3.5 font-mono text-sm text-[var(--color-fg-muted)]">
                        {row.sandbag}
                      </td>
                      <td className="px-6 py-3.5 font-mono text-sm text-[var(--color-fg-muted)]">
                        {row.wallBall}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
