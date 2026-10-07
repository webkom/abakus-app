import type { ActivityRenderer } from '../types';
import { getEvents, joinValues } from './utils';
import { contextRender } from '../context-render';
import { Text } from '@/components/ui/text';
import { Card } from 'heroui-native';
import Icon from '@/components/icon';

const AdminRegistrationRenderer: ActivityRenderer = {
  Header: () => (
    <Card.Header>
      <Card.Title>Påmeldt av en administrator</Card.Title>
    </Card.Header>
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
      <Card.Body>
        <Text>{joinValues(eventTags)}</Text>
      </Card.Body>
    );
  },
  Icon: () => <Icon name="CalendarCheck" className="text-red-600" />,
  getNotificationUrl: (aggregatedActivity) => {
    const events = getEvents(aggregatedActivity);

    if (events.length !== 1) {
      return { link: '/authed/(tabs)/events', linkType: 'internal' };
    }

    const event = events[0];
    if (!event) {
      return { link: '/authed/(tabs)/events', linkType: 'internal' };
    }

    return { link: `/authed/(stacks)/event/${event.id}`, linkType: 'internal' };
  },
};

export default AdminRegistrationRenderer;
