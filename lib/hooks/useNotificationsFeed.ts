import { useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

export const useNotificationsFeed = () => {
  return api.useQuery('get', '/api/v1/feed-notifications/');
};

export const useNotificationsData = () => {
  return api.useQuery('get', '/api/v1/feed-notifications/notification_data/');
};

export const useMarkAllNotifications = () => {
  const queryClient = useQueryClient();

  return api.useMutation('post', '/api/v1/feed-notifications/mark_all/', {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get', '/api/v1/feed-notifications/notification_data/'],
      });
      queryClient.invalidateQueries({
        queryKey: ['get', '/api/v1/feed-notifications/'],
      });
    },
  });
};
