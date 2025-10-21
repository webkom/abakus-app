import Button from '@/components/button';
import { CookieClip } from '@/components/cookie-clip';
import { useUser } from '@/lib/hooks/useUser';
import { RobotoFlex_400Regular, useFonts } from '@expo-google-fonts/roboto-flex';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ExternalLink } from 'lucide-react-native';
import React from 'react';
import {} from 'nativewind';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '@/components/icon';

const RedGradient = require('@/assets/images/top-blur-red.png');

const ProfilePage = () => {
  const _ = useFonts({
    RobotoFlex_400Regular,
  });

  const user = useUser();
  return (
    <View className="relative h-screen w-screen">
      <Image source={RedGradient} className="absolute left-0 top-0 z-20 h-96 w-full" />
      <StatusBar style="dark" />
      <SafeAreaView className="z-20 h-full w-full px-10 pt-20">
        <View className="mx-auto flex flex-col items-center gap-2.5">
          <CookieClip uri={user?.profilePicture} />

          <Text
            style={{ fontFamily: 'RobotoFlex_400Regular' }}
            className="mt-2.5 text-center text-3xl font-bold text-primary">
            {user?.fullName}
          </Text>
          <View className="flex-row gap-2.5">
            <Text className="text-lg font-bold text-on-background">4. klasse datateknologi</Text>
            {user?.isAbakusMember && (
              <Text
                style={{ fontFamily: 'RobotoFlex_400Regular' }}
                className="text-lg font-bold text-on-background">
                Abakus
              </Text>
            )}
          </View>

          <View className="mt-10 flex w-full flex-col gap-1">
            <Button className="w-full" list="top" variant="secondary">
              <Link
                href={`https://abakus.no/users/${user?.username}/settings/profile`}
                className="w-full">
                <View className="flex w-full flex-row items-center justify-center gap-2.5">
                  <Icon name="ExternalLink" className="text-on-primary" size={18} />
                  <Text className="text-center text-on-primary">Administrer</Text>
                </View>
              </Link>
            </Button>
            <Button className="w-full" variant="secondary">
              <Text className="w-full text-center text-on-primary">Test</Text>
            </Button>
            <Button className="w-full" list="bottom" variant="secondary">
              <Text className="w-full text-center text-on-primary">Test</Text>
            </Button>
          </View>
        </View>
        <View className="flex h-full w-full items-center justify-center"></View>
      </SafeAreaView>
    </View>
  );
};

export default ProfilePage;
