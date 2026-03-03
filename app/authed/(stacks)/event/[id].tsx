import Header from '@/components/header';
import Icon from '@/components/icon';
import { DescriptionSection } from '@/components/screens/event/description-section';
import {
  ErrorState,
  EventActionBar,
  LoadingState,
  LogisticsSection,
  PenaltyWarningCard,
  TitleSection,
} from '@/components/screens/event/event-page';
import { HeroSection } from '@/components/screens/event/hero-section';
import { Turnstile } from '@/components/screens/event/turnstile';
import { Text } from '@/components/ui/text';
import useEvent from '@/hooks/useEvent';
import { useEventAttendance } from '@/hooks/useEventAttendance';
import { useRegistrationEligibility } from '@/hooks/useRegistrationEligibility';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AnimatePresence, MotiView } from 'moti';
import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

export default function EventsPage() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const registrationEligibility = useRegistrationEligibility(id?.toString() ?? '');
  const eventId = useMemo(() => {
    if (Array.isArray(id)) {
      return id[0] ?? '';
    }

    return id ?? '';
  }, [id]);

  const router = useRouter();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [scroll, setScroll] = useState(0);

  const { data: event, isRefetching: refetchingEvent, isError: eventError } = useEvent(eventId);

  const {
    signUp,
    signOffAsync,
    isLoading,
    isError: attendanceError,
    isUserSignedUp,
    totalCapacity,
    attendees,
    totalCurrentPenalties,
  } = useEventAttendance({ id: eventId });

  const canSignUp = totalCapacity !== undefined;
  const showPenaltyWarning = Boolean(totalCurrentPenalties && !isUserSignedUp && !isLoading);
  const isAttendanceButtonLoading = signUp.status === 'pending' || isLoading || !turnstileToken;

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.y;
    setScrolled(offset > 0);
    setScroll(offset);
  }, []);

  const handleSignUp = useCallback(() => {
    if (!turnstileToken) {
      Alert.alert('Verifikasjon ikke fullført', 'Vennligst prøv igjen senere.');
      return;
    }

    void signUp.mutateAsync({ turnstileToken });
  }, [signUp, turnstileToken]);

  const handleSignOff = useCallback(() => {
    void signOffAsync();
  }, [signOffAsync]);

  if (!eventId) {
    return <ErrorState onBack={handleBack} />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (attendanceError || eventError) {
    return <ErrorState onBack={handleBack} />;
  }

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="auto" />
      <Header highlight={scrolled} />

      <View className="flex-1 overflow-hidden">
        <AnimatePresence>
          {refetchingEvent && (
            <MotiView
              key="refreshing-indicator"
              from={{ translateY: -100 }}
              animate={{ translateY: 0 }}
              exit={{ translateY: -100 }}
              className="absolute top-5 z-20 w-full items-center shadow-lg">
              <View className="rounded-full bg-secondary p-2">
                <ActivityIndicator className="text-secondary-foreground" />
              </View>
            </MotiView>
          )}
        </AnimatePresence>

        <ScrollView
          onScroll={handleScroll}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}>
          <View className="flex-col gap-6 px-5 pt-2">
            <TouchableOpacity onPress={handleBack} className="flex-row items-center gap-2 py-2">
              <Icon name="ArrowLeft" size={20} className="text-primary" />
              <Text className="font-medium text-primary">Tilbake</Text>
            </TouchableOpacity>
            <Text>{JSON.stringify(registrationEligibility.isPending)}</Text>
            <Text>{JSON.stringify(registrationEligibility.error?.stack, null, 2)}</Text>
            <Text>{JSON.stringify(registrationEligibility.data?.data, null, 2)}</Text>
            {/* <Text>{registrationEligibility.data && JSON.stringify(registrationEligibility.data)}</Text> */}

            <HeroSection event={event} />
            <TitleSection
              event={event}
              attendeesCount={attendees.length}
              totalCapacity={totalCapacity}
            />

            <AnimatePresence>
              {showPenaltyWarning && (
                <PenaltyWarningCard totalCurrentPenalties={totalCurrentPenalties} />
              )}
            </AnimatePresence>

            <LogisticsSection event={event} />
            <DescriptionSection description={event?.description} />

            {canSignUp && (
              <Turnstile
                onTokenReceived={(token) => {
                  setTurnstileToken(token);
                }}
              />
            )}
          </View>
        </ScrollView>
      </View>

      <EventActionBar
        canSignUp={canSignUp}
        turnstileToken={turnstileToken}
        isUserSignedUp={isUserSignedUp}
        eventId={event?.id.toString() ?? ''}
        scroll={scroll}
        isLoading={isAttendanceButtonLoading}
        onSignUp={handleSignUp}
        onSignOff={handleSignOff}
      />
    </View>
  );
}
