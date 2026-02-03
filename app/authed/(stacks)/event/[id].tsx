import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Components
import Header from '@/components/header';
import Icon from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';

// Hooks
import useEvent from '@/hooks/useEvent';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import AutoHeightImage from '@/components/ui/auto-height-image';
import { setupWebSocketServer } from '@/lib/services/websockets';

const MazeMapLogo = require('@/assets/images/mazemaplogo.png');

export default function EventsPage() {
  const { id } = useLocalSearchParams();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { data: event, isLoading, isError } = useEvent(id.toString());
  const router = useRouter();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setupWebSocketServer();
  }, []);

  // --- Loading State ---
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" className="text-primary" />
      </View>
    );
  }

  // --- Error State ---
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
              Det kan ha blitt fjernet, eller du mangler tilgang.
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
      <StatusBar style="dark" />
      <Header />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }} // Space for sticky footer
        showsVerticalScrollIndicator={false}>
        <View className="flex-col gap-6 px-5 pt-2">
          {/* 1. Navigation & Header */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center gap-2 py-2">
            <Icon name="ArrowLeft" size={20} className="text-primary" />
            <Text className="font-medium text-primary">Tilbake</Text>
          </TouchableOpacity>

          {/* 2. Hero Image */}
          <View className="overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
            {event?.cover ? (
              <AutoHeightImage uri={event.cover} />
            ) : (
              <View className="h-52 w-full items-center justify-center bg-secondary/30">
                <Icon name="Image" size={48} className="text-muted-foreground/50" />
              </View>
            )}
          </View>

          {/* 3. Title Section */}
          <View className="gap-2">
            {/* Optional Badge if you have event categories */}
            {/* <View className="flex-row"><Badge variant="secondary"><Text>Kurs</Text></Badge></View> */}

            <Text className="text-3xl font-bold leading-tight tracking-tight text-foreground">
              {event?.title}
            </Text>
            {/* If you have organizer data: */}
            {/* <Text className="text-muted-foreground font-medium">Arrangert av Omega</Text> */}
          </View>

          {/* 4. The "Logistics" Card */}
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
                    <Text className="text-base font-semibold text-foreground">
                      {event?.location}
                    </Text>

                    {/* MazeMap Deep Link */}
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

          {/* 5. Description */}
          <View className="mb-6 gap-3">
            <Text className="text-xl font-bold text-foreground">Om arrangementet</Text>
            {!showFullDescription && (
              <>
                <Text className="text-base leading-7 text-muted-foreground">
                  {event?.description}
                </Text>
                <Button variant={'outline'} onPress={() => setShowFullDescription(true)}>
                  <Text>Vis mer</Text>
                  <Icon name="ChevronDown" size={16} />
                </Button>
              </>
            )}
            {showFullDescription && (
              <>
                <View className="overflow-hidden">
                  <Text className="text-base leading-7 text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque perferendis,
                    debitis omnis dolor architecto repudiandae soluta voluptatem ad dolorum dolore
                    in illo quo ut saepe consequuntur nulla iste id pariatur. {event?.description}
                  </Text>
                </View>
                <Button variant={'outline'} onPress={() => setShowFullDescription(false)}>
                  <Text>Vis mindre</Text>
                  <Icon name="ChevronUp" size={16} />
                </Button>
              </>
            )}
          </View>
        </View>
      </ScrollView>

      {/* 6. Sticky Bottom Action */}
      <View
        className="absolute bottom-0 w-full border-t border-border bg-background px-5 py-4 shadow-lg"
        style={{ paddingBottom: Math.max(insets.bottom, 20) }}>
        <Button size="lg" className="h-16 w-full rounded-full shadow-md">
          <View className="flex-row items-center gap-2">
            <Icon name="Ticket" className="text-primary-foreground" size={18} />
            <Text className="text-lg font-bold text-primary-foreground">Meld deg på</Text>
          </View>
        </Button>
      </View>
    </View>
  );
}
