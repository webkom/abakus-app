import { PixelifySans_400Regular, useFonts } from '@expo-google-fonts/pixelify-sans';
import { PortalHost } from '@rn-primitives/portal';
import { PortalProvider } from '@gorhom/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import '../global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthGuard from '@/components/auth/auth-guard';

const queryClient = new QueryClient();

const Layout = () => {
  const _ = useFonts({
    PixelifySans_400Regular,
  });
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthGuard>
          <PortalProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
            <PortalHost />
          </PortalProvider>
        </AuthGuard>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default Layout;
