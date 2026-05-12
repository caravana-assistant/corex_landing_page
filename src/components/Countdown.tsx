import { useEffect, useState } from "react";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: Date): Parts {
  const ms = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

export function Countdown({ targetISO }: { targetISO: string }) {
  const target = new Date(targetISO);
  const [parts, setParts] = useState<Parts>(() => diff(target));

  useEffect(() => {
    const t = window.setInterval(() => setParts(diff(target)), 1000);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetISO]);

  const cells: { value: number; label: string }[] = [
    { value: parts.days, label: "Days" },
    { value: parts.hours, label: "Hours" },
    { value: parts.minutes, label: "Min" },
    { value: parts.seconds, label: "Sec" },
  ];

  return (
    <div
      role="timer"
      aria-label={`${parts.days} days to event`}
      className="flex items-baseline gap-3 md:gap-5"
    >
      {cells.map((c, i) => (
        <div key={c.label} className="flex items-baseline gap-3 md:gap-5">
          <div className="flex flex-col items-start">
            <span className="font-display text-4xl tabular-nums leading-none text-[var(--color-fg)] md:text-6xl">
              {String(c.value).padStart(2, "0")}
            </span>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-muted)] md:text-[11px]">
              {c.label}
            </span>
          </div>
          {i < cells.length - 1 && (
            <span
              aria-hidden
              className="font-display text-3xl leading-none text-[var(--color-volt)] md:text-5xl"
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
