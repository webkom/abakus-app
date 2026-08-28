import type { components } from '@/lib/types/schema';

type EventTypeEnum = components['schemas']['EventTypeEnum'];

export const EVENTS_LIMIT = 5;

export const presentations: EventTypeEnum[] = [
  'company_presentation',
  'lunch_presentation',
  'alternative_presentation',
  'course',
  'breakfast_talk',
  'nexus_event',
];

export const others: EventTypeEnum[] = ['other', 'event', 'social', 'party', 'gala'];
