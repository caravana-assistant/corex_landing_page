import { useState } from "react";

const sequence = [
  { type: "run", label: "150m Run" },
  { type: "station", label: "40 Wall Balls" },
  { type: "run", label: "150m Run" },
  { type: "station", label: "40m Burpee Broad Jump" },
  { type: "run", label: "150m Run" },
  { type: "station", label: "40m Sandbag Lunges" },
  { type: "run", label: "150m Run" },
  { type: "station", label: "80m Farmers Carry" },
  { type: "run", label: "150m Run" },
  { type: "station", label: "500/400m Row" },
] as const;

const weights = [
  { division: "Men Open", dumbbell: "15kg", sandbag: "20kg", wallBall: "6kg" },
  { division: "Women Open", dumbbell: "10kg", sandbag: "10kg", wallBall: "4kg" },
  { division: "Double Men", dumbbell: "15kg", sandbag: "20kg", wallBall: "6kg" },
  { division: "Double Women", dumbbell: "10kg", sandbag: "10kg", wallBall: "4kg" },
  { division: "Relay", dumbbell: "15/10kg", sandbag: "20/10kg", wallBall: "6/4kg" },
  { division: "Boys 14-17", dumbbell: "6kg", sandbag: "\u2014", wallBall: "6kg" },
  { division: "Girls 14-17", dumbbell: "4kg", sandbag: "\u2014", wallBall: "4kg" },
  { division: "Boys 11-13", dumbbell: "\u2014", sandbag: "\u2014", wallBall: "4kg" },
  { division: "Girls 11-13", dumbbell: "\u2014", sandbag: "\u2014", wallBall: "2kg" },
  { division: "Kids 7-10", dumbbell: "2kg", sandbag: "\u2014", wallBall: "\u2014" },
  { division: "Men POD", dumbbell: "6kg", sandbag: "\u2014", wallBall: "4kg" },
  { division: "Women POD", dumbbell: "4kg", sandbag: "\u2014", wallBall: "2kg" },
] as const;

export function Workout() {
  const [showWeights, setShowWeights] = useState(false);

  return (
    <section
      id="workout"
      className="border-b border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <p className="eyebrow mb-4">Race Format</p>
        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight mb-4">
          The Challenge
        </h2>
        <p className="max-w-2xl text-base text-[var(--color-fg-muted)] md:text-lg mb-12">
          Run-station intervals. 150m runs between functional fitness stations.
        </p>

        {/* Workout sequence */}
        <div className="relative mb-12">
          {/* Vertical line connector */}
          <div
            aria-hidden
            className="absolute left-[15px] top-3 bottom-3 w-px bg-[var(--color-border)] md:hidden"
          />

          {/* Desktop horizontal flow */}
          <div className="hidden md:flex md:flex-wrap md:items-center md:gap-0">
            {sequence.map((step, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center gap-1 px-2 py-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display text-sm uppercase tracking-wide whitespace-nowrap ${
                      step.type === "run"
                        ? "text-[var(--color-volt)]"
                        : "text-[var(--color-fg)]"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < sequence.length - 1 && (
                  <span
                    aria-hidden
                    className="text-[var(--color-border-strong)] text-xs"
                  >
                    /
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Mobile vertical flow */}
          <div className="flex flex-col gap-0 md:hidden">
            {sequence.map((step, i) => (
              <div key={i} className="relative flex items-start gap-4 py-2 pl-2">
                <div className="relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]">
                  <span className="font-mono text-[10px] text-[var(--color-fg-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <span
                  className={`pt-1 font-display text-base uppercase tracking-wide ${
                    step.type === "run"
                      ? "text-[var(--color-volt)]"
                      : "text-[var(--color-fg)]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-10 space-y-3">
          <p className="text-sm text-[var(--color-fg-muted)] md:text-base">
            <span className="font-display uppercase text-[var(--color-volt)]">Doubles:</span>{" "}
            same format, synchro runs, higher reps (60), 1000/800m Row.
          </p>
          <p className="text-sm text-[var(--color-fg-muted)] md:text-base">
            <span className="font-display uppercase text-[var(--color-volt)]">Kids & POD:</span>{" "}
            adapted workouts with age-appropriate movements and loads.
          </p>
        </div>

        {/* Weights table — collapsible */}
        <div className="rounded-lg border border-[var(--color-border)]">
          <button
            type="button"
            onClick={() => setShowWeights((v) => !v)}
            className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-[color-mix(in_srgb,var(--color-volt)_6%,transparent)]"
          >
            <span className="font-display text-lg uppercase tracking-wide">
              Equipment Weights
            </span>
            <span
              className="text-[var(--color-volt)] transition-transform duration-200"
              style={{ transform: showWeights ? "rotate(180deg)" : "rotate(0)" }}
            >
              ▾
            </span>
          </button>

          {showWeights && (
            <div className="overflow-x-auto border-t border-[var(--color-border)]">
              <table className="w-full min-w-[480px] text-left">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
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
                  {weights.map((row) => (
                    <tr
                      key={row.division}
                      className="border-b border-[var(--color-border)] last:border-b-0"
                    >
                      <td className="px-6 py-3 font-display text-sm uppercase tracking-wide text-[var(--color-fg)]">
                        {row.division}
                      </td>
                      <td className="px-6 py-3 font-mono text-sm text-[var(--color-fg-muted)]">
                        {row.dumbbell}
                      </td>
                      <td className="px-6 py-3 font-mono text-sm text-[var(--color-fg-muted)]">
                        {row.sandbag}
                      </td>
                      <td className="px-6 py-3 font-mono text-sm text-[var(--color-fg-muted)]">
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
