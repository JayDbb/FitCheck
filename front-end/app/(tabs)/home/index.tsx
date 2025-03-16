import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import MasonryList from "@/components/ui/masonry-grid";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiUrl } from "@/config";
import { Post } from "@/types/posts";

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const token = async () => {
    const user = await AsyncStorage.getItem("token");
    return JSON.parse(user as string)?.token;
  };

 

  const getUsername = async () => {
    try {
      const response = await axios.get(`${apiUrl}/users/get`, {
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
  
        token().then(token => {
          axios.get(`${apiUrl}/users/get`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((response) => {

            const username = response.data.username;

            axios.get(
              `${apiUrl}/posts/load-feed?username=${username}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            ).then((response: { data: Post[] }) => {
              setPosts(response.data);
            }).catch((error) => {
              console.error("Error fetching posts:", error);
            });
          
          })
        })
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
