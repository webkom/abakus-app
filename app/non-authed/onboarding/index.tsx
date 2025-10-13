import Button from '@/components/button';
import { cn } from '@/lib/cn';
import React, { ComponentProps } from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MoveRightIcon } from 'lucide-react-native';
import { Link } from 'expo-router';

const BlurBackground = require('@/assets/images/blur-background.png');

const OnboardingPage = () => {
  return (
    <View className="h-screen w-screen bg-background">
      <Image source={BlurBackground} className="absolute h-full w-full" resizeMode="cover" />
      <SafeAreaView className="flex h-screen w-screen flex-col items-center justify-center gap-10 px-10">
        <Text
          style={{
            fontFamily: 'PixelifySans_400Regular',
          }}
          className="text-5xl text-primary">
          &gt; Nyttig å vite
        </Text>
        <View className="flex w-full flex-row flex-wrap gap-5">
          <Card />
          <Card />
          <Card />
        </View>

        <Link href="/authed/(tabs)/events" asChild>
          <Button size="lg">
            <MoveRightIcon className="text-on-primary" color={'#FFFFFF'} />
            <Text className="text-lg text-on-primary">Til hjemskjermen</Text>
          </Button>
        </Link>
      </SafeAreaView>
    </View>
  );
};

const Card = () => {
  return (
    <View className="w-full rounded-xl bg-primary-container/50 p-5">
      <Text className="text-xl font-semibold text-primary">Bla gjennom arrangementer</Text>
      <Text>Meld deg enkelt på arrangementer gjennom appen</Text>
    </View>
  );
};

const CardTitle = ({ className, ...props }: ComponentProps<typeof Text>) => {
  return <Text className={cn('text-xl font-semibold text-primary', className)} {...props} />;
};

export default OnboardingPage;
