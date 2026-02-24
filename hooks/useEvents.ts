import { api } from '@/lib/services/api';
import { useQuery } from '@tanstack/react-query';
import { Event } from '../lib/types/types';
import { HttpEventsResponse } from '@/lib/types/http';

function useEvents() {
  const now = new Date();

  const formattedTime = now.toISOString().split('T')[0];

  const result = useQuery({
    queryKey: ['events', formattedTime],
    queryFn: async () => {
      // 1. Await the Axios request
      const response = await api.get<HttpEventsResponse>(`events/?date_after=${formattedTime}`);

      // 2. Return the .data property so TanStack Query can cache it
      return response.data.results;
    },
  });

  return result;
}

export default useEvents;
