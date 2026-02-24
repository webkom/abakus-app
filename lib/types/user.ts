import {
  Achievement,
  ActionGrant,
  Group,
  PhotoConsent,
  PublicEmailList,
  PublicGroup,
  RoleType,
} from './types';
import { AbakusGroup } from './websockets';

export default interface Membership {
  user: number;
  id: number;
  abakusGroup: number;
  role: RoleType;
  isActive: boolean;
  emailListsEnabled: boolean;
  createdAt: Date;
  firstJoinDate?: Date; //This is the first date the member joined this group based on history
}

export type PastMembership = {
  startDate: Date;
  endDate: Date;
  abakusGroup: PublicGroup;
} & Membership;

export type UserPermissionGroup = Pick<PublicGroup, 'id' | 'name'>;

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: keyof typeof Gender;
  email: string;
  emailAddress: string;
  emailListsEnabled: boolean;
  internalEmailAddress?: string;
  phoneNumber?: string;
  profilePicture: string;
  profilePicturePlaceholder: string;
  allergies: string;
  isActive: boolean;
  isStudent: boolean;
  abakusEmailLists: PublicEmailList[];
  penalties: number[];
  icalToken: string;
  abakusGroups: Group[];
  isAbakusMember: boolean;
  isAbakomMember: boolean;
  pastMemberships: PastMembership[];
  selectedTheme: 'light' | 'dark' | 'auto';
  permissionsPerGroup: {
    abakusGroup: UserPermissionGroup;
    permissions: string[];
    parentPermissions: {
      abakusGroup: UserPermissionGroup;
      permissions: string[];
    }[];
  }[];
  photoConsents?: PhotoConsent[];
  memberships: Membership[];
  githubUsername?: string;
  linkedinId?: string;
  actionGrant?: ActionGrant;
  achievements: Achievement[];
  achievementsScore: number;
  achievementRank: number;
  commandSuggestions?: string[];
};

export type CurrentUser = Pick<
  User,
  | 'id'
  | 'username'
  | 'firstName'
  | 'lastName'
  | 'fullName'
  | 'email'
  | 'emailAddress'
  | 'phoneNumber'
  | 'emailListsEnabled'
  | 'profilePicture'
  | 'profilePicturePlaceholder'
  | 'gender'
  | 'allergies'
  | 'isActive'
  | 'isStudent'
  | 'abakusEmailLists'
  | 'abakusGroups'
  | 'isAbakusMember'
  | 'isAbakomMember'
  | 'penalties'
  | 'icalToken'
  | 'memberships'
  | 'pastMemberships'
  | 'internalEmailAddress'
  | 'selectedTheme'
  | 'permissionsPerGroup'
  | 'photoConsents'
  | 'githubUsername'
  | 'linkedinId'
  | 'actionGrant'
  | 'achievements'
  | 'achievementsScore'
  | 'achievementRank'
  | 'commandSuggestions'
>;

export type PublicUser = Pick<
  User,
  | 'id'
  | 'username'
  | 'firstName'
  | 'lastName'
  | 'fullName'
  | 'gender'
  | 'profilePicture'
  | 'profilePicturePlaceholder'
  | 'internalEmailAddress'
  | 'githubUsername'
  | 'linkedinId'
  | 'achievements'
  | 'achievementsScore'
  | 'achievementRank'
>;
export type PublicUserWithAbakusGroups = Pick<User, 'abakusGroups'> & PublicUser;

export const Gender = {
  male: 'Mann',
  female: 'Kvinne',
  other: 'Annet',
} as const;

export type Role = keyof typeof ROLES;

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
