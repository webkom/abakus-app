import { PushNotificationsProvider } from '@/components/PushNotificationsProvider';
import { userAtom } from '@/lib/atoms/user-atom';
import { NAV_THEME } from '@/lib/theme';
import { PixelifySans_400Regular, useFonts } from '@expo-google-fonts/pixelify-sans';
import { PortalProvider } from '@gorhom/portal';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useAtomValue } from 'jotai/react';
import { useColorScheme } from 'nativewind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import '../global.css';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const queryClient = new QueryClient();

const Layout = () => {
  const { colorScheme } = useColorScheme();
  const _ = useFonts({
    PixelifySans_400Regular,
  });

  const user = useAtomValue(userAtom);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <GestureHandlerRootView className="flex-1 bg-background">
          <BottomSheetModalProvider>
            <PortalProvider>
              <PushNotificationsProvider isLoggedIn={user?.id !== undefined}>
                <Stack
                  screenOptions={{
                    headerShown: false,
                  }}
                />

                <PortalHost />
              </PushNotificationsProvider>
            </PortalProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Layout;
