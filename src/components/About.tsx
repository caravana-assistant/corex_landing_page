import { site } from "@/lib/site";

// COR-169 P2b: About section on the Index page.
export function About() {
  const about = site.about;
  return (
    <section id="about" className="border-b border-[var(--color-border)] px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1100px]">
        <p className="eyebrow mb-4">About</p>
        <h2 className="font-display text-3xl leading-tight md:text-5xl">{about.title}</h2>
        <div className="mt-6 flex flex-col gap-4 md:max-w-3xl">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">{p}</p>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {about.stats.map((s) => (
            <div key={s.label} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="font-display text-2xl text-[var(--color-volt)] md:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
