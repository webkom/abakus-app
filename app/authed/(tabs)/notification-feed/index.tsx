import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { useNotificationsFeed } from '@/lib/hooks/useNotificationFeed';
import { ActivityRenderer } from '@/components/screens/notification-feed/types';
import AnnouncementRenderer from '@/components/screens/notification-feed/renderers/announcement';
import MeetingInvitationRenderer from '@/components/screens/notification-feed/renderers/meeting-invitation';
import AdminRegistrationRenderer from '@/components/screens/notification-feed/renderers/admin-registration';
import RegistrationBumpRenderer from '@/components/screens/notification-feed/renderers/registration-bump';
import PenaltyRenderer from '@/components/screens/notification-feed/renderers/penalty';
import Header from '@/components/header';
import Activity from '@/components/screens/notification-feed/activity';
import { Text } from '@/components/ui/text';

const activityRenderers: Record<string, ActivityRenderer> = {
  announcement: AnnouncementRenderer,
  meeting_invitation: MeetingInvitationRenderer,
  admin_registration: AdminRegistrationRenderer,
  admin_unregistration: AdminRegistrationRenderer,
  registration_bump: RegistrationBumpRenderer,
  penalty: PenaltyRenderer,
};

const Feed = () => {
  const { data, isLoading, isError, refetch, isRefetching } = useNotificationsFeed();

  if (isLoading) {
    return (
      <View className="h-full flex-row items-center justify-center space-x-3">
        <ActivityIndicator size="large" color="#dc2626" />
        <Text className="text-xl font-semibold text-red-600">Laster inn...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-base text-red-600">Klarer ikke å laste inn varslinger.</Text>
      </View>
    );
  }

  return (
    <>
      <Header className="mb-7 bg-background" />
      <FlatList
        data={data.results ?? []}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          const activityRenderer = activityRenderers[item.verb];
          if (!activityRenderer) return null;

          return <Activity aggregatedActivity={item} activityRenderer={activityRenderer} />;
        }}
        ListEmptyComponent={
          <Text className="text-xl font-semibold text-red-600">Ingen aktiviteter i feeden</Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={['#dc2626']}
            tintColor="#dc2626"
          />
        }
      />
    </>
  );
};

export default Feed;
