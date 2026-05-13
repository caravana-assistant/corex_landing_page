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
      href: "https://in.abudhabimarathon.events/corex--stage-2?currentPage=select-competition",
      external: true,
    },
    secondary: { label: "Watch Stage 1 Highlights", href: "#highlights" },
  },
  nav: [
    { label: "Stages", href: "#season" },
    { label: "Stage Detail", href: "#stage-detail" },
    { label: "Community", href: "#community" },
    { label: "Schedule", href: "#schedule" },
    { label: "FAQ", href: "#faq" },
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
    links: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
      { label: "Code of Conduct", href: "#code" },
      { label: "Athlete Waiver", href: "#waiver" },
    ],
  },
} as const;
