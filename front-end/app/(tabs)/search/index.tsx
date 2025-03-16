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
