import { api } from '@/lib/services/api';
import { HttpEventsResponse } from '@/lib/types/http';
import { useQuery } from '@tanstack/react-query';

function useEvents() {
  const now = new Date();

  const formattedTime = now.toISOString().split('T')[0];

  const result = useQuery({
    queryKey: ['events', formattedTime],
    queryFn: async () => {
      // 1. Await the Axios request
      const response = await api.get<HttpEventsResponse>(`/api/v1/events/`, {
        params: {
          date_after: formattedTime,
        },
      });

      // 2. Return the .data property so TanStack Query can cache it
      return response.data.results;
    },
  });

  return result;
}

export default useEvents;
