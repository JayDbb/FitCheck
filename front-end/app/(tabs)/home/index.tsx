import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BodyScrollView } from "@/components/ui/utils/body-scroll-view";
import MasonryList from "react-native-masonry-list";


const data = [

    {
      uri: "https://luehangs.site/pic-chat-app-images/beautiful-blond-blonde-hair-478544.jpg",
    },
    {
      source: {
        uri: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-women-beauty-40901.jpg",
      },
    },
    {
      uri: "https://luehangs.site/pic-chat-app-images/animals-avian-beach-760984.jpg",
      dimensions: { width: 1080, height: 1920 },
    },
    {
      URI: "https://luehangs.site/pic-chat-app-images/beautiful-blond-fishnet-stockings-48134.jpg",
      id: "blpccx4cn",
    },
    {
      url: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg",
    },
    {
      URL: "https://luehangs.site/pic-chat-app-images/attractive-balance-beautiful-186263.jpg",
    },
  ];
  

  

const HomeScreen = () => {
  return (
<SafeAreaView className = "flex-1 ">



      <MasonryList
       images={data}
      />
</SafeAreaView>
  );
};

export default HomeScreen;
