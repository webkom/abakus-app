import { useQuery } from '@tanstack/react-query';
import env from 'env';
import { Event } from '../lib/types/types';

function useEvents() {
  const now = new Date();

  const formattedTime = now.toISOString().split('T')[0];

  const result = useQuery<Event[]>({
    queryKey: ['events', formattedTime],
    queryFn: async () => {
      const res = await fetch(
        `${env.EXPO_PUBLIC_API_URL}/api/v1/events/?date_after=${formattedTime}`
      );

      if (!res.ok) {
        const text = await res.text();
        console.error('Fetch failed:', res.status, text);
        throw new Error(`Failed to fetch events (${res.status})`);
      }

      const data = await res.json();
      return data?.results ?? [];
    },
  });

  return result;
}

export default useEvents;
