// Phase-based site (COR-169 P1). Pure date logic — derives which event phase the
// site should show, from the current event's date vs "today" in GST (UTC+4, no DST).
// Phases: pre (≤ D-2) · eve (D-1) · day (D0) · post (≥ D+1).
export type EventPhase = 'pre' | 'eve' | 'day' | 'post';

const VALID: EventPhase[] = ['pre', 'eve', 'day', 'post'];
const GST_OFFSET_MS = 4 * 60 * 60 * 1000; // UTC+4

/** Calendar day number (days since epoch) for an instant, in GST. */
function gstDayNumber(ms: number): number {
  return Math.floor((ms + GST_OFFSET_MS) / 86_400_000);
}

/**
 * @param eventDate  the current event's date (any Date-parseable string, e.g. "Jun 27, 2026" or "2026-06-27").
 * @param nowMs      current time in ms (Date.now()).
 * @param forced     optional manual override ('pre'|'eve'|'day'|'post'); wins when valid.
 * Returns the phase. Falls back to 'pre' if the date can't be parsed.
 */
export function getEventPhase(eventDate: string | null | undefined, nowMs: number, forced?: string | null): EventPhase {
  if (forced && (VALID as string[]).includes(forced)) return forced as EventPhase;
  if (!eventDate) return 'pre';
  const parsed = Date.parse(eventDate);
  if (Number.isNaN(parsed)) return 'pre';
  const eventDay = gstDayNumber(parsed);
  const today = gstDayNumber(nowMs);
  const diff = today - eventDay; // negative = before event
  if (diff <= -2) return 'pre';
  if (diff === -1) return 'eve';
  if (diff === 0) return 'day';
  return 'post';
}

/** Read a forced phase from ?phase= query (preview links). */
export function phaseFromQuery(search: string): EventPhase | null {
  try {
    const p = new URLSearchParams(search).get('phase');
    return p && (VALID as string[]).includes(p) ? (p as EventPhase) : null;
  } catch {
    return null;
  }
}
