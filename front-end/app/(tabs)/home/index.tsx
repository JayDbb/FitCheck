import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MasonryFlashList } from "@shopify/flash-list";

const DATA = [
  {
    title: "First Item",
    id: "1",
  },
  {
    title: "Second Item",
    id: "2",
  },
];

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <MasonryFlashList
        data={DATA}
        numColumns={2}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        keyExtractor={(item) => item.id}
        estimatedItemSize={200}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
