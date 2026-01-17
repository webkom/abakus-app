import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { EventType } from '../lib/types/types';
import { EventTypeConfig } from '../lib/types/eventColors';
import { Link } from 'expo-router';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

interface EventItemProps {
  id: number;
  title: string;
  eventType: string;
  startTime: string;
  registrationCount: number
  totalCapacity: number
}

export default function EventItem({ id, title, eventType, startTime, registrationCount, totalCapacity }: EventItemProps) {
  const event = EventTypeConfig[eventType as EventType];

  return (
    <Link href={`/authed/(tabs)/events/${id}`} asChild>
      <Pressable className="w-full rounded-xl pr-5 active:bg-gray-500">
        <View className="flex-row items-center justify-between">
          <View className="rounded-lg px-1 py-9" style={{ backgroundColor: event.color }} />

          <View className="mx-3 flex-1">
            <Text className="text-lg font-medium text-gray-900" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-sm text-gray-600">{format(new Date(startTime), "eeeeee dd. MMM HH:mm", {locale: nb})}</Text>
          </View>

          <View className='flex flex-col'>
            <Text>{registrationCount} / {totalCapacity}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
