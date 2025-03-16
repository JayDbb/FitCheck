import { View, Text, Image, Pressable } from "react-native";
import React, { useRef, useCallback } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";
import RatingSlider from "@/components/ui/rating-slider";
import axios from "axios";
import { apiUrl } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import BottomSheet from "@gorhom/bottom-sheet";
// import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const PostDetails = () => {
  const { url } = useLocalSearchParams();

  // const bottomSheetRef = useRef<BottomSheet>(null);

  // const openBottomSheet = useCallback(() => {
  //   bottomSheetRef.current?.expand();
  // }, []);

  const token = async () => {
    const user = await AsyncStorage.getItem("token");
    return JSON.parse(user as string)?.token;
  };
  
  const addRating = async () =>{
    axios.post(`${apiUrl}/posts/add-rating`, {
        
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await token()}`,
      },
    })
  }
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
<RatingSlider rating={0} onRatingChange={()=>{ }} />

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
