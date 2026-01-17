import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import useEvents from '../../../../hooks/useEvents';
import EventItem from '../../../../components/eventItem';
import { StatusBar } from 'expo-status-bar';
import Header from '@/components/header';

const EventsPage = () => {
  const events = useEvents();

  if (events.isLoading) {
    return (
      <View className="h-full flex-row items-center justify-center space-x-3">
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color="#dc2626" />
        <Text className="text-xl font-semibold text-red-600">Laster inn...</Text>
      </View>
    );
  }

  if (events.isError || !events.data) {
    return (
      <View className="flex-1 items-center justify-center">
        <StatusBar style="dark" />
        <Text className="text-base text-red-600">Klarer ikke å laste inn arrangementer.</Text>
      </View>
    );
  }

  const eventsCompanyCourses = [];
  const eventsSocials = [];
  const EVENTS = 5;

  for (const e of events.data) {
    if (
      eventsCompanyCourses.length < EVENTS &&
      (e.eventType === 'company_presentation' ||
        e.eventType === 'course' ||
        e.eventType === 'alternative_presentation')
    ) {
      eventsCompanyCourses.push(e);
    }

    if (eventsSocials.length < EVENTS && (e.eventType === 'social' || e.eventType === 'party')) {
      eventsSocials.push(e);
    }
  }

  return (
    <>
      <Header className="bg-background" />
      <Text className="bg-background p-4 text-4xl font-bold">Arrangementer</Text>
      <ScrollView className="mb-20 h-4/5 w-full bg-background">
        <Text className="pl-4 text-2xl font-semibold">Bedpres og kurs</Text>
        <View className="mb-5 flex-col items-center gap-2.5 space-y-5 p-4">
          {eventsCompanyCourses.map((event) => (
            <EventItem
              key={event.id}
              id={event.id}
              title={event.title}
              eventType={event.eventType}
              startTime={event.startTime}
              registrationCount={event.registrationCount}
              totalCapacity={event.totalCapacity}
            />
          ))}
        </View>
        <Text className="pl-4 text-2xl font-semibold">Sosialt</Text>
        <View className="flex-col items-center gap-2.5 space-y-5 p-4">
          {eventsSocials.map((event) => (
            <EventItem
              key={event.id}
              id={event.id}
              title={event.title}
              eventType={event.eventType}
              startTime={event.startTime}
              registrationCount={event.registrationCount}
              totalCapacity={event.totalCapacity}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default EventsPage;
