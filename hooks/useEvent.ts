import { useQuery } from '@tanstack/react-query';
import { Event } from '../lib/types/types';
import env from 'env';

function useEvent(id: string) {
  return useQuery<Event>({
    queryKey: ['event', id],
    queryFn: async () => {
      const res = await fetch(`${env.EXPO_PUBLIC_API_URL}/api/v1/events/${id}/`);

      if (!res.ok) {
        const text = await res.text();
        console.error('Fetch failed:', res.status, text);
        throw new Error(`Failed to fetch event`);
      }

      const data = await res.json();
      return data;
    },
  });
}

export default useEvent;
