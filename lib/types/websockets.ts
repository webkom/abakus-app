import { components } from './schema';

export enum SocketEventType {
  RegistrationSuccess = 'Event.SOCKET_REGISTRATION.SUCCESS',
  UnregistrationSuccess = 'Event.SOCKET_UNREGISTRATION.SUCCESS',
}

export enum RegistrationStatus {
  SuccessRegister = 'SUCCESS_REGISTER',
  SuccessUnregister = 'SUCCESS_UNREGISTER',
}

export interface BaseMeta {
  eventId: number;
}

export interface UnregistrationMeta extends BaseMeta {
  activationTime: string;
  fromPool: number;
}

// --- Payload Types ---

export interface RegistrationPayload {
  id: number;
  user: components['schemas']['CurrentUser'];
  pool: number;
  status: RegistrationStatus.SuccessRegister;
}

export interface UnregistrationPayload {
  id: number;
  user: components['schemas']['CurrentUser'];
  pool: null;
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
