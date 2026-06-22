import type { EventPhase } from "@/lib/eventPhase";
import { Countdown } from "@/components/Countdown";

interface Props {
  phase: EventPhase;
  venue?: string;
  city?: string;
  registerHref?: string;
  /** ISO of the event start — used for the EVE countdown (P2). */
  targetISO?: string;
}

// COR-169 P1: a top strip that auto-switches by event phase (pre/eve/day/post).
// Reuses current data (register link, venue, My CoreX); dedicated per-phase
// pages/visuals are P2. Hidden in the default PRE phase (the hero already covers it).
export function PhaseBanner({ phase, venue, city, registerHref, targetISO }: Props) {
  if (phase === "pre") return null;

  const place = [venue, city].filter(Boolean).join(", ");
  const base =
    "relative z-20 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2.5 text-center text-sm font-medium";

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

  // post
  return (
    <div className={`${base} border-b border-sky-500/40 bg-sky-500/10 text-sky-100`}>
      <span className="font-display tracking-wide text-sky-300">RESULTS ARE IN</span>
      <span className="text-sky-100/90">See how it went and what's next.</span>
      <a href="/my-schedule" className="rounded border border-sky-400/60 bg-sky-400/10 px-2 py-0.5 font-semibold text-sky-200 hover:bg-sky-400/20">My CoreX</a>
      {registerHref && (
        <a href={registerHref} className="rounded border border-neutral-500/50 px-2 py-0.5 text-neutral-200 hover:bg-white/5">Next stage</a>
      )}
    </div>
  );
}
