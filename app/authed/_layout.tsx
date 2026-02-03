import { Stack } from 'expo-router';
import React from 'react';

const StackLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen options={{}} name="(tabs)" />
      </Stack>
    </>
  );
};

export default StackLayout;
