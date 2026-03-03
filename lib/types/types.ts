import { PublicUser, PublicUserWithAbakusGroups } from './user';

interface EventTypeLabels {
  [key: string]: string;
}

export type Group = {
  id: number;
  name: string;
  description: string;
  contactEmail: string;
  parent?: string;
  permissions: string[];
  parentPermissions: {
    abakusGroup: Pick<Group, 'id' | 'name'>;
    permissions: string[];
  }[];
  logo: string | null;
  logoPlaceholder: string | null;
  numberOfUsers: number;
  type: GroupType;
  text: string;
  showBadge: boolean;
  active: boolean;
  actionGrant: ActionGrant;
};

export type DetailedGroup = Pick<
  Group,
  | 'id'
  | 'name'
  | 'description'
  | 'contactEmail'
  | 'parent'
  | 'permissions'
  | 'parentPermissions'
  | 'type'
  | 'text'
  | 'logo'
  | 'numberOfUsers'
  | 'showBadge'
  | 'active'
  | 'actionGrant'
>;

export type PublicGroup = Pick<
  Group,
  | 'id'
  | 'name'
  | 'description'
  | 'contactEmail'
  | 'parent'
  | 'logo'
  | 'logoPlaceholder'
  | 'type'
  | 'showBadge'
  | 'active'
>;

export type ActionGrant = ('create' | 'edit' | 'delete' | 'list' | 'view' | string)[];

export enum GroupType {
  Committee = 'komite',
  Board = 'styre',
  Revue = 'revy',
  Interest = 'interesse',
  SubGroup = 'under',
  Ordained = 'ordenen',
  Grade = 'klasse',
  Other = 'annen',
}

export const ROLES = {
  member: 'Medlem (standard)',
  leader: 'Leder',
  'co-leader': 'Nestleder',
  treasurer: 'Økonomiansvarlig',
  recruiting: 'Rekruttering',
  development: 'Utvikling',
  editor: 'Moderator',
  retiree: 'Pang',
  media_relations: 'PR-ansvarlig',
  active_retiree: 'Aktiv pang',
  alumni: 'Alumni',
  webmaster: 'Webansvarlig',
  interest_group_admin: 'Interessegruppeansvarlig',
  alumni_admin: 'Alumniansvarlig',
  retiree_email: 'Pang med e-post',
  company_admin: 'Bedriftsansvarlig',
  dugnad_admin: 'Dugnadsansvarlig',
  trip_admin: 'Turansvarlig',
  sponsor_admin: 'Sponsoransvarlig',
  social_admin: 'Sosialansvarlig',
  merch_admin: 'Merchansvarlig',
  hs_representative: 'HS-representant',
  cuddling_manager: 'Kosansvarlig',
  photo_admin: 'Foto- og filmansvarlig',
  graphic_admin: 'Grafiskansvarlig',
  social_media_admin: 'SoMe-ansvarlig',
  booking_admin: 'Bookingansvarlig',
  purchasing_manager: 'Innkjøpsansvarlig',
  event_manager: 'Arrangementansvarlig',
  snackoverflow_manager: 'SnackOverflow-ansvarlig',
};

export type RoleType = keyof typeof ROLES;

type EmailList = {
  id: number;
  name: string;
  email: string;
  users: number[];
  groups: number[];
  groupRoles: RoleType[];
  requireInternalAddress: boolean;
  additionalEmails?: string[];
};

export type PublicEmailList = Pick<
  EmailList,
  'id' | 'users' | 'name' | 'email' | 'groups' | 'groupRoles' | 'requireInternalAddress'
>;

export type DetailedEmailList = Pick<
  EmailList,
  | 'id'
  | 'name'
  | 'email'
  | 'users'
  | 'groups'
  | 'groupRoles'
  | 'requireInternalAddress'
  | 'additionalEmails'
>;

export type UnknownEmailList = PublicEmailList | DetailedEmailList;

export type Penalty = {
  id: number;
  createdAt: Date;
  user: number;
  reason: string;
  weight: number;
  sourceEvent: Event;
  exactExpiration: Date;
};

export enum NonEventContactStatus {
  BEDEX = 'bedex',
  INTERESTED = 'interested',
  NOT_INTERESTED = 'not_interested',
  CONTACTED = 'contacted',
  NOT_CONTACTED = 'not_contacted',
}

export type CompanySemesterContactStatus =
  | EventType.BREAKFAST_TALK
  | EventType.COMPANY_PRESENTATION
  | EventType.COURSE
  | EventType.LUNCH_PRESENTATION
  | NonEventContactStatus;

