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
  icalToken: string;
  abakusGroups: string[];
  isAbakusMember: boolean;
  isAbakomMember: boolean;
  selectedTheme: 'light' | 'dark' | 'auto';
  githubUsername?: string;
  linkedinId?: string;
  achievementsScore: number;
  achievementRank: number;
  commandSuggestions?: Array<string>;
};

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
