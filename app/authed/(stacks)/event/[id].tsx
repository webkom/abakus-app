import { DescriptionSection } from '@/components/screens/event/description-section';
import {
  BusinessDetails,
  ErrorState,
  EventActionBar,
  EventNotices,
  EventQuickFacts,
  LoadingState,
  RegistrationPools,
  TitleSection,
} from '@/components/screens/event/event-page';
import { HeroSection } from '@/components/screens/event/hero-section';
import { Turnstile } from '@/components/screens/event/turnstile';
import { useEventAttendance } from '@/hooks/useEventAttendance';
import { useRegistrationEligibility } from '@/hooks/useRegistrationEligibility';
import { useEvent } from '@/lib/hooks/useEvent';
import { components } from '@/lib/types/schema';
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
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EventsPage() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const { data: registrationEligibilityData } = useRegistrationEligibility(id?.toString() ?? '');
  const eventId = useMemo(() => {
    if (Array.isArray(id)) {
      return id[0] ?? '';
    }

    return id ?? '';
  }, [id]);

  console.log(registrationEligibilityData);

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

  const canSignUp = registrationEligibilityData?.canRegisterNow;
  const isAttendanceButtonLoading = signUp.status === 'pending' || isLoading || !turnstileToken;

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.y;
    setScrolled(offset > 0);
    setScroll(offset);
  }, []);

  const handleSignUp = useCallback<() => Promise<void> | undefined>(() => {
    if (!turnstileToken) {
      Alert.alert('Verifikasjon ikke fullført', 'Vennligst prøv igjen senere.');
      return;
    }

    return signUp
      .mutateAsync({
        params: { path: { eventPk: eventId } },
        body: { feedback: '', captchaResponse: turnstileToken, id: eventId as unknown as number },
      })
      .catch((error) => {
        console.error('Error during sign up:', error);
        Alert.alert('Påmelding mislyktes', 'Vennligst prøv igjen senere.');
      }) as Promise<void>;
  }, [signUp, turnstileToken, eventId]);

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
          scrollEventThrottle={16}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}>
          <View className="flex-col gap-6 px-4" style={{ paddingTop: Math.max(insets.top, 12) }}>
            {/* Hero Cover with floating back and share buttons */}
            <HeroSection event={event} onBack={handleBack} />

            {/* Event Category Badge, Title & Host Attribution */}
            <TitleSection event={event} />

            {/* Unified Notices (Penalty warning, Registration opening countdown, Unregistration deadline) */}
            <EventNotices
              event={event}
              totalCurrentPenalties={totalCurrentPenalties}
              canSignUp={Boolean(canSignUp)}
              isUserSignedUp={isUserSignedUp}
            />

            {/* 2x2 Quick Facts Grid (Tid, Sted/MazeMap, Pris, Kapasitet) */}
            <EventQuickFacts
              event={event}
              attendeesCount={attendees.length}
              totalCapacity={totalCapacity}
            />

            {/* Event Description Section */}
            <DescriptionSection description={event?.description as string | undefined} />

            {/* Registration Pools & Capacity Progress Bars */}
            <RegistrationPools
              pools={event?.pools}
              waitingRegistrationCount={event?.waitingRegistrationCount}
              mergeTime={event?.mergeTime}
            />

            {/* Company Details if applicable */}
            {event?.company !== undefined && (
              <BusinessDetails
                company={event.company as unknown as components['schemas']['CompanyDetail']}
              />
            )}

            {/* Captcha verification */}
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

      {/* Fixed bottom action bar with AttendanceButton - kept exactly as required */}
      <EventActionBar
        canSignUp={canSignUp ?? false}
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
