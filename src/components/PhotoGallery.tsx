import { useState } from "react";
import type { Stage } from "@/lib/stages";

type Props = { stage: Stage };

export function PhotoGallery({ stage }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const photos = stage.photos;

  const hasPhotos = photos.length > 0;
  const headline = !hasPhotos
    ? "Coming soon."
    : stage.status === "completed"
      ? "The proof is in the floor."
      : "Live from the floor.";

  return (
    <div>
      <header className="mb-8 flex items-end justify-between gap-6 md:mb-10">
        <div>
          <p className="eyebrow mb-2">{stage.label} · Gallery</p>
          <h3 className="font-display text-3xl leading-none md:text-5xl">
            {headline}
          </h3>
        </div>
        {stage.recap && (
          <p className="hidden max-w-xs text-xs uppercase tracking-widest text-[var(--color-fg-muted)] md:block">
            {stage.recap.athletes} athletes · {stage.recap.divisions} divisions
            {stage.recap.lanes ? ` · ${stage.recap.lanes} lanes` : ""}
          </p>
        )}
      </header>

      {photos.length === 0 ? (
        <EmptyGallery stage={stage} />
      ) : (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {photos.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpen(i)}
              className="group relative aspect-square overflow-hidden bg-[var(--color-surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-volt)]"
              aria-label={`Open photo ${i + 1}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              {p.caption && (
                <span className="absolute bottom-2 left-2 right-2 font-mono text-[10px] uppercase tracking-widest text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {p.caption}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {open !== null && photos[open] && (
        <button
          type="button"
          onClick={() => setOpen(null)}
          aria-label="Close photo"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
        >
          <img
            src={photos[open].src}
            alt={photos[open].alt}
            className="max-h-[92vh] max-w-[92vw] object-contain"
          />
          <span className="absolute right-5 top-5 font-mono text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">
            Close · {open + 1} / {photos.length}
          </span>
        </button>
      )}
    </div>
  );
}

function EmptyGallery({ stage }: { stage: Stage }) {
  if (stage.status === "tbc") {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface)] py-12 text-center">
        <p className="font-display text-2xl text-[var(--color-fg-muted)] md:text-4xl">
          Stage details to be confirmed.
        </p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-[var(--color-fg-faint)]">
          Date · venue · workouts coming soon
        </p>
      </div>
    );
  }

  if (stage.status === "loading") {
    return (
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            aria-hidden
            className="relative aspect-square overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]"
          >
            <div className="loading-shimmer absolute inset-0" />
          </div>
        ))}
      </div>
    );
  }

  // Completed or current with no photos yet
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          aria-hidden
          className="relative aspect-square overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]"
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "repeating-linear-gradient(45deg, transparent 0 12px, rgba(255,255,255,0.03) 12px 13px)",
            }}
          />
          <span className="absolute bottom-2 left-2 font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-faint)]">
            Photo {String(i + 1).padStart(2, "0")}
          </span>
        </div>
      ))}
    </div>
  );
}
