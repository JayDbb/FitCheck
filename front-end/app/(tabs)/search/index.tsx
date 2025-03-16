import { View, Text } from "react-native";
import React, { useState, useEffect } from "react"; 
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from 'expo-router';
import MasonryList from "@/components/ui/masonry-grid"; // Assuming this is the same MasonryList component
import axios from "axios";
import { Asset } from 'expo-asset';
import { apiUrl } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Post } from "@/types/posts";


const SearchScreen = () => {
  interface Pin {
    id: string;
    image: string;
    title: string;
  }


  // dummy data
  const pins: Pin[] = [
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

  let { query } = useLocalSearchParams<{ query: string }>();
  const [filteredPins, setFilteredPins] = useState<Post[]>([]);

  const token = async () => {
    const user = await AsyncStorage.getItem("token");
    return JSON.parse(user as string)?.token;
  };

  useEffect(() => {
    if (query) {
      query = query.trim().toLowerCase();
      token().then((token)=>{
        const url = `${apiUrl}/posts/search?q=${query}`;


        axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }).then((response) => {
          setFilteredPins(response.data);
          console.log(response.data);
        }).catch((error) => {
        console.error(error);
      });
      });
    } else {
      setFilteredPins([]);
    }
  }, [query]);

  return (
    <SafeAreaView className="flex-1">
      <MasonryList posts={filteredPins} refreshing={false} onRefresh={() => {}} />
    </SafeAreaView>
  );
};

export default SearchScreen;
