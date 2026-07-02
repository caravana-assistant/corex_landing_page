import { useState, useEffect } from "react";
import { Results } from "@/components/Results";
import type { Stage } from "@/lib/stages";

type Props = { stages: Stage[] };

export function ResultsPage({ stages }: Props) {
  const eligible = stages.filter((s) => s.status !== "tbc");
  const [selected, setSelected] = useState<number | null>(
    eligible.find((s) => s.status === "current")?.number ??
      eligible[eligible.length - 1]?.number ??
      null,
  );

  // keep selection valid as stages load in dynamically
  useEffect(() => {
    if (selected === null && eligible.length > 0) {
      setSelected(eligible.find((s) => s.status === "current")?.number ?? eligible[eligible.length - 1].number);
    }
  }, [eligible, selected]);

  const activeStage = stages.find((s) => s.number === selected) ?? null;

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
      <header className="mb-10">
        <p className="eyebrow mb-3">Season Results</p>
        <h1 className="font-display text-4xl leading-none md:text-6xl">
          Pick a stage. <span className="text-[var(--color-volt)]">See the results.</span>
        </h1>
      </header>

      <div className="mb-10 flex flex-wrap gap-2">
        {eligible.map((s) => (
          <button
            key={s.number}
            type="button"
            onClick={() => setSelected(s.number)}
            className={`font-mono text-[11px] uppercase tracking-[0.18em] px-4 py-2 border transition-colors ${
              selected === s.number
                ? "border-[var(--color-volt)] bg-[var(--color-volt)] text-black"
                : "border-[var(--color-border)] text-[var(--color-fg-muted)] hover:border-[var(--color-border-strong)]"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {activeStage ? (
        <Results stage={activeStage} />
      ) : (
        <p className="text-[var(--color-fg-muted)]">No stage selected.</p>
      )}
    </section>
  );
}
