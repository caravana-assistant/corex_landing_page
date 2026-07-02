import { CommunityStrip } from "@/components/CommunityStrip";
import { SeasonGrid } from "@/components/SeasonGrid";
import { StageDetail } from "@/components/StageDetail";
import { Divisions } from "@/components/Divisions";
import { Schedule } from "@/components/Schedule";
import { Venue } from "@/components/Venue";
import { useSelectedStage } from "@/lib/useSelectedStage";
import type { Stage } from "@/lib/stages";

type Props = {
  dynamicStages: Stage[];
  activeStage: Stage | null;
};

export function StagesPage({ dynamicStages, activeStage }: Props) {
  const [selectedStage, selectStage] = useSelectedStage();

  const resolvedSelected = selectedStage
    ? dynamicStages.find((s) => s.number === selectedStage.number) ?? selectedStage
    : null;

  return (
    <>
      <SeasonGrid
        stages={dynamicStages}
        selected={resolvedSelected?.number ?? null}
        onSelect={(n) => {
          selectStage(n);
          requestAnimationFrame(() => {
            document
              .getElementById("stage-detail")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        }}
      />
      {resolvedSelected && (
        <StageDetail stage={resolvedSelected} onClose={() => selectStage(null)} />
      )}
      <CommunityStrip />

      <Divisions />
      <Schedule activeStage={activeStage} />
      <Venue activeStage={activeStage} />
    </>
  );
}
