import { ReactNode } from 'react';
import type { AggregatedFeedItem, ContextValue } from '../types';

export const getEvents = (aggregatedActivity: AggregatedFeedItem): ContextValue[] => {
  const events = aggregatedActivity.activities.map((activity) => {
    if (!activity.actor) return undefined;
    return aggregatedActivity.context[activity.actor] as ContextValue | undefined;
  });

  return events.filter((event): event is ContextValue => event !== undefined);
};

export const joinValues = (items: ReactNode[]): ReactNode => {
  if (items.length === 0) return null;
  if (items.length === 1) return items[0];

  return items.reduce((acc, item, index) => {
    if (index === 0) return [item];
    const separator = index === items.length - 1 ? ' og ' : ', ';
    return [...(acc as ReactNode[]), separator, item];
  }, [] as ReactNode[]);
};
