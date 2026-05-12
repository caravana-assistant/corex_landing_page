import { site } from "@/lib/site";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";

export function CommunityStrip() {
  return (
    <section
      id="community"
      className="relative overflow-hidden border-b border-[var(--color-border)]"
    >
      {/* Atmospheric volt halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-1/2 h-[60vw] w-[60vw] -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(136,197,71,0.40), rgba(136,197,71,0))",
        }}
      />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-5 py-20 md:grid-cols-12 md:gap-12 md:px-10 md:py-28">
        <div className="md:col-span-7">
          <p className="eyebrow mb-4">Join the family</p>
          <h2 className="font-display text-5xl leading-none md:text-7xl lg:text-8xl">
            Be the first to{" "}
            <span className="text-[var(--color-volt)]">know everything.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base text-[var(--color-fg-muted)] md:text-lg">
            Workout drops, heat lists, briefing times, prize updates, last-minute
            schedule changes. Our official WhatsApp group is where it all lands
            first — straight from the operations team to your phone.
          </p>
        </div>

        <div className="flex flex-col items-start gap-5 md:col-span-5 md:items-end">
          {/* WhatsApp — primary */}
          <a
            href={site.channels.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-[var(--color-volt)] bg-[var(--color-volt)] px-6 py-5 text-[var(--color-bg)] transition-transform hover:-translate-y-0.5 md:w-auto md:px-8 md:py-6"
            style={{ boxShadow: "0 14px 48px var(--color-volt-glow)" }}
          >
            <WhatsAppIcon className="h-9 w-9 shrink-0 md:h-12 md:w-12" />
            <span className="flex flex-col items-start leading-tight">
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-70">
                Official WhatsApp Group
              </span>
              <span className="font-display text-2xl md:text-3xl">
                Join Now
              </span>
            </span>
            <span
              aria-hidden
              className="ml-auto text-2xl transition-transform group-hover:translate-x-1 md:ml-2 md:text-3xl"
            >
              →
            </span>
          </a>

          {/* Instagram handles — chip row */}
          <div className="flex w-full flex-col gap-2 md:items-end">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-muted)]">
              Follow on Instagram
            </p>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {site.channels.instagram.map((ig, i) => (
                <a
                  key={ig.handle}
                  href={ig.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 transition-colors ${
                    i === 0
                      ? "border-[var(--color-volt)] text-[var(--color-fg)] hover:bg-[color-mix(in_srgb,var(--color-volt)_14%,transparent)]"
                      : "border-[var(--color-border-strong)] text-[var(--color-fg-muted)] hover:border-[var(--color-fg)] hover:text-[var(--color-fg)]"
                  }`}
                >
                  <InstagramIcon
                    className={`h-4 w-4 ${
                      i === 0 ? "text-[var(--color-volt)]" : ""
                    }`}
                  />
                  <span className="font-mono text-xs tracking-wide">
                    {ig.handle}
                  </span>
                  <span
                    aria-hidden
                    className="text-xs opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>

          <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-fg-muted)] md:text-right">
            Free · No spam · Athletes &amp; spectators welcome
          </p>
        </div>
      </div>
    </section>
  );
}
