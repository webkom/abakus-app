import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";
import Settings from "../screens/Settings";
import Events from "../screens/Events";
import ShowEvent from "../screens/ShowEvent";

type ScreenType = {
  name: "Dashboard" | "Events" | "Settings" | "ShowEvent"; // Add all valid screen names
  component: React.ComponentType<any>;
  // eslint-disable-next-line no-unused-vars
  getIcon: (focused: boolean, color: string, size: number) => JSX.Element;
};

const SCREENS: ScreenType[] = [
  {
    name: "Dashboard",
    component: Dashboard,
    getIcon: (focused, color, size) => (
      <Ionicons
        name={focused ? "home" : "home-outline"}
        size={size}
        color={color}
      />
    ),
  },
  {
    name: "Events",
    component: Events,
    getIcon: (focused, color, size) => (
      <Ionicons
        name={focused ? "menu" : "menu-outline"}
        size={size}
        color={color}
      />
    ),
  },
  {
    name: "Settings",
    component: Settings,
    getIcon: (focused, color, size) => (
      <Ionicons
        name={focused ? "settings" : "settings-outline"}
        size={size}
        color={color}
      />
    ),
  },
];

const getScreenOptions = (routeName: string) => {
  const currentScreen = SCREENS.find((screen) => screen.name === routeName);

  if (!currentScreen) {
    throw new Error("Route name does not exist");
  }

  return {
    tabBarIcon: ({
      focused,
      color,
      size,
    }: {
      focused: boolean;
      color: string;
      size: number;
    }) => {
      return currentScreen.getIcon(focused, color, size);
    },
  };
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={({ route }) => getScreenOptions(route.name)}>
      {SCREENS.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ShowEvent" component={ShowEvent} />
    </Stack.Navigator>
  );
}

function ScreenManager() {
  // Temporary for screen mockup
  const [isAuthenticated] = useState(true);

  return isAuthenticated ? (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  ) : (
    <SafeAreaView>
      <Login />
    </SafeAreaView>
  );
}

export default ScreenManager;
