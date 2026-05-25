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
  pod_m: 'People of Determination',
  pod_w: 'People of Determination',
};

const DIVISION_ORDER = Object.keys(DIVISION_LABELS);

function toProperCase(s: string): string {
  return s.replace(/\b\w+/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

function displayName(r: RawResult): string {
  return toProperCase((r.full_name ?? `${r.first_name} ${r.last_name}`).trim());
}

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
  team: string | null;
  result_time_seconds: number;
}

const TEAM_DIVISIONS = new Set(['double_m', 'double_w', 'relay']);

export interface FullResultRow {
  rank: number;
  name: string;
  division: string;
  time: string;
}

interface TeamGroup {
  displayName: string;
  time: number;
}

/**
 * Build podium covering 3 rank positions. Ties expand the podium
 * (e.g., two 2nd places → show both + the 3rd place = 4 entries).
 */
function buildPodiumFromIndividuals(entries: RawResult[]): PodiumRow[] {
  const podium: PodiumRow[] = [];
  let rank = 1;
  for (let i = 0; i < entries.length; i++) {
    if (i > 0 && entries[i].result_time_seconds !== entries[i - 1].result_time_seconds) {
      rank += 1;
    }
    if (rank > 3) break;
    podium.push({
      rank: rank as 1 | 2 | 3,
      name: displayName(entries[i]),
      time: formatTime(entries[i].result_time_seconds),
    });
  }
  return podium;
}

function buildPodiumFromTeams(teams: TeamGroup[]): PodiumRow[] {
  const podium: PodiumRow[] = [];
  let rank = 1;
  for (let i = 0; i < teams.length; i++) {
    if (i > 0 && teams[i].time !== teams[i - 1].time) {
      rank += 1;
    }
    if (rank > 3) break;
    podium.push({
      rank: rank as 1 | 2 | 3,
      name: teams[i].displayName,
      time: formatTime(teams[i].time),
    });
  }
  return podium;
}

/** Group team division members by team name + time, format as "First1 | First2" */
function groupTeamMembers(entries: RawResult[]): TeamGroup[] {
  const teamMap = new Map<string, RawResult[]>();
  for (const r of entries) {
    const key = `${(r.team ?? '').toLowerCase().trim()}_${r.result_time_seconds}`;
    const arr = teamMap.get(key) ?? [];
    arr.push(r);
    teamMap.set(key, arr);
  }

  const teams: TeamGroup[] = [];
  for (const [, members] of teamMap) {
    const firstNames = members.map((m) => toProperCase(m.first_name.split(' ')[0]));
    const displayName = firstNames.join(' | ');
    teams.push({ displayName, time: members[0].result_time_seconds });
  }

  teams.sort((a, b) => {
    const timeDiff = a.time - b.time;
    if (timeDiff !== 0) return timeDiff;
    return a.displayName.toLowerCase().localeCompare(b.displayName.toLowerCase());
  });
  return teams;
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
        .select('first_name, last_name, full_name, division, team, result_time_seconds')
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

      // Sort by time ascending, then alphabetically by name within same time
      const sorted = (rows as RawResult[]).sort((a, b) => {
        const timeDiff = a.result_time_seconds - b.result_time_seconds;
        if (timeDiff !== 0) return timeDiff;
        const nameA = displayName(a).toLowerCase();
        const nameB = displayName(b).toLowerCase();
        return nameA.localeCompare(nameB);
      });

      const byDiv = new Map<string, RawResult[]>();
      for (const r of sorted) {
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
        const isTeam = TEAM_DIVISIONS.has(div);

        if (isTeam) {
          const teams = groupTeamMembers(entries);
          const podium = buildPodiumFromTeams(teams);
          divResults.push({ division: DIVISION_LABELS[div] ?? div, podium });
        } else {
          const podium = buildPodiumFromIndividuals(entries);
          divResults.push({ division: DIVISION_LABELS[div] ?? div, podium });
        }
      }

      // Build full results table (all finishers, ranked per division)
      const full: FullResultRow[] = [];
      for (const div of sortedDivs) {
        const entries = byDiv.get(div)!;
        const isTeam = TEAM_DIVISIONS.has(div);
        const divLabel = DIVISION_LABELS[div] ?? div;

        if (isTeam) {
          const teams = groupTeamMembers(entries);
          let currentRank = 1;
          teams.forEach((t, i) => {
            if (i > 0 && t.time !== teams[i - 1].time) {
              currentRank += 1;
            }
            full.push({ rank: currentRank, name: t.displayName, division: divLabel, time: formatTime(t.time) });
          });
        } else {
          let currentRank = 1;
          entries.forEach((r, i) => {
            if (i > 0 && r.result_time_seconds !== entries[i - 1].result_time_seconds) {
              currentRank += 1;
            }
            full.push({
              rank: currentRank,
              name: displayName(r),
              division: divLabel,
              time: formatTime(r.result_time_seconds),
            });
          });
        }
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
