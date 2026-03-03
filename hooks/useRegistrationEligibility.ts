import { useUser } from '@/lib/hooks/useUser';
import { api } from '@/lib/services/api';
import { RegisterEligibility } from '@/lib/types/types';
import { useQuery } from '@tanstack/react-query';

export const useRegistrationEligibility = (eventId: string) => {
  const user = useUser();
  return useQuery({
    queryFn: () =>
      api.get<RegisterEligibility>(`api/v1/events/${eventId}/registration-eligibility/`),
    queryKey: ['registration-eligibility', eventId, user?.id],
  });
};
