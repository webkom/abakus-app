import { TagProps } from './types';

export const contextRender: Record<string, (context: any) => TagProps> = {
  'users.user': (user) => ({
    link: `https://abakus.no/users/${user.username}/`,
    text: `${user.firstName} ${user.lastName}`,
    linkableContent: true,
    profilePicture: user.profilePicture,
    linkType: 'external',
  }),
  'notifications.announcement': (announcement) => ({
    link: '',
    text: announcement.message,
    linkableContent: false,
  }),
  'meetings.meetinginvitation': (context) => ({
    link: `https://abakus.no/meetings/${context.meeting.id}/`,
    text: context.meeting.title,
    linkableContent: true,
    linkType: 'external',
  }),
  'events.event': (context) => ({
    link: `/authed/(tabs)/events/${context.id}`,
    text: context.title,
    linkableContent: true,
    linkType: 'internal',
  }),
};
