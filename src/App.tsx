import { Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { HomePage } from "@/pages/HomePage";
import { StagesPage } from "@/pages/StagesPage";
import { ResultsPage } from "@/pages/ResultsPage";
import { MyCorexPage } from "@/pages/MyCorexPage";
import { site, siteFromActiveStage, type SiteConfig } from "@/lib/site";
import { useStageConfig } from "@/lib/useStageConfig";

export default function App() {
  const { stages: dynamicStages, activeStage } = useStageConfig();

  // Merge site defaults with active stage overrides (falls back to static site if no active stage).
  // `site` is `as const` (literal types); cast to the widened SiteConfig so both ternary
  // branches (literal `site` vs. plain-string merged object) unify to the same shape.
  const activeSite = (activeStage
    ? { ...site, ...siteFromActiveStage(activeStage) }
    : site) as SiteConfig;

  // registration_open drives the header CTA (Register vs Event Schedule). Defaults to
  // true (register shown) until the DB column is backfilled — see COR-217 migration —
  // so today's live CTA behavior doesn't change until Fernando explicitly closes it.
  const registrationOpen = activeStage?.registrationOpen ?? true;

  return (
    <ErrorBoundary>
      <div className="flex min-h-screen flex-col bg-[var(--color-bg)] text-[var(--color-fg)]">
        <ScrollProgress />
        <Header
          stageLabel={activeSite.stage.label}
          stageTotal={activeSite.stage.total}
          registerHref={activeSite.cta.primary.href}
          registrationOpen={registrationOpen}
        />
        <main className="flex-1 pt-20">
          <Routes>
            <Route path="/" element={<HomePage activeSite={activeSite} />} />
            <Route
              path="/stages"
              element={<StagesPage dynamicStages={dynamicStages} activeStage={activeStage} />}
            />
            <Route path="/results" element={<ResultsPage stages={dynamicStages} />} />
            <Route path="/my-corex" element={<MyCorexPage eventId={activeStage?.eventId ?? null} />} />
            {/* back-compat: old path some athletes may have bookmarked */}
            <Route path="/my-schedule" element={<Navigate to="/my-corex" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
