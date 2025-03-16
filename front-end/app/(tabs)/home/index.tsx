import React, { useState } from "react";
import { SafeAreaView, Text } from "react-native";
import MasonryList from "@/components/ui/masonry-grid";
import { useBottomTabOverflow } from "@/components/ui/utils/tab-bar-background";
import { Asset } from 'expo-asset';

const pins = [
  {
    id: "0",
    image: "https://unsplash.com/photos/two-happy-girlfriends-feeling-satisfied-with-purchases-standing-together-with-shopping-bags-in-front-of-the-shopping-mall-outdoors-AuV0cNNpCs4",
    title: "notJust Dev Hoodie",
  },
  {
    id: "1",
    image: Asset.fromModule(require("../../../assets/images/ahmed-carter-tiWcNvpQF4E-unsplash.jpg")).uri,
  
    title: "Programmer working on laptop computer in office studio",
  },
  {
    id: "2",
    image: Asset.fromModule(require("../../../assets/images/alyssa-strohmann-TS--uNw-JqE-unsplash.jpg")).uri,
    title: "computer setup | computer setup idea | black wallpaper #computersetupideas",
  },
  {
    id: "3",
    image: Asset.fromModule(require("../../../assets/images/atikh-bana-_KaMTEmJnxY-unsplash.jpg")).uri,
    title: "",
  },
  {
    id: "4",
    image: Asset.fromModule(require("../../../assets/images/charlota-blunarova-r5xHI_H44aM-unsplash.jpg")).uri,
    title: "White Tesla ",
  },
  {
    id: "5",
    image: Asset.fromModule(require("../../../assets/images/clem-onojeghuo-HpEDSZukJqk-unsplash.jpg")).uri,
    title: "Hustle harder",
  },
  {
    id: "6",
    image: Asset.fromModule(require("../../../assets/images/dom-hill-nimElTcTNyY-unsplash.jpg")).uri,
    title: "Studio",
  },
  {
    id: "7",
    image: Asset.fromModule(require("../../../assets/images/freestocks-_3Q3tsJ01nc-unsplash.jpg")).uri,
    title: "The Flying tortoise",
  },
  {
    id: "8",
    image: Asset.fromModule(require("../../../assets/images/hannah-morgan-ycVFts5Ma4s-unsplash.jpg")).uri,
    title: "Harley Davidson Sportster Iron 883 Custom ~ Rider & Helmet - ModifiedX",
  },
  {
    id: "9",
    image: Asset.fromModule(require("../../../assets/images/katsiaryna-endruszkiewicz-BteCp6aq4GI-unsplash.jpg")).uri,
    title: "Tesla Cybertruck",
  },
  {
    id: "10",
    image: Asset.fromModule(require("../../../assets/images/marissa-grootes-D4jRahaUaIc-unsplash.jpg")).uri,
    title: "Tesla Cybertruck",
  },
  {
    id: "11",
    image: Asset.fromModule(require("../../../assets/images/priscilla-du-preez-dlxLGIy-2VU-unsplash.jpg")).uri,
    title: "Tesla Cybertruck",
  },
  {
    id: "12",
    image: Asset.fromModule(require("../../../assets/images/s-o-c-i-a-l-c-u-t-aXJdmnxauwY-unsplash.jpg")).uri,
    title: "Tesla Cybertruck",
  },
  {
    id: "13",
    image: Asset.fromModule(require("../../../assets/images/tamara-bellis-68csPWTnafo-unsplash.jpg")).uri,
    title: "Tesla Cybertruck",
  },
  {
    id: "14",
    image: Asset.fromModule(require("../../../assets/images/valna-studio-mU88MlEFcoU-unsplash.jpg")).uri,
    title: "Tesla Cybertruck",
  },
  {
    id: "15",
    image: Asset.fromModule(require("../../../assets/images/s-o-c-i-a-l-c-u-t-aXJdmnxauwY-unsplash.jpg")).uri,
    title: "Tesla Cybertruck",
  },
  {
    id: "16",
    image: Asset.fromModule(require("../../../assets/images/judeus-samson-0UECcInuCR4-unsplash.jpg")).uri,
    title: "Tesla Cybertruck",
  },
  {
    id: "17",
    image: Asset.fromModule(require("../../../assets/images/micheile-henderson-FpPcoOAk5PI-unsplash.jpg")).uri,
    title: "Tesla Cybertruck",
  },
  {
    id: "18",
    image: Asset.fromModule(require("../../../assets/images/tamara-bellis-IwVRO3TLjLc-unsplash.jpg")).uri,
    title: "Tesla Cybertruck",
  },
  {
    id: "19",
    image: Asset.fromModule(require("../../../assets/images/naeim-jafari-laobUPA4jR8-unsplash.jpg")).uri,
    title: "Tesla Cybertruck",
  },
  {
    id: "20",
    image: Asset.fromModule(require("../../../assets/images/dami-adebayo-k6aQzmIbR1s-unsplash.jpg")).uri,
    title: "Tesla Cybertruck",
  },
  {
    id: "21",
    image: Asset.fromModule(require("../../../assets/images/alexandra-gorn-WF0LSThlRmw-unsplash.jpg")).uri,
    title: "Tesla Cybertruck",
  },
  {
    id: "22",
    image: Asset.fromModule(require("../../../assets/images/alexandru-zdrobau-juESZxMhtXk-unsplash.jpg")).uri,
    title: "Tesla Cybertruck",
  },
];
const HomeScreen = () => {



  const [refreshing, setRefreshing] = useState(false);
  const paddingBottom = useBottomTabOverflow();

  const onRefresh = () => {
    setRefreshing(true);
   
    setTimeout(() => {
      setRefreshing(false);
      
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1" >
      <MasonryList posts={pins} refreshing={refreshing} onRefresh={onRefresh} />
    </SafeAreaView>
  );
};

export default HomeScreen;
