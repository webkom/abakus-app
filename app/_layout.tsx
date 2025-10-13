import { Stack } from 'expo-router';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../global.css';
import { PixelifySans_400Regular, useFonts } from '@expo-google-fonts/pixelify-sans';

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
