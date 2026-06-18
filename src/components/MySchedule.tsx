import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const DIVISION_LABELS: Record<string, string> = {
  open_m: 'Open Men', open_w: 'Open Women',
  double_m: 'Double Men', double_w: 'Double Women',
  relay: 'Relay', pro_m: 'Pro Men', pro_w: 'Pro Women',
  kids_7_10: 'Kids 7-10',
  boys_11_13: 'Youth Boys (11-13)', girls_11_13: 'Youth Girls (11-13)',
  boys_14_17: 'Junior Boys (14-17)', girls_14_17: 'Junior Girls (14-17)',
  pod_m: 'POD Men', pod_w: 'POD Women',
};

interface Row {
  full_name: string;
  division: string;
  group_label: string | null;
  competition_time: string | null;
  check_in_time: string | null;
  heat_number: number | null;
  heat_lane: number | null;
  result_time_seconds: number | null;
  wod_name: string | null;
  wod_time_cap: number | null;
  wod_rule: string | null;
  wod_exercises: Exercise[] | null;
}

interface Exercise {
  seq: number; name: string; target: number | null; unit: string | null;
  equipment: string | null; synchro: boolean | null;
}

function exerciseLabel(e: Exercise): string {
  const amount = e.target != null ? `${e.target}${e.unit ?? ''} ` : '';
  const eq = e.equipment ? ` (${e.equipment})` : '';
  const sy = e.synchro ? ' · synchro' : '';
  return `${amount}${e.name}${eq}${sy}`.trim();
}

function WorkoutBlock({ row }: { row: Row }) {
  if (!row.wod_name && !row.wod_time_cap && !(row.wod_exercises && row.wod_exercises.length)) return null;
  return (
    <div className="mt-4 rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <p className="text-xs uppercase tracking-widest text-[var(--color-fg-faint)]">Workout</p>
      {row.wod_name && <p className="mt-1 font-medium text-[var(--color-fg)]">{row.wod_name}</p>}
      {row.wod_time_cap != null && <p className="mt-1 text-sm text-[var(--color-fg-muted)]">Time cap: {row.wod_time_cap} min</p>}
      {row.wod_exercises && row.wod_exercises.length > 0 && (
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-[var(--color-fg)]">
          {row.wod_exercises.map((e) => <li key={e.seq}>{exerciseLabel(e)}</li>)}
        </ol>
      )}
      {row.wod_rule && <p className="mt-3 text-xs text-[var(--color-fg-faint)]">{row.wod_rule}</p>}
    </div>
  );
}

function fmtResult(s: number | null): string | null {
  if (s == null) return null;
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function MySchedule({ eventId }: { eventId: string | null }) {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [row, setRow] = useState<Row | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null); setNotFound(false); setRow(null);
    if (!eventId) { setError('No active event right now.'); return; }
    const last4 = phone.replace(/\D/g, '').slice(-4);
    if (last4.length < 4 || !email.trim()) { setError('Enter the last 4 digits of your phone and your email.'); return; }
    setBusy(true);
    try {
      const { data, error } = await supabase.rpc('lookup_my_schedule', {
        p_event: eventId, p_phone_last4: last4, p_email: email.trim(),
      });
      if (error) throw new Error(error.message);
      const r = (Array.isArray(data) ? data[0] : data) as Row | undefined;
      if (r) setRow(r); else setNotFound(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lookup failed.');
    } finally { setBusy(false); }
  }

  return (
    <section id="my-schedule" className="border-t border-[var(--color-border)] px-6 py-20 md:px-12">
      <div className="mx-auto max-w-xl">
        <p className="eyebrow mb-2">Athletes</p>
        <h2 className="font-display text-4xl text-[var(--color-fg)] md:text-5xl">My Schedule</h2>
        <p className="mt-3 text-sm text-[var(--color-fg-muted)] md:text-base">
          Check your group and approximate competition time. Enter the last 4 digits of your phone and the email you registered with.
        </p>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
          <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="numeric" placeholder="Last 4 digits of phone"
            className="rounded border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-3 text-[var(--color-fg)] placeholder:text-[var(--color-fg-faint)] focus:border-[var(--color-volt)] focus:outline-none" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"
            className="rounded border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-3 text-[var(--color-fg)] placeholder:text-[var(--color-fg-faint)] focus:border-[var(--color-volt)] focus:outline-none" />
          <button type="submit" disabled={busy} className="btn-volt self-start disabled:opacity-50">
            {busy ? 'Checking…' : 'Check my schedule'}
          </button>
        </form>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        {notFound && <p className="mt-4 text-sm text-amber-400">We couldn't find your registration. Check your phone and email.</p>}

        {row && !row.group_label && (
          <div className="mt-8 rounded border border-[var(--color-border)] bg-[var(--color-surface-2)] p-6">
            <p className="font-display text-2xl text-[var(--color-fg)]">{row.full_name}</p>
            <p className="mt-2 text-sm text-[var(--color-fg)]">Division: {DIVISION_LABELS[row.division] ?? row.division}</p>
            <p className="mt-4 text-[var(--color-volt)]">Grouping not published yet — please check back later.</p>
            <WorkoutBlock row={row} />
          </div>
        )}

        {row && row.group_label && (
          <div className="mt-8 rounded border border-[var(--color-border)] bg-[var(--color-surface-2)] p-6">
            <p className="font-display text-2xl text-[var(--color-fg)]">{row.full_name}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <dt className="text-[var(--color-fg-faint)]">Division</dt><dd className="text-[var(--color-fg)]">{DIVISION_LABELS[row.division] ?? row.division}</dd>
              <dt className="text-[var(--color-fg-faint)]">Group</dt><dd className="text-[var(--color-fg)]">{row.group_label ?? '—'}</dd>
              <dt className="text-[var(--color-fg-faint)]">Check-in</dt><dd className="text-[var(--color-fg)]">{row.check_in_time ?? '—'}</dd>
              <dt className="text-[var(--color-fg-faint)]">Competition (approx.)</dt><dd className="text-[var(--color-fg)]">{row.competition_time ?? '—'}</dd>
              <dt className="text-[var(--color-fg-faint)]">Heat</dt><dd className="text-[var(--color-fg)]">{row.heat_number ?? '—'}{row.heat_lane ? ` · lane ${row.heat_lane}` : ''}</dd>
              <dt className="text-[var(--color-fg-faint)]">Result</dt><dd className="text-[var(--color-fg)]">{fmtResult(row.result_time_seconds) ?? '—'}</dd>
            </dl>
            <WorkoutBlock row={row} />
            <p className="mt-4 text-xs text-[var(--color-fg-faint)]">Times are approximate and may change — follow the CoreX WhatsApp group and socials.</p>
          </div>
        )}
      </div>
    </section>
  );
}
