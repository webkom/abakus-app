import { Stack } from 'expo-router';
import React from 'react';
import '../global.css';

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default Layout;
