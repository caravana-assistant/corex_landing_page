import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { stages as staticStages, type Stage, type StageStatus } from './stages';

interface StageConfigRow {
  stage_number: number;
  status: string;
  is_active: boolean;
  event_date: string | null;
  date_short: string | null;
  venue: string | null;
  city: string | null;
  maps_href: string | null;
  register_href: string | null;
  event_id: string | null;
  time_window: string | null;
  rulebook_href: string | null;
  event_briefing_href: string | null;
  postponed_message: string | null;
  recap_athletes: number | null;
  recap_divisions: number | null;
  recap_lanes: number | null;
}

// Static fallback for first paint: pre-select the current stage so the hero
// renders real stage data instead of generic site defaults (kills the date "flash").
const initialActive = staticStages.find((s) => s.status === "current") ?? null;

export function useStageConfig(): {
  stages: Stage[];
  activeStage: Stage | null;
  loading: boolean;
} {
  const [stages, setStages] = useState<Stage[]>(staticStages);
  const [activeStage, setActiveStage] = useState<Stage | null>(initialActive);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchConfig() {
      const { data } = await supabase
        .from('stage_config')
        .select('*')
        .order('stage_number');

      if (cancelled || !data) {
        setLoading(false);
        return;
      }

      const configMap = new Map<number, StageConfigRow>();
      for (const row of data as StageConfigRow[]) {
        configMap.set(row.stage_number, row);
      }

      const merged = staticStages.map((s) => {
        const cfg = configMap.get(s.number);
        if (!cfg) return s;

        return {
          ...s,
          status: (cfg.status as StageStatus) ?? s.status,
          date: cfg.event_date ?? s.date,
          dateShort: cfg.date_short ?? s.dateShort,
          venue: cfg.venue ?? s.venue,
          city: cfg.city ?? s.city,
          mapsHref: cfg.maps_href ?? s.mapsHref,
          registerHref: cfg.register_href ?? s.registerHref,
          eventId: cfg.event_id ?? s.eventId,
          timeWindow: cfg.time_window ?? s.timeWindow,
          rulebookHref: cfg.rulebook_href ?? s.rulebookHref,
          eventBriefingHref: cfg.event_briefing_href ?? s.eventBriefingHref,
          recap:
            cfg.recap_athletes != null
              ? {
                  athletes: cfg.recap_athletes,
                  divisions: cfg.recap_divisions ?? 0,
                  lanes: cfg.recap_lanes ?? undefined,
                }
              : s.recap,
        };
      });

      const active =
        merged.find((_, i) => {
          const cfg = configMap.get(staticStages[i].number);
          return cfg?.is_active === true;
        }) ?? null;

      setStages(merged);
      setActiveStage(active);
      setLoading(false);
    }

    fetchConfig();
    return () => {
      cancelled = true;
    };
  }, []);

  return { stages, activeStage, loading };
}
