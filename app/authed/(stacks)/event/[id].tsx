import { addHours, format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, TouchableOpacity, View } from 'react-native';

import Header from '@/components/header';
import Icon from '@/components/icon';
import { AttendanceButton } from '@/components/screens/event/attendance-button';
import { DescriptionSection } from '@/components/screens/event/description-section';
import { HeroSection } from '@/components/screens/event/hero-section';
import { Turnstile } from '@/components/screens/event/turnstile';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import useEvent from '@/hooks/useEvent';
import { useEventAttendance } from '@/hooks/useEventAttendance';
import { Event } from '@/lib/types/types';
import { cn } from '@/lib/utils';
import { AnimatePresence, MotiView } from 'moti';
import { penaltyHours } from '@/lib/penalties';

const MazeMapLogo = require('@/assets/images/mazemaplogo.png');

type ErrorStateProps = {
  onBack: () => void;
};

function LoadingState() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" className="text-primary" />
    </View>
  );
}

function ErrorState({ onBack }: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <View className="items-center gap-4">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <Icon name="FileWarning" size={32} className="text-destructive" />
        </View>
        <View className="gap-1">
          <Text className="text-center text-xl font-semibold">Fant ikke arrangementet</Text>
          <Text className="text-center text-muted-foreground">
            Det kan ha blitt fjernet, eller du mangler tilgang.
          </Text>
        </View>
        <Button variant="outline" onPress={onBack} className="mt-4">
          <Text>Gå tilbake</Text>
        </Button>
      </View>
    </View>
  );
}

type TitleSectionProps = {
  event?: Event;
  attendeesCount: number;
  totalCapacity?: number;
};

function TitleSection({ event, attendeesCount, totalCapacity }: TitleSectionProps) {
  const canSignUp = totalCapacity !== undefined;
  return (
    <View className="gap-2">
      <Text className="text-3xl font-bold leading-tight tracking-tight text-foreground">
        {event?.title}
      </Text>
      <Text>
        {canSignUp ? `${attendeesCount} / ${totalCapacity} påmeldte` : `Ingen åpen påmelding`}
      </Text>
    </View>
  );
}

type LogisticsSectionProps = {
  event?: Event;
};

