import { router, Stack } from "expo-router";
import "./global.css";
import { Pressable, StatusBar, Text, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ThemeProvider from "@/hooks/theme-provider";

export default function RootLayout() {

  const theme = useColorScheme();
  return (
    <GestureHandlerRootView>
      <ThemeProvider>
<StatusBar barStyle="default"/>
     
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
                <Text style={{ color: theme == "light" ? "#000" : "#fff" }} className = "text-xl font-bold">Back</Text>
              </Pressable>
            ),
          }}
        />
      </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
