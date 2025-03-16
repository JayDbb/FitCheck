import { router, Stack } from "expo-router";
import "./global.css";
import { Pressable, Text } from "react-native";


export default function RootLayout() {
  return (

    
    <Stack>

         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

         <Stack.Screen
          name="(modal)/post"
          options={{
            presentation: "modal",
            title: "New Post",
            headerShown: true,
          
            headerLeft:  () => (
              <Pressable onPress={() => router.dismiss()}>
                <Text>
                  Back
                </Text>
              </Pressable>
            ),

       
          }}
        />
    </Stack>
  )
}
