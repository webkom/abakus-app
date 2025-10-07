import { Tabs } from 'expo-router';

import React from 'react';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Hjem',
        }}
      />
      <Tabs.Screen
        name="transport/index"
        options={{
          title: 'Transport',
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
