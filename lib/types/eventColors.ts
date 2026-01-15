import { EventType } from "./types";

export type ConfigProperties = {
  displayName: string;
  color: string;
  textColor: string;
};

export const EventTypeConfig: Record<EventType, ConfigProperties> = {
  [EventType.COMPANY_PRESENTATION]: {
    displayName: "Bedriftspresentasjon",
    color: "#A1C34A",
    textColor: "#000",
  },
  [EventType.COURSE]: {
    displayName: "Kurs",
    color: "#52B0EC",
    textColor: "#000",
  },
  [EventType.PARTY]: {
    displayName: "Fest",
    color: "#d867c0",
    textColor: "#000",
  },
  [EventType.SOCIAL]: {
    displayName: "Sosialt",
    color: "#e74c3c",
    textColor: "#FFF",
  },
  [EventType.GALA]: {
    displayName: "Galla",
    color: "#ffd700",
    textColor: "#000",
  },
  [EventType.BREAKFAST_TALK]: {
    displayName: "Frokostforedrag",
    color: "#86D1D0",
    textColor: "#000",
  },
  [EventType.LUNCH_PRESENTATION]: {
    displayName: "Lunsjpresentasjon",
    color: "#A1C34A",
    textColor: "#000",
  },
  [EventType.EVENT]: {
    displayName: "Arrangement",
    color: "#dc2626",
    textColor: "#FFF",
  },
  [EventType.ALTERNATIVE_PRESENTATION]: {
    displayName: "Alternativ bedpres",
    color: "#8A2BE2",
    textColor: "#FFF",
  },
  [EventType.NEXUS_EVENT]: {
    displayName: "NEXUS-arrangement",
    color: "#00509E",
    textColor: "#FFF",
  },
  [EventType.OTHER]: {
    displayName: "Annet",
    color: "#000",
    textColor: "#FFF",
  },
};
