export const site = {
  name: "CoreX Fitness League",
  stage: {
    number: 2,
    total: 8,
    label: "STAGE 02",
  },
  slogan: {
    line1: "CHARGE UP.",
    line2: "BREAK YOUR",
    line3: "LIMIT.",
  },
  event: {
    weekday: "Saturday",
    day: "23",
    month: "May",
    monthShort: "MAY",
    monthNum: "05",
    year: "2026",
    yearShort: "26",
    date: "Saturday, May 23, 2026",
    dateISO: "2026-05-23T16:00:00+04:00",
    timeWindow: "4:00 — 10:00 PM",
    venue: "Hazza Bin Zayed Stadium",
    city: "Al Ain",
    mapsHref: "https://maps.app.goo.gl/Vziib3gBaDeKczSo8",
  },
  postponed: {
    active: false,
    pill: "POSTPONED",
    headline: "STAGE 02 POSTPONED",
    body: "The event scheduled for May 16, 2026 at Hazza Bin Zayed Stadium has been postponed. A new date will be announced shortly. Stay tuned via our WhatsApp group and Instagram.",
    pausedNote: "Date paused — new announcement soon",
  },
  positioning: {
    eyebrow: "Powered by Abu Dhabi Sports Council",
    communitySubhead:
      "Your road to Hyrox starts here. Built for athletes, made for the community.",
  },
  cta: {
    primary: {
      label: "Register Now",
      href: "https://in.abudhabimarathon.events/core-x-stage-4--adnec-al-ain",
      external: true,
    },
    secondary: { label: "Watch Stage 1 Highlights", href: "#highlights" },
  },
  nav: [
    { label: "Stages", href: "#season" },
    { label: "Workout", href: "#workout" },
    { label: "Rulebook", href: "#rulebook" },
    { label: "Schedule", href: "#schedule" },
    { label: "Venue", href: "#venue" },
  ],
  channels: {
    email: "CoreX@adsc.adgov.gov.ae",
    whatsapp: {
      label: "Join the WhatsApp group",
      href: "https://chat.whatsapp.com/K2aHcGZjRNO6hN99ZVqhFD",
    },
    instagram: [
      { handle: "@corexchallenge.ae", href: "https://instagram.com/corexchallenge.ae" },
      { handle: "@abudhabisc", href: "https://instagram.com/abudhabisc" },
      { handle: "@abudhabi360", href: "https://instagram.com/abudhabi360" },
    ],
  },
  partners: {
    organizedBy: "Abu Dhabi Sports Council",
    deliveredBy: ["Palms Sports", "Pyxis"],
  },
  legal: {
    copyright: "© 2026 CoreX Fitness League. All rights reserved.",
    links: [],
  },
} as const;

// ---------------------------------------------------------------------------
// Helper: derive site-compatible overrides from a dynamic Stage
// ---------------------------------------------------------------------------
import type { Stage } from './stages';

export function siteFromActiveStage(stage: Stage) {
  // Parse full event date to extract weekday, year, ISO, etc.
  const eventOverrides: Record<string, string> = {};
  if (stage.date) {
    try {
      const parsed = new Date(stage.date);
      if (!isNaN(parsed.getTime())) {
        eventOverrides.weekday = parsed.toLocaleDateString('en-US', { weekday: 'long' });
        eventOverrides.year = String(parsed.getFullYear());
        eventOverrides.yearShort = String(parsed.getFullYear()).slice(-2);
        eventOverrides.month = parsed.toLocaleDateString('en-US', { month: 'long' });
        eventOverrides.monthNum = String(parsed.getMonth() + 1).padStart(2, '0');
        eventOverrides.day = String(parsed.getDate()).padStart(2, '0');
        eventOverrides.dateISO = parsed.toISOString();
      }
    } catch { /* keep defaults */ }
  }

  return {
    event: {
      ...site.event,
      ...(stage.date ? { date: stage.date } : {}),
      ...eventOverrides,
      ...(stage.dateShort
        ? {
            monthShort: stage.dateShort.split(' ')[1] ?? site.event.monthShort,
            day: stage.dateShort.split(' ')[0] ?? site.event.day,
          }
        : {}),
      ...(stage.venue ? { venue: stage.venue } : {}),
      ...(stage.city ? { city: stage.city } : {}),
      ...(stage.mapsHref ? { mapsHref: stage.mapsHref } : {}),
      timeWindow: stage.timeWindow ?? '',
    },
    stage: {
      number: stage.number,
      total: 8,
      label: stage.label,
    },
    cta: {
      primary: {
        ...site.cta.primary,
        ...(stage.registerHref ? { href: stage.registerHref } : {}),
      },
      secondary: site.cta.secondary,
    },
  };
}
