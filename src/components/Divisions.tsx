const groups = [
  {
    name: "Kids",
    items: [
      "Kids 7-10",
      "Kids 11-13 Boys / Girls",
      "Kids 14-17 Boys / Girls",
    ],
  },
  {
    name: "People of Determination",
    items: ["POD Men", "POD Women"],
  },
  {
    name: "Open",
    items: ["Open Men", "Open Women"],
  },
  {
    name: "Doubles (Synchro)",
    items: ["Double Men", "Double Women"],
  },
  {
    name: "Relay",
    items: ["Teams of 3"],
  },
];

export function Divisions() {
  return (
    <section
      id="divisions"
      className="border-b border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <p className="eyebrow mb-4">Order of Play</p>
        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight mb-12">
          10 Divisions
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group.name}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-6"
            >
              <h3 className="font-display text-lg uppercase tracking-wide text-[var(--color-volt)] mb-4">
                {group.name}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 font-mono text-sm text-[var(--color-fg-muted)]"
                  >
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-volt)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
