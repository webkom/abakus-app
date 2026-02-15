import { useQuery } from '@tanstack/react-query';
import { Event } from '../lib/types/types';
import env from 'env';
import { useToken } from '@/lib/hooks/useAuth';
import { api } from '@/lib/services/api';

function useEvent(id: string) {
  const token = useToken();
  return useQuery<Event>({
    queryKey: ['event', id],
    queryFn: async () => {
      const res = await api.get<Event>(`${env.EXPO_PUBLIC_API_URL}/api/v1/events/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      if (res.data) {
        return res.data;
      } else {
        const text = res.statusText;
        throw new Error(text);
      }
    },
  });
}

export default useEvent;
