import Button from '@/components/button';
import Card from '@/components/card';
import { Link } from 'expo-router';
import { MoveRightIcon } from 'lucide-react-native';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BlurBackground = require('@/assets/images/blur-background.png');

const OnboardingPage = () => {
  return (
    <View className="h-screen w-screen bg-background">
      <Image source={BlurBackground} className="absolute h-full w-full" resizeMode="cover" />
      <SafeAreaView className="flex h-screen w-screen flex-col items-center justify-center gap-14 px-5">
        <Text
          style={{
            fontFamily: 'PixelifySans_400Regular',
          }}
          className="text-5xl text-primary">
          &gt; Nyttig å vite
        </Text>
        <View className="flex w-full flex-row flex-wrap gap-5">
          <View className="flex max-h-[250px] min-h-[200px] w-full flex-row gap-5">
            <Card title={'Bla gjennom arrangementer'} className="flex-1">
              <Text className="text-xl leading-[20px]">
                Meld deg enkelt på arrangementer gjennom appen
              </Text>
            </Card>
            <Card title={'Aba-ID lett tilgjengelig'} className="flex-1">
              <Text className="text-xl leading-[20px]">
                Ha Aba-IDen din klar for kontroll til enhver tid
              </Text>
            </Card>
          </View>
          <Card title={'Varslinger rett på telefonen'}>
            <Text className="text-xl leading-[20px]">
              Få beskjed når påmelding for populære arrangementer nærmer seg{' '}
            </Text>
          </Card>
        </View>

        <Link href="/authed/(tabs)/events" asChild>
          <Button size="lg" className="w-full max-w-[300px]">
            <MoveRightIcon className="text-on-primary" color={'#FFFFFF'} />
            <Text className="text-lg text-on-primary">Til hjemskjermen</Text>
          </Button>
        </Link>
      </SafeAreaView>
    </View>
  );
};

export default OnboardingPage;
