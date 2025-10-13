import TabBar from '@/components/tab-bar';
import { Tabs } from 'expo-router';
import { TabList, TabTrigger } from 'expo-router/ui';

import React from 'react';
import { Text } from 'react-native';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Hjem',
        }}
      />
      <Tabs.Screen
        name="events/index"
        options={{
          title: 'Arrangementer',
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
