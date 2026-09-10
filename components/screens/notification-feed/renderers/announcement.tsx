import { Pressable, View } from 'react-native';
import type { ActivityRenderer, ContextValue } from '../types';
import { contextRender } from '../context-render';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { navigateToTag } from '../tag';

const getActorAndObject = (aggregatedActivity: any) => {
  const latestActivity = aggregatedActivity.lastActivity;
  const actorKey = latestActivity.actor;
  const objectKey = latestActivity.object;

  if (!actorKey) return { actor: undefined, object: undefined };

  const actor = aggregatedActivity.context[actorKey] as ContextValue | undefined;
  const object = aggregatedActivity.context[objectKey] as ContextValue | undefined;

  return { actor, object };
};

const AnnouncementRenderer: ActivityRenderer = {
  Header: ({ aggregatedActivity, tag: TagComponent }) => {
    const { actor, object } = getActorAndObject(aggregatedActivity);
    if (!actor || !object) return null;

    const actorRender = actor.contentType ? contextRender[actor.contentType] : undefined;
    if (!actorRender) return null;

    const actorTag = actorRender(actor);

    return (
      <CardHeader>
        {object.fromGroup ? (
          <CardTitle>{object.fromGroup.name} kunngjorde</CardTitle>
        ) : (
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
            <Text className="font-semibold">kunngjorde</Text>
          </View>
        )}
      </CardHeader>
    );
  },
  Content: ({ aggregatedActivity, tag: TagComponent }) => {
    const { object } = getActorAndObject(aggregatedActivity);
    if (!object) return null;

    const objectRender = object.contentType ? contextRender[object.contentType] : undefined;
    if (!objectRender) return null;

    return (
      <CardContent>
        <TagComponent {...objectRender(object)} />
      </CardContent>
    );
  },
};

export default AnnouncementRenderer;
