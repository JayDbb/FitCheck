import { router, Tabs } from "expo-router";
import { Platform, useColorScheme, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { hapticTab } from "@/components/ui/utils/haptic-tab";
export { ErrorBoundary } from "expo-router";
import { SymbolView } from "expo-symbols";

import BlurTabBarBackground from "@/components/ui/utils/tab-bar-background";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarButton: hapticTab,
        headerShown: false,
        tabBarBackground: BlurTabBarBackground,
        tabBarStyle: {
          // Use a transparent background on iOS to show the blur effect
          position: "absolute",
          backgroundColor: "transparent",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name="house.fill"
              type="hierarchical"
              tintColor={color}
              size={30}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name="magnifyingglass"
              type="hierarchical"
              tintColor={color}
              size={30}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name="plus"
              type="hierarchical"
              tintColor={color}
              size={30}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.push("/(modal)/post");
          },
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name="person.crop.circle"
              type="hierarchical"
              tintColor={color}
              size={30}
            />
          ),
        }}
      />
    </Tabs>
  );
}
