import Avatar from '@/components/avatar';
import Dialog from '@/components/dialog';
import Icon from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useSignIn } from '@/lib/hooks/useAuth';
import { useUser } from '@/lib/hooks/useUser';
import { RobotoFlex_400Regular, useFonts } from '@expo-google-fonts/roboto-flex';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {} from 'nativewind';
import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RedGradient = require('@/assets/images/top-blur-red.png');

const ProfilePage = () => {
  const auth = useSignIn();

  const [show, setShow] = useState(false);
  const router = useRouter();
  const _ = useFonts({
    RobotoFlex_400Regular,
  });

  const handleSignOut = () => {
    auth.signOut();
    router.replace('/non-authed/sign-in');
  };

  const user = useUser();
  return (
    <View className="pt-safe-offset-5 relative h-screen w-screen bg-background">
      {/* <Header className="absolute z-50" /> */}
      <Image source={RedGradient} className="absolute left-0 top-0 z-20 h-96 w-full" />
      <StatusBar style="auto" />
      <SafeAreaView className="z-20 h-full w-full px-10 pt-20">
        <View className="mx-auto flex flex-col items-center gap-2.5">
          <Avatar src={user?.profilePicture ?? ''} />

          <Text
            style={{ fontFamily: 'RobotoFlex_400Regular' }}
            className="mt-2.5 text-center text-3xl font-bold text-primary">
            {user?.fullName}
          </Text>

          <View className="flex-row items-center gap-5">
            {user?.grade && (
              <Text className="text-lg font-bold text-foreground">{user?.grade}</Text>
            )}
            {user?.isAbakusMember && (
              <>
                <View className="h-5 w-0.5 bg-foreground/50" />
                <Text
                  style={{ fontFamily: 'RobotoFlex_400Regular' }}
                  className="text-lg font-bold text-foreground">
                  Abakus
                </Text>
              </>
            )}
          </View>

          <View className="mt-10 flex w-full flex-col gap-2.5">
            <Button>
              <Link
                href={`https://abakus.no/users/${user?.username}/settings/profile`}
                className="w-full">
                <View className="flex w-full flex-row items-center justify-center gap-2.5">
                  <Icon name="ExternalLink" className="text-primary-foreground" size={18} />
                  <Text className="text-center">Administrer</Text>
                </View>
              </Link>
            </Button>
            <Button variant="secondary" onPress={() => setShow((prev) => !prev)}>
              <Icon name="LogOut" size={18} className="text-secondary-foreground" />
              <Text className="text-center text-secondary-foreground">Logg ut</Text>
            </Button>
          </View>
        </View>
        <View className="flex h-full w-full items-center justify-center"></View>
      </SafeAreaView>
      <Dialog
        show={show}
        onDismiss={() => setShow(false)}
        className="flex flex-col items-center justify-evenly">
        <Text className="mx-auto text-center text-3xl font-bold text-foreground">
          Er du sikker på at du vil logge ut?
        </Text>
        <View className="w-full flex-col gap-2.5">
          {/* <Button
            className="flex-1 rounded-full"
            size="lg"
            variant="secondary"
            onPress={() => setShow(false)}>
            <Text className="text-xl text-on-primary">Avbryt</Text>
          </Button> */}
          <Button className="flex-1 rounded-full" size="lg" onPress={handleSignOut}>
            <Text className="text-xl text-destructive-foreground">Logg ut</Text>
          </Button>
        </View>
      </Dialog>
    </View>
  );
};

export default ProfilePage;
