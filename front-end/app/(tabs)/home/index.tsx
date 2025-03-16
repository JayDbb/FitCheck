import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import MasonryList from "@/components/ui/masonry-grid";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const token = async () => {
    const user = await AsyncStorage.getItem("token");
    return user;
  };

  const getToken = async () => {
    return await AsyncStorage.getItem("token");
  };

  const getUsername = async () => {
    try {
      const token = await getToken();
      if (!token) return null;
      const response = await axios.get("https://fitcheck-server-c4dshjg7dthhcrea.eastus2-01.azurewebsites.net/users/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.username;
    } catch (error) {
      console.error("Failed to fetch username", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userToken = await token();
        if (!userToken) return;

        const username = await getUsername();

        if (!username) return;

        const response = await axios.get(
          `https://fitcheck-server-c4dshjg7dthhcrea.eastus2-01.azurewebsites.net/posts/load-feed?username=${username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        const transformedData = response.data.map(({ _id, imageURL }: any) => ({
          id: _id as string,
          image: (imageURL || "") as string,
        }));
        setPosts(transformedData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <MasonryList
        posts={posts}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