function LogisticsSection({ event }: LogisticsSectionProps) {
  return (
    <View className="flex flex-col gap-2">
      <Card>
        <CardContent>
          <View className="flex-row gap-4">
            <View className="h-10 w-10 items-center justify-center rounded-lg border border-border bg-background">
              <Icon name="Calendar" size={20} className="text-foreground" />
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Tidspunkt
              </Text>
              <Text className="text-base font-semibold capitalize text-foreground">
                {format(event?.startTime ?? new Date(), 'EEEE d. MMMM', { locale: nb })}
              </Text>
              <Text className="text-base text-foreground">
                kl. {format(event?.startTime ?? new Date(), 'HH:mm', { locale: nb })} -{' '}
                {format(event?.endTime ?? new Date(), 'HH:mm', { locale: nb })}
              </Text>
            </View>
          </View>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <View className={cn('flex-row gap-4')}>
            <View className="h-10 w-10 items-center justify-center rounded-lg border border-border bg-background">
              {event?.mazemapPoi ? (
                <Image source={MazeMapLogo} className="h-5 w-5" resizeMode="contain" />
              ) : (
                <Icon name="MapPin" size={20} className="text-foreground" />
              )}
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Sted
              </Text>
              <Text className="text-base font-semibold text-foreground">{event?.location}</Text>

              {event?.mazemapPoi && (
                <Link
                  href={`https://use.mazemap.com/#v=1&sharepoitype=poi&sharepoi=${event?.mazemapPoi}`}
                  asChild>
                  <TouchableOpacity className="mt-1 flex-row items-center gap-1">
                    <Text className="text-sm font-medium text-primary underline">
                      Finn frem i MazeMap
                    </Text>
                    <Icon name="ArrowUpRight" size={14} className="text-primary" />
                  </TouchableOpacity>
                </Link>
              )}
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}

export default function EventsPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: event, isRefetching: refetchingEvent } = useEvent(id as string);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const [scrolled, setScrolled] = useState(false);
  const [scroll, setScroll] = useState(0);

  const {
    signUp,
    signOffAsync,
    isLoading,
    isError,
    isUserSignedUp,
    totalCapacity,
    attendees,
    totalCurrentPenalties,
  } = useEventAttendance({ id: id as string });

  const canSignUp =
    new Date(event?.activationTime ?? '') < new Date() &&
    totalCapacity !== undefined &&
    new Date() > addHours(new Date(), penaltyHours(totalCurrentPenalties));

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <View className="items-center gap-4">
          <View className="h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <Icon name="FileWarning" size={32} className="text-destructive" />
          </View>
          <View className="gap-1">
            <Text className="text-center text-xl font-semibold">Fant ikke arrangementet</Text>
            <Text className="text-center text-muted-foreground">
              Det kan ha blitt fjernet, eller så mangler du tilgang.
            </Text>
          </View>
          <Button variant="outline" onPress={() => router.back()} className="mt-4">
            <Text>Gå tilbake</Text>
          </Button>
        </View>
      </View>
    );
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
          onScroll={(e) => {
            setScrolled(e.nativeEvent.contentOffset.y > 0);
            setScroll(e.nativeEvent.contentOffset.y);
          }}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}>
          <View className="flex-col gap-6 px-5 pt-2">
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-row items-center gap-2 py-2">
              <Icon name="ArrowLeft" size={20} className="text-primary" />
              <Text className="font-medium text-primary">Tilbake</Text>
            </TouchableOpacity>

            <HeroSection event={event} />
            <TitleSection
              event={event}
              attendeesCount={attendees.length}
              totalCapacity={totalCapacity}
            />
            <AnimatePresence>
              {totalCurrentPenalties && !isUserSignedUp && !isLoading && (
                <Link
                  className="w-full"
                  href="https://abakus.no/pages/arrangementer/26-arrangementsregler">
                  <Card className="w-full border-red-500 bg-destructive">
                    <CardContent>
                      <View className="flex-row gap-4">
                        <View className="h-10 w-10 items-center justify-center rounded-lg border border-red-500 bg-red-400">
                          <Icon
                            name="TriangleAlert"
                            size={20}
                            className="text-destructive-foreground"
                          />
                        </View>
                        <View className="flex-1 justify-center">
                          <Text className="text-sm font-medium uppercase tracking-wide text-destructive-foreground opacity-70">
                            Du har prikker
                          </Text>
                          <Text className="text-base font-semibold text-foreground dark:text-background">
                            {totalCurrentPenalties > 2
                              ? `Påmeldingen din er forskjøvet ${penaltyHours(totalCurrentPenalties)} timer fordi du har ${totalCurrentPenalties} prikk${totalCurrentPenalties !== 1 ? 'er' : ''}`
                              : 'Du blir lagt på venteliste hvis du melder deg på'}
                          </Text>
                          <Text
                            variant={'muted'}
                            className="mt-2.5 text-destructive-foreground opacity-50">
                            Trykk for å lese arrangementsreglene
                          </Text>
                        </View>
                      </View>
                    </CardContent>
                  </Card>
                </Link>
              )}
            </AnimatePresence>
            <LogisticsSection event={event} />
            <DescriptionSection description={event?.description} />

            {/* We don't need to verify the user if they can't sign up for the event */}
            {canSignUp && (
              <Turnstile
                onTokenReceived={(t) => {
                  console.log('Received token: ', t);
                  setTurnstileToken(t);
                }}
              />
            )}
          </View>
        </ScrollView>
      </View>

      {canSignUp && (
        <View className="pb-safe-offset-0 absolute bottom-0 w-full border-t border-border bg-background">
          <AnimatePresence>
            {!turnstileToken && (
              <View className="absolute -top-12 w-full items-center justify-center overflow-hidden">
                <MotiView
                  key="verifying-message"
                  className=" flex-row items-center gap-2 rounded-full bg-secondary px-5 py-2"
                  from={{ translateY: 100 }}
                  animate={{ translateY: 0 }}
                  exit={{ translateY: 100 }}>
                  <ActivityIndicator className="text-secondary-foreground" />
                  <Text>Verifiserer at du er et menneske</Text>
                </MotiView>
              </View>
            )}
          </AnimatePresence>
          <View className="px-5 py-4">
            <AttendanceButton
              isUserSignedUp={isUserSignedUp}
              eventId={event?.id.toString() ?? ''}
              scroll={scroll}
              isLoading={signUp.status === 'pending' || isLoading || !turnstileToken}
              onSignUp={() => {
                if (!turnstileToken) {
                  alert('Verifikasjon ikke fullført. Vennligst prøv igjen senere.');
                  return;
                }

                signUp.mutateAsync({ turnstileToken });
              }}
              onSignOff={() => {
                signOffAsync().then(console.log);
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}
