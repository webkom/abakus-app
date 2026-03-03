import { useToken } from '@/lib/hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import useEvent from './useEvent';
import { SocketEvent, SocketEventType } from '@/lib/types/websockets';
import { setupWebSocketServer } from '@/lib/services/websockets';
import { useUser } from '@/lib/hooks/useUser';
import { api } from '@/lib/services/api';

/**
 * Handles event registration, unregistration, registration status and websockets
 * @param id Event ID to register/unregister for
 * @returns
 */
export const useEventAttendance = ({ id }: { id: string }) => {
  const token = useToken();
  const { data: event, isLoading, isError } = useEvent(id);
  const queryClient = useQueryClient();
  const user = useUser();
  const [attendees, setAttendees] = useState<string[]>([]);
  const signOffMutation = useMutation({
    mutationFn: async ({ registrationId }: { registrationId: string }) => {
      return api.delete(`events/${id}/registrations/${registrationId}/`);
    },
    mutationKey: ['eventAttendance'],
  });

  const totalCapacity = useMemo(() => {
    if (!event?.pools?.length) {
      return undefined;
    }

    return event.pools.reduce((sum, pool) => sum + pool.capacity, 0);
  }, [event?.pools]);

  const isUserSignedUp = useMemo(() => {
    return attendees.includes(user?.id?.toString() ?? '');
  }, [attendees, user?.id]);

  const totalCurrentPenalties = user?.penalties?.reduce((sum, penalty) => sum + penalty, 0) ?? 0;

  useEffect(() => {
    if (!event?.pools) return;

    // const allAttendees =
    //   event.pools.flatMap((pool) => pool.registrations?.map((reg) => reg.id.toString())) ?? [];

    // console.log(allAttendees);

    // setAttendees(allAttendees);
  }, [event?.pools]);

  useEffect(() => {
    let isMounted = true;
    let ws: WebSocket | null = null;

    const callback = (message: SocketEvent) => {
      console.log('Received WebSocket message:', message);

      if (
        message.type === SocketEventType.RegistrationSuccess &&
        message.meta.eventId === event?.id
      ) {
        setAttendees((prev) => [...prev, message.payload.user.id.toString()]);
      } else if (
        message.type === SocketEventType.UnregistrationSuccess &&
        message.meta.eventId === event?.id
      ) {
        setAttendees((prev) =>
          prev.filter((attendeeId) => attendeeId !== message.payload.user.id.toString())
        );
      }
    };

    const initializeWebSocket = async () => {
      console.log('Setting up websocket server');
      const socket = await setupWebSocketServer(callback);
      if (!isMounted) {
        socket.close();
        return;
      }
      ws = socket;
    };

    initializeWebSocket();

    return () => {
      isMounted = false;
      ws?.close();
    };
  }, [event?.id]);

  const signUp = useMutation({
    mutationFn: async ({ turnstileToken }: { turnstileToken: string }) => {
      if (!turnstileToken) throw new Error('Turnstile token must be defined');
      return await api.post(
        `/events/${id}/registrations/`,
        {
          captchaResponse: turnstileToken,
          feedback: '',
        },
        {
          headers: {
            // Accept: 'application/json',
            // 'Accept-Language': 'en-US,en;q=0.9,nb-NO;q=0.8,nb;q=0.7,no;q=0.6',
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      // Invalidate attendees list for event after successful registration
      queryClient.invalidateQueries({ queryKey: ['event', id] });
    },
    mutationKey: ['eventAttendance'],
  });

  const signOffAsync = () => {
    // Get the user's registration ID for this event
    const registrationId = event?.pools
      ?.flatMap((pool) => pool.registrations ?? [])
      .find((reg) => reg.user.id.toString() === user?.id?.toString())?.id;
    if (!registrationId) {
      return Promise.reject(new Error('User is not registered for this event'));
    }

    return signOffMutation.mutateAsync({ registrationId: registrationId.toString() }).then(() => {
      // Invalidate attendees list for event after successful unregistration
      queryClient.invalidateQueries({ queryKey: ['event', id] });
    });
  };

  return {
    signUp,
    signOffAsync,
    totalCapacity,
    isUserSignedUp,
    isLoading,
    isError,
    attendees,
    totalCurrentPenalties,
  };
};