interface CompleteSemesterStatus {
  id: number;
  semester: number;
  contactedStatus: CompanySemesterContactStatus[];
  contract?: string;
  statistics?: string;
  evaluation?: string;
  contractName?: string;
  statisticsName?: string;
  evaluationName?: string;
}

export type SemesterStatus = Pick<CompleteSemesterStatus, 'id' | 'semester' | 'contactedStatus'>;

export interface StudentCompanyContact {
  id: number;
  company: number;
  semester: number;
  user: number;
}

interface CompanyFile {
  id: number;
  file: string;
}

export interface CompanyContact {
  id: number;
  name: string;
  role?: string;
  mail?: string;
  phone?: string;
  mobile?: string;
  updatedAt?: number;
}

interface Company {
  id: number;
  name: string;
  active: boolean;
  description?: string;
  website?: string;
  companyType?: string;
  logo?: string;
  logoPlaceholder?: string;
  phone?: string;
  address?: string;
  eventCount?: number;
  joblistingCount?: number;
  thumbnail?: string;
  semesterStatuses?: SemesterStatus[];
  studentContacts?: StudentCompanyContact[];
  paymentMail: string;
  comments: number[];
  // contentTarget: ContentTarget;
  files: CompanyFile[];
  companyContacts: CompanyContact[];
}

export type ListCompany = Pick<
  Company,
  | 'id'
  | 'name'
  | 'description'
  | 'eventCount'
  | 'joblistingCount'
  | 'website'
  | 'companyType'
  | 'address'
  | 'logo'
  | 'logoPlaceholder'
  | 'thumbnail'
  | 'active'
>;

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
  company_presentation: 'Bedriftspresentasjon',
  lunch_presentation: 'Lunsjpresentasjon',
  alternative_presentation: 'Alternativ bedpres',
  course: 'Kurs',
  breakfast_talk: 'Frokostforedrag',
  party: 'Fest',
  social: 'Sosialt',
  event: 'Arrangement',
  kid_event: 'KID-arrangement',
  other: 'Annet',
};

export enum EventStatusType {
  NORMAL = 'NORMAL',
  OPEN = 'OPEN',
  TBA = 'TBA',
  INFINITE = 'INFINITE',
}

export interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  cover: string;
  coverPlaceholder: string;
  text: string;
  eventType: EventType;
  eventStatusType: EventStatusType;
  location: string;
  comments: number[];
  // contentTarget: ContentTarget;
  startTime: Date;
  endTime: Date;
  mergeTime?: Date;
  thumbnail: string;
  pools: EventPool[];
  totalCapacity?: number;
  registrationCloseTime?: Date;
  registrationDeadlineHours?: number;
  unregistrationCloseTime?: Date;
  unregistrationDeadline?: Date;
  unregistrationDeadlineHours?: number;
  company?: ListCompany;
  responsibleGroup?: PublicGroup;
  activeCapacity?: number;
  feedbackDescription: string;
  feedbackRequired: boolean;
  isPriced: boolean;
  priceMember: number;
  priceGuest?: number;
  useStripe: boolean;
  paymentDueDate?: Date;
  useCaptcha: boolean;
  waitingRegistrations?: number[];
  waitingRegistrationCount?: number;
  tags: string[];
  isMerged: boolean;
  heedPenalties: boolean;
  createdBy?: PublicUser;
  registrationCount?: number;
  legacyRegistrationCount?: number;
  survey?: number;
  useConsent: boolean;
  youtubeUrl: string;
  mazemapPoi?: number;
  pinned: boolean;
  responsibleUsers: PublicUser[];
  isForeignLanguage: boolean;
  unregistered: number[];
  userReg?: ReadRegistration;
  showCompanyDescription: boolean;

  // for survey
  attendedCount: number;

  // user specific
  price: number;
  activationTime: Date;
  isAdmitted: boolean;
  following: false | number;
  spotsLeft: number;
  pendingRegistration?: number;
  photoConsents: PhotoConsent[];

  unansweredSurveys: number[];

  actionGrant: ActionGrant;
}

// TODO: Ensure that pools have registrations where needed

export interface EventPool {
  id: number;
  name: string;
  capacity: number;
  activationDate: Date;
  permissionGroups: PublicGroup[];
  allPermissionGroupIds: number[];
  registrationCount: number;
  registrations: number[];
}

export type AuthPool = Pick<
  EventPool,
  | 'id'
  | 'name'
  | 'capacity'
  | 'activationDate'
  | 'permissionGroups'
  | 'allPermissionGroupIds'
  | 'registrationCount'
  | 'registrations'
