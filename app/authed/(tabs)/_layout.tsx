import TabBar from '@/components/tab-bar';
import { Tabs } from 'expo-router';

import React from 'react';

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
      <Tabs.Screen
        name="abaid/index"
        options={{
          title: 'AbaID',
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
