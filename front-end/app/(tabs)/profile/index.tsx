import { View, Text, Image, StyleSheet, ScrollView,  Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import MasonryList from "@/components/ui/masonry-grid";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";

const pins = [
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
];

const ProfileScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    const fetchPosts = async (username: string) => {
      axios.get(`http://localhost:8081/posts/get-posts?username=${username}`).then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.error(error);
      });
    };
    fetchPosts("JamarTG");
  }, []);

  return (
    <ScrollView>
      <SafeAreaView className="px-2 pt-2 ">
        {/* Header */}
        <View className="h-[44px] px-2 flex-row justify-end items-center">

          <Pressable>
          <SymbolView
              name="line.3.horizontal"
              type="hierarchical"
        
              size={30}
            />
          </Pressable>
        </View>

        {/* Profile Section */}
        <View className="flex-row items-center mt-4">
          <View className="flex-1">
            <Text className="text-3xl font-bold text-primary-200">
              cajaun
            </Text>
            <Text className="text-base text-secondary-400 mt-2">
              @cajaun
            </Text>
          </View>
          <Image
            source={{ uri: "https://picsum.photos/seed/696/3000/2000" }}
            style={{
              height: 70,
              width: 70,
              borderRadius: 35,
            }}
          />
        </View>



        <View className="mt-4">
          <Text className="text-base text-secondary-400">8 posts</Text>
        </View>

        {/* Buttons */}
        <View className="flex-row justify-between mt-4 w-full gap-4">
          <Pressable
            // onPress={() => router.push("/(modal)/editProfile")}
            className="bg-white border border-secondary-300 rounded-xl h-[35px] flex-1 items-center justify-center px-2"
          >
            <Text className="text-primary-200 font-bold">Edit Profile</Text>
          </Pressable>
          <Pressable className="bg-white border border-secondary-300 rounded-xl h-[35px] flex-1 items-center justify-center px-2">
            <Text className="text-primary-200 font-bold">Share Profile</Text>
          </Pressable>
        </View>

    <View className = "pt-4">


        <MasonryList
            posts={pins}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
          </View>

      </SafeAreaView>
    </ScrollView>
  );
};


export default ProfileScreen;