>;

export type EventPoolWithRegistrations = Omit<EventPool, 'registrations'> & {
  registrations: EventPoolRegistrationWithUser[];
  isWaitingList?: boolean;
};

export type DetailedEvent = Omit<Event, 'pools'> & {
  pools: EventPoolWithRegistrations[];
};

// export type PoolWithRegistrations = Overwrite<
//   Optional<AuthPool, 'activationDate'>,
//   { registrations: PoolRegistrationWithUser[] }
// > & {
//   isWaitingList?: boolean;
// };

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

export type PublicRegistration = Pick<
  EventPoolRegistration,
  'id' | 'user' | 'pool' | 'status' | 'fetching' | 'unregistering'
>;

export type ReadRegistration = Pick<
  EventPoolRegistration,
  | 'feedback'
  | 'sharedMemberships'
  | 'presence'
  | 'LEGACYPhotoConsent'
  | 'status'
  | 'event'
  | 'fetching'
  | 'unregistering'
  | 'paymentStatus'
  | 'paymentError'
  | 'clientSecret'
> &
  PublicRegistration;
export type EventPoolRegistrationWithUser = Omit<ReadRegistration, 'user'> & {
  user: PublicUserWithAbakusGroups;
};
export enum Presence {
  PRESENT = 'PRESENT',
  LATE = 'LATE',
  NOT_PRESENT = 'NOT_PRESENT',
  UNKNOWN = 'UNKNOWN',
}
export type EventPoolRegistrationStatus =
  | 'PENDING_REGISTER'
  | 'SUCCESS_REGISTER'
  | 'FAILURE_REGISTER'
  | 'PENDING_UNREGISTER'
  | 'SUCCESS_UNREGISTER'
  | 'FAILURE_UNREGISTER';

export type LEGACY_PoolRegistrationPhotoConsent = 'PHOTO_NOT_CONSENT' | 'PHOTO_CONSENT' | 'UNKNOWN';

export type Semester = 'spring' | 'autumn';

export enum PhotoConsentDomain {
  WEBSITE = 'WEBSITE',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
}

export const AchievementIdentifiers = {
  event_count: 'event_count',
  event_rank: 'event_rank',
  quote_count: 'quote_count',
  event_price: 'event_price',
  event_rules: 'event_rules',
  meeting_hidden: 'meeting_hidden',
  keypress_order: 'keypress_order',
  complete_profile: 'complete_profile',
  poll_count: 'poll_count',
  penalty_period: 'penalty_period',
  genfors_count: 'genfors_count',
  gala_count: 'gala_count',
  easter_winner: 'easter_winner',
  christmas_calendar: 'christmas_calendar',
} as const;

export type Achievement = {
  id: number;
  identifier: AchievementIdentifier;
  updatedAt: Date;
  level: number;
  percentage: number;
};

export type AchievementIdentifier =
  (typeof AchievementIdentifiers)[keyof typeof AchievementIdentifiers];

export type PhotoConsent = {
  year: number;
  semester: Semester;
  domain: PhotoConsentDomain;
  isConsenting: boolean | null;
  updatedAt: Date;
};

export type EventRegistrationPaymentStatus =
  | 'pending'
  | 'manual'
  | 'succeeded'
  | 'failed'
  | 'card_declined'
  | 'expired_card';

export type EventPoolRegistration = {
  id: number;
  user: number;
  createdBy: number;
  updatedBy: number;
  pool: number;
  event: number;
  presence: Presence;
  feedback: string;
  sharedMemberships: unknown;
  status: EventPoolRegistrationStatus;
  registrationDate: Date;
  unregistrationDate: Date;
  adminRegistrationReason: string;
  paymentIntentId: string | null;
  paymentAmount: number;
  paymentAmountRefunded: number;
  LEGACYPhotoConsent: LEGACY_PoolRegistrationPhotoConsent;
  photoConsents: PhotoConsent[];

  // Only available if event is paid
  paymentStatus?: EventRegistrationPaymentStatus | null;

  // Added in manual reducers
  fetching?: boolean;
  unregistering?: boolean;
  paymentError?: string;
  clientSecret?: string;
};

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

export type RegisterEligibility = {
  canRegisterNow: boolean;
  isRegistrationDelayed: boolean;
  delayUntil: Date;
  delaySeconds: number;
  willBeWaitingList: boolean;
  reason:
    | 'already_registered'
    | 'registration_closed'
    | 'unanswered_surveys'
    | 'event_not_ready'
    | 'missing_photo_consents'
    | 'no_available_pools'
    | 'cannot_register_now';
};
