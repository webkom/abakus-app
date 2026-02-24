import { useToken } from '@/lib/hooks/useAuth';
import { api } from '@/lib/services/api';
import { useQuery } from '@tanstack/react-query';
import { DetailedEvent } from '../lib/types/types';

function useEvent(id: string) {
  const token = useToken();
  return useQuery<DetailedEvent>({
    queryKey: ['event', id],
    queryFn: async () => {
      const res = await api.get<DetailedEvent>(`/events/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
