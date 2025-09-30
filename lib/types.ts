interface EventType {
  [key: string]: string;
}

export const EVENT_CONSTANTS: EventType = {
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
  descripstion: string;
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
  // eslint-disable-next-line no-use-before-define
  pools: EventPools[];
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

export interface EventPools {
  id: number;
  name: string;
  capacity: number;
  activationDate: string;
  permissionGroups: PermissionGroup[];
  registrationCount: number | null;
  // eslint-disable-next-line no-use-before-define
  registrations: EventRegistrations[];
}

export interface EventRegistrations {
  id: number;
  // eslint-disable-next-line no-use-before-define
  user: User;
  pool: number;
  status: string;
  feedback: string | null;
  sharedMemberships: number;
  presence: string | null;
  LEGACYPhotoConsent: boolean | null;
  event: number;
}

export interface ResponsibleGroup {
  id: number;
  name: string;
  description: string;
  contactEmail: string;
  parent: number;
  logo: string;
  logoPlaceholder: string;
  type: string;
  showBadge: boolean;
  active: boolean;
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

export interface EventSlug {
  canEditUsers: any[];
  canViewGroups: any[];
  canEditGroups: any[];
  requireAuth: boolean;
  id: number;
  title: string;
  slug: string;
  description: string;
  cover: string;
  coverPlaceholder: string;
  text: string;
  eventType: string;
  eventStatusType: string;
  location: string;
  comments: any[];
  contentTarget: string;
  startTime: string;
  endTime: string;
  mergeTime: string | null;
  pools: EventPools[];
  registrationCloseTime: string;
  registrationDeadlineHours: number;
  unregistrationCloseTime: string;
  unregistrationDeadline: string;
  unregistrationDeadlineHours: number;
  company: any | null;
  responsibleGroup: ResponsibleGroup;
  activeCapacity: number;
  feedbackDescription: string;
  feedbackRequired: boolean;
  isPriced: boolean;
  priceMember: number;
  priceGuest: number;
  useStripe: boolean;
  paymentDueDate: string | null;
  useCaptcha: boolean;
  tags: any[];
  isMerged: boolean;
  heedPenalties: boolean;
  createdBy: User;
  legacyRegistrationCount: number;
  survey: number;
  useConsent: boolean;
  youtubeUrl: string;
  mazemapPoi: any | null;
  responsibleUsers: User[];
  isForeignLanguage: boolean;
  price: number;
  activationTime: string | null;
  isAdmitted: boolean;
  following: boolean;
  spotsLeft: number | null;
  pendingRegistration: any | null;
  photoConsents: any[];
  actionGrant: string[];
}
