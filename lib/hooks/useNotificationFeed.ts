import { api } from '../services/api';

export const useNotificationsFeed = () => {
  return api.useQuery('get', '/api/v1/feed-notifications/');
};
