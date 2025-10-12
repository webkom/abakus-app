import { View, Text } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { BlurView } from '@react-native-community/blur';
const AbakusLogo = require('@/assets/images/abakus-logo.png');

const SignInPage = () => {
  return (
    <View className="relative flex flex-col">
      <BlurView className="absolute top-0 aspect-square w-full -translate-y-1/2 rounded-full bg-red-500/50" />
      <View className="absolute top-1/2 h-96 min-w-full">
        <Image source={AbakusLogo} className="" />
      </View>
      <Text>SignInPage</Text>
    </View>
  );
};

export default SignInPage;
