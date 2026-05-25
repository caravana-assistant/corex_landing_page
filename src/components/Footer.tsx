import { site } from "@/lib/site";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="overflow-hidden border-b border-[var(--color-border)] py-6 md:py-10" aria-hidden="true">
        <div className="marquee-track font-display text-5xl text-[var(--color-fg)] md:text-7xl lg:text-8xl">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12 whitespace-nowrap">
              <span className="text-[var(--color-volt)]">CHARGE UP</span>
              <span aria-hidden className="text-[var(--color-volt)]">◆</span>
              <span>BREAK YOUR LIMIT</span>
              <span aria-hidden className="text-[var(--color-volt)]">◆</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 py-16 md:grid-cols-12 md:gap-8 md:px-10 md:py-20">
        <div className="md:col-span-5">
          <img
            src="/landingnodejs/brand/logo.png"
            alt="CoreX"
            className="h-10 w-auto md:h-12"
          />
          <p className="eyebrow mt-2">
            Abu Dhabi&rsquo;s Official Fitness League
          </p>
          <p className="mt-6 max-w-md text-sm text-[var(--color-fg-muted)]">
            Eight stages across Abu Dhabi, Al Ain and Al Dhafra.
            Hyrox-style prep, year-round. Built for athletes, made for the
            community.
          </p>

          {/* WhatsApp focus card */}
          <a
            href={site.channels.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 flex items-center gap-4 rounded-xl border border-[var(--color-volt)] bg-[color-mix(in_srgb,var(--color-volt)_8%,transparent)] px-5 py-4 transition-colors hover:bg-[color-mix(in_srgb,var(--color-volt)_14%,transparent)]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-volt)] text-[var(--color-bg)]">
              <WhatsAppIcon className="h-7 w-7" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-muted)]">
                Official Group
              </span>
              <span className="font-display text-xl text-[var(--color-fg)]">
                Join on WhatsApp
              </span>
            </span>
            <span
              aria-hidden
              className="ml-auto text-[var(--color-volt)] transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>

          <div className="mt-6 space-y-2">
            <p className="eyebrow">Contact</p>
            <a
              href={`mailto:${site.channels.email}`}
              className="link-uline block text-sm break-all"
            >
              {site.channels.email}
            </a>
            <div className="pt-3">
              <p className="eyebrow mb-2">Instagram</p>
              <div className="flex flex-wrap gap-2">
                {site.channels.instagram.map((ig, i) => (
                  <a
                    key={ig.handle}
                    href={ig.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors ${
                      i === 0
                        ? "border-[var(--color-volt)] text-[var(--color-fg)]"
                        : "border-[var(--color-border-strong)] text-[var(--color-fg-muted)] hover:border-[var(--color-fg)] hover:text-[var(--color-fg)]"
                    }`}
                  >
                    <InstagramIcon
                      className={`h-3.5 w-3.5 ${
                        i === 0 ? "text-[var(--color-volt)]" : ""
                      }`}
                    />
                    <span className="font-mono text-[11px] tracking-wide">
                      {ig.handle}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow">Navigate</p>
          <ul className="mt-4 space-y-3 text-base">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="link-uline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow">Partners</p>
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-xs text-[var(--color-fg-muted)]">Organized by</p>
              <p className="font-display text-xl tracking-wide">
                {site.partners.organizedBy}
              </p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-fg-muted)]">Delivered by</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {site.partners.deliveredBy.map((p) => (
                  <span key={p} className="font-display text-xl tracking-wide">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-[var(--color-border)]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-6 text-xs text-[var(--color-fg-muted)] md:flex-row md:items-center md:justify-between md:px-10">
          <p>{site.legal.copyright}</p>
          <span className="font-mono text-[10px] tracking-widest text-[var(--color-fg-faint)]">
            v{__APP_VERSION__}·{__GIT_HASH__}
          </span>
        </div>
      </div>
    </footer>
  );
}
