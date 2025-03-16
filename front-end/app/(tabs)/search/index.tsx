import { View, Text } from "react-native";
import React, { useState, useEffect } from "react"; 
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from 'expo-router';
import MasonryList from "@/components/ui/masonry-grid"; // Assuming this is the same MasonryList component
import axios from "axios";

interface Pin {
  id: string;
  image: string;
  title: string;
}

const SearchScreen = () => {

  const { query } = useLocalSearchParams<{ query: string }>();
  const [filteredPins, setFilteredPins] = useState<Pin[]>([]);

  

  const pins: Pin[] = [
    {
      id: "0",
      image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/0.jpeg",
      title: "notJust Dev Hoodie",
    },
    {
      id: "1",
      image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/1.jpeg",
      title: "Programmer working on laptop computer in office studio",
    },
    {
      id: "2",
      image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/2.jpeg",
      title: "computer setup | computer setup idea | black wallpaper #computersetupideas",
    },
    {
      id: "3",
      image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/3.jpeg",
      title: "",
    },
    {
      id: "4",
      image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/4.jpeg",
      title: "White Tesla ",
    },
    {
      id: "5",
      image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/5.jpeg",
      title: "Hustle harder",
    },
    {
      id: "6",
      image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/6.jpeg",
      title: "Studio",
    },
    {
      id: "7",
      image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/7.jpeg",
      title: "The Flying tortoise",
    },
    {
      id: "8",
      image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/8.jpeg",
      title: "Harley Davidson Sportster Iron 883 Custom ~ Rider & Helmet - ModifiedX",
    },
    {
      id: "9",
      image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/9.jpeg",
      title: "Tesla Cybertruck",
    },
  ];

  useEffect(() => {
    if (query) {

      axios.post('http://localhost:3000/posts/search', {
        q: query
        
      }).then((response) => {
        setFilteredPins(response.data);
      }).catch((error) => {
        console.error(error);
      });

    } else {
      setFilteredPins(pins);
    }
  }, [query]);

  return (
    <SafeAreaView className="flex-1">
      <MasonryList posts={filteredPins} refreshing={false} onRefresh={() => {}} />
    </SafeAreaView>
  );
};

export default SearchScreen;
