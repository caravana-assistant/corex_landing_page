const timeline = [
  { time: "4:00 PM", activity: "Registration & Check-in" },
  { time: "4:30 PM", activity: "Event Briefing" },
  { time: "5:00 PM", activity: "Competition Starts" },
  { time: "", activity: "Kids \u2192 POD \u2192 Opens \u2192 Doubles \u2192 Relay" },
  { time: "10:00 PM", activity: "Event Close" },
] as const;

export function Schedule() {
  return (
    <section
      id="schedule"
      className="border-b border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <p className="eyebrow mb-4">Schedule</p>
        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight mb-4">
          Event Day
        </h2>
        <p className="text-base text-[var(--color-fg-muted)] md:text-lg mb-12">
          Saturday, 23 May 2026
        </p>

        {/* Timeline */}
        <div className="relative max-w-xl">
          {/* Vertical connector */}
          <div
            aria-hidden
            className="absolute left-[59px] top-4 bottom-4 w-px bg-[var(--color-border)] md:left-[79px]"
          />

          <div className="space-y-0">
            {timeline.map((entry, i) => (
              <div key={i} className="relative flex items-start gap-5 py-4">
                {/* Time */}
                <span className="w-[44px] shrink-0 text-right font-mono text-sm text-[var(--color-volt)] md:w-[64px] md:text-base">
                  {entry.time}
                </span>

                {/* Dot */}
                <div className="relative z-10 mt-1.5 flex h-3 w-3 shrink-0 items-center justify-center">
                  <span
                    className={`block rounded-full ${
                      entry.time
                        ? "h-3 w-3 bg-[var(--color-volt)]"
                        : "h-2 w-2 bg-[var(--color-border-strong)]"
                    }`}
                  />
                </div>

                {/* Activity */}
                <span
                  className={`font-display text-lg uppercase tracking-wide md:text-xl ${
                    entry.time
                      ? "text-[var(--color-fg)]"
                      : "text-[var(--color-fg-muted)] text-base md:text-lg"
                  }`}
                >
                  {entry.activity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <p className="mt-10 max-w-xl text-sm text-[var(--color-fg-muted)] md:text-base">
          Awards after each division, not at end of day. Spectators welcome
          throughout.
        </p>
      </div>
    </section>
  );
}
