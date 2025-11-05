import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { EventType } from '../lib/types/types';
import { EventTypeConfig } from '../lib/types/eventColors';
import { Link } from 'expo-router';

interface EventItemProps {
  id: number;
  title: string;
  eventType: string;
  startTime: string;
}

export default function EventItem({ id, title, eventType, startTime }: EventItemProps) {
  const event = EventTypeConfig[eventType as EventType];

  function formatDate(date: Date): string {
    return date
      .toLocaleString('nb-NO', {
        day: '2-digit',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/Oslo',
      })
      .replace(',', '.');
  }

  return (
    <Link href={`/authed/(tabs)/events/${id}`} asChild>
      <Pressable className="w-full rounded-xl pr-5 active:bg-gray-500">
        <View className="flex-row items-center justify-between">
          <View className="rounded-lg px-1 py-9" style={{ backgroundColor: event.color }} />

          <View className="mx-3 flex-1">
            <Text className="text-lg font-medium text-gray-900" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-sm text-gray-600">{formatDate(new Date(startTime))}</Text>
          </View>

          <View>
            <Text className="text-sm text-gray-600">→</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
