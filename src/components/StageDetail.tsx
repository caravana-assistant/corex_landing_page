import { useState } from "react";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Results } from "@/components/Results";
import { Workout } from "@/components/Workout";
import { Rulebook } from "@/components/Rulebook";
import { Venue } from "@/components/Venue";
import { Schedule } from "@/components/Schedule";
import { MySchedule } from "@/components/MySchedule";
import { WhatsAppIcon, MapPinIcon } from "@/components/icons";
import type { Stage } from "@/lib/stages";
import { site } from "@/lib/site";

type Props = {
  stage: Stage;
  onClose?: () => void;
};

type TabKey = "rulebook" | "venue" | "results" | "photos" | "mycorex";
const TABS: { key: TabKey; label: string }[] = [
  { key: "rulebook", label: "Rulebook" },
  { key: "venue", label: "Venue" },
  { key: "results", label: "Results" },
  { key: "photos", label: "Photos" },
  { key: "mycorex", label: "My CoreX" },
];

export function StageDetail({ stage, onClose }: Props) {
  const [tab, setTab] = useState<TabKey>(stage.status === "completed" ? "results" : "rulebook");
  return (
    <section
      id="stage-detail"
      className="relative border-b border-[var(--color-border)] bg-[var(--color-bg)]"
    >
      {/* Stage hero strip */}
      <div className="relative overflow-hidden border-b border-[var(--color-border)]">
        {stage.status === "current" && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage: "url(/landingnodejs/brand/hero-bg.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "right center",
              maskImage:
                "linear-gradient(to right, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 70%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 70%, black 100%)",
            }}
          />
        )}

        {stage.status === "postponed" && (
          <div className="relative border-b border-amber-400/40 bg-amber-400/[0.08]">
            <div className="mx-auto max-w-[1440px] px-5 py-4 md:px-10 md:py-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-amber-300">
                Notice · {site.postponed.headline}
              </p>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-fg)] md:text-base">
                {site.postponed.body}
              </p>
            </div>
          </div>
        )}

        <div className="relative mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-10 md:py-16">
          <div className="flex items-end gap-5">
            <span
              className={`font-display leading-none ${
                stage.status === "current"
                  ? "text-[var(--color-volt)]"
                  : stage.status === "postponed"
                  ? "text-amber-300/90"
                  : "text-[var(--color-fg-muted)]"
              }`}
              style={{ fontSize: "clamp(64px, 11vw, 180px)" }}
            >
              {stage.numberPadded}
            </span>
            <div className="pb-2">
              <p className="eyebrow mb-2">{stage.label}</p>
              <p
                className={`font-display text-2xl uppercase tracking-tight md:text-4xl ${
                  stage.status === "postponed" ? "text-amber-300" : ""
                }`}
              >
                {stage.dateShort ?? "Date TBC"}
              </p>
              <p className="text-sm text-[var(--color-fg-muted)] md:text-base">
                {stage.venue ?? (stage.status === "loading" ? "Venue confirming" : "Venue TBC")}
                {stage.city ? `${stage.venue ? " · " : ""}${stage.city}` : ""}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <StatusBadge stage={stage} />
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close stage detail"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
              >
                <span aria-hidden>×</span> Close
              </button>
            )}
          </div>
        </div>

        {/* Action row — Maps + Register + WhatsApp (per stage status) */}
        <StageActions stage={stage} />
      </div>

      {/* Body — adapts per status */}
      {stage.status === "tbc" ? (
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20"><TbcBody /></div>
      ) : stage.status === "postponed" ? (
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20"><PostponedBody /></div>
      ) : (
        <>
          {/* Tab bar */}
          <div className="sticky top-16 z-30 border-b border-[var(--color-border)] bg-black/80 backdrop-blur-xl md:top-20">
            <div
              role="tablist"
              aria-label="Stage sections"
              className="mx-auto flex max-w-[1440px] gap-1 overflow-x-auto px-5 md:px-10"
            >
              {TABS.map((t) => {
                const active = tab === t.key;
                return (
                  <button
                    key={t.key}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t.key)}
                    className={`shrink-0 border-b-2 px-4 py-4 font-display text-sm uppercase tracking-wide transition-colors ${
                      active
                        ? "border-[var(--color-volt)] text-[var(--color-volt)]"
                        : "border-transparent text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panels */}
          <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-16">
            {tab === "rulebook" && (
              <div className="space-y-16 md:space-y-20">
                <Rulebook stage={stage} confirmed={!!(stage.rulebookPdf || stage.rulebookHref || stage.eventBriefingHref)} />
                <Workout confirmed={!!stage.workoutConfirmed} />
              </div>
            )}
            {tab === "venue" && (
              <div className="space-y-16 md:space-y-20">
                <Venue activeStage={stage} />
                <Schedule activeStage={stage} />
              </div>
            )}
            {tab === "results" && <Results stage={stage} />}
            {tab === "photos" && (
              stage.photos.length > 0
                ? <PhotoGallery stage={stage} />
                : <p className="py-16 text-center text-sm text-[var(--color-fg-muted)]">Photos will be posted here after the event.</p>
            )}
            {tab === "mycorex" && <MySchedule eventId={stage.eventId ?? null} />}
          </div>
        </>
      )}
    </section>
  );
}

function StatusBadge({ stage }: { stage: Stage }) {
  if (stage.status === "current") {
    return (
      <span className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--color-volt)] bg-[color-mix(in_srgb,var(--color-volt)_14%,transparent)] px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-[var(--color-volt)]">
        <span className="h-2 w-2 rounded-full bg-[var(--color-volt)]" />
        Current Stage · Register Open
      </span>
    );
  }
  if (stage.status === "postponed") {
    return (
      <span className="inline-flex items-center gap-2 self-start rounded-full border border-amber-400/70 bg-amber-400/10 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-amber-300">
        <span className="h-2 w-2 rounded-full bg-amber-300" />
        Postponed · New Date Soon
      </span>
    );
  }
  if (stage.status === "completed") {
    return (
      <span className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--color-volt)] bg-[var(--color-volt)]/10 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-[var(--color-volt)]">
        Completed · View Results ↓
      </span>
    );
  }
  if (stage.status === "loading") {
    return (
      <span className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--color-volt-dim,#5f8b23)] px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-[var(--color-volt)]">
        <span className="stage-status-dot" />
        Confirming details
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--color-fg-faint)] px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-[var(--color-fg-faint)]">
      To be confirmed
    </span>
  );
}

function StageActions({ stage }: { stage: Stage }) {
  const showRegister = stage.status === "current" && !!stage.registerHref;
  const showMaps = !!stage.mapsHref && stage.status !== "postponed";
  const showWhatsApp =
    stage.status === "current" ||
    stage.status === "postponed" ||
    stage.status === "loading" ||
    stage.status === "tbc";

  if (!showRegister && !showMaps && !showWhatsApp) return null;

  return (
    <div className="relative mx-auto flex max-w-[1440px] flex-wrap items-center gap-3 border-t border-[var(--color-border)] px-5 py-5 md:gap-4 md:px-10">
      {showRegister && stage.registerHref && (
        <a
          href={stage.registerHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-volt text-xs md:text-sm"
        >
          Register Now
          <span aria-hidden>→</span>
        </a>
      )}
      {showWhatsApp && (
        <a
          href={site.channels.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-volt)] px-5 py-2.5 font-display text-xs uppercase tracking-wide text-[var(--color-fg)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-volt)_14%,transparent)] md:text-sm"
        >
          <WhatsAppIcon className="h-4 w-4 text-[var(--color-volt)]" />
          {stage.status === "current"
            ? "Join WhatsApp"
            : stage.status === "postponed"
            ? "Get the new date"
            : "Get notified"}
        </a>
      )}
      {showMaps && stage.mapsHref && (
        <a
          href={stage.mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] px-5 py-2.5 font-display text-xs uppercase tracking-wide text-[var(--color-fg)] transition-colors hover:border-[var(--color-fg)] md:text-sm"
        >
          <MapPinIcon className="h-5 w-5 shrink-0 text-[var(--color-volt)]" />
          Open in Maps
          <span aria-hidden>↗</span>
        </a>
      )}
    </div>
  );
}

function PostponedBody() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <p className="font-display text-4xl text-amber-300 md:text-6xl">
        {site.postponed.pausedNote}
      </p>
      <p className="max-w-xl text-sm text-[var(--color-fg-muted)] md:text-base">
        {site.postponed.body}
      </p>
    </div>
  );
}

function TbcBody() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <p className="font-display text-4xl text-[var(--color-fg-muted)] md:text-6xl">
        Coming later this season.
      </p>
      <p className="max-w-md text-sm text-[var(--color-fg-muted)]">
        Date, venue and workouts for this stage will be announced through the
        official ADSC channels and the CoreX WhatsApp group.
      </p>
    </div>
  );
}
