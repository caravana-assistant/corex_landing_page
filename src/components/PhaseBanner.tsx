import type { EventPhase } from "@/lib/eventPhase";
import { Countdown } from "@/components/Countdown";

interface Props {
  phase: EventPhase;
  venue?: string;
  city?: string;
  registerHref?: string;
  /** ISO of the event start — used for the EVE countdown (P2). */
  targetISO?: string;
  /** Post-event recap stats (P3). */
  recap?: { athletes: number; divisions: number; lanes?: number };
}

// COR-169 P1: a top strip that auto-switches by event phase (pre/eve/day/post).
// Reuses current data (register link, venue, My CoreX); dedicated per-phase
// pages/visuals are P2. Hidden in the default PRE phase (the hero already covers it).
export function PhaseBanner({ phase, venue, city, registerHref, targetISO, recap }: Props) {
  if (phase === "pre") return null;

  const place = [venue, city].filter(Boolean).join(", ");

  // EVE (D-1): dedicated block — countdown + check-in card (P2).
  if (phase === "eve") {
    return (
      <section className="relative z-20 border-b border-amber-500/40 bg-gradient-to-b from-amber-500/15 to-transparent px-5 py-8">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-5 text-center">
          <span className="font-display text-2xl tracking-wide text-amber-300 md:text-3xl">
            TOMORROW{place ? ` · ${place}` : ""}
          </span>
          {targetISO && (
            <div className="flex justify-center text-amber-100">
              <Countdown targetISO={targetISO} />
            </div>
          )}
          <p className="max-w-2xl text-sm text-amber-100/90 md:text-base">
            Per-division check-in times are released once registration closes. Find your time and heat at <strong>My CoreX</strong>.
          </p>
          <a href="/my-schedule" className="rounded-md border border-amber-400/60 bg-amber-400/15 px-4 py-2 font-semibold text-amber-100 hover:bg-amber-400/25">
            Open My CoreX →
          </a>
        </div>
      </section>
    );
  }

  // DAY (D0): dedicated "live" block (P2).
  if (phase === "day") {
    return (
      <section className="relative z-20 border-b border-lime-500/50 bg-gradient-to-b from-lime-500/20 to-transparent px-5 py-8">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 font-display text-2xl tracking-wide text-lime-300 md:text-3xl">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-lime-400" aria-hidden /> EVENT DAY {place ? `· ${place}` : ""}
          </span>
          <p className="max-w-2xl text-sm text-lime-100/90 md:text-base">
            It's happening today. Find your heat, lane and check-in time at <strong>My CoreX</strong>.
          </p>
          <a href="/my-schedule" className="rounded-md border border-lime-400/60 bg-lime-400/15 px-4 py-2 font-semibold text-lime-100 hover:bg-lime-400/25">
            Open My CoreX →
          </a>
        </div>
      </section>
    );
  }

  // POST (D+1…): dedicated results-first block (P3).
  return (
    <section className="relative z-20 border-b border-sky-500/40 bg-gradient-to-b from-sky-500/15 to-transparent px-5 py-8">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-5 text-center">
        <span className="font-display text-2xl tracking-wide text-sky-300 md:text-3xl">
          RESULTS ARE IN{place ? ` · ${place}` : ""}
        </span>
        {recap && (
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <Stat value={recap.athletes} label="Athletes" />
            <Stat value={recap.divisions} label="Divisions" />
            {recap.lanes != null && <Stat value={recap.lanes} label="Lanes" />}
          </div>
        )}
        <p className="max-w-2xl text-sm text-sky-100/90 md:text-base">
          Check your time and placement, then lock in for the next stage.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="/my-schedule" className="rounded-md border border-sky-400/60 bg-sky-400/15 px-4 py-2 font-semibold text-sky-100 hover:bg-sky-400/25">See your results →</a>
          {registerHref && (
            <a href={registerHref} className="rounded-md border border-neutral-500/50 px-4 py-2 font-semibold text-neutral-200 hover:bg-white/5">Next stage</a>
          )}
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-4xl tabular-nums leading-none text-sky-200 md:text-5xl">{value}</span>
      <span className="mt-1 text-xs uppercase tracking-widest text-sky-300/70">{label}</span>
    </div>
  );
}
