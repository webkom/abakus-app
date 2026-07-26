import { PixelifySans_400Regular, useFonts } from '@expo-google-fonts/pixelify-sans';
import { PortalHost } from '@rn-primitives/portal';
import { PortalProvider } from '@gorhom/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import '../global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAtomValue } from 'jotai/react';
import { userAtom } from '@/lib/atoms/user-atom';
import { usePushNotifications } from '@/lib/hooks/usePushNotifications';

const queryClient = new QueryClient();

const Layout = () => {
  const _ = useFonts({
    PixelifySans_400Regular,
  });

  const user = useAtomValue(userAtom);
  usePushNotifications(user?.id !== undefined);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <PortalProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
          <PortalHost />
        </PortalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default Layout;
