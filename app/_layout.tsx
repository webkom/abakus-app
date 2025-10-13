import { PixelifySans_400Regular, useFonts } from '@expo-google-fonts/pixelify-sans';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import '../global.css';

const queryClient = new QueryClient();

const Layout = () => {
  const _ = useFonts({
    PixelifySans_400Regular,
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </QueryClientProvider>
  );
};

export default Layout;
