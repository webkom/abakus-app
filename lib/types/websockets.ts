// --- Meta Types ---

import { User } from './user';

export enum SocketEventType {
  RegistrationSuccess = 'Event.SOCKET_REGISTRATION.SUCCESS',
  UnregistrationSuccess = 'Event.SOCKET_UNREGISTRATION.SUCCESS',
}

export enum RegistrationStatus {
  SuccessRegister = 'SUCCESS_REGISTER',
  SuccessUnregister = 'SUCCESS_UNREGISTER',
}

export enum GroupType {
  Annen = 'annen',
  Komite = 'komite',
  Klasse = 'klasse',
  // Add others if they exist in your domain (e.g., "styret", "undergruppe")
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other', // Extrapolated as likely options
}

export interface AbakusGroup {
  id: number;
  name: string;
  description: string;
  contactEmail: string;
  parent: number | null;
  logo: string | null;
  logoPlaceholder: string | null;
  type: GroupType;
  showBadge: boolean;
  active: boolean;
}

export interface BaseMeta {
  eventId: number;
}

export interface UnregistrationMeta extends BaseMeta {
  activationTime: string; // ISO Date string
  fromPool: number;
}

// --- Payload Types ---

export interface RegistrationPayload {
  id: number;
  user: User;
  pool: number;
  status: RegistrationStatus.SuccessRegister;
}

export interface UnregistrationPayload {
  id: number;
  user: User;
  pool: null; // Pool is null on unregistration in your example
  status: RegistrationStatus.SuccessUnregister;
}

// --- Event Types ---

export interface SocketRegistrationEvent {
  type: SocketEventType.RegistrationSuccess;
  meta: BaseMeta;
  payload: RegistrationPayload;
}

export interface SocketUnregistrationEvent {
  type: SocketEventType.UnregistrationSuccess;
  meta: UnregistrationMeta;
  payload: UnregistrationPayload;
}

export type SocketEvent = SocketRegistrationEvent | SocketUnregistrationEvent;
