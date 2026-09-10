import type { ActivityRenderer } from '../types';
import { getEvents, joinValues } from './utils';
import { contextRender } from '../context-render';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';

const AdminUnregistrationRenderer: ActivityRenderer = {
  Header: () => (
    <CardHeader>
      <CardTitle>Fjernet av en administrator</CardTitle>
    </CardHeader>
  ),
  Content: ({ aggregatedActivity, tag: TagComponent }) => {
    const events = getEvents(aggregatedActivity);
    if (events.length === 0) return null;

    const eventTags = events
      .map((event) => {
        const render = event.contentType ? contextRender[event.contentType] : undefined;
        if (!render) return null;
        return <TagComponent key={event.id} {...render(event)} />;
      })
      .filter(Boolean);

    if (eventTags.length === 0) return null;

    return (
      <CardContent>
        <Text>{joinValues(eventTags)}</Text>
      </CardContent>
    );
  },
  getNotificationUrl: (aggregatedActivity) => {
    const events = getEvents(aggregatedActivity);

    if (events.length !== 1) {
      return { link: '/authed/(tabs)/events', linkType: 'internal' };
    }

    const event = events[0];
    if (!event) {
      return { link: '/authed/(tabs)/events', linkType: 'internal' };
    }

    return { link: `/authed/(tabs)/events/${event.id}`, linkType: 'internal' };
  },
};

export default AdminUnregistrationRenderer;
