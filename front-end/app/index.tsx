import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
<Pressable onPress={() => router.push("/(tabs)/home")}>
  <Text>Go to main </Text>
</Pressable>
  );
}
