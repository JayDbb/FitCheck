import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";
import { SymbolView } from "expo-symbols";

interface Post {
  id: string;
  image: string;
  title: string;
}

const PostDetails = () => {
  const { id, title, image } = useLocalSearchParams();

  let endAncestor;
let endNode;

  console.log("Received params - id:", id, "title:", title, "image:", image);

  return (
    <SafeAreaView className="flex-1">


      <Pressable onPress={() => router.back()}>
        <SymbolView name="backward.circle" type="hierarchical" size={30} />
      </Pressable>



 
      <Animated.Image
        sharedTransitionTag={Array.isArray(id) ? id[0] : id}
        source={{ uri: Array.isArray(image) ? image[0] : image }}
        style={{ width: "100%", height: "100%" }}
      />

    </SafeAreaView>
  );
};

export default PostDetails;
