import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import useEvents from '../../../../hooks/useEvents';
import EventItem from '../../../../components/eventItem';

const EventsPage = () => {
  const events = useEvents();

  if (events.isLoading) {
    return (
      <View className="h-full flex-row items-center justify-center space-x-3">
        <ActivityIndicator size="large" color="#dc2626" />
        <Text className="text-xl font-semibold text-red-600">Loading...</Text>
      </View>
    );
  }

  if (events.isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-base text-red-600">Error loading events. Please try again.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="h-4/5 w-full">
      <View className="flex-col items-center space-y-10 p-4">
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
