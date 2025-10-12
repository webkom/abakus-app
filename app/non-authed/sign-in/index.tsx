import { cn } from '@/lib/cn';
import { BlurView } from '@react-native-community/blur';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { useFonts, PixelifySans_400Regular } from '@expo-google-fonts/pixelify-sans';
import Input from '@/components/input';
import Button from '@/components/button';
const AbakusLogo = require('@/assets/images/abakus-logo.png');

const SignInPage = () => {
  const _ = useFonts({
    PixelifySans_400Regular,
  });

  return (
    <View className="relative flex h-full flex-col">
      <View className={cn(blobStyle, '-left-3/4 top-0 -translate-y-1/2')} />
      <View className={cn(blobStyle, '-bottom-0 -right-3/4 translate-y-1/2')} />
      <View className={cn(blobStyle, '-right-3/4 top-0  bg-[#0A613033]')} />
      <View className={cn(blobStyle, '-left-3/4 bottom-0  bg-[#DBA7FD66]')} />
      <BlurView
        style={{
          width: '100%',
          position: 'relative',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        blurType="light"
        blurAmount={30}
        reducedTransparencyFallbackColor="white">
        <View className="z-30 flex h-full w-full flex-col items-center justify-center gap-5 px-10">
          <Image source={AbakusLogo} className="top-safe-offset-20 absolute w-96 max-w-full" />
          <Text
            style={{
              fontFamily: 'PixelifySans_400Regular',
            }}
            className="text-primary text-5xl">
            &gt; Velkommen
          </Text>
          <Input className="mt-5 w-full" label="Brukernavn" />
          <Input className="w-full" label="Passord" />
          <Button size="lg" className="mt-5 w-full max-w-[300px]">
            <Text className="text-on-primary text-xl font-semibold">Logg inn</Text>
          </Button>
        </View>
        <View className="bottom-safe-offset-10 absolute flex w-full items-center">
          <Text className=" text-on-background font-semibold">Laget med 💖 av Webkom</Text>
        </View>
      </BlurView>
    </View>
  );
};

const blobStyle = 'absolute z-10 aspect-square w-[150%] rounded-full bg-red-500/50';

export default SignInPage;
