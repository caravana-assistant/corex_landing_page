import { useState, useEffect } from "react";
import { site } from "@/lib/site";
import { InstagramIcon } from "@/components/icons";
import { useActiveSection } from "@/lib/useActiveSection";

const NAV_IDS = site.nav.map((n) => n.href.replace("#", ""));

export function Header() {
  const active = useActiveSection(NAV_IDS);
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] bg-black/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-10">
          <a
            href="#top"
            aria-label="CoreX Home"
            className="flex items-center gap-3"
          >
            <img
              src="/brand/logo.png"
              alt="CoreX"
              className="h-6 w-auto md:h-8"
            />
            <span className="eyebrow hidden sm:inline-block border-l border-[var(--color-border-strong)] pl-3">
              {site.stage.label} / {String(site.stage.total).padStart(2, "0")}
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {site.nav.map((item) => {
              const isActive = active === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`link-uline text-sm uppercase tracking-[0.18em] transition-colors ${
                    isActive
                      ? "text-[var(--color-volt)]"
                      : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <a
              href={site.channels.instagram[0].href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow ${site.channels.instagram[0].handle} on Instagram`}
              className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-volt)] hover:text-[var(--color-volt)]"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>

            {site.postponed.active ? (
              <a
                href={site.channels.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-amber-400/70 bg-amber-400/10 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-amber-300 transition-colors hover:bg-amber-400/20 md:text-xs"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                {site.postponed.pill}
              </a>
            ) : (
              <a
                href={site.cta.primary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-volt text-xs md:text-sm"
              >
                {site.cta.primary.label}
              </a>
            )}

            {/* Hamburger button — mobile only */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="lg:hidden relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-volt)] hover:text-[var(--color-volt)]"
            >
              <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
              <span
                aria-hidden="true"
                className={`absolute h-[1.5px] w-4 bg-current transition-all duration-300 ${
                  menuOpen ? "rotate-45" : "-translate-y-[5px]"
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-[1.5px] w-4 bg-current transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-[1.5px] w-4 bg-current transition-all duration-300 ${
                  menuOpen ? "-rotate-45" : "translate-y-[5px]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer panel */}
        <nav
          className={`absolute inset-y-0 right-0 w-72 border-l border-[var(--color-border)] bg-[#0a0a0a]/95 backdrop-blur-xl pt-24 px-8 transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col gap-1">
            {site.nav.map((item, i) => {
              const isActive = active === item.href.replace("#", "");
              return (
                <li
                  key={item.href}
                  style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
                  className={`transition-all duration-300 ${
                    menuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-4 opacity-0"
                  }`}
                >
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-3 text-sm uppercase tracking-[0.18em] transition-colors ${
                      isActive
                        ? "text-[var(--color-volt)]"
                        : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Instagram link in drawer */}
          <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
            <a
              href={site.channels.instagram[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-volt)]"
            >
              <InstagramIcon className="h-4 w-4" />
              {site.channels.instagram[0].handle}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
