import { Pressable } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { nb } from 'date-fns/locale';
import { router } from 'expo-router';
import { Linking } from 'react-native';
import { Text } from '@/components/ui/text';
import type { ActivityRenderer, AggregatedFeedItem } from './types';
import { Tag } from './tag';
import { Card, CardFooter } from '@/components/ui/card';

type ActivityProps = {
  aggregatedActivity: AggregatedFeedItem;
  activityRenderer: ActivityRenderer;
};

const Activity = ({ aggregatedActivity, activityRenderer }: ActivityProps) => {
  const { Header, Content, getNotificationUrl } = activityRenderer;

  const handlePress = () => {
    const destination = getNotificationUrl?.(aggregatedActivity);
    if (!destination) return;

    if (destination.linkType === 'internal') {
      router.push(destination.link);
    } else {
      Linking.openURL(destination.link);
    }
  };

  return (
    <Pressable onPress={getNotificationUrl ? handlePress : undefined}>
      {({ pressed }) => (
        <Card className={pressed ? 'rounded-none bg-gray-100' : 'rounded-none'}>
          <Header aggregatedActivity={aggregatedActivity} tag={Tag} />
          {Content && <Content aggregatedActivity={aggregatedActivity} tag={Tag} />}
          <CardFooter>
            <Text className="text-sm text-gray-500">
              {'for '}
              {formatDistanceToNow(new Date(aggregatedActivity.lastActivity.time), {
                addSuffix: true,
                locale: nb,
              })}
            </Text>
          </CardFooter>
        </Card>
      )}
    </Pressable>
  );
};

export default Activity;
