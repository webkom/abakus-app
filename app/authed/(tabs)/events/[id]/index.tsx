import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

import Header from '@/components/header';
import Icon from '@/components/icon';
import Card from '@/components/card';
import { Button } from '@/components/ui/button';
import { useEvent } from '@/lib/hooks/useEvent';
import { useEventRegistration } from '@/lib/hooks/useEventRegistration';
import { useUser } from '@/lib/hooks/useUser';
import { EventTypeConfig } from '@/lib/types/eventColors';

import { RegistrationCard } from '@/components/events/RegistrationCard';
import { UnansweredSurveysCard } from '@/components/events/UnansweredSurveysCard';
import { AllergyWarningBanner } from '@/components/events/AllergyWarningBanner';
import { DeadlinesCard } from '@/components/events/DeadlinesCard';
import { PoolsSection } from '@/components/events/PoolsSection';
import { RenderHTML } from '@nanogiants/react-native-render-html';

const MazeMapLogo = require('@/assets/images/mazemaplogo.png');

export default function EventsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: eventData, isError, isLoading } = useEvent(id);
  const { register, unregister, isRegistering, isUnregistering } = useEventRegistration(id);
  const user = useUser();
  const router = useRouter();

  if (isLoading) {
    return (
      <View className="h-full items-center justify-center space-y-3 bg-background">
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color="#dc2626" />
        <Text className="text-base font-medium text-gray-600">Laster inn arrangement...</Text>
      </View>
    );
  }

  if (isError || !eventData) {
    return (
      <View className="h-full items-center justify-center bg-background px-6">
        <StatusBar style="dark" />
        <Icon name="CircleAlert" size={48} className="mb-3 text-red-500" />
        <Text className="text-center text-lg font-bold text-gray-900">Fant ikke arrangementet</Text>
        <Text className="mt-2 text-center text-sm text-gray-600">
          Det kan ha blitt fjernet, eller du har kanskje ikke tilgang til å se det.
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-6 rounded-full bg-red-600 px-6 py-3 active:bg-red-700">
          <Text className="font-semibold text-white">Gå tilbake</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const rawEvent = eventData as any;
  const typeConfig = eventData.eventType ? EventTypeConfig[eventData.eventType] : null;
  const unansweredSurveys = rawEvent.unansweredSurveys || [];
  const isUserAdmitted = Boolean(rawEvent.isAdmitted);
  const hasUnansweredSurveys = unansweredSurveys.length > 0 && !isUserAdmitted;
  const userReg = rawEvent.userReg || null;
  const company = typeof rawEvent.company === 'object' ? rawEvent.company : null;

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="dark" />
      <Header className="px-5" />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, gap: 20 }}>
        {/* Navigation & Event Badge */}
        <View className="flex-row items-center justify-between pt-2">
          <Button className="rounded-full px-4" onPress={() => router.back()} variant="secondary">
            <Icon name="ArrowLeft" className="text-on-secondary" size={18} />
            <Text className="text-on-secondary font-medium">Tilbake</Text>
          </Button>

          {typeConfig && (
            <View
              className="rounded-full px-3.5 py-1.5"
              style={{ backgroundColor: typeConfig.color }}>
              <Text className="text-xs font-bold" style={{ color: typeConfig.textColor }}>
                {typeConfig.displayName}
              </Text>
            </View>
          )}
        </View>

        {/* Cover Image */}
        {rawEvent.cover && (
          <View className="relative h-48 w-full overflow-hidden rounded-3xl bg-gray-100 shadow-sm">
            <Image source={{ uri: rawEvent.cover }} className="h-full w-full" resizeMode="cover" />
          </View>
        )}

        {/* Title */}
        <Text className="text-3xl font-extrabold tracking-tight text-gray-900">
          {rawEvent.title}
        </Text>

        {/* Event Time & Location Metadata */}
        <View className="gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <View className="flex-row items-center gap-3">
            <Icon name="Clock" size={20} className="text-red-600" />
            <Text className="flex-1 text-sm font-medium capitalize text-gray-800">
              {format(
                rawEvent.startTime ? new Date(rawEvent.startTime) : new Date(),
                'EEEE dd. MMMM HH:mm -',
                { locale: nb }
              )}{' '}
              {format(rawEvent.endTime ? new Date(rawEvent.endTime) : new Date(), 'HH:mm', {
                locale: nb,
              })}
            </Text>
          </View>

          <View className="flex-row items-center gap-3">
            {rawEvent.mazemapPoi ? (
              <>
                <Image source={MazeMapLogo} className="h-5 w-5" />
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      `https://use.mazemap.com/#v=1&sharepoitype=poi&sharepoi=${rawEvent.mazemapPoi}`
                    )
                  }
                  className="flex-1 flex-row items-center gap-1.5">
                  <Text className="text-sm font-semibold text-blue-600 underline">
                    {rawEvent.location}
                  </Text>
                  <Icon name="ExternalLink" size={14} className="text-blue-600" />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Icon name="MapPin" size={20} className="text-red-600" />
                <Text className="flex-1 text-sm font-medium text-gray-800">
                  {rawEvent.location}
                </Text>
              </>
            )}
          </View>

          {/* Organizer / Company details */}
          {company?.name && (
            <View className="flex-row items-center gap-3 border-t border-gray-200/60 pt-1">
              <Icon name="Building2" size={20} className="text-gray-500" />
              <Text className="text-sm font-medium text-gray-700">
                Arrangeres i samarbeid med{' '}
                <Text className="font-bold text-gray-900">{company.name}</Text>
              </Text>
            </View>
          )}
        </View>

        {/* Allergy Warning Banner */}
        <AllergyWarningBanner
          hasAllergiesOrPreferences={Boolean(user?.allergies && user.allergies.trim().length > 0)}
        />

        {/* Unanswered Surveys Blocker or Registration Card */}
        {hasUnansweredSurveys ? (
          <UnansweredSurveysCard
            unansweredSurveys={unansweredSurveys}
            isRegistered={Boolean(userReg)}
          />
        ) : (
          <RegistrationCard
            activationTime={rawEvent.activationTime}
            unregistrationDeadline={rawEvent.unregistrationDeadline}
            userReg={userReg}
            isAdmitted={isUserAdmitted}
            registrationCount={rawEvent.registrationCount}
            totalCapacity={rawEvent.totalCapacity}
            onRegister={(feedback) => register(feedback)}
            onUnregister={(regId) => unregister(regId)}
            isRegistering={isRegistering}
            isUnregistering={isUnregistering}
            eventStatusType={rawEvent.eventStatusType}
          />
        )}

        {/* Important Deadlines Card */}
        <DeadlinesCard
          activationTime={rawEvent.activationTime}
          unregistrationDeadline={rawEvent.unregistrationDeadline}
          paymentDeadline={rawEvent.paymentDeadline}
        />

        {/* Event Description */}
        <View className="gap-2">
          <Text className="text-xl font-bold text-gray-900">Om arrangementet</Text>
          <Card className="border border-gray-200 bg-background p-4">
            <Text className="text-base leading-relaxed text-gray-800">
              <RenderHTML
                html={rawEvent.text || rawEvent.description || 'Ingen beskrivelse tilgjengelig.'}
              />
            </Text>
          </Card>
        </View>

        {/* Company Description if present */}
        {rawEvent.showCompanyDescription && company?.description && (
          <View className="gap-2">
            <Text className="text-xl font-bold text-gray-900">Om {company.name}</Text>
            <Card className="border border-gray-200 bg-background p-4">
              <Text className="text-base leading-relaxed text-gray-800">{company.description}</Text>
            </Card>
          </View>
        )}

        {/* Pools Breakdown & Attendance */}
        <PoolsSection
          pools={rawEvent.pools as any}
          waitingRegistrations={rawEvent.waitingRegistrations?.length || 0}
          totalCapacity={rawEvent.totalCapacity}
        />
      </ScrollView>
    </View>
  );
}
