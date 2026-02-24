import { Event } from './types';

export type HttpEventsResponse = {
  actionGrant: string[];
  next: string;
  previous: string;
  results: Event[];
};
