import { useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

export function useEventRegistration(eventPk: string) {
  const queryClient = useQueryClient();

  const registerMutation = api.useMutation('post', '/api/v1/events/{eventPk}/registrations/', {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: api.queryOptions('get', '/api/v1/events/{id}/', {
          params: { path: { id: Number(eventPk) } },
        }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: api.queryOptions('get', '/api/v1/events/').queryKey,
      });
    },
  });

  const unregisterMutation = api.useMutation(
    'delete',
    '/api/v1/events/{eventPk}/registrations/{id}/',
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: api.queryOptions('get', '/api/v1/events/{id}/', {
            params: { path: { id: Number(eventPk) } },
          }).queryKey,
        });
        queryClient.invalidateQueries({
          queryKey: api.queryOptions('get', '/api/v1/events/').queryKey,
        });
      },
    }
  );

  const updateRegistrationMutation = api.useMutation(
    'patch',
    '/api/v1/events/{eventPk}/registrations/{id}/',
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: api.queryOptions('get', '/api/v1/events/{id}/', {
            params: { path: { id: Number(eventPk) } },
          }).queryKey,
        });
      },
    }
  );

  const register = (feedback?: string, captchaResponse?: string) => {
    return registerMutation.mutateAsync({
      params: { path: { eventPk } },
      body: {
        feedback: feedback ?? '',
        captchaResponse,
      } as any,
    });
  };

  const unregister = (registrationId: number) => {
    return unregisterMutation.mutateAsync({
      params: { path: { eventPk, id: registrationId } },
    });
  };

  const updateFeedback = (registrationId: number, feedback: string) => {
    return updateRegistrationMutation.mutateAsync({
      params: { path: { eventPk, id: registrationId } },
      body: { feedback } as any,
    });
  };

  return {
    register,
    unregister,
    updateFeedback,
    isRegistering: registerMutation.isPending,
    isUnregistering: unregisterMutation.isPending,
    isUpdating: updateRegistrationMutation.isPending,
    registerError: registerMutation.error,
    unregisterError: unregisterMutation.error,
  };
}
