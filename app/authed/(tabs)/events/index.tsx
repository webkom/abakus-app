import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import useEvents from '../../../../hooks/useEvents';
import EventItem from '../../../../components/eventItem';

const EventsPage = () => {
  const events = useEvents();

  if (events.isLoading) {
    return (
      <View className="flex-row justify-center items-center h-full space-x-3">
        <ActivityIndicator size="large" color="#dc2626" />
        <Text className="text-xl text-red-600 font-semibold">Loading...</Text>
      </View>
    );
  }

  if (events.isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-600 text-base">
          Error loading events. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="w-full h-4/5">
      <View className="flex-col space-y-10 items-center p-4">
        {events.data?.map((event) => (
          <EventItem
            key={event.id}
            id={event.id}
            title={event.title}
            eventType={event.eventType}
            startTime={event.startTime}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default EventsPage;
