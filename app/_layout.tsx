import { PushNotificationsProvider } from '@/components/PushNotificationsProvider';
import {HeroUINativeProvider} from "heroui-native"
import { userAtom } from '@/lib/atoms/user-atom';
import { PixelifySans_400Regular, useFonts } from '@expo-google-fonts/pixelify-sans';
import { PortalProvider } from '@gorhom/portal';
import { PortalHost } from '@rn-primitives/portal';
// import { ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useAtomValue } from 'jotai/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import '../global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient();

const Layout = () => {
  useFonts({
    PixelifySans_400Regular,
  });

  const user = useAtomValue(userAtom);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}> */}
      <GestureHandlerRootView className="flex-1 bg-background">
        <SafeAreaProvider>
          <PortalProvider>
            <HeroUINativeProvider>
              <PushNotificationsProvider isLoggedIn={user?.id !== undefined}>
                <Stack
                  screenOptions={{
                    headerShown: false,
                  }}
                />
                <PortalHost />
              </PushNotificationsProvider>
            </HeroUINativeProvider>            
          </PortalProvider>

        </SafeAreaProvider>
      </GestureHandlerRootView>
      {/* </ThemeProvider> */}
    </QueryClientProvider>
  );
};

export default Layout;
