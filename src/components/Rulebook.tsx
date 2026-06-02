import type { Stage } from "@/lib/stages";

const covers = [
  { label: "Race Standards", note: "Movement, lane discipline, penalties" },
  { label: "Scoring & Tiebreakers", note: "Time caps, completion order, dispute flow" },
  { label: "Safety & Conduct", note: "Athlete responsibilities, judge authority" },
] as const;

export function Rulebook({
  stage,
  confirmed = true,
}: {
  stage?: Stage;
  confirmed?: boolean;
}) {
  const pdfHref = stage?.rulebookPdf;

  if (!confirmed || !pdfHref) {
    return (
      <section id="rulebook" className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
          <p className="eyebrow mb-4">Official Document</p>
          <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight mb-4">
            Rulebook
          </h2>
          <div className="flex min-h-[160px] flex-col items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface)] py-10 text-center">
            <p className="font-display text-2xl text-[var(--color-fg-muted)] md:text-3xl">
              Rulebook to be confirmed.
            </p>
            <p className="mt-3 max-w-md font-mono text-xs uppercase tracking-widest text-[var(--color-fg-faint)]">
              Rules and standards will be published before the event
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

  const stageLabel = stage?.label ?? "CoreX";
  const numberPadded = stage?.numberPadded ?? "";
  const venueLine = [stage?.venue, stage?.city].filter(Boolean).join(" · ");
  const pages = stage?.rulebookPages;

  const meta = [
    { label: "Pages", value: pages ? String(pages) : "—" },
    { label: "Format", value: "PDF" },
    { label: "Language", value: "EN" },
    { label: "Updated", value: stage?.rulebookUpdated ?? "—" },
  ] as const;

  return (
    <section id="rulebook" className="border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <p className="eyebrow mb-4">Official Document</p>
        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight mb-4">
          The Rulebook
        </h2>
        <p className="max-w-2xl text-base text-[var(--color-fg-muted)] md:text-lg mb-12">
          Every standard, every penalty, every detail. Read it before you toe the line.
        </p>

        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16 lg:gap-24">
          {/* LEFT — coverage + metadata + actions */}
          <div className="flex flex-col gap-10">
            {/* What's inside */}
            <ul className="flex flex-col">
              {covers.map((item, i) => (
                <li
                  key={item.label}
                  className={`flex items-start gap-5 py-4 ${
                    i < covers.length - 1
                      ? "border-b border-[var(--color-border)]"
                      : ""
                  }`}
                >
                  <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-xl uppercase tracking-tight md:text-2xl">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
                      {item.note}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Metadata grid — blueprint-style */}
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md bg-[var(--color-border)] sm:grid-cols-4">
              {meta.map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col gap-2 bg-[var(--color-bg)] px-4 py-4"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-muted)]">
                    {m.label}
                  </dt>
                  <dd className="font-display text-2xl uppercase tracking-tight text-[var(--color-fg)] md:text-3xl">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={pdfHref}
                download
                className="btn-volt"
                aria-label={`Download CoreX ${stageLabel} Rulebook PDF`}
              >
                <DownloadIcon />
                Download Rulebook
              </a>
              <a
                href={pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                View Online
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>

          {/* RIGHT — document spine visual */}
          <div className="relative mx-auto w-full max-w-sm md:ml-auto">
            <DocumentSpine
              numberPadded={numberPadded}
              stageLabel={stageLabel}
              venueLine={venueLine}
              pages={pages}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
      aria-hidden
    >
      <path d="M8 1.5v9" />
      <path d="M4 7l4 4 4-4" />
      <path d="M2 13.5h12" />
    </svg>
  );
}

function DocumentSpine({
  numberPadded,
  stageLabel,
  venueLine,
  pages,
}: {
  numberPadded: string;
  stageLabel: string;
  venueLine: string;
  pages?: number;
}) {
  return (
    <div
      className="relative aspect-[3/4] w-full overflow-hidden border border-[var(--color-border-strong)] bg-[var(--color-surface)]"
      aria-hidden
    >
      {/* Diagonal hatch background — industrial caution feel */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--color-fg) 0 1px, transparent 1px 12px)",
        }}
      />

      {/* Volt glow corner */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-volt-glow), transparent)",
        }}
      />

      {/* Corner brackets */}
      <Corner className="left-3 top-3" rotate={0} />
      <Corner className="right-3 top-3" rotate={90} />
      <Corner className="right-3 bottom-3" rotate={180} />
      <Corner className="left-3 bottom-3" rotate={270} />

      {/* Top meta row */}
      <div className="absolute left-6 right-6 top-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-muted)]">
        <span>CRX · RB</span>
        <span>S{numberPadded} / 08</span>
      </div>

      {/* Center — giant outline stage number */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-display leading-none text-transparent"
          style={{
            fontSize: "clamp(120px, 22vw, 200px)",
            WebkitTextStroke: "1px var(--color-volt)",
          }}
        >
          {numberPadded}
        </span>
      </div>

      {/* Vertical RULEBOOK on the left edge */}
      <div className="absolute bottom-8 left-6 origin-bottom-left rotate-[-90deg] font-display text-xs uppercase tracking-[0.6em] text-[var(--color-volt)] md:text-sm">
        Rulebook
      </div>

      {/* Bottom block */}
      <div className="absolute inset-x-6 bottom-6 flex flex-col gap-2 border-t border-[var(--color-border-strong)] pt-3">
        <p className="font-display text-xl uppercase leading-none tracking-tight md:text-2xl">
          CoreX
          <span className="ml-2 text-[var(--color-volt)]">·</span>
          <span className="ml-2 text-[var(--color-fg-muted)]">{stageLabel}</span>
        </p>
        <p className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-muted)]">
          <span>{venueLine}</span>
          <span>EN{pages ? ` · ${pages}p` : ""}</span>
        </p>
      </div>
    </div>
  );
}

function Corner({
  className,
  rotate,
}: {
  className: string;
  rotate: 0 | 90 | 180 | 270;
}) {
  return (
    <span
      aria-hidden
      className={`absolute h-3 w-3 ${className}`}
      style={{
        borderTop: "1px solid var(--color-volt)",
        borderLeft: "1px solid var(--color-volt)",
        transform: `rotate(${rotate}deg)`,
      }}
    />
  );
}
