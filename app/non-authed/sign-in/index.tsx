import { cn } from '@/lib/cn';
import { BlurView } from '@react-native-community/blur';
import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';
import { useFonts, PixelifySans_400Regular } from '@expo-google-fonts/pixelify-sans';
const AbakusLogo = require('@/assets/images/abakus-logo.png');

const SignInPage = () => {
  const [fontsLoaded] = useFonts({
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
        <View className="z-30 flex h-full w-full flex-col items-center justify-center">
          <Text
            style={{
              fontFamily: 'PixelifySans_400Regular',
            }}
            className="text-primary text-5xl">
            &gt; Velkommen
          </Text>
          {/* <Image source={AbakusLogo} className="h-fit w-full bg-red-500" /> */}
        </View>
      </BlurView>
    </View>
  );
};

const blobStyle = 'absolute z-10 aspect-square w-[150%] rounded-full bg-red-500/50';

export default SignInPage;
