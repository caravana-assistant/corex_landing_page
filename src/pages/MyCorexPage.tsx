import { MySchedule } from "@/components/MySchedule";

type Props = { eventId: string | null };

export function MyCorexPage({ eventId }: Props) {
  return <MySchedule eventId={eventId} />;
}
