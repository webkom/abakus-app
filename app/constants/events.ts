import { EventType } from "@/lib/types/types";

  export const EVENTS_LIMIT = 5;
  export const presentations = [
    EventType.COMPANY_PRESENTATION,
    EventType.LUNCH_PRESENTATION,
    EventType.ALTERNATIVE_PRESENTATION,
    EventType.COURSE,
    EventType.BREAKFAST_TALK,
    EventType.NEXUS_EVENT,
  ];
  export const others = [
    EventType.OTHER,
    EventType.EVENT,
    EventType.SOCIAL,
    EventType.PARTY,
    EventType.GALA,
  ];