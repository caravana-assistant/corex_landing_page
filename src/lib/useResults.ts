import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import type { DivisionResult, PodiumRow } from './stages';

const DIVISION_LABELS: Record<string, string> = {
  open_m: 'Open Men',
  open_w: 'Open Women',
  double_m: 'Double Men',
  double_w: 'Double Women',
  relay: 'Relay',
  pro_m: 'Pro Men',
  pro_w: 'Pro Women',
  kids_7_10: 'Kids 7–10',
  boys_11_13: 'Youth Boys (11–13)',
  girls_11_13: 'Youth Girls (11–13)',
  boys_14_17: 'Junior Boys (14–17)',
  girls_14_17: 'Junior Girls (14–17)',
  pod_m: 'POD Men',
  pod_w: 'POD Women',
};

const DIVISION_ORDER = Object.keys(DIVISION_LABELS);

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

interface RawResult {
  first_name: string;
  last_name: string;
  full_name: string | null;
  division: string;
  result_time_seconds: number;
}

export interface FullResultRow {
  rank: number;
  name: string;
  division: string;
  time: string;
}

export function useResults(eventId: string | undefined): {
  results: DivisionResult[];
  allResults: FullResultRow[];
  loading: boolean;
  published: boolean;
} {
  const [results, setResults] = useState<DivisionResult[]>([]);
  const [allResults, setAllResults] = useState<FullResultRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (!eventId) {
      setResults([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchResults() {
      setLoading(true);

      const { data: pubData } = await supabase
        .from('event_results_published')
        .select('published')
        .eq('event_id', eventId!)
        .maybeSingle();

      if (cancelled) return;

      if (!pubData?.published) {
        setPublished(false);
        setResults([]);
        setAllResults([]);
        setLoading(false);
        return;
      }

      setPublished(true);

      const { data: rows } = await supabase
        .from('registrations')
        .select('first_name, last_name, full_name, division, result_time_seconds')
        .eq('event', eventId!)
        .not('result_time_seconds', 'is', null)
        .order('result_time_seconds', { ascending: true });

      if (cancelled) return;

      if (!rows || rows.length === 0) {
        setResults([]);
        setAllResults([]);
        setLoading(false);
        return;
      }

      const byDiv = new Map<string, RawResult[]>();
      for (const r of rows as RawResult[]) {
        const arr = byDiv.get(r.division) ?? [];
        arr.push(r);
        byDiv.set(r.division, arr);
      }

      const divResults: DivisionResult[] = [];
      const sortedDivs = [...byDiv.keys()].sort((a, b) => {
        const ia = DIVISION_ORDER.indexOf(a);
        const ib = DIVISION_ORDER.indexOf(b);
        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
      });

      for (const div of sortedDivs) {
        const entries = byDiv.get(div)!;
        const podium: PodiumRow[] = entries.slice(0, 3).map((r, i) => ({
          rank: (i + 1) as 1 | 2 | 3,
          name: r.full_name ?? `${r.first_name} ${r.last_name}`.trim(),
          time: formatTime(r.result_time_seconds),
        }));

        divResults.push({
          division: DIVISION_LABELS[div] ?? div,
          podium,
        });
      }

      // Build full results table (all finishers, ranked per division)
      const full: FullResultRow[] = [];
      for (const div of sortedDivs) {
        const entries = byDiv.get(div)!;
        entries.forEach((r, i) => {
          full.push({
            rank: i + 1,
            name: r.full_name ?? `${r.first_name} ${r.last_name}`.trim(),
            division: DIVISION_LABELS[div] ?? div,
            time: formatTime(r.result_time_seconds),
          });
        });
      }

      setResults(divResults);
      setAllResults(full);
      setLoading(false);
    }

    fetchResults();
    return () => { cancelled = true; };
  }, [eventId]);

  return { results, allResults, loading, published };
}
