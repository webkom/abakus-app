import { api } from '../services/api';

export function useEvents() {
  const now = new Date().toISOString().split('T')[0];
  console.log(now);
  return api.useQuery('get', '/api/v1/events/', {
    params: { query: { date_after: now } },
  });
}
