import React from 'react';
import { Text, View } from 'react-native';
import { Event, EventStatusType, EventType } from '../lib/types/types';
import { EventTypeConfig } from '../lib/types/eventColors';
import { Link } from 'expo-router';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { Button } from './ui/button';

interface EventItemProps {
  id: number;
  event: Event;
}

export default function EventItem({ id, event }: EventItemProps) {
  const eventColor = EventTypeConfig[event.eventType as EventType].color;

  const getRegistrationStatus = () => {
    if (
      event.eventStatusType === EventStatusType.OPEN ||
      event.eventStatusType === EventStatusType.INFINITE
    ) {
      return 'Åpent for alle';
    }

    if (event.isAdmitted) {
      return 'Påmeldt';
    }

    if (event.userReg && event.eventStatusType === EventStatusType.NORMAL) {
      return 'På venteliste';
    }

    if (event.activationTime) {
      if (new Date(event.activationTime) > new Date()) {
        return 'Snart åpent';
      }
      return 'Åpnet';
    }

    return 'Kan ikke melde på';
  };

  const getCapacity = () => {
    if (!event.registrationCount) {
      return `${event.totalCapacity} PLASSER`;
    }

    return `${event.registrationCount} / ${event.totalCapacity}`;
  };

  const registrationStatus = getRegistrationStatus();
  const capacity = getCapacity();
  const formattedStartTime = format(new Date(event.startTime), 'eeeeee dd. MMM HH:mm', { locale: nb })

  return (
    <Link href={`/authed/(tabs)/events/${id}`} asChild>
      <Button variant={'outline'} className="r-5 h-16 w-full rounded-xl active:bg-neutral-200">
        <View className="flex-row items-center justify-between">
          <View className="rounded-lg px-1 py-8" style={{ backgroundColor: eventColor }} />

          <View className="mx-3 flex-1">
            <Text className="text-lg font-medium text-gray-900" numberOfLines={1}>
              {event.title}
            </Text>
            <Text className="text-sm text-gray-600">
              {formattedStartTime}
            </Text>
          </View>

          <View className="flex flex-col">
            <Text>{registrationStatus}</Text>
            <Text
              className={
                event.eventStatusType === EventStatusType.INFINITE
                  ? 'hidden'
                  : 'rounded-xl bg-gray-200 px-2 py-1 font-semibold'
              }>
              {capacity}
            </Text>
          </View>
        </View>
      </Button>
    </Link>
  );
}
