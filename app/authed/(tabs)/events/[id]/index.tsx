import Button from '@/components/button';
import Card from '@/components/card';
import Header from '@/components/header';
import Icon from '@/components/icon';
import useEvent from '@/hooks/useEvent';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Image, Text, View } from 'react-native';
const MazeMapLogo = require('@/assets/images/mazemaplogo.png');

export default function EventsPage() {
  const { id } = useLocalSearchParams();
  const { data: eventData, isLoading, isError } = useEvent(id.toString());
  const router = useRouter();

  if (isLoading) {
    return (
      <View className="h-full flex-row items-center justify-center space-x-3">
        <ActivityIndicator size="large" color="#dc2626" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="h-full items-center justify-center px-4">
        <Text className="text-center text-lg font-semibold text-red-600">
          Fant ikke arrangementet. Det kan ha blitt fjernet, eller du har kanskje ikke tilgang til å
          se det.
        </Text>
        <Text className="mt-2 text-center text-base">
          Vennligst sjekk lenken, eller bruk tilbake-knappen for å gå tilbake.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex min-h-screen w-full flex-col gap-5 bg-background px-5">
      <Header className="px-0" />
      <StatusBar style="dark" />
      <View className="w-40">
        <Button className="rounded-full" onPress={() => router.back()} variant="secondary">
          <Icon name="ArrowLeft" className="text-on-secondary" />
          <Text className="text-on-secondary">Tilbake</Text>
        </Button>
      </View>
      <View className="relative">
        {eventData?.cover && (
          <>
            <View className="absolute flex h-40 w-full items-center justify-center rounded-3xl bg-secondary-container">
              <ActivityIndicator size={'large'} color="#5B431A" />
            </View>
            <Image
              className="h-40 w-full rounded-3xl"
              src={eventData?.cover}
              width={1000}
              height={500}
              resizeMode="cover"
            />
          </>
        )}
      </View>
      <Text className="whitespace-break-spaces text-6xl font-bold italic tracking-tight text-on-background">
        {eventData?.title}
      </Text>

      <View className="flex flex-col gap-2.5">
        <View className="flex flex-row items-center gap-2.5">
          <Icon name="Clock" />
          <Text className="capitalize">
            {format(eventData?.startTime ?? new Date(), 'EEEE dd. MMMM HH:mm -', { locale: nb })}{' '}
            {format(eventData?.endTime ?? new Date(), 'HH:mm', { locale: nb })}
          </Text>
        </View>
        <View className="flex flex-row items-center gap-2.5">
          {eventData?.mazemapPoi ? (
            <>
              <Image
                source={MazeMapLogo}
                className="h-[1.7rem] w-[1.7rem]"
                width={100}
                height={100}
              />
              <Link
                className=""
                href={`https://use.mazemap.com/#v=1&sharepoitype=poi&sharepoi=${eventData?.mazemapPoi}`}>
                <View className="flex w-fit flex-row items-center gap-2.5">
                  <Text>{eventData?.location}</Text>
                  <Icon name="ExternalLink" size={15} />
                </View>
              </Link>
            </>
          ) : (
            <>
              <Icon name="MapPin" />
              <Text>{eventData?.location}</Text>
            </>
          )}
        </View>
      </View>
      <Card>
        <Text>{eventData?.description}</Text>
      </Card>
      {/* <Card
        variant="tertiary"
        title={
          <View className="flex flex-row items-center gap-2.5">
            <Icon name="TriangleAlert" />
            <Text className={titleVariants({ variant: 'tertiary' })}>Advarsel</Text>
          </View>
        }>
        <Text>
          Du har ikke samtykket til blablabla og derfor kan du ikke melde deg på dette arrangementet
        </Text>
      </Card> */}
      <Button className="rounded-full" size={'lg'}>
        <Icon name="BadgeCheck" className="text-on-primary" />
        <Text className="font-semibold text-on-primary">Meld deg på</Text>
      </Button>
    </View>
  );
}
