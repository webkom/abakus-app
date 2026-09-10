import { Pressable, View } from 'react-native';
import type { ActivityRenderer, ContextValue } from '../types';
import { contextRender } from '../context-render';
import { joinValues } from './utils';
import { CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { navigateToTag } from '../tag';

const getMeetingInvitations = (aggregatedActivity: any): ContextValue[] =>
  aggregatedActivity.activities
    .map((activity: any) => {
      if (!activity.object) return undefined;
      return aggregatedActivity.context[activity.object] as ContextValue | undefined;
    })
    .filter((invitation: ContextValue | undefined): invitation is ContextValue =>
      Boolean(invitation)
    );

const getActor = (aggregatedActivity: any): ContextValue | undefined => {
  const actorKey = aggregatedActivity.lastActivity.actor;
  if (!actorKey) return undefined;
  return aggregatedActivity.context[actorKey] as ContextValue | undefined;
};

const MeetingInvitationRenderer: ActivityRenderer = {
  Header: ({ aggregatedActivity, tag: TagComponent }) => {
    const actor = getActor(aggregatedActivity);
    if (!actor) return null;

    const actorRender = actor.contentType ? contextRender[actor.contentType] : undefined;
    if (!actorRender) return null;

    const actorTag = actorRender(actor);

    return (
      <CardHeader>
        <View
          role="heading"
          aria-level={3}
          className="flex flex-row items-center gap-1 font-semibold">
          <Pressable onPress={() => navigateToTag(actorTag)}>
            <Avatar alt="Profile Picture">
              <AvatarImage source={{ uri: actorTag.profilePicture }} />
            </Avatar>
          </Pressable>
          <TagComponent {...actorTag} />
          <Text className="font-semibold">inviterte deg</Text>
        </View>
      </CardHeader>
    );
  },
  Content: ({ aggregatedActivity, tag: TagComponent }) => {
    const meetingInvitations = getMeetingInvitations(aggregatedActivity);
    if (meetingInvitations.length === 0) return null;

    const meetingTags = meetingInvitations
      .map((invitation) => {
        const render = invitation.contentType ? contextRender[invitation.contentType] : undefined;
        if (!render) return null;
        return <TagComponent key={invitation.id} {...render(invitation)} />;
      })
      .filter(Boolean);

    if (meetingTags.length === 0) return null;

    return (
      <CardContent>
        <Text>{joinValues(meetingTags)}</Text>
      </CardContent>
    );
  },
  getNotificationUrl: (aggregatedActivity) => {
    const meetingInvitations = getMeetingInvitations(aggregatedActivity);

    if (meetingInvitations.length !== 1) {
      return { link: 'https://abakus.no/meetings', linkType: 'external' };
    }

    const invitation = meetingInvitations[0];
    if (!invitation) {
      return { link: 'https://abakus.no/meetings', linkType: 'external' };
    }

    return {
      link: `https://abakus.no/meetings/${invitation.meeting.id}/`,
      linkType: 'external',
    };
  },
};

export default MeetingInvitationRenderer;
