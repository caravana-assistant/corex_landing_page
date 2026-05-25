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
    photos: [],
    results: [],
  },
  {
    number: 3,
    numberPadded: "03",
    label: "STAGE 03",
    status: "current",
    date: "Jun 03, 2026",
    dateShort: "03 JUN",
    city: "Al Dhannah",
    registerHref: "https://in.abudhabimarathon.events/core-x-stage-3-al-dhanna",
    photos: [],
    results: [],
  },
  {
    number: 4,
    numberPadded: "04",
    label: "STAGE 04",
    status: "tbc",
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
