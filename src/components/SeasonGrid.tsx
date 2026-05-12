import { useRef } from "react";
import { stages, type Stage, type StageStatus } from "@/lib/stages";

type Props = {
  selected: number | null;
  onSelect: (n: number) => void;
};

export function SeasonGrid({ selected, onSelect }: Props) {
  return (
    <section
      id="season"
      className="relative border-b border-[var(--color-border)] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <header className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">8 Stages · 1 Season</p>
            <h2 className="font-display text-4xl leading-none md:text-6xl lg:text-7xl">
              Pick a stage.{" "}
              <span className="text-[var(--color-volt)]">See the proof.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-[var(--color-fg-muted)]">
            Click any stage to view its photo gallery and podium results — past,
            present, and what&rsquo;s next.
          </p>
        </header>

        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {stages.map((stage) => (
            <StageCard
              key={stage.number}
              stage={stage}
              selected={selected !== null && stage.number === selected}
              onClick={() => onSelect(stage.number)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function StageCard({
  stage,
  selected,
  onClick,
}: {
  stage: Stage;
  selected: boolean;
  onClick: () => void;
}) {
  const tone = toneFor(stage.status);
  const cardRef = useRef<HTMLButtonElement | null>(null);

  function onMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.setProperty("--rx", `${(0.5 - py) * 6}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 6}deg`);
  }
  function onLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  }

  const isInteractive =
    stage.status === "completed" ||
    stage.status === "current" ||
    stage.status === "postponed" ||
    stage.status === "loading";

  return (
    <li className="contents">
      <button
        ref={cardRef}
        type="button"
        onClick={onClick}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        aria-pressed={selected}
        className={`stage-card group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl border p-4 text-left md:rounded-3xl md:p-5 ${
          tone.cardClass
        } ${selected ? "stage-card--selected" : ""}`}
      >
        {/* Volt cursor spotlight (interactive cards only) */}
        {isInteractive && (
          <span
            aria-hidden
            className="stage-card-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        {/* Soft border glow on hover */}
        {isInteractive && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-[var(--color-volt)] transition-all duration-300 group-hover:ring-1 md:rounded-3xl"
          />
        )}

        {/* Card content — gets a slight Z-lift on hover via CSS */}
        <div className="stage-card-inner relative flex h-full flex-col justify-between">
          {/* Status pill */}
          <div className="flex items-center justify-between">
            <span className={`stage-status ${tone.statusClass}`}>
              {stage.status === "loading" && (
                <span aria-hidden className="stage-status-dot" />
              )}
              {tone.statusLabel}
            </span>
            {selected ? (
              <span
                aria-hidden
                className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-volt)]"
              >
                Viewing →
              </span>
            ) : (
              isInteractive && (
                <span
                  aria-hidden
                  className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-faint)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:text-[var(--color-volt)]"
                >
                  Open →
                </span>
              )
            )}
          </div>

          {/* Big stage number */}
          <div className="flex-1 flex items-center justify-center py-4">
            <span
              className={`stage-card-number font-display leading-none ${tone.numberClass}`}
              style={{ fontSize: "clamp(72px, 12vw, 160px)" }}
            >
              {stage.numberPadded}
            </span>
          </div>

          {/* Footer info */}
          <div className="space-y-1">
            {stage.dateShort ? (
              <p
                className={`font-display text-lg uppercase tracking-wide ${tone.dateClass}`}
              >
                {stage.dateShort}
              </p>
            ) : (
              <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-fg-faint)]">
                Date TBC
              </p>
            )}
            {(stage.venue || stage.city) && (
              <p className={`text-xs leading-tight ${tone.venueClass}`}>
                {stage.venue ? `${stage.venue}` : ""}
                {stage.venue && stage.city ? ", " : ""}
                {stage.city ?? ""}
              </p>
            )}
            {!stage.venue && stage.city && stage.status === "loading" && (
              <p className="text-xs leading-tight text-[var(--color-fg-muted)]">
                Venue confirming
              </p>
            )}
            {!stage.venue && !stage.city && (
              <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-fg-faint)]">
                Venue TBC
              </p>
            )}
          </div>
        </div>
      </button>
    </li>
  );
}

function toneFor(status: StageStatus): {
  cardClass: string;
  statusLabel: string;
  statusClass: string;
  numberClass: string;
  dateClass: string;
  venueClass: string;
} {
  switch (status) {
    case "completed":
      return {
        cardClass:
          "border-[var(--color-border)] bg-[var(--color-surface)] grayscale-[0.6] opacity-90 hover:opacity-100 hover:grayscale-0 hover:border-[var(--color-fg-muted)]",
        statusLabel: "Completed",
        statusClass:
          "border-[var(--color-fg-muted)] text-[var(--color-fg-muted)]",
        numberClass: "text-[var(--color-fg-muted)]",
        dateClass: "text-[var(--color-fg)]",
        venueClass: "text-[var(--color-fg-muted)]",
      };
    case "current":
      return {
        cardClass:
          "border-[var(--color-volt)] bg-[color-mix(in_srgb,var(--color-volt)_10%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-volt)_18%,transparent)]",
        statusLabel: "Current",
        statusClass:
          "border-[var(--color-volt)] text-[var(--color-volt)]",
        numberClass: "text-[var(--color-volt)]",
        dateClass: "text-[var(--color-fg)]",
        venueClass: "text-[var(--color-fg)]",
      };
    case "postponed":
      return {
        cardClass:
          "border-amber-400/60 bg-amber-400/[0.06] hover:border-amber-300 hover:bg-amber-400/[0.10]",
        statusLabel: "Postponed",
        statusClass:
          "border-amber-400/70 text-amber-300",
        numberClass: "text-amber-300/90",
        dateClass: "text-amber-300",
        venueClass: "text-[var(--color-fg-muted)]",
      };
    case "loading":
      return {
        cardClass:
          "border-[var(--color-border-strong)] bg-[var(--color-surface)] hover:border-[var(--color-volt)]",
        statusLabel: "Confirming",
        statusClass:
          "border-[var(--color-volt-dim, #5f8b23)] text-[var(--color-volt)]",
        numberClass: "text-[var(--color-fg-muted)]",
        dateClass: "text-[var(--color-fg)]",
        venueClass: "text-[var(--color-fg-muted)]",
      };
    case "tbc":
    default:
      return {
        cardClass:
          "border-[var(--color-border)] bg-[var(--color-surface)] opacity-50 hover:opacity-70",
        statusLabel: "TBC",
        statusClass:
          "border-[var(--color-fg-faint)] text-[var(--color-fg-faint)]",
        numberClass: "text-[var(--color-fg-faint)]",
        dateClass: "text-[var(--color-fg-faint)]",
        venueClass: "text-[var(--color-fg-faint)]",
      };
  }
}
