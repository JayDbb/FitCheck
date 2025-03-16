import { router, Stack } from "expo-router";
import "./global.css";
import { Pressable, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="(modal)/post"
          options={{
            presentation: "modal",
            title: "New Post",
            headerShown: true,

            headerLeft: () => (
              <Pressable onPress={() => router.dismiss()}>
                <Text>Back</Text>
              </Pressable>
            ),
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
