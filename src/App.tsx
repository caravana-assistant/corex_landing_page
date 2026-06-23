import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Countdown } from "@/components/Countdown";
import { CommunityStrip } from "@/components/CommunityStrip";
import { SeasonGrid } from "@/components/SeasonGrid";
import { StageDetail } from "@/components/StageDetail";
import { ScrollProgress } from "@/components/ScrollProgress";
import { MagneticButton } from "@/components/MagneticButton";
import { Slogan } from "@/components/Slogan";
import { Divisions } from "@/components/Divisions";
import { MySchedule } from "@/components/MySchedule";
import { WhatsAppIcon, MapPinIcon } from "@/components/icons";
import { site, siteFromActiveStage } from "@/lib/site";
import { useStageConfig } from "@/lib/useStageConfig";
import { PhaseBanner } from "@/components/PhaseBanner";
import { getEventPhase, phaseFromQuery } from "@/lib/eventPhase";
import { useHashRoute, navigate } from "@/lib/useHashRoute";
import { About } from "@/components/About";
import { ResultsRankings } from "@/components/ResultsRankings";

export default function App() {
  const { stages: dynamicStages, activeStage } = useStageConfig();

  // Merge site defaults with active stage overrides (falls back to static site if no active stage)
  const activeSite = activeStage
    ? { ...site, ...siteFromActiveStage(activeStage) }
    : site;

  // COR-169 P1: event phase (pre/eve/day/post) auto from current event date,
  // overridable via ?phase= or stage_config.forced_phase.
  const phaseOverride =
    (typeof window !== "undefined" ? phaseFromQuery(window.location.search) : null) ??
    activeStage?.forcedPhase ?? null;
  const eventPhase = getEventPhase(activeStage?.date, Date.now(), phaseOverride);

  // COR-163: multi-page hash routing (index / stages / stage/:n / my-corex).
  const route = useHashRoute();
  // Legacy /my-schedule path → redirect to the hash route.
  if (typeof window !== 'undefined' && window.location.pathname.replace(/\/+$/, '') === '/my-schedule' && !window.location.hash) {
    window.location.replace('/#/my-corex');
  }
  const stageForRoute = route.name === 'stage' ? (dynamicStages.find((s) => s.number === route.n) ?? null) : null;

  if (route.name === 'my-corex') {
    return (
      <ErrorBoundary>
        <div className="flex min-h-screen flex-col bg-[var(--color-bg)] text-[var(--color-fg)]">
          <Header stageLabel={activeSite.stage.label} stageTotal={activeSite.stage.total} registerHref={activeSite.cta.primary.href} />
          <main className="flex-1 pt-20">
            <MySchedule eventId={activeStage?.eventId ?? null} />
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)] text-[var(--color-fg)]">
      <ScrollProgress />
      <Header stageLabel={activeSite.stage.label} stageTotal={activeSite.stage.total} registerHref={activeSite.cta.primary.href} />
      <main className="flex-1 pt-20">
        <PhaseBanner phase={eventPhase} venue={activeStage?.venue} city={activeStage?.city} registerHref={activeSite.cta.primary.href} targetISO={activeSite.event.dateISO} recap={activeStage?.recap} />
        {/* HERO — index page only */}
        {route.name === "index" && (
        <section
          id="top"
          className="grain relative isolate flex min-h-[calc(100vh-5rem)] flex-col overflow-hidden border-b border-[var(--color-border)]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-[-1vw] top-[6vh] select-none font-display text-[28vw] leading-none text-transparent md:text-[20vw]"
            style={{ WebkitTextStroke: "1px rgba(136,197,71,0.10)" }}
          >
            {String(activeSite.stage.number).padStart(2, "0")}
          </div>

          {/* Brand hero background — green X over wave texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: "url(/landingnodejs/brand/hero-bg.jpg)",
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
                {activeSite.stage.label} / {String(activeSite.stage.total).padStart(2, "0")}
              </p>
            </div>

            {/* Slogan — dynamic letter cascade + breathing volt + tilt parallax */}
            <Slogan
              line1={site.slogan.line1}
              line2={site.slogan.line2}
              line3={site.slogan.line3}
              className="mt-12 md:mt-0"
            />

            {/* DATE STAMP — high prominence */}
            <div className="mt-10 flex flex-col gap-8 md:mt-0 md:flex-row md:items-end md:justify-between md:gap-12">
              {/* Left: date + venue */}
              <div className="flex-1 max-w-2xl">
                <div className="flex items-end gap-5">
                  <span className="font-display text-7xl leading-none text-[var(--color-volt)] md:text-9xl">
                    {activeSite.event.day}
                  </span>
                  <div className="pb-2">
                    <p className="font-display text-3xl leading-none md:text-5xl">
                      {activeSite.event.monthShort}
                    </p>
                    <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-fg-muted)] md:text-sm">
                      {activeSite.event.weekday} · {activeSite.event.year}
                    </p>
                  </div>
                  {activeSite.event.timeWindow && (
                    <>
                      <span
                        aria-hidden
                        className="ml-2 hidden h-12 w-px bg-[var(--color-border-strong)] md:block md:h-20"
                      />
                      <p className="hidden pb-2 font-mono text-sm uppercase tracking-widest text-[var(--color-fg-muted)] md:block">
                        {activeSite.event.timeWindow}
                      </p>
                    </>
                  )}
                </div>

                {/* Venue → maps link or city-only */}
                {(() => {
                  const ev = activeSite.event;
                  const locationLabel = ev.venue || ev.city;
                  if (!locationLabel) return null;
                  const hasMap = !!ev.mapsHref;
                  const inner = (
                    <>
                      <MapPinIcon className="h-6 w-6 shrink-0 text-[var(--color-volt)]" />
                      <span className="font-display text-2xl leading-tight md:text-3xl">
                        {locationLabel}
                      </span>
                      {ev.venue && ev.city && (
                        <span className="text-sm uppercase tracking-widest text-[var(--color-fg-muted)]">
                          {ev.city}
                        </span>
                      )}
                      {!ev.venue && (
                        <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-fg-faint)]">
                          Venue TBC
                        </span>
                      )}
                    </>
                  );
                  return hasMap ? (
                    <a href={ev.mapsHref} target="_blank" rel="noopener noreferrer" className="group mt-6 inline-flex items-baseline gap-3 link-uline">
                      {inner}
                      <span aria-hidden className="ml-1 text-sm text-[var(--color-volt)] transition-transform group-hover:translate-x-1">↗</span>
                    </a>
                  ) : (
                    <div className="mt-6 inline-flex items-baseline gap-3">{inner}</div>
                  );
                })()}

                {activeSite.event.timeWindow && (
                  <p className="mt-4 md:hidden font-mono text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">
                    {activeSite.event.timeWindow}
                  </p>
                )}
              </div>

              {/* Right: countdown + CTAs */}
              <div className="flex flex-col gap-5 md:items-end">
                <Countdown targetISO={activeSite.event.dateISO} />
                <div className="flex flex-col gap-3 md:flex-row">
                  <MagneticButton
                    href={activeSite.cta.primary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-volt justify-center"
                    strength={0.3}
                  >
                    {activeSite.cta.primary.label}
                    <span aria-hidden>→</span>
                  </MagneticButton>
                  <a href="#/my-corex" className="btn-ghost justify-center">My CoreX</a>
                  <a href="#/stages" className="btn-ghost justify-center">Stages</a>
                </div>
                <a
                  href={site.channels.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-volt)] md:self-end"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[var(--color-volt)]" />
                  Join WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="relative border-t border-[var(--color-border)]">
            <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-5 py-4 text-xs uppercase tracking-widest text-[var(--color-fg-muted)] md:px-10">
              <span>10 Divisions</span>
              <span aria-hidden className="text-[var(--color-border-strong)]">/</span>
              <span>For Time</span>
              <span aria-hidden className="text-[var(--color-border-strong)]">/</span>
              <span>Family Friendly</span>
              <span aria-hidden className="text-[var(--color-border-strong)]">/</span>
              <span>Spectators Free</span>
            </div>
          </div>
        </section>
        )}

        {/* INDEX: hero (above) + community + about + divisions + results/rankings */}
        {route.name === "index" && (
          <>
            <CommunityStrip />
            <About />
            <Divisions />
            <ResultsRankings stages={dynamicStages} />
          </>
        )}

        {/* STAGES: full season grid → click navigates to the stage page */}
        {route.name === "stages" && (
          <SeasonGrid
            stages={dynamicStages}
            selected={null}
            onSelect={(n) => navigate(`/stage/${n}`)}
          />
        )}

        {/* STAGE: individual stage page */}
        {route.name === "stage" && stageForRoute && (
          <StageDetail stage={stageForRoute} onClose={() => navigate("/stages")} />
        )}
        {route.name === "stage" && !stageForRoute && (
          <div className="mx-auto max-w-[1440px] px-5 py-32 text-center md:px-10">
            <p className="font-display text-2xl text-[var(--color-fg-muted)]">Stage not found.</p>
            <button onClick={() => navigate("/stages")} className="btn-volt mt-6">View all stages</button>
          </div>
        )}
      </main>
      <Footer />
    </div>
    </ErrorBoundary>
  );
}
