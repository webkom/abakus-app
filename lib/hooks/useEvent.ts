import { api } from '../services/api';

export function useEvent(id: string) {
  return api.useQuery('get', '/api/v1/events/{id}/', {
    params: { path: { id: Number(id) } },
  });
}
