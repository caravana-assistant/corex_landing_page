import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CommunityStrip } from "@/components/CommunityStrip";
import { SeasonGrid } from "@/components/SeasonGrid";
import { StageDetail } from "@/components/StageDetail";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Slogan } from "@/components/Slogan";
import { WhatsAppIcon } from "@/components/icons";
import { useSelectedStage } from "@/lib/useSelectedStage";
import { site } from "@/lib/site";

export default function App() {
  const [selectedStage, selectStage] = useSelectedStage();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)] text-[var(--color-fg)]">
      <ScrollProgress />
      <Header />
      <main className="flex-1 pt-20">
        {/* HERO */}
        <section
          id="top"
          className="grain relative isolate flex min-h-[calc(100vh-5rem)] flex-col overflow-hidden border-b border-[var(--color-border)]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-[-1vw] top-[6vh] select-none font-display text-[28vw] leading-none text-transparent md:text-[20vw]"
            style={{ WebkitTextStroke: "1px rgba(136,197,71,0.10)" }}
          >
            02
          </div>

          {/* Brand hero background — green X over wave texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: "url(/brand/hero-bg.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "right center",
              maskImage:
                "linear-gradient(to right, transparent 0%, transparent 30%, rgba(0,0,0,0.6) 60%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, transparent 30%, rgba(0,0,0,0.6) 60%, black 100%)",
            }}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute left-[-10%] top-[40%] h-[40vw] w-[40vw] rounded-full opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(136,197,71,0.45), rgba(136,197,71,0))",
            }}
          />

          <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-between px-5 pt-12 pb-12 md:px-10 md:pt-16 md:pb-16">
            {/* Top meta row */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="eyebrow">{site.positioning.eyebrow}</p>
              <p className="eyebrow">
                {site.stage.label} / {String(site.stage.total).padStart(2, "0")}
              </p>
            </div>

            {/* Slogan — dynamic letter cascade + breathing volt + tilt parallax */}
            <Slogan
              line1={site.slogan.line1}
              line2={site.slogan.line2}
              line3={site.slogan.line3}
              className="mt-12 md:mt-0"
            />

            {/* POSTPONED PANEL — replaces date stamp + countdown + register CTA */}
            <div className="mt-10 flex flex-col gap-8 md:mt-0 md:flex-row md:items-end md:justify-between md:gap-12">
              {/* Left: postponed notice */}
              <div className="flex-1 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/70 bg-amber-400/10 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-amber-300">
                  <span className="h-2 w-2 rounded-full bg-amber-300" />
                  {site.postponed.pill}
                </div>

                <h2 className="mt-6 font-display text-4xl leading-[0.95] text-amber-300 md:text-6xl">
                  {site.postponed.headline}
                </h2>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-fg)] md:text-lg">
                  {site.postponed.body}
                </p>

                {/* Venue → maps link (kept for context, dimmed) */}
                <a
                  href={site.event.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex items-baseline gap-3 link-uline opacity-70 hover:opacity-100"
                >
                  <span aria-hidden className="text-[var(--color-volt)]">📍</span>
                  <span className="font-display text-xl leading-tight md:text-2xl">
                    {site.event.venue}
                  </span>
                  <span className="text-sm uppercase tracking-widest text-[var(--color-fg-muted)]">
                    {site.event.city}
                  </span>
                </a>
              </div>

              {/* Right: stay-informed CTAs */}
              <div className="flex flex-col gap-5 md:items-end">
                <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-fg-muted)]">
                  Stay informed
                </p>
                <div className="flex flex-col gap-3 md:flex-row">
                  <a
                    href={site.channels.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-volt justify-center gap-2"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Get the new date
                  </a>
                  <a
                    href={site.channels.instagram[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost justify-center"
                  >
                    {site.channels.instagram[0].handle}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="relative border-t border-[var(--color-border)]">
            <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-5 py-4 text-xs uppercase tracking-widest text-[var(--color-fg-muted)] md:px-10">
              <span>11 Divisions</span>
              <span aria-hidden className="text-[var(--color-border-strong)]">/</span>
              <span>For Time</span>
              <span aria-hidden className="text-[var(--color-border-strong)]">/</span>
              <span>Family Friendly</span>
              <span aria-hidden className="text-[var(--color-border-strong)]">/</span>
              <span className="text-amber-300">New Date Soon</span>
            </div>
          </div>
        </section>

        <SeasonGrid
          selected={selectedStage?.number ?? null}
          onSelect={(n) => {
            selectStage(n);
            // Smooth-scroll to the detail block after state updates
            requestAnimationFrame(() => {
              document
                .getElementById("stage-detail")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            });
          }}
        />
        {selectedStage && (
          <StageDetail
            stage={selectedStage}
            onClose={() => selectStage(null)}
          />
        )}
        <CommunityStrip />

        {/* Phase 1 placeholder for upcoming sections */}
        <section className="border-b border-[var(--color-border)] py-24 md:py-32">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10">
            <p className="eyebrow mb-8">Coming next</p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 md:gap-x-7">
              {[
                "11 Divisions",
                "Race Format",
                "Schedule",
                "Registration",
                "Venue",
                "Prizes",
                "Downloads",
                "FAQ",
              ].map((item, i, arr) => {
                const colors = [
                  "text-[var(--color-fg)]",
                  "text-[var(--color-volt)]",
                  "text-[var(--color-fg-muted)]",
                ];
                return (
                  <li
                    key={item}
                    className="flex items-center gap-x-5 whitespace-nowrap font-display text-3xl leading-none md:text-5xl lg:text-6xl"
                  >
                    <span className={colors[i % colors.length]}>{item}</span>
                    {i < arr.length - 1 && (
                      <span
                        aria-hidden
                        className="text-[var(--color-border-strong)]"
                      >
                        ◆
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
