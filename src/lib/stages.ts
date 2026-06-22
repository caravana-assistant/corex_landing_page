// Source-of-truth for the 8-stage season.
// Each stage has its own status, schedule info, and (when available) photos + podium results.

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption?: string;
};

export type PodiumRow = {
  rank: 1 | 2 | 3;
  name: string;
  time?: string;
};

export type DivisionResult = {
  division: string;
  podium: PodiumRow[];
};

export type StageStatus = "completed" | "current" | "postponed" | "loading" | "tbc";

export type Stage = {
  number: number; // 1..8
  label: string; // "STAGE 01"
  numberPadded: string; // "01"
  status: StageStatus;
  date?: string; // "May 02, 2026"
  dateShort?: string; // "02 MAY"
  venue?: string;
  city?: string;
  mapsHref?: string;
  registerHref?: string;
  recap?: { athletes: number; divisions: number; lanes?: number };
  photos: GalleryPhoto[];
  eventId?: string;
  timeWindow?: string;
  // Workout is opt-in per stage: the timeline + weights show ONLY when
  // workoutConfirmed is true (the content lives in Workout.tsx). Default/absent
  // = "Workout to be confirmed" — no stage inherits another stage's workout.
  // The Rulebook is gated separately: it shows only when this stage has a
  // published rulebook PDF.
  workoutConfirmed?: boolean;
  // Event-day schedule. Data-driven: the timeline shows ONLY when entries are
  // provided here. No entries = "Schedule to be confirmed" (no fabricated times).
  schedule?: { time: string; activity: string }[];
  rulebookPdf?: string;
  rulebookPages?: number;
  rulebookUpdated?: string; // "DD.MM.YY"
  rulebookHref?: string; // editable external link (overrides rulebookPdf)
  eventBriefingHref?: string; // editable external link to the stage event briefing
  results: DivisionResult[];
};

export const stages: Stage[] = [
  {
    number: 1,
    numberPadded: "01",
    label: "STAGE 01",
    status: "completed",
    date: "May 02, 2026",
    dateShort: "02 MAY",
    venue: "Khabib Gym",
    city: "Yas Island, Abu Dhabi",
    recap: { athletes: 300, divisions: 13, lanes: 6 },
    photos: [],
    results: [],
  },
  {
    number: 2,
    numberPadded: "02",
    label: "STAGE 02",
    status: "completed",
    date: "May 23, 2026",
    dateShort: "23 MAY",
    venue: "Hazza Bin Zayed Stadium",
    city: "Al Ain",
    mapsHref: "https://maps.app.goo.gl/Vziib3gBaDeKczSo8",
    eventId: "1c9d5b45-489a-4126-94ec-ce96fd7431ed",
    rulebookPdf: "/rulebook/CoreX_Stage02_Rulebook.pdf",
    rulebookPages: 15,
    rulebookUpdated: "23.05.26",
    photos: [],
    results: [],
  },
  {
    number: 3,
    numberPadded: "03",
    label: "STAGE 03",
    status: "current",
    date: "Jun 20, 2026",
    dateShort: "20 JUN",
    venue: "ADNEC",
    city: "Abu Dhabi",
    timeWindow: "8:00 AM — 7:00 PM",
    registerHref: "https://in.abudhabimarathon.events/core-x-stage-3-al-dhanna",
    workoutConfirmed: true, // no-rig version final (thrusters), confirmed 2026-06-16
    rulebookPdf: "/rulebook/CoreX_Stage03_Rulebook.pdf",
    rulebookPages: 15,
    rulebookUpdated: "16.06.26",
    schedule: [
      { time: "8:00 AM", activity: "Check-in & T-shirt — POD" },
      { time: "9:00 AM", activity: "POD · 9:00–10:30 AM" },
      { time: "9:15 AM", activity: "Check-in & T-shirt — Kids" },
      { time: "10:00 AM", activity: "Kids · 10:00–11:30 AM" },
      { time: "11:30 AM", activity: "Awards — POD & Kids" },
      { time: "12:00 PM", activity: "Lunch Break · 12:00–2:00 PM" },
      { time: "2:00 PM", activity: "Check-in & T-shirt — Women" },
      { time: "3:00 PM", activity: "Women, Open / Doubles · 3:00–4:30 PM" },
      { time: "3:30 PM", activity: "Check-in & T-shirt — Men" },
      { time: "4:30 PM", activity: "Men, Open / Doubles · 4:30–6:30 PM" },
      { time: "6:30 PM", activity: "Relays" },
      { time: "7:00 PM", activity: "Awards — Women, Men & Relays" },
    ],
    photos: [],
    results: [],
  },
  {
    number: 4,
    numberPadded: "04",
    label: "STAGE 04",
    status: "current",
    date: "Jun 27, 2026",
    dateShort: "27 JUN",
    venue: "ADNEC",
    city: "Al Ain",
    timeWindow: "8:00 AM — 8:00 PM",
    registerHref: "https://in.abudhabimarathon.events/core-x-stage-4--adnec-al-ain",
    photos: [],
    results: [],
  },
  {
    number: 5,
    numberPadded: "05",
    label: "STAGE 05",
    status: "tbc",
    photos: [],
    results: [],
  },
  {
    number: 6,
    numberPadded: "06",
    label: "STAGE 06",
    status: "tbc",
    photos: [],
    results: [],
  },
  {
    number: 7,
    numberPadded: "07",
    label: "STAGE 07",
    status: "tbc",
    photos: [],
    results: [],
  },
  {
    number: 8,
    numberPadded: "08",
    label: "STAGE 08 · FINAL",
    status: "tbc",
    photos: [],
    results: [],
  },
];

export function findStage(numberOrHash: number | string | null | undefined): Stage | undefined {
  if (numberOrHash == null) return undefined;
  const n =
    typeof numberOrHash === "string"
      ? parseInt(numberOrHash.replace(/\D/g, ""), 10)
      : numberOrHash;
  if (!Number.isFinite(n)) return undefined;
  return stages.find((s) => s.number === n);
}
