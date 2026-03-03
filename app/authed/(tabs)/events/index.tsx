import Header from '@/components/header';
import Icon from '@/components/icon';
import { Text } from '@/components/ui/text';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import EventItem from '../../../../components/eventItem';
import useEvents from '../../../../hooks/useEvents';

const EventsPage = () => {
  const { data: events, isLoading, isError, error } = useEvents();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    console.log(error);
  }, [error]);
  if (isLoading) {
    return (
      <View className="h-full flex-row items-center justify-center space-x-3">
        <StatusBar style="auto" />
        <ActivityIndicator size="large" color="#dc2626" />
        <Text className="text-xl font-semibold text-red-600">Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <StatusBar style="auto" />
        <Text className="text-base text-red-600">Error loading events. Please try again.</Text>
      </View>
    );
  }

  if ((events?.length ?? 0) === 0) {
    return (
      <View className="h-full w-full flex-col items-center justify-center bg-background">
        <Icon name="TriangleAlert" className="text-foreground" size={30} />
        <Text className="text-foreground">Fant ingen arrangementer</Text>
      </View>
    );
  }

  return (
    <View className="flex min-h-screen flex-col bg-background">
      <StatusBar style="auto" />
      <Header highlight={scrolled} />
      <ScrollView
        onScroll={(e) => {
          setScrolled(e.nativeEvent.contentOffset.y > 0);
        }}
        className="h-4/5 w-full bg-background"
        contentContainerClassName="pb-40">
        <View className="flex-col items-center gap-2.5 space-y-5 p-4">
          {events?.map?.((event) => (
            <EventItem
              key={event.id}
              id={event.id}
              title={event.title}
              eventType={event.eventType}
              startTime={''}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default EventsPage;
