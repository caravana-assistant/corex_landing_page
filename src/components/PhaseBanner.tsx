import type { EventPhase } from "@/lib/eventPhase";

interface Props {
  phase: EventPhase;
  venue?: string;
  city?: string;
  registerHref?: string;
}

// COR-169 P1: a top strip that auto-switches by event phase (pre/eve/day/post).
// Reuses current data (register link, venue, My CoreX); dedicated per-phase
// pages/visuals are P2. Hidden in the default PRE phase (the hero already covers it).
export function PhaseBanner({ phase, venue, city, registerHref }: Props) {
  if (phase === "pre") return null;

  const place = [venue, city].filter(Boolean).join(", ");
  const base =
    "relative z-20 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2.5 text-center text-sm font-medium";

  if (phase === "eve") {
    return (
      <div className={`${base} border-b border-amber-500/40 bg-amber-500/10 text-amber-200`}>
        <span className="font-display tracking-wide text-amber-300">TOMORROW{place ? ` · ${place}` : ""}</span>
        <span className="text-amber-100/90">Per-division check-in times are released once registration closes — find yours at</span>
        <a href="/my-schedule" className="rounded border border-amber-400/60 bg-amber-400/10 px-2 py-0.5 font-semibold text-amber-200 hover:bg-amber-400/20">My CoreX</a>
      </div>
    );
  }

  if (phase === "day") {
    return (
      <div className={`${base} border-b border-lime-500/50 bg-lime-500/15 text-lime-100`}>
        <span className="font-display tracking-wide text-lime-300">EVENT DAY{place ? ` · ${place}` : ""}</span>
        <span className="text-lime-100/90">Find your heat and check-in time at</span>
        <a href="/my-schedule" className="rounded border border-lime-400/60 bg-lime-400/10 px-2 py-0.5 font-semibold text-lime-200 hover:bg-lime-400/20">My CoreX</a>
      </div>
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
