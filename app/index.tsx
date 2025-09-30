import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NativeBaseProvider } from "native-base";

import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";
import Settings from "../screens/Settings";
import Events from "../screens/Events";
import ShowEvent from "../screens/ShowEvent";

const queryClient = new QueryClient();

type ScreenType = {
  name: "Dashboard" | "Events" | "Settings" | "ShowEvent";
  component: React.ComponentType<any>;
  getIcon: (focused: boolean, color: string, size: number) => JSX.Element;
};

const SCREENS: ScreenType[] = [
  {
    name: "Dashboard",
    component: Dashboard,
    getIcon: (focused, color, size) => <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />,
  },
  {
    name: "Events",
    component: Events,
    getIcon: (focused, color, size) => <Ionicons name={focused ? "menu" : "menu-outline"} size={size} color={color} />,
  },
  {
    name: "Settings",
    component: Settings,
    getIcon: (focused, color, size) => <Ionicons name={focused ? "settings" : "settings-outline"} size={size} color={color} />,
  },
];

const getScreenOptions = (routeName: string) => {
  const currentScreen = SCREENS.find((screen) => screen.name === routeName);
  if (!currentScreen) throw new Error("Route name does not exist");

  return {
    tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) =>
      currentScreen.getIcon(focused, color, size),
  };
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={({ route }) => getScreenOptions(route.name)}>
      {SCREENS.map((screen) => (
        <Tab.Screen key={screen.name} name={screen.name} component={screen.component} />
      ))}
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ShowEvent" component={ShowEvent} />
    </Stack.Navigator>
  );
}

function ScreenManager() {
  const [isAuthenticated] = useState(true);

  return isAuthenticated ? (
    <NavigationIndependentTree>
      <AppNavigator />
    </NavigationIndependentTree>
  ) : (
    <SafeAreaView>
      <Login />
    </SafeAreaView>
  );
}

// Wrap your app with QueryClientProvider and optionally NativeBaseProvider
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <NavigationIndependentTree>
          <ScreenManager />
        </NavigationIndependentTree>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
