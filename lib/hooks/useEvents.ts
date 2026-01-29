import { useQuery } from '@tanstack/react-query';
import { Event } from '../types/types';
import { api } from '../services/api';

function useEvents() {
  const now = new Date();

  const formattedTime = now.toISOString().split('T')[0];

  const result = useQuery<Event[]>({
    queryKey: ['events', formattedTime],
    queryFn: async () => {
      const res = await api.get<{ results: Event[] }>(`api/v1/events/?date_after=${formattedTime}`);

      if (res.status !== 200) {
        const text = res.statusText;
        console.error('Fetch failed:', res.status, text);
        throw new Error(`Failed to fetch events (${res.status})`);
      }

      const data = res.data.results;
      return data ?? [];
    },
  });

  return result;
}

export default useEvents;
