import { useToken } from '@/lib/hooks/useAuth';
import { useMutation } from '@tanstack/react-query';

export const useEventAttendanceMutation = () => {
  const token = useToken();

  const signUp = useMutation({
    mutationFn: async ({ eventId }: { eventId: string }) => {
      return fetch(`https://lego-staging.abakus.no/api/v1/events/${eventId}/registrations/`, {
        body: JSON.stringify({
          captchaResponse: 'XXXX.DUMMY.TOKEN.XXXX',
          feedback: '',
        }),
        headers: {
          Accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.9,nb-NO;q=0.8,nb;q=0.7,no;q=0.6',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
    },
    mutationKey: ['eventAttendance'],
  });

  const signOff = useMutation({
    mutationFn: async ({ eventId }: { eventId: string }) => {
      return fetch(`https://lego-staging.abakus.no/api/v1/events/${eventId}/registrations/`, {
        headers: {
          Accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.9,nb-NO;q=0.8,nb;q=0.7,no;q=0.6',
          Authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
      });
    },
    mutationKey: ['eventAttendance'],
  });

  return { signUp, signOff };
};
