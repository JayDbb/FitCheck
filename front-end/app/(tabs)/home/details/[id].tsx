import { View, Text, Image, Pressable } from "react-native";
import React, { useRef, useCallback } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";
// import BottomSheet from "@gorhom/bottom-sheet";
// import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const PostDetails = () => {
  const { url } = useLocalSearchParams();

  // const bottomSheetRef = useRef<BottomSheet>(null);

  // const openBottomSheet = useCallback(() => {
  //   bottomSheetRef.current?.expand();
  // }, []);

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen
        name="details"
        options={{
          headerShown: false,
        }}
      />

      <Image
        source={{ uri: Array.isArray(url) ? url[0] : url }}
        style={{ width: "100%", height: "80%" }}
      />

      {/* Pressable to Open Bottom Sheet */}
      <Pressable  className="absolute bottom-10 right-5 bg-white p-2 rounded-full">
        <SymbolView name="bubble.left" type="hierarchical" size={30} />
      </Pressable>

      {/* Bottom Sheet */}
      {/* <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={["50%"]}>
        <BottomSheetScrollView>
          <Text className="p-4">Comments Section</Text>
        </BottomSheetScrollView>
      </BottomSheet> */}
    </SafeAreaView>
  );
};

export default PostDetails;
