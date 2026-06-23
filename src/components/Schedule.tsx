import type { Stage } from "@/lib/stages";

type Props = {
  activeStage?: Stage | null;
};

export function Schedule({ activeStage }: Props) {
  const dateLabel = activeStage?.date ?? "Date to be confirmed";

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
          {dateLabel}
        </p>

        <div className="flex min-h-[200px] flex-col items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-12 text-center">
          <p className="font-display text-2xl text-[var(--color-fg)] md:text-3xl">
            Check your heat time &amp; schedule
          </p>
          <p className="mt-3 max-w-md text-sm text-[var(--color-fg-muted)] md:text-base">
            Enter the last 4 digits of your phone and your birth year to see your group, check-in and competition time.
          </p>
          <a href={`${import.meta.env.BASE_URL}my-schedule`} className="btn-volt mt-7 text-sm">
            My Start Time
          </a>
        </div>
      </div>
    </section>
  );
}
