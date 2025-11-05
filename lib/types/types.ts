interface EventTypeLabels {
  [key: string]: string;
}

export enum EventType {
  ALTERNATIVE_PRESENTATION = 'alternative_presentation',
  BREAKFAST_TALK = 'breakfast_talk',
  COMPANY_PRESENTATION = 'company_presentation',
  COURSE = 'course',
  EVENT = 'event',
  NEXUS_EVENT = 'nexus_event',
  LUNCH_PRESENTATION = 'lunch_presentation',
  OTHER = 'other',
  PARTY = 'party',
  SOCIAL = 'social',
  GALA = 'gala',
}

export const EVENT_CONSTANTS: EventTypeLabels = {
  company_presentation: "Bedriftspresentasjon",
  lunch_presentation: "Lunsjpresentasjon",
  alternative_presentation: "Alternativ bedpres",
  course: "Kurs",
  breakfast_talk: "Frokostforedrag",
  party: "Fest",
  social: "Sosialt",
  event: "Arrangement",
  kid_event: "KID-arrangement",
  other: "Annet",
};

export interface Event {
  id: number;
  title: string;
  description: string; //this was earlier descripstion: string; with a typo might have effect that i changed it?
  cover: string;
  coverPlaceholder: string;
  eventType: string;
  eventStatusType: string;
  location: string;
  startTime: string;
  endTime: string;
  thumbnail: string;
  totalCapacity: number;
  company: Object;
  registrationCount: number;
  activationTime: string;
  isAdmitted: boolean;
  survey: string;
  requireAuth: boolean;
  pools: EventPools[];
}

export interface EventPools {
  id: number;
  name: string;
  capacity: number;
  activationDate: string;
  permissionGroups: PermissionGroup[];
  registrationCount: number | null;
  registrations: EventRegistrations[];
}

export interface PermissionGroup {
  id: number;
  name: string;
  description: string;
  contactEmail: string;
  parent: number | null;
  logo: string | null;
  logoPlaceholder: string | null;
  type: string;
  showBadge: boolean;
  active: boolean;
}

export interface EventRegistrations {
  id: number;
  user: User;
  pool: number;
  status: string;
  feedback: string | null;
  sharedMemberships: number;
  presence: string | null;
  LEGACYPhotoConsent: boolean | null;
  event: number;
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  profilePicture: string;
  profilePicturePlaceholder: string;
  internalEmailAddress: string;
  githubUsername: string | null;
  linkedinId: string | null;
}
